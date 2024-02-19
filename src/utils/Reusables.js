import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
// import {PERMISSIONS, check, request} from 'react-native-permissions';

export const isNotEmpty = (param) => {
  return param != null && param !== undefined && param !== "";
};

export const saveLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error saveLocalStorage : ", error);
  }
};

export const getLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (isNotEmpty(value)) {
      return value;
    }
  } catch (error) {
    console.log("Error getLocalStorage : ", error);
  }
};

export const deleteLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (isNotEmpty(value)) {
      return value;
    }
  } catch (error) {
    console.log("Error deleteLocalStorage : ", error);
  }
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function useDounce(effect, dependencies, delay) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export const ALLOW_LOADER = "on";
export const FREEZE_LOADER = "off";

export const consoleLog = (key, value) => {
  console.log(key, value);
};

export const download = (remoteUrl) => {
  Linking.canOpenURL(remoteUrl).then((supported) => {
    if (supported) {
      return Linking.openURL(remoteUrl);
    } else {
      return Linking.openURL(remoteUrl);
    }
  });
};

// export const requestNotificationPermission = async () => {
//   const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//   return result;
// };

// export const checkNotificationPermission = async () => {
//   const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//   return result;
// };

const alertPolyfill = (title, description, options, extra) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join("\n")
  );

  if (result) {
    const confirmOption = options.find(({ style }) => style !== "cancel");
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options.find(({ style }) => style === "cancel");
    cancelOption && cancelOption.onPress();
  }
};

export const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;
