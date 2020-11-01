import React from 'react';
import './NotFound.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListSocialIconButton from '../components/ListSocialIconButton';
import Typography from '@material-ui/core/Typography';

function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-bg">
          <div />
          <div />
          <div />
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Page Not Found</h2>
        <br></br>
        <Link to="/" style={{ textDecoration : "none" }}>
          <Button style={{ color : "#3f51b5" }}>
              <Typography variant="h6" noWrap>
                  Trở lại
              </Typography>
          </Button>
        </Link>
        <div>
          <ListSocialIconButton></ListSocialIconButton>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
