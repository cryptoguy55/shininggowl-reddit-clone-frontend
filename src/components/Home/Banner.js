import React, { Component } from 'react';
import logo from '../../assets/images/newlogo.png';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

class Header extends Component {    

    constructor(){
      super();
      this.state={
          show:false,          
      }
    }
  render() {
    const { classes } = this.props;
    return (
            <nav className="w-full flex flex-col sm:flex-row items-center justify-between  p-2 fixed bg-white top-0 z-10">
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
                  <li className="mr-3">
                    <Link className="hover:text-red-500 font-bold" to="/browse">Browse</Link>
                  </li>
                  <li className="mr-3">
                  <Link className="hover:text-red-500 font-bold" to="/Login">LogIn</Link>
                  </li>
                  <li className="mr-3">
                  <Link className="hover:text-red-500 font-bold" to="/register">SignUp</Link>
                  </li>
                  {/* <li className="mr-3">
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="mode"
                    onClick={this.change}
                  > {!this.state.theme ? <Brightness7Icon /> : <Brightness3Icon />}
                  </IconButton>
                  </li> */}
                </ul>
              </div>           
             
            </nav> 
        // <Login open={this.state.logModal} handleClose={this.closeModal1}/>
        // <Signup open={this.state.signupModal} handleClose={this.closeModal2} />
      
    );
  }
}

export default Header;
