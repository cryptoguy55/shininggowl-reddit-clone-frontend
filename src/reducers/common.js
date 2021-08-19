import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_ARTICLE,
  ARTICLE_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ERASE_TOAST,
  Theme,
  Verify,
  COMMON,
  SUCCESS,
  COMMUNITY_SUBMITTED
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Conduit',
  token: null,
  viewChangeCounter: 0,
  theme: true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case COMMUNITY_SUBMITTED: 
    return {
      ...state, 
      error: action.error? action.payload.message : null,
      success: action.error? null: action.payload.message,
    }    
    case SUCCESS: 
      return {
        ...state, 
        success: action.error? null: action.payload.message,
      }
    case COMMON: 
      return {
        ...state, 
        error: action.error? action.payload.message : null,
        success: action.error? null: action.payload.message,
      }      
    case Theme: 
      return {
        ...state, theme: !state.theme
      }
    case Verify: 
      return {
        ...state, 
        error: action.error? action.payload.message : null,
        success: action.error? null: action.payload.message,
        redirectTo: action.error ? null : '/',
      }      
    
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case ERASE_TOAST:
      return { ...state, error: null, warning: null, success: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null, success: "Logout successfully" };
    case ARTICLE_SUBMITTED:
      const redirectUrl = `/browse/community/${action.payload.article.slug}`;
      return { ...state, 
        redirectTo: action.error? null : redirectUrl,
        error: action.error? action.payload.errors : null,
        success: action.error? null: "Post has been created successfully.",
      };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    case LOGIN: 
    return {
      ...state,
      isAuth: action.error? null : true,
      redirectTo: action.error ? null : '/',
      error: action.error? action.payload.errors : null,
      success: action.error? null: "login successfully.",
      token: action.error ? null : action.payload.user.token,
      currentUser: action.error ? null : action.payload.user
    };
    case REGISTER:
      return {
        ...state,
        isAuth: action.error? null : true,
        redirectTo: action.error ? null : '/Thankyou-Register',
        error: action.error? action.payload.errors : null,
        success: action.error? null: "You have registered successfully!",
      };
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    case ARTICLE_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
