// import 'react-native-gesture-handler';
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import Main from "./Main";
import store from "./src/redux/store";

// React navigation
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ToastProvider>
          <Main />
        </ToastProvider>
      </NavigationContainer>
    </Provider>
  );
}
