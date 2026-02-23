import { ACTION_TYPES } from "../constants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_START: {
      return { ...state, loading: true, error: null };
    }
    case ACTION_TYPES.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload || null,
        error: null,
      };
    }
    case ACTION_TYPES.AUTH_ERROR: {
      return { ...state, loading: false, error: true, message: action.payload };
    }
    case ACTION_TYPES.AUTH_CLEAR_ERROR: {
      return { ...state, error: null, message: "" };
    }
    case ACTION_TYPES.AUTH_LOGOUT: {
      return { ...state, token: null };
    }
  }
};
