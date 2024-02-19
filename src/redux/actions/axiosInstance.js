import axios from 'axios';
import {APP_STRINGS, IS_ANDROID, URLS} from '../../constants/theme';

export const apiClient = axios.create({
  baseURL: IS_ANDROID ? URLS?.BASE_URL_DEV_ANDROID : URLS.BASE_URL,
  timeout: APP_STRINGS.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
