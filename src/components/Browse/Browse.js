import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { push } from 'react-router-redux'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/People';
import PostsIcon from '@material-ui/icons/LocalPostOffice';
import ProfileIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Collapse } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import {Card, CardHeader, Avatar, CardContent, Badge} from '@material-ui/core'
import LoyaltiIcon from "@material-ui/icons/Loyalty"
import CupIcon from "@material-ui/icons/EmojiEvents"
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Banner from './Banner'
import { GET_COMMUNITIES, 
  SEARCH,   HOME_PAGE_LOADED,
  APPLY_TAG_FILTER } from '../../constants/actionTypes';
import agent from '../../agent'

import Cart from "../FloatCart"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
    marginTop: 100

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: "0px 10px" ,  
  },
  avatar: {
    backgroundColor: "red",
  },
  scroll: {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: 9999
  }
}));

function ScrollTop(props) {
  

  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scroll}>
        {children}
      </div>
    </Zoom>
  );
}


export default function MiniDrawer(props) {
  const communities = useSelector((state) => state.community.communities)
  const tags = useSelector((state) => state.home.tags)
  const dispatch = useDispatch()
  useEffect(() => {
    // code to run on component mount
    let result = agent.Communities.all()
    dispatch({type: GET_COMMUNITIES, payload: result})
    dispatch({ type: HOME_PAGE_LOADED, payload: agent.Tags.getAll() })
  }, [])
  const onClickTag =  (tag, pager, payload) => {
     dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }) }
  const watchForEnter = ev => {
    ev.preventDefault();
    if (ev.keyCode === 13) {
      ev.preventDefault();
      dispatch({type: SEARCH, payload: search})
    }
  };
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  return (
    <>
    <Banner/>
    <div className={classes.root}>
      <CssBaseline />
     
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        
        <List >         
            <ListItem button >
              <ListItemIcon> <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            
          >
            <MenuIcon />
          </IconButton></ListItemIcon>
          <ListItemText primary={t('browse.welcome_to_reddit')} />
            </ListItem>
            
        </List>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary={t('browse.home')} />
            </ListItem>
          </Link>
        </List>
        <List>
          <Link to="/browse/communities">
            <ListItem button>
              <ListItemIcon><GroupIcon/></ListItemIcon>
              <ListItemText primary={t('browse.communities')} />
            </ListItem>
          </Link>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><PostsIcon/></ListItemIcon>
              <ListItemText primary={t('browse.your_posts')} />
            </ListItem>
        </List>
        <List>
          <Link to="/browse/settings">
            <ListItem button>
              <ListItemIcon><ProfileIcon/></ListItemIcon>
              <ListItemText primary={t('browse.your_profile')} />
            </ListItem>
          </Link>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><SearchIcon/></ListItemIcon>
            
                <InputBase
                    className={classes.input}
                    placeholder={t('browse.search')}  onChange={e => setSearch(e.target.value)}
                    onKeyUp={watchForEnter}
                />
            </ListItem>
        </List>
        <Divider />
        <ListItem button onClick={handleClick1}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={t('browse.communities')} />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { communities.map((text, index) => ( 
                       
            text.active &&  <ListItem button key={text.ID}>
                                <ListItemIcon></ListItemIcon>
                              <Link to={`/browse/community/${text.ID}`}> <ListItemText primary={text.Name} />  </Link> 
                            </ListItem>          
          ))}
        </List>
      </Collapse>
        
      </Drawer>
      <main className={classes.content} >
           <div  id="back-to-top-anchor"></div>
          <Paper className="flex-grow  p-3 ">
            {props.children}
          </Paper>
       <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      </main>
      <div style={{minWidth: 250}} >
        <div className="fixed overflow-y-auto h-full" style={{marginTop: -100, paddingTop: 100}}> 
        <Card >
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className="bg-red-500">
                  <CupIcon/>
                </Avatar>
              }
              title={t('browse.top_news_communities')}
            />
            <CardContent>
              <div variant="body2" color="textSecondary" className="mr-2 mb-1">
                <ol className="list-decimal text-md -mr-5">
                  <li>r/football</li>
                  <li>r/basketball</li>
                  <li>r/valleyball</li>
                  <li>r/golf</li>
                  <li>r/swimming</li>
                  <li>r/racing</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          <br/>
          <Card >
            <CardHeader
              avatar={
                <Avatar aria-label="recipe"  className="bg-red-500">
                  <LoyaltiIcon/>
                </Avatar>
              }
              title={t('browse.tags')}
            />
            
            <CardContent>  
            <div className="tag-list">
        {
          tags && tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
              dispatch(push('/browse/tag'))
            };
         
            return (
              // <Badge badgeContent={4} color="primary" className="mr-2 mb-1">
            <a href=""  key={tag}  onClick={handleClick}  className="border border-blue-600 p-1 inline-block rounded-full mr-2 mb-1">{tag}</a> 
            // </Badge>
             
            );
          })
        }
      </div>
           
            
          
              
            </CardContent>
          </Card>
      
      
        </div>
     </div>
       
    </div>
        <Cart/>
      </>
  );
}