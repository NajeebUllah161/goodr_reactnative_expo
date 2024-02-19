import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

// Stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginScreen from "./src/screens/LoginScreen";

// constants
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { COLORS_PRIMARY } from "./src/constants";
import { IS_IOS } from "./src/constants/theme";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ProductScreen from "./src/screens/ProductScreen";
import { consoleLog, deleteLocalStorage } from "./src/utils/Reusables";
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

export type RootStackParamList = {
  login: any;
  product: any;
  productDetail: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  const errorResponse = useSelector((state: any) => state.error?.errorResponse);
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation<any>();

  const hideAlert = () => {
    setShowAlert(false);
  };

  useUpdateEffect(() => {
    if (!errorResponse?.status) {
      setShowAlert(true);
      consoleLog("Error Response : ", errorResponse);
    }
  }, [errorResponse]);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        hidden={IS_IOS}
        barStyle={"light-content"}
      />
      <Stack.Navigator
        screenOptions={{ animation: "slide_from_left" }}
        initialRouteName={"login"}
      >
        <Stack.Screen
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          name={"login"}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          name={"product"}
          component={ProductScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          name={"productDetail"}
          component={ProductDetailScreen}
        />
      </Stack.Navigator>
      {showAlert && (
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={errorResponse?.title}
          message={
            errorResponse?.error ? errorResponse?.error : errorResponse?.message
          }
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="OK"
          cancelButtonColor={COLORS_PRIMARY.blue}
          onCancelPressed={async () => {
            hideAlert();
            if (errorResponse?.title === "Error") {
              await deleteLocalStorage("rememberUser");
              navigation.navigate("login");
            }
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}
        />
      )}
    </>
  );
};

export default Main;
