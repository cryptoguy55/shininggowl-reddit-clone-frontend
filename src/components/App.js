import agent from '../agent';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, ERASE_TOAST } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from './Article';
import Editor from './Article/Editor';
import Moderator from './Moderator';
import EditorProduct from './EditorProduct';
import Community from './Setting/Community';
import Home from './Home/Home';
import Login from './Auth/Login';
import Thankyou from './Auth/Thankyou';
import VerifyEmail from './Auth/VerifyEmail';
import ForgotPassword from './Auth/ForgotPassword';
import Profile from './Browse/Profile';
import ProfileFavorites from './Browse/ProfileFavorites';
import Register from './Auth/Register';
import InputEmail from './Auth/InputEmail'
import Settings from './Browse/Settings';
import Browse from './Browse/Browse'
import Main from './Browse/Main'
import Admin from './Admin'
import Communities from './Community/Main'
import SetModerator from './Community/Moderator'
import Error404 from './error/404'
import { store } from '../store';
import { push } from 'react-router-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
const toastMaker = value => {
  let val=""
  Object.keys(value).map(key  => {
    val += value[key] + " "
  });
  return val
}
const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    error: state.common.error,
    warning: state.common.warning,
    success: state.common.success,
    theme: state.common.theme
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  onErase: () =>
    dispatch({ type: ERASE_TOAST })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
    if(nextProps.success) {
      toast.success(nextProps.success)
      this.props.onErase()
    }
    if(nextProps.error) {
      toast.error(toastMaker(nextProps.error))
      this.props.onErase()
    }
    if(nextProps.warning) {
      toast.warn(nextProps.warning)
      this.props.onErase()
    } 
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    const appliedTheme = createTheme(this.props.theme? light : dark);
      return (
        <ThemeProvider theme={appliedTheme}>     
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/Thankyou-Register" component={Thankyou}/>   
              <Route path="/verifyEmail" component={VerifyEmail}/>         
              <Route path="/forgot-password" component={ForgotPassword}/>
              <Route path='/input-email' component={InputEmail}/>
              <Route path="/browse">               
                <Browse>
                <Route path="/browse/set-moderator" component={SetModerator} />
                <Route path="/browse/communities" component={Communities} />
                <Route path="/browse/moderator" component={Moderator} />
                <Route path="/browse/admin" component={Admin} />
                {/* <Route path="/browse/editor/:slug" component={Editor} /> */}
                <Route path="/browse/editor" component={Editor} />
                <Route path="/browse/editorProduct/:slug" component={EditorProduct}/>
                <Route path="/browse/editorProduct" component={EditorProduct} />
                <Route path="/browse/editorCommunity/:slug" component={Community} />
                <Route path="/browse/editorCommunity" component={Community} />
                <Route path="/browse/community/:id" component={Main}/>
                <Route path="/browse/article/:id" component={Article} />
                <Route path="/browse/settings" component={Settings} />
                <Route path="/browse/@:username/favorites" component={ProfileFavorites} />
                <Route path="/browse/@:username" component={Profile} />
              </Browse>
              </Route>            
              <Route path="*" component={Error404}/>
            </Switch>
            <ToastContainer />

        </ThemeProvider>
      );
  
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };
export const light = {
  palette: {
    type: "light"
  }
};
export const dark = {
  palette: {
    type: "dark"
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
