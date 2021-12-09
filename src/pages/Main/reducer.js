import { DATA_FETCHED, LOADING } from './constants';

const initialState = {
  data: [],
  isLoading: true,
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, data } = action;

  switch (type) {
    case DATA_FETCHED:
      return {
        ...state,
        data,
        isLoading: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
}
