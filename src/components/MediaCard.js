import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Badge from '@material-ui/core/Badge';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ButtonShowDialog from './ButtonShowDialog';
import * as Enum from '../constants/Enum';
import { updateDropHeart , updateUnlike } from './../api/index';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 414,
  },
  media: {
    height: 12,
  },
});

function MediaCard({wish , iState , setCookieForInteractive}) {
  const classes = useStyles();
  const [dropHeart , setDropHeart] = useState(0);
  const [unlike , setUnlike] = useState(0);
  const [id , setId] = useState(-1);
  const [interactiveState , setInteractiveState] = useState(Enum.STATE_INTERACTIVE.NONE); 

  useEffect(() => {
    const setAllState = () =>{
      setId(wish.id);
      setInteractiveState(iState);
      setDropHeart(parseInt(wish.interactive_dropheart));
      setUnlike(parseInt(wish.interactive_unlike));
    }

    setAllState();
  }, [])

  // const num = Math.floor((Math.random()*12) + 1);

  const onHandleDropHeart = async () =>{
    var iStateTemp = null;
    var dropHeartTemp = dropHeart;

    switch (interactiveState) {
      case Enum.STATE_INTERACTIVE.NONE:
        dropHeartTemp = dropHeart + 1;
        iStateTemp = Enum.STATE_INTERACTIVE.DROPHEART;
        break;
      case Enum.STATE_INTERACTIVE.DROPHEART:
        dropHeartTemp = dropHeart - 1;
        iStateTemp = Enum.STATE_INTERACTIVE.NONE;
        break;
      case Enum.STATE_INTERACTIVE.UNLIKE:
        dropHeartTemp = dropHeart + 1;
        const unlikeTemp = unlike - 1 > 0 ? (unlike - 1) : 0;
        await updateUnlike(unlikeTemp , id);
        setUnlike(unlikeTemp);
        iStateTemp = Enum.STATE_INTERACTIVE.DROPHEART;
        break;
      default:
        break;
    }

    dropHeartTemp = dropHeartTemp > 0 ? dropHeartTemp : 0;
    await updateDropHeart(dropHeartTemp , id);
    setDropHeart(dropHeartTemp);
    setInteractiveState(iStateTemp);
    setCookieForInteractive(iStateTemp , id);
  }

  const onHandleUnlike = async () =>{
    var iStateTemp = null;
    var unlikeTemp = unlike;

    switch (interactiveState) {
      case Enum.STATE_INTERACTIVE.NONE:
        unlikeTemp = unlike + 1;
        iStateTemp = Enum.STATE_INTERACTIVE.UNLIKE;
        break;
      case Enum.STATE_INTERACTIVE.DROPHEART:
        unlikeTemp = unlike + 1;
        const dropHeartTemp = dropHeart - 1 > 0 ? (dropHeart - 1) : 0;
        await updateDropHeart(dropHeartTemp , id);
        setDropHeart(dropHeartTemp);
        iStateTemp = Enum.STATE_INTERACTIVE.UNLIKE;
        break;
      case Enum.STATE_INTERACTIVE.UNLIKE:
        unlikeTemp = unlike - 1;
        iStateTemp = Enum.STATE_INTERACTIVE.NONE;
        break;
      default:
        break;
    }

    unlikeTemp = unlikeTemp > 0 ? unlikeTemp : 0;
    await updateUnlike(unlikeTemp , id);
    setUnlike(unlikeTemp);
    setInteractiveState(iStateTemp);
    setCookieForInteractive(iStateTemp , id);
  }

  const dropHeartVariant = interactiveState === Enum.STATE_INTERACTIVE.DROPHEART ? "contained" : "outlined";
  const unlikeVariant = interactiveState === Enum.STATE_INTERACTIVE.UNLIKE ? "contained" : "outlined";

  return (
    <Card className={classes.root} style={{ margin : "auto" , marginTop : "0.8rem" }} id={wish.id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ process.env.PUBLIC_URL + "images/" + wish.img_num + ".jpg" }
          title="Contemplative Reptile"
        />
        <CardContent style={{ padding : "1rem" }}>           
          <Typography gutterBottom variant="h6">
            <PersonOutlineIcon></PersonOutlineIcon>
            { wish.author_name }
          </Typography>
          {/*  whiteSpace : "pre-line" */}
          <Typography variant="body2" noWrap color="textSecondary" component="p" style={{  fontSize : "1rem" , fontWeight : "400" }}> 
            { wish.description }
          </Typography>
          <Chip variant="outlined" color="primary" size="small" label={ wish.tag } style={{ marginTop : "0.6rem" }} icon={<LabelImportantIcon />}>       
          </Chip>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ marginTop : "auto" }}>
        <Badge color="secondary" badgeContent={ dropHeart }>
          <Button variant={ dropHeartVariant } size="small" color="primary" onClick={ onHandleDropHeart }>
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </Button>
        </Badge>
        <Badge color="secondary" badgeContent={ unlike }>
          <Button variant={ unlikeVariant } size="small" color="primary" onClick={ onHandleUnlike } style={{ marginLeft : "0.3rem" }}>
            <ThumbDownIcon></ThumbDownIcon>
          </Button>
        </Badge>
        <ButtonShowDialog wish={ wish }></ButtonShowDialog>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  wish : PropTypes.object.isRequired
}

export default MediaCard;
