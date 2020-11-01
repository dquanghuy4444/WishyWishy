import React, { useEffect , useState } from 'react';
import { fetchWishesData , fetchFeedbackData , fetchSettingData } from './../api/index';
import SyncLoading from '../components/SyncLoading';
import { Grid } from '@material-ui/core';
import LeftStatistical from './../containers/LeftStatistical';
import RightStatistical from '../containers/RightStatistical';
import VerticalChart from './../components/VerticalChart';
import NoData from "./../components/NoData";
import DownloadCard from '../components/DownloadCard';
import { HEADERS_EXCELS_FOR_WISHES , HEADERS_EXCELS_FOR_FEEDBACK  } from './../constants/Array';
import * as Str from './../constants/String';
import {isMobile} from 'react-device-detect';

function Statistical() {

  const [amountWishes , setAmountWishes] = useState(0);
  const [amountFemale , setAmountFemale] = useState(0);
  const [amountMale , setAmountMale] = useState(0);
  const [amountOthers, setAmountOthers] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [wishes , setWishes] = useState(null);
  const [topWishes , setTopWishes] = useState([]);
  const [starRating , setStarRating] = useState([0, 0 , 0 , 0 , 0]);
  const [feedback , setFeedback] = useState([]);
  const [allowDownload , setAllowDownload] = useState(true);

  useEffect(() =>{ 
    const fetchData = async () =>{
      let numTopWishes = 10;
      const settingData = await fetchSettingData();
      if(settingData){
        setAllowDownload(settingData.allow_download);
        (settingData.top_wishes >=3 && settingData.top_wishes <= 10) && (numTopWishes = settingData.top_wishes);    
      };
      
      const data = await fetchWishesData();
      setWishes(data);

      if(data.length > 0)
      {
        await calculateSexAuthors(data);
        setAmountWishes(data.length);
  
        var topWishesTemp = [];
        const lengthTop = data.length < numTopWishes ? data.length : numTopWishes;
        while(topWishesTemp.length < lengthTop)
        {
          // var highest = await data.reduce((max, current) => (parseInt(current.interactive_dropheart) > parseInt(max.interactive_dropheart) && topWishesTemp.every(wish => wish.id !== current.id)) ? current : max)
          var highest = await data.reduce((max , cur) => (Math.max(max.interactive_dropheart , cur.interactive_dropheart) === max.interactive_dropheart && topWishesTemp.every(wish => wish.id !== max.id) ) ? max : cur , -Infinity);
          topWishesTemp.push(highest)
        }
        setTopWishes(topWishesTemp);


        const feedbackData = await fetchFeedbackData();
        if(feedbackData.length > 0){
          var amountRating = await feedbackData.reduce((amount , cur) => amount += cur.num_star , 0);
          setAverageRating((amountRating / feedbackData.length).toFixed(1));
          setFeedback(feedbackData);

          await calculateStarRating(feedbackData);
        }
      }
    }

    fetchData();

    return () =>{
      console.log("huy");
    }
  },[])


  const calculateSexAuthors = (data) =>{
    let result = data.reduce((acc, it) =>
    ({...acc, [it.author_sex]: (acc[it.author_sex] || 0) + 1 }),
    {});
    const arr = Object.values(result);

    setAmountFemale(arr[0] ? arr[0] : 0);
    setAmountMale(arr[1] ? arr[1] : 0);
    setAmountOthers(arr[2] ? arr[2] : 0);
  }

  const calculateStarRating = (data) =>{
    let arr = [0 , 0 , 0 , 0 , 0];

    data.forEach(item => {
      if(item.num_star > 0 && item.num_star < 6){
        arr[item.num_star - 1] += 1;
      }
    })

    setStarRating(arr);
  }

  const showDownloadCards = () =>{
    return (!isMobile && allowDownload) ? (
      <>
        <Grid item xs={6} sm={3}>
          <DownloadCard data={ wishes } headers={ HEADERS_EXCELS_FOR_WISHES } text={ Str.TEXT_DOWNLOAD_WISHES_CSV_FILE } filename={ Str.TEXT_FILENAME_WISHES}></DownloadCard>
        </Grid>
        <Grid item xs={6} sm={3}>
          <DownloadCard data={ wishes } text={ Str.TEXT_DOWNLOAD_WISHES_JSON_FILE } isCsvFile={ false }></DownloadCard>
        </Grid>
        <Grid item xs={6} sm={3}>
          <DownloadCard data={ feedback } headers={ HEADERS_EXCELS_FOR_FEEDBACK } text={ Str.TEXT_DOWNLOAD_FEEDBACK_CSV_FILE } filename={ Str.TEXT_FILENAME_FEEDBACK}></DownloadCard>
        </Grid>
        <Grid item xs={6} sm={3}>
          <DownloadCard data={ feedback } text={ Str.TEXT_DOWNLOAD_FEEDBACK_JSON_FILE } isCsvFile={ false }></DownloadCard>
        </Grid>
      </>
    ) : (<></>);
  }


  const showMain = () =>{
    if(wishes.length > 0){
      return (
        <>
          <Grid container spacing={2} >
            { showDownloadCards() }
            <Grid item xs={12} sm={8}>
              <LeftStatistical averageRating={ averageRating } amountWishes={ amountWishes } amountFemale={ amountFemale } amountMale={ amountMale } amountOthers={ amountOthers } ></LeftStatistical>
            </Grid>
            <Grid item xs={12} sm={4}>
              <RightStatistical topWishes={ topWishes }></RightStatistical>
            </Grid>
            {
              feedback.length > 0 && (
                <>
                  <Grid item xs={12} sm={8}>
                    <VerticalChart starRating={ starRating }></VerticalChart>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <RightStatistical  feedback={ feedback }></RightStatistical>
                  </Grid>
                </>
              )
            }
          </Grid>
        </>
      )
    }

    return <NoData text={ "Hiện tại chưa có ước mơ nào được tạo nên không thể thống kê" }></NoData>

  }

  return (
    <div>
      { wishes ? showMain() : <SyncLoading></SyncLoading>}
    </div>
  );
}

export default Statistical;
