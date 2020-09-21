import { fromJS } from "immutable";
import {
  ACTION_CREATE_COLLECTION,
  ACTION_LIST_COLLECTIONS,
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_NEXT_WORD,
  ACTION_SHOW_REPORT,
  ACTION_START_SESSION,
  SESSION_STATUS_DONE,
  SESSION_STATUS_PENDING,
  SESSION_STATUS_PLAYING,
  STATUS_ERROR,
  STATUS_PENDING,
} from "./constants";

export const initialState = fromJS({
  profile: {
    isLoggedIn: false,
  },
  gameSession: {
    id: null,
    status: SESSION_STATUS_PENDING,
  },
  collections: [],
  report: {},
});

export default (state, { type, status, ...action }) => {
  if (status === STATUS_ERROR) {
    if (action.error && action.error === "Invalid token") {
      return state.set(
        "profile",
        fromJS({
          isLoggedIn: false,
        })
      );
    }
    return state;
  }
  if (status === STATUS_PENDING) {
    return state;
  }

  console.log({ type, action, state: state.toJS() });
  switch (type) {
    case ACTION_LOGIN: {
      return state.set(
        "profile",
        fromJS({
          isLoggedIn: true,
          defaultCollection: action.defaultCollection,
          ...action.profile,
        })
      );
    }
    case ACTION_LOGOUT: {
      return state.set(
        "profile",
        fromJS({
          isLoggedIn: false,
        })
      );
    }
    case ACTION_LIST_COLLECTIONS: {
      return state
        .set("collections", fromJS(action.collections))
        .set("myCollections", fromJS(action.myCollections));
    }
    case ACTION_CREATE_COLLECTION: {
      return state.updateIn(["myCollections"], (collections) =>
        collections.unshift(fromJS(action.collection))
      );
    }
    case ACTION_START_SESSION: {
      return state.setIn(
        ["gameSession"],
        fromJS({
          ...action.session,
          hasNext: true,
          status: SESSION_STATUS_PLAYING,
        })
      );
    }
    case ACTION_NEXT_WORD: {
      return state
        .setIn(["gameSession", "term"], fromJS(action.term))
        .setIn(["gameSession", "cursor"], action.cursor)
        .setIn(["gameSession", "hasNext"], action.hasNext);
    }
    case ACTION_SHOW_REPORT: {
      return state
        .setIn(["gameSession", "status"], SESSION_STATUS_DONE)
        .set("report", fromJS(action.report));
    }
    default:
      return state;
  }
};
