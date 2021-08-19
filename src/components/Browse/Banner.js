import React, { Component } from 'react';
import logo from '../../assets/images/newlogo.png';
import fr from '../../assets/flag/fr.svg'
import um from '../../assets/flag/um.svg'
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ExitToApp,  } from '@material-ui/icons';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import DvrIcon from '@material-ui/icons/Dvr';
import { withTheme } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';


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
    const {t, i18n} = this.props   
   console.log(i18n.language)
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
                    <Link className="hover:text-red-500 font-bold" to="/"> {t('browse.home')}</Link>
                  </li>
                  <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/browse/1">{t('browse.browse')}</Link>
                  </li>
              
                  { !this.props.currentUser?
                    ( 
                    <>
                    <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/Login">{t('browse.login')}</Link>
                    </li>
                    <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/register">{t('browse.signup')}</Link>
                    </li>
                    </>
                    ) : 
                    (
                      <div className="dropdown mr-3">
                      <span className="dropbtn font-bold hover:text-red-500 flex  mr-3"> <img src={`http://localhost:8080/api/public/${this.props.currentUser.image}`} className="rounded-full" width="40"/><ArrowDropDownIcon/></span>
                      <div className="dropdown-content" style={{backgroundColor: this.props.theme.palette.background.default}}>
                      <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                          <ListItemIcon>
                            <AddCircleOutlineIcon />
                          </ListItemIcon>
                         <Link to="/browse/editor"> <ListItemText primary={t('browse.create_post')} /></Link>
                        </ListItem>                        
                        <ListItem button>
                          <ListItemIcon>
                            < CreateNewFolderIcon />
                          </ListItemIcon>
                         <Link to="/browse/editorCommunity"> <ListItemText primary={t('browse.create_community')} /></Link>
                        </ListItem>                     
                      <ListItem button>
                        <ListItemIcon>
                          <MonetizationOnIcon />
                        </ListItemIcon>
                        <Link to="/browse/editorProduct"> <ListItemText primary={t('browse.create_product')} /></Link>
                      </ListItem>   
                      </List>                  
                      <Divider />
                      <List component="nav" aria-label="secondary mailbox folders">                        
                        <ListItem button>
                          <ListItemIcon>
                            <DvrIcon />
                          </ListItemIcon>
                          <Link to="/browse/moderator"> <ListItemText primary={t('browse.moderator_management')} /></Link>
                        </ListItem>
                      </List>
                       <List component="nav">                        
                        <ListItem button>
                          <ListItemIcon>
                            <AssignmentIndOutlinedIcon />
                          </ListItemIcon>
                          <Link to="/browse/set-moderator"> <ListItemText primary={t('browse.set_moderator')} /></Link>
                        </ListItem>
                      </List>
                      <List component="nav" aria-label="secondary mailbox folders">                        
                        <ListItem button>
                          <ListItemIcon>
                            <SupervisorAccountIcon />
                          </ListItemIcon>
                          <Link to="/browse/admin"> <ListItemText primary={t('browse.admin_management')} /></Link>
                        </ListItem>
                      </List>
                      <Divider />
                      <List component="nav" aria-label="secondary mailbox folders">                        
                        <ListItem button>
                          <ListItemIcon>
                            <ExitToApp />
                          </ListItemIcon>
                          <ListItemText primary={t('browse.logout')}  onClick={this.props.onClickLogout}/>
                        </ListItem>
                      </List>
                      </div>
                      </div>
                    )
                  }
                     <div className="dropdown mr-3">
                      <span className="dropbtn font-bold hover:text-red-500 flex">   {t('language')}<ArrowDropDownIcon/></span>
                      <div className="dropdown-content" style={{backgroundColor: this.props.theme.palette.background.default, minWidth: 100}}>
                      <List component="nav" aria-label="main mailbox folders">
                        <ListItem button onClick={() => i18n.changeLanguage("en")}>
                          <ListItemIcon>
                            <img src={um} width="20"/>
                          </ListItemIcon>
                        <ListItemText primary="English" />
                        </ListItem>  
                        <ListItem button onClick={() => i18n.changeLanguage("fr")}>
                          <ListItemIcon>
                            <img src={fr} width="20"/>
                          </ListItemIcon>
                         <ListItemText primary="Français" />
                        </ListItem>  
                        </List>                      
                      </div>
                      </div>
       
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

export default withTranslation()(withTheme(connect(mapStateToProps, mapDispatchToProps)(Header)));

