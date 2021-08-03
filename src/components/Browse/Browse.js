import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import MailIcon from '@material-ui/icons/Mail';
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
import logo from '../../assets/images/newlogo.png';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import Banner from './Banner'
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
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: "red",
  },
  scroll: {
    position: "fixed",
    right: 20,
    bottom: 20
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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
          <ListItemText primary="Welcome to Reddit" />
            </ListItem>
            
        </List>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><GroupIcon/></ListItemIcon>
              <ListItemText primary="Communities" />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><PostsIcon/></ListItemIcon>
              <ListItemText primary="Your Posts" />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><ProfileIcon/></ListItemIcon>
              <ListItemText primary="Your Profile" />
            </ListItem>
        </List>
        <List>
            <ListItem button>
              <ListItemIcon><SearchIcon/></ListItemIcon>
              <Paper component="form" >
                <InputBase
                    className={classes.input}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
             </Paper>
            </ListItem>
        </List>
        <Divider />
        <ListItem button onClick={handleClick1}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Communities" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {['All mail', 'Trash', 'Spam', 'All mailx', 'Tracsh', 'Spcam'].map((text, index) => (           
            <ListItem button key={text}>
                <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Collapse>
        
      </Drawer>
      <main className={classes.content} >
    
        <div className="flex flex-row">
          <div className="flex-grow mx-5 p-4">
        {props.children}
        </div>
        <div style={{width: 300}}>
          <Card id="back-to-top-anchor">
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className="bg-red-500">
                  <CupIcon/>
                </Avatar>
              }
              title="Top News Communities"
            />
            <CardContent>
              <div variant="body2" color="textSecondary" className="m-2">
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
          <br/><br/>
          <Card >
            <CardHeader
              avatar={
                <Avatar aria-label="recipe"  className="bg-red-500">
                  <LoyaltiIcon/>
                </Avatar>
              }
              title="Tags"
            />
            
            <CardContent>  
            <Badge badgeContent={4} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full">python</span>  <br/>
            </Badge>
            <Badge badgeContent={5} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full" >python</span>  <br/>
            </Badge>
            <Badge badgeContent={2} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full">python</span>  <br/>
            </Badge>
            <Badge badgeContent={7} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full " >python</span>  <br/>
            </Badge>
            <Badge badgeContent={7} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full">Django</span>  <br/>
            </Badge>
            <Badge badgeContent={99} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full" >C#</span>  <br/>
            </Badge>
            <Badge badgeContent={22} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full" >Flask</span>  <br/>
            </Badge>
            <Badge badgeContent={4} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full">Golang</span>  <br/>
            </Badge>
            <Badge badgeContent={4} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full" >React</span>  <br/>
            </Badge>
            <Badge badgeContent={4} color="primary" className="m-2">
            <span className="border border-blue-600 p-1 inline-block rounded-full" >Flutter</span>  <br/>
            </Badge>            
            
          
              
            </CardContent>
          </Card>

    </div>
 
        </div>
    
        <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      </main>
    
    </div>
  
      </>
  );
}