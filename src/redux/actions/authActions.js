import { ACTION_TYPES } from "../../constants";

export const authStart = () => ({ type: ACTION_TYPES.AUTH_START });

export const authSuccess = (token) => ({
  type: ACTION_TYPES.AUTH_SUCCESS,
  payload: token,
});

export const authError = (errorMessage) => ({
  type: ACTION_TYPES.AUTH_ERROR,
  paylaod: errorMessage,
});

export const authClearError = () => ({ type: ACTION_TYPES.AUTH_CLEAR_ERROR });

export const authLogout = () => ({ type: ACTION_TYPES.AUTH_LOGOUT });
