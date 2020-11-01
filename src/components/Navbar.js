import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import ListNavbar from './ListNavbar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {isMobile} from 'react-device-detect';
import ListSocialIconButton from './ListSocialIconButton';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import Typography from '@material-ui/core/Typography';
import { ToastContainer } from 'react-toastify';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Navbar({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [linkto, setLinkto] = React.useState(true);

  useEffect(() =>{
    if(isMobile){
      setOpen(false);
    }
  },[linkto])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onHandleLink = () => {
    setLinkto(!linkto);
  };

  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
          >
              <MenuIcon />
          </IconButton>
          <CloudCircleIcon style={{ marginRight : "0.1rem" }}></CloudCircleIcon>
          <a href="/" style={{ textDecoration : "none" , color : "white" }}>
            <Typography noWrap>
              Kho chứa những điều ước
            </Typography>
          </a>
          <Link to="/create" style={{ marginLeft : "auto" , textDecoration : "none" , color : "white" }}>
            <IconButton color="inherit" >
                <PostAddIcon style={{ fontSize : "2.02rem" }}></PostAddIcon>
            </IconButton>
          </Link>

        </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
        
        <div className={classes.drawerHeader}>
            <a href="/" style={{ textDecoration : "none" }}>
              <Button style={{ color : "#3f51b5" }}>
                  <FilterDramaIcon></FilterDramaIcon>
                  <Typography variant="h6" noWrap>
                      Wishy
                  </Typography>
                  <FilterDramaIcon></FilterDramaIcon>
              </Button>
            </a>

            <IconButton onClick={handleDrawerClose} style={{ marginLeft : "2rem" , color : "#3f51b5" }}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <Divider />

        <ListNavbar onHandleLink={ onHandleLink }></ListNavbar>

        <Divider />
        <div style={{ margin : " 0 auto" }}>
          <ListSocialIconButton></ListSocialIconButton>
        </div>

        </Drawer>
        <main
          className={clsx(classes.content, {
          [classes.contentShift]: open, 
        })}
        style={{ padding : "24px 14px" }}
        >
          <div className={classes.drawerHeader} />
          <>
            {children}
          </>

        </main>

        <ToastContainer
          position="top-right"
          autoClose={2888}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
}
