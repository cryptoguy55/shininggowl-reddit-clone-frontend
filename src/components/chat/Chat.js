import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from "../Browse/Banner"
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import '../../assets/scss/chat.scss'
import agent from '../../agent'
import 'react-chat-elements/dist/main.css';
import  TextField  from '@material-ui/core/TextField';
import { ChatItem, MessageList, Button, Navbar, Avatar, Input, ChatList} from 'react-chat-elements'
// import { connect, sendMsg } from './Websocket';
let id = localStorage.getItem("id")
var socket = new WebSocket(`ws://localhost:8080/api/ws/${id}`);
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: '100px'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  input: {
    width: `calc(100% - ${drawerWidth + 40 }px)`,
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
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
    justifyContent: 'flex-start',
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

export default function PersistentDrawerRight() {
  const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
    const currentUser = useSelector((state) => state.common.currentUser)
    const dispatch = useDispatch()

  const classes = useStyles();
  const theme = useTheme();
  const [lists, setLists] = React.useState([])
  const [select, setSelect] = React.useState([])
  const [open, setOpen] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [chat, setChat] = React.useState("");
  const [all, setAll] = React.useState({})

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const watchForEnter = ev => {
    ev.preventDefault();
    if (ev.keyCode === 13) {
      ev.preventDefault();
      sendMsg(JSON.stringify({
        recipient: select.key.toString(),
        content:  ev.target.value}));
        let v = all           
        v[select.key].push({
          position: "right",
          type: "text",
          text: chat,
           dateString: new Date().toLocaleString()
        })
        console.log(v)
        setAll(v)
        
      // setMessages(mess => mess.concat( {
      //   position: "right",
      //   type: "text",
      //   text: chat,
      //   date: new Date()
      // },))
      // console.log(messages)
      // setAll( i =>  {i[select.key] = messages;  return i})
      console.log(all)
      setChat("")
    }
  };


  let sendMsg = (msg) => {
    console.log("sending msg: ", msg);
    socket.send(msg);
  };

  React.useEffect( async () => {
   
    // code to run on component mount
    // let result = agent.Communities.all()
    // console.log("_______________",result.Communities)
    let data = []
    let users1 = await agent.Auth.all()
     users1.users.forEach( (item, index) => {
       data.push({
        avatar: `http://localhost:8080/api/public/${item.image}`,
        alt: item.label,
        title: item.label,
        subtitle: 'What are you doing?',
        date: new Date(),
        // unread: item.value,
        key: item.value,
        statusColor: 'red'
      })

           
      let v = {  [`${item.value}`] : []   }
      setAll(i => 
        Object.assign(i, v)
      )
     
  
    })
    setLists(data)
    localStorage.setItem("users",   JSON.stringify(data))
    console.log(data)
     socket.onopen = () => {
      console.log("Successfully Connected");
    }
    
    socket.onmessage = (msg) => {    
      let m = JSON.parse(msg.data)
      console.log("New Message", m)
      switch (m.type) {
        case "event-msg":
          console.log(all)
          let v = all 
          
          v[m.sender].push({
            position: "left",
            type: "text",
            text: m.content,
            dateString: new Date(m.timestamp).toLocaleString()
          })
          console.log(v)
          setAll(Object.assign(v))
       
          //  return () => setAll(v)
          // if(select.key  == m.sender) { selectUser() }
          console.log(all);
          forceUpdate()
          break;
       case "event-join":
         let k = JSON.parse(localStorage.getItem("users"))
        k.find(item => item.key == m.sender).statusColor = "#08ef55"
        console.log(k)
        setLists(k)
            
              break;
        case "event-system": 
     
        case "event-typing": 
        case "event-leave": 
        let u = JSON.parse(localStorage.getItem("users"))
        u.find(item => item.key == m.sender).statusColor = "red"
        setLists(u)
        case "event-image":  
      }
    }
  
    socket.onclose = (event) => {
      console.log("Socket Closed Connection: ", event)
    }
  
    socket.onerror = (error) => {
      console.log("Socket Error: ", error)
    }
  }, [])
  
  return (
    <div className={classes.root}>
      <Banner/>
      <CssBaseline />
      <AppBar
          color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
           <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
         <div  className="flex w-full justify-center">
            <Avatar
              src={select.avatar}
              alt={"logo"}
              size="large"
              type="circle flexible"
            />
            <div className="ml-3">{select.title }</div>
            </div>
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
        <List>
            <ListItem >
              <ListItemIcon className="relative">
              <img src={currentUser ? `http://localhost:8080/api/public/${currentUser.image}` : ""} alt="User Profile" height="40" width="40" className="rounded-full " />
              <span
                  className={
                    status === "dnd"
                      ? "avatar-status-busy"
                      : status === "away"
                      ? "avatar-status-away"
                      : status === "offline"
                      ? "avatar-status-offline"
                      : "avatar-status-online"
                  }
               />
              </ListItemIcon>
              
                <TextField
                   
                    // onKeyUp={watchForEnter}
                />
            </ListItem>
        </List>
        </div>
        <Divider />
        <List>
       
        </List>
        <List>
        <ChatList
        className="chat-list"
        onClick={item => {
          console.log("Clicked:", item);
          setSelect(item);
          console.log(localStorage.getItem("users")[0])
        }}
        dataSource={lists}
      />
        </List>
        <Divider />
       
      </Drawer>
   
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
       

      <MessageList
        className="message-list mb-12"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={all[select.key]}
      />
      <div className={`${classes.input}  bottom-5 fixed `} >
        <TextField
          placeholder="Type here..."
          onChange={e => setChat(e.target.value)}
          onKeyUp={watchForEnter}
          value = {chat}         
          fullWidth
          variant="outlined"
        />
         
      </div>
      </main>
     </div>
  );
}