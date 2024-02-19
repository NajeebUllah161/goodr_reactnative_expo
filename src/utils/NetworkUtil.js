import NetInfo from '@react-native-community/netinfo';

// Checks if connected to some internet provider/WiFi.
export default class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
  }
}
