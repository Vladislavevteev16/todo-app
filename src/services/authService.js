import { requestAuth } from "../api/auth/requestAuth";

import { ACTION_TYPES } from "../constants";

const ERROR_CLEARING_TIME = 2000;

export const authService = {
  async register(dispatch, userData) {
    try {
      dispatch({ type: ACTION_TYPES.AUTH_START });
      const response = await requestAuth.register(userData);

      dispatch({ type: ACTION_TYPES.AUTH_SUCCESS });

      return response;
    } catch (e) {
      console.error(e.response?.data?.message);
      dispatch({
        type: ACTION_TYPES.AUTH_ERROR,
        payload: e.response?.data?.message,
      });
      throw e;
    } finally {
      setTimeout(
        () => dispatch({ type: ACTION_TYPES.AUTH_CLEAR_ERROR }),
        ERROR_CLEARING_TIME,
      );
    }
  },
  async login(dispatch, credentials) {
    try {
      dispatch({ type: ACTION_TYPES.AUTH_START });
      const response = await requestAuth.login(credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch({ type: ACTION_TYPES.AUTH_SUCCESS, payload: token });
    } catch (e) {
      console.error(e.response?.data?.message);
      dispatch({
        type: ACTION_TYPES.AUTH_ERROR,
        payload: e.response?.data?.message,
      });
      throw e;
    } finally {
      setTimeout(
        () => dispatch({ type: ACTION_TYPES.AUTH_CLEAR_ERROR }),
        ERROR_CLEARING_TIME,
      );
    }
  },
  logout(dispatch) {
    try {
      localStorage.removeItem("token");
      dispatch({ type: ACTION_TYPES.AUTH_LOGOUT });
    } catch (e) {
      console.error(e);
    }
  },
};
