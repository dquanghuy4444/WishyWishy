import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../components/MediaCard';
import * as Enum from '../constants/Enum';
import * as API from './../constants/API';
import { useCookies } from 'react-cookie';
import { fetchWishesData , fetchSettingData } from './../api/index';
import SyncLoading from '../components/SyncLoading';
import SearchTextField from '../components/SearchTextField';
import { showInfoMessage } from './../functions/ShowMessage';
import 'react-toastify/dist/ReactToastify.css';
import NoData from '../components/NoData';
import { Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Home({history}) {

  const [wishes , setWishes] = useState(null);
  const [wishesTemp , setWishesTemp] = useState([]);
  const [word , setWord] =useState(null);
  const [numPage , setNumPage] = useState(1);
  const [amountW , setAmountW] = useState(6);
  const [isFound , setIsFound] = useState(true);
  const [cookies, setCookie] = useCookies(['listDropHeartIds' , 'listUnlikeIds']);
  const classes = useStyles();

  useEffect(() =>{
    const fetchData = async () =>{
      const data = await fetchWishesData(API.STR_TABLE_WISHES);
      setWishes(data.reverse());

      const settingData = await fetchSettingData();
      if(settingData){
        (settingData.amount_w_in_page >=3 && settingData.amount_w_in_page <= 9) && (setAmountW(settingData.amount_w_in_page));    
      };
    }
    
    fetchData();

    if(!localStorage.getItem('has_visited'))
    {
      showInfoMessage();
      localStorage.setItem('has_visited', "u know my name");
    }

  },[]);


  const setCookieForInteractive = (interactiveState , id) =>{
    var arrDropHeartIds = cookies.listDropHeartIds;
    var arrUnlikeIds = cookies.listUnlikeIds;

    switch (interactiveState) {
      case Enum.STATE_INTERACTIVE.NONE:
        if(arrDropHeartIds || Array.isArray(arrDropHeartIds)) {
          if(arrDropHeartIds.includes(id)) {
            arrDropHeartIds = arrDropHeartIds.filter(idz => idz !== id);
            setCookie('listDropHeartIds', arrDropHeartIds, { path: '/' });
            break;
          }
        }
        if(arrUnlikeIds || Array.isArray(arrUnlikeIds)) {
          if(arrUnlikeIds.includes(id)) {
            arrUnlikeIds = arrUnlikeIds.filter(idz => idz !== id);
            setCookie('listUnlikeIds', arrUnlikeIds, { path: '/' });
          }
        }
        break;

      case Enum.STATE_INTERACTIVE.DROPHEART:
        if(arrUnlikeIds || Array.isArray(arrUnlikeIds)) {
          if(arrUnlikeIds.includes(id)) {
            arrUnlikeIds = arrUnlikeIds.filter(idz => idz !== id);
            setCookie('listUnlikeIds', arrUnlikeIds, { path: '/' });
          }
        }

        if(arrDropHeartIds || Array.isArray(arrDropHeartIds)) {
          if(!arrDropHeartIds.includes(id)) {
            arrDropHeartIds.push(id);
          }
        } else {
          arrDropHeartIds = [id];
        }
        setCookie('listDropHeartIds', arrDropHeartIds, { path: '/' });
        break;
        
      case Enum.STATE_INTERACTIVE.UNLIKE:
        if(arrDropHeartIds || Array.isArray(arrDropHeartIds)) {
          if(arrDropHeartIds.includes(id)) {
            arrDropHeartIds = arrDropHeartIds.filter(idz => idz !== id);
            setCookie('listDropHeartIds', arrDropHeartIds, { path: '/' });
          }
        }

        if(arrUnlikeIds || Array.isArray(arrUnlikeIds)) {
          if(!arrUnlikeIds.includes(id)) {
            arrUnlikeIds.push(id);
          }
        } else {
          arrUnlikeIds = [id];
        }
        setCookie('listUnlikeIds', arrUnlikeIds, { path: '/' });
        break;
      
      default:
        break
    }
  }

  const onSearch = async (word) =>{
    setWord(word);
    setIsFound(true);
    if(word){
      let wishesTemp = wishes;
      let wishesTemp2 = null;

      wishesTemp = await wishes.filter((wish)=>{
        return wish.tag.toLowerCase().indexOf(word) !== -1;
      });

      wishesTemp2 = await  wishes.filter((wish)=>{
        return wish.author_name.toLowerCase().indexOf(word) !== -1;
      });

      wishesTemp = await [...wishesTemp , ...wishesTemp2];

      wishesTemp = await wishesTemp.reduce((unique, o) => {
          if(!unique.some(obj => obj.id === o.id )) {
            unique.push(o);
          }
          return unique;
      },[]);

      setWishesTemp(wishesTemp)

      if(wishesTemp.length === 0 || wishesTemp.length < numPage * amountW)
      {
        setIsFound(false);
      }
    } else {
      setNumPage(1);
    } 
  }

  const showCards = () =>{
    // let wishesTemp = wishes;
    let wishesTempz = null;

    if(word)
    {
      // wishesTemp = wishes.filter((wish)=>{
      //   return wish.tag.toLowerCase().indexOf(word) !== -1;
      // });

      // wishesTemp2 = wishes.filter((wish)=>{
      //   return wish.author_name.toLowerCase().indexOf(word) !== -1;
      // });

      // wishesTemp = [...wishesTemp , ...wishesTemp2];

      // wishesTemp = wishesTemp.reduce((unique, o) => {
      //     if(!unique.some(obj => obj.id === o.id )) {
      //       unique.push(o);
      //     }
      //     return unique;
      // },[]);


      if(wishesTemp.length === 0)
      {
        return (
          <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          >
            <Grid item>
              <h2 style={{fontWeight : "600" }}>
                Chưa tìm thấy dữ liệu phù hợp
              </h2>
            </Grid>
            <Grid item >
              <img src={ process.env.PUBLIC_URL + "/pngwave.png" } width={"90%"} alt="Hihi" style={{ margin : "0 auto"}}></img>
            </Grid>
          </Grid>);
      }

      wishesTempz = wishesTemp.slice(0,numPage * amountW);
    }
    else{
      wishesTempz = wishes.slice(0,numPage * amountW);
    }

    const arrDropHeartIds = cookies.listDropHeartIds;
    const arrUnlikeIds = cookies.listUnlikeIds;

    return wishesTempz.map((wish , index) =>{
      let iState = Enum.STATE_INTERACTIVE.NONE;
      if(arrDropHeartIds || Array.isArray(arrDropHeartIds)) {
        if(arrDropHeartIds.includes(wish.id)) {
          iState = Enum.STATE_INTERACTIVE.DROPHEART;
        }
      }
      if(iState === Enum.STATE_INTERACTIVE.NONE){
        if(arrUnlikeIds || Array.isArray(arrUnlikeIds)) {
          if(arrUnlikeIds.includes(wish.id)) {
            iState = Enum.STATE_INTERACTIVE.UNLIKE;
          }
        }
      }

      return (
        <Grid key={ index } item xs={12} sm={4} zeroMinWidth>
          <MediaCard wish={ wish } iState={ iState } setCookieForInteractive={ setCookieForInteractive }></MediaCard>
        </Grid>
      );
    })
  }

  const showButtonLoadMore = (wishes) =>{
    const result = (numPage * amountW < wishes.length) ? (
      <div style={{ display : "flex" , alignItems : "center" , justifyContent : "center"}}>
        <Button onClick={ () =>{ setNumPage(numPage + 1)} }>
          <ArrowDropDownIcon></ArrowDropDownIcon>
          Tải thêm
        </Button>
      </div>
    ) : (<div></div>);

    return result;
  }

  const showMain = () =>{
    if(wishes.length > 0){

      return (
        <>
          
          <SearchTextField onSearch={ onSearch }></SearchTextField>

          <Grid container spacing={1}>
            { showCards() }
          </Grid>
          <br></br>
          { isFound && showButtonLoadMore(wishes) }
        </>
      )
    }
    
    return <NoData text={ "Hiện tại chưa có ước mơ nào được tạo" }></NoData>
  }

  return (
   <div className={classes.root}>
      { wishes ? 
        showMain()
      : <SyncLoading></SyncLoading> }

    </div>
  );
}

export default Home;
