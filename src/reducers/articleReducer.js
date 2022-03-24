import {
  SET_LOADING_STATUS,
  GET_ARTICLE,
  DELETE_ARTICLE,
} from '../actions/actionType';

export const INITIAL_STATE = {
  articles: [],
  loading: false,
};

const articleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: [],
      };
    default:
      return state;
  }
};

export default articleReducer;
