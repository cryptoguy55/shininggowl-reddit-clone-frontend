import {
 COMMUNITY_SUBMITTED,
 GET_COMMUNITIES
} from '../constants/actionTypes';

export default (state = { communities: []}, action) => {
  switch (action.type) {
    case COMMUNITY_SUBMITTED:
      return {
        ...state,
        communities: action.error? state.communities : [...state.communities, action.payload.article],
      };
    case GET_COMMUNITIES:
      return {
        ...state,
        communities: action.error? [] : action.payload.communities 
      };
   
    default:
      return state;
  }
};
