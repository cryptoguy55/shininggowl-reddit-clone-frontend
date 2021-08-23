import {
 COMMUNITY_SUBMITTED,
 GET_COMMUNITIES,
 ADD_COMMUNITY,
 DELETE_COMMUNITY
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
    case DELETE_COMMUNITY:
      return {
        ...state,
        communities: state.communities.map(item => {
          if (item.ID == action.payload) {
            return {
              ...item,
              active: !item.active
            };
          }
          return item;
        })
      }
   
    default:
      return state;
  }
};
