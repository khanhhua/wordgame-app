import { fromJS } from "immutable";

export const initialState = fromJS({
  profile: {
    isLoggedIn: false,
  },
  gameSession: {
    gameType: 'gender',
    word: {
      text: 'Hund',
    }
  },
  collections: [],
  report: {},
});

export default (state, action) => {
  return state;
};
