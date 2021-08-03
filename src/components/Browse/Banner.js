import React, { Component } from 'react';
import logo from '../../assets/images/newlogo.png';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Inbox, ExitToApp,  } from '@material-ui/icons';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DvrIcon from '@material-ui/icons/Dvr';
import { withTheme } from '@material-ui/core/styles';
const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  themeValue: state.common.theme
});
const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: "LOGOUT" }),
  switchTheme: () => dispatch({ type: "Theme" })
});
class Header extends Component {    

    constructor(){
      super();
      this.state={
          show:false,
          anchorEl: null
      }
    }
   
  render() {      
  console.log("----------", this.props.theme)
   
    return (
            <nav style={{backgroundColor: this.props.theme.palette.background.default, zIndex: 1300}} className="w-full flex flex-col sm:flex-row items-center justify-between  p-2 fixed bg-white top-0 z-10">
              <div className="flex justify-between w-full items-center">
              <img src={logo} width="120" height="auto" alt="logo" />     
              <div className="block sm:hidden">
                <button  className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 " onClick={()=>{this.setState({show:!this.state.show})}}>
                  <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
              </div>
              </div>
             
              <div className={this.state.show? "w-full inline-block text-center" : " hidden sm:inline-block"}>
                <ul className="list-reset sm:flex justify-end flex-1 items-center">
                  <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/">Home</Link>
                  </li>
              
                  { !this.props.currentUser?
                    ( 
                    <>
                    <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/Login">LogIn</Link>
                    </li>
                    <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/register">SignUp</Link>
                    </li>
                    </>
                    ) : 
                    (
                      <div className="dropdown mr-3">
                      <span className="dropbtn font-bold hover:text-red-500">{this.props.currentUser.username}</span>
                      <div className="dropdown-content" style={{backgroundColor: this.props.theme.palette.background.default}}>
                      <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                          <ListItemIcon>
                            <AddCircleOutlineIcon />
                          </ListItemIcon>
                         <Link to="/browse/editor"> <ListItemText primary="Create Post" /></Link>
                        </ListItem>                        
                        <ListItem button>
                          <ListItemIcon>
                            < CreateNewFolderIcon />
                          </ListItemIcon>
                         <Link to="/browse/editorCommunity"> <ListItemText primary="Create Community" /></Link>
                        </ListItem>                     
                      <ListItem button>
                        <ListItemIcon>
                          <MonetizationOnIcon />
                        </ListItemIcon>
                        <Link to="/browse/editorProduct"> <ListItemText primary="Create Product" /></Link>
                      </ListItem>   
                      </List>                  
                      <Divider />
                      <List component="nav" aria-label="secondary mailbox folders">                        
                        <ListItem button>
                          <ListItemIcon>
                            <DvrIcon />
                          </ListItemIcon>
                          <Link to="/browse/moderator"> <ListItemText primary="Moderator Management" /></Link>
                        </ListItem>
                      </List>
                      <List component="nav" aria-label="secondary mailbox folders">                        
                        <ListItem button>
                          <ListItemIcon>
                            <SupervisorAccountIcon />
                          </ListItemIcon>
                          <Link to="/browse/admin"> <ListItemText primary="Admin Management" /></Link>
                        </ListItem>
                      </List>
                      <Divider />
                      <List component="nav" aria-label="secondary mailbox folders">                        
                        <ListItem button>
                          <ListItemIcon>
                            <ExitToApp />
                          </ListItemIcon>
                          <ListItemText primary="Logout"  onClick={this.props.onClickLogout}/>
                        </ListItem>
                      </List>
                      </div>
                      </div>
                    )
                  }
                  <li className="mr-3">
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="mode"
                    onClick={this.props.switchTheme}
                  > {!this.props.themeValue ? <Brightness7Icon /> : <Brightness3Icon />}
                  </IconButton>
                  </li>
                </ul>
              </div>           
             
            </nav> 
    
      
    );
  }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Header));

