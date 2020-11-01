import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import { Link } from 'react-router-dom';
import TuneIcon from '@material-ui/icons/Tune';

const listItem = [
  {
    title : "Những điều ước",
    icon : <FiberNewIcon></FiberNewIcon>,
    link : "/",
  },
  {
    title : "Tạo điều ước",
    icon : <AddCircleOutlineIcon ></AddCircleOutlineIcon>,
    link : "/create",
  },
  {
    title : "Thống kê",
    icon : <AssessmentIcon></AssessmentIcon>,
    link : "/statistical",
  },
  {
    title : "Hệ thống",
    icon : <TuneIcon></TuneIcon>,
    link : "/setting",
  },
  {
    title : "Lời cảm ơn",
    icon : <FavoriteBorderIcon></FavoriteBorderIcon>,
    link : "/thank",
  },
]

function ListNavbar({onHandleLink}) {

  const showListItem = () =>{
    return listItem.map((item, index) => (
      <Link key={index} to={ item.link } style={{ textDecoration : "none" }} onClick={ onHandleLink }>
        <ListItem button>
            <ListItemIcon style={{ color : "#3f51b5" }}>{ item.icon }</ListItemIcon>
            <ListItemText style={{ color : "#3f51b5" }} primary={ item.title } />
        </ListItem>
      </Link>
      ))
  }
  return (
    <List>
        { showListItem() }
    </List>
  );
}

export default ListNavbar;
