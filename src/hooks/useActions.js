import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// 這裡引用所有的action creator
import * as Actions from '../actions';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
