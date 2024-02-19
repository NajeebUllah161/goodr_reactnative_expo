import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  responsiveFontSize as fp,
  responsiveHeight as hp,
} from "react-native-responsive-dimensions";

// constants
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../Main";
import ToggleEye from "../assets/images/eye_toggle.svg";
import { LoginResponse } from "../classes/LoginResponse";
import Loader from "../components/Loader";
import { COLORS_PRIMARY, FONTS, SIZES } from "../constants";
import {
  APP_STRINGS,
  END_POINTS,
  IS_ANDROID,
  METHODS,
  height,
} from "../constants/theme";
import { LOGIN } from "../redux/Types";
import apiCall from "../redux/actions/apiCall";
import { consoleLog, isNotEmpty } from "../utils/Reusables";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { useFonts } from "expo-font";

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "login"
>;

const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const loading = useSelector((state: any) => state.loader?.loaderStatus);
  const loginResponse: LoginResponse = useSelector(
    (state: any) => state.auth?.loginResponse
  );
  const [secureEntry, setSecureEntry] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // 1) Login handler
  useUpdateEffect(() => {
    if (loginResponse?.data) {
      consoleLog("Success Login Response : ", loginResponse);
      navigateHandler("product");
    } else {
      consoleLog("Error Login Response : ", loginResponse.error);
    }
  }, [loginResponse]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        // Prevent default behavior of leaving the screen
        if (e?.data?.action.type === "GO_BACK") {
          e.preventDefault();
          BackHandler.exitApp();
        }
        consoleLog(
          "Before Remove LoginScreen and Action Type",
          e.data.action.type
        );
      }),
    [navigation]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setUsername("");
      setPassword("");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleHandler = () => {
    setSecureEntry(!secureEntry);
  };

  const loginHandler = () => {
    if (!isNotEmpty(username)) {
      dispatch({
        type: APP_STRINGS.TYPE_ERROR,
        payload: {
          title: APP_STRINGS.TITLE_VALIDATION_ERROR,
          error: "Email required",
          status: false,
        },
      });
      return;
    }

    if (!isNotEmpty(password)) {
      dispatch({
        type: APP_STRINGS.TYPE_ERROR,
        payload: {
          title: APP_STRINGS.TITLE_VALIDATION_ERROR,
          error: "Password required",
          status: false,
        },
      });
      return;
    }

    const body = {
      username: username,
      password,
    };

    const config = {
      method: METHODS.POST,
      url: END_POINTS.LOGIN,
      data: body,
    };

    dispatch<any>(apiCall(config, LOGIN));
  };

  const navigateHandler = (screenName: keyof RootStackParamList) => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: screenName}],
    // });

    navigation.navigate("product");
  };

  let [fontsLoaded, error] = useFonts({
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
        color={COLORS_PRIMARY.placeholder}
      />
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.root}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.secondRoot}>
        <Text children={APP_STRINGS.LOGIN} style={styles.login} />
        <View style={styles.rowContainer}>
          <Text children={APP_STRINGS.USERNAME} style={styles.textUsername} />
          <TextInput
            autoCapitalize="none"
            selectionColor={
              IS_ANDROID ? COLORS_PRIMARY.selectionColor : COLORS_PRIMARY.white
            }
            textContentType="givenName"
            value={username}
            autoCorrect={false}
            onChangeText={setUsername}
            style={styles.inputUsername}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text children={APP_STRINGS.PASSWORD} style={styles.textPassword} />
          <View style={styles.containerPassword}>
            <TextInput
              autoCapitalize="none"
              selectionColor={
                IS_ANDROID
                  ? COLORS_PRIMARY.selectionColor
                  : COLORS_PRIMARY.white
              }
              secureTextEntry={secureEntry}
              textContentType="password"
              value={password}
              onChangeText={setPassword}
              style={styles.inputPassword}
            />
            <TouchableOpacity
              onPress={toggleHandler}
              activeOpacity={0.7}
              style={styles.toggle}
            >
              <ToggleEye height={hp(3.3)} width={hp(3.3)} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerLastRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableLogin}
            onPress={loginHandler}
          >
            <Text children={APP_STRINGS.LOGIN} style={styles.txtLogin} />
          </TouchableOpacity>
        </View>
      </View>
      {loading && <Loader />}
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: { backgroundColor: COLORS_PRIMARY.certifiedProfile },
  secondRoot: {
    height: height,
    paddingTop: hp(25),
    paddingHorizontal: SIZES.p22,
  },
  login: {
    color: COLORS_PRIMARY.white,
    fontSize: fp(2.8),
    fontFamily: "InterRegular",
  },
  containerLastRow: { marginTop: SIZES.m36 },
  touchableLogin: {
    backgroundColor: COLORS_PRIMARY.white,
    padding: SIZES.p10,
    alignItems: "center",
    borderRadius: SIZES.r60,
  },
  txtLogin: {
    color: COLORS_PRIMARY.certified,
    fontFamily: "InterMedium",
    fontSize: fp(2),
  },
  rowContainer: { marginTop: SIZES.m36 },
  inputUsername: {
    borderWidth: SIZES.bw1,
    borderColor: COLORS_PRIMARY.white,
    marginTop: SIZES.m10,
    padding: SIZES.p11,
    borderRadius: SIZES.r5,
    color: COLORS_PRIMARY.white,
    fontFamily: "InterRegular",
    fontSize: fp(1.8),
  },
  textUsername: {
    color: COLORS_PRIMARY.white,
    fontFamily: "InterRegular",
    fontSize: fp(2),
  },
  inputPassword: {
    flex: SIZES.flex1,
    borderWidth: SIZES.bw1,
    borderColor: COLORS_PRIMARY.white,
    padding: SIZES.p11,
    borderRadius: SIZES.r5,
    color: COLORS_PRIMARY.white,
    fontFamily: "InterRegular",
    fontSize: fp(1.8),
  },
  textPassword: {
    color: COLORS_PRIMARY.white,
    fontFamily: "InterRegular",
    fontSize: fp(2),
  },
  containerPassword: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.m10,
  },
  toggle: { position: "absolute", end: 4 },
});
