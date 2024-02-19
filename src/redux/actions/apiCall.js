import axios from 'axios';
import {LOADER_OFF, LOADER_ON} from '../Types';
import {apiClient} from './axiosInstance';
import {APP_STRINGS, STATUS_CODE} from '../../constants/theme';
import {consoleLog} from '../../utils/Reusables';

const apiCall =
  (config, successType, loaderStatus = 'on', loaderStatusClose = 'on') =>
  async dispatch => {
    if (loaderStatus === 'on') {
      dispatch({type: LOADER_ON});
    }

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    consoleLog(APP_STRINGS.REQ_PARAMS, config);

    const {data} = await apiClient({
      ...config,
      cancelToken: source.token,
    }).catch(function (error) {
      if (
        error?.code === APP_STRINGS.ERR_NETWORK ||
        error?.message === APP_STRINGS.NETWORK_ERROR
      ) {
        consoleLog(APP_STRINGS.ERR_CODE, error.code);
        consoleLog(APP_STRINGS.ERR_MESSAGE, error.message);
        dispatch({
          type: APP_STRINGS.TYPE_ERROR,
          payload: {
            title: APP_STRINGS.NETWORK_ERROR_TITLE,
            error: APP_STRINGS.NETWORK_ERROR_MSG,
          },
        });
      }
      if (error.response) {
        if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
          dispatch({type: successType, payload: error.response.data});
          dispatch({
            type: APP_STRINGS.TYPE_ERROR,
            payload: {title: 'Error', ...error.response.data},
          });
          if (loaderStatusClose === 'on') {
            dispatch({type: LOADER_OFF});
          }
          return;
        }
        if (error.response.status === STATUS_CODE.NOT_ALLOWED) {
          dispatch({
            type: APP_STRINGS.TYPE_ERROR,
            payload: {
              title: APP_STRINGS.TITLE_NOT_ALLOWED,
              error: APP_STRINGS.MSG_NOT_ALLOWED,
            },
          });
        }

        if (error.response.status === STATUS_CODE.SERVER_ERROR) {
          dispatch({
            type: APP_STRINGS.TYPE_ERROR,
            payload: {
              title: APP_STRINGS.TITLE_ERR_500,
              error: APP_STRINGS.SERVER_ERROR_MSG,
            },
          });
        }

        if (error.response.status === STATUS_CODE.NOT_FOUND) {
          dispatch({
            type: APP_STRINGS.TYPE_ERROR,
            payload: {
              title: APP_STRINGS.TITLE_NOT_FOUND,
              error: error?.response?.data?.message,
            },
          });
        }

        consoleLog(APP_STRINGS.DATA_ERROR, error.response.data);
        consoleLog(APP_STRINGS.STATUS_ERROR, error.response.status);
        consoleLog(APP_STRINGS.HEADER_ERROR, error.response.headers);
      } else if (error.request) {
        consoleLog(APP_STRINGS.REQ_ERROR, error.request);
      } else {
        consoleLog(APP_STRINGS.MSG_ERROR, error.message);
      }
      if (loaderStatusClose === 'on') {
        dispatch({type: LOADER_OFF});
      }
      consoleLog(APP_STRINGS.CONFIG_ERROR, error.config);
    });
    dispatch({type: successType, payload: data});
    if (loaderStatusClose === 'on') {
      dispatch({type: LOADER_OFF});
    }
  };

export default apiCall;
