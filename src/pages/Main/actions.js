import { colors } from '../../utils/fetch';
import { DATA_FETCHED, LOADING } from './constants';

export function fetchColor() {
  return async dispatch => {
    dispatch(loadingAction(true));

    try {
      const data = await colors();
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false));
    }
  };
}

function fetchedAction(data) {
  return { type: DATA_FETCHED, data };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
