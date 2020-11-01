import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function ListItemFormDetail({icon , text}) {

  return (
    <ListItem>
      <ListItemIcon style={{ color : "#3f51b5" }}>
        { icon }
      </ListItemIcon>
      <ListItemText primary={ text } />
    </ListItem>
  );
}

export default ListItemFormDetail;
