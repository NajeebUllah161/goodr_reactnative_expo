/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// SVG imports
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  responsiveFontSize as fp,
  responsiveHeight as hp,
} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { RootStackParamList } from "../../Main";
import BackArrow from "../assets/images/back_arrow.svg";
import { ProductDetailsResponse } from "../classes/ProductDetailsResponse";
import Loader from "../components/Loader";
import { COLORS_PRIMARY, FONTS, SIZES } from "../constants";
import { APP_STRINGS, END_POINTS, IS_WEB } from "../constants/theme";
import { SINGLE_PRODUCT } from "../redux/Types";
import apiCall from "../redux/actions/apiCall";
import { consoleLog } from "../utils/Reusables";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import MapView from "../components/mymap";

/* Uncomment this for imageviewer - 1 */
// import ImageViewer from "../components/ImageViewer";

export type ProductDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "productDetail"
>;

const ProductDetailScreen = ({
  navigation,
  route,
}: {
  navigation: ProductDetailScreenNavigationProp;
  route: any;
}) => {
  const productDetailsResponse: ProductDetailsResponse = useSelector(
    (state: any) => state.product?.productDetailsResponse
  );
  const loading = useSelector((state: any) => state.loader?.loaderStatus);
  const dispatch = useDispatch();

  const [title, setTitle] = useState<any>("");
  const [image, setImage] = useState<any>(
    "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4"
  );
  const [description, setDescription] = useState<any>("");
  const [visible, setIsVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 39.650093641728404,
    latitudeDelta: 0.027150486059191792,
    longitude: 73.03348168730736,
    longitudeDelta: 0.01544952392579546,
  });

  /* Uncomment this for imageviewer - 2 */
  // const images = [
  //     {
  //       uri: image,
  //     },
  //   ];

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    currentLocationHandler();
  }, []);

  // 2) Products Response
  useUpdateEffect(() => {
    if (productDetailsResponse.data) {
      consoleLog("Success Product Details Response : ", productDetailsResponse);
      setTitle(productDetailsResponse?.data?.name);
      setImage(productDetailsResponse?.data?.url);
      setDescription(productDetailsResponse?.data?.description);
    } else {
      consoleLog("Error Product Details : ", productDetailsResponse.error);
    }
  }, [productDetailsResponse]);

  const fetchProductDetails = () => {
    const config = {
      url: END_POINTS.SINGLE_PRODUCT + `/${route?.params?.id}`,
    };

    dispatch<any>(apiCall(config, SINGLE_PRODUCT));
  };

  const onDragHandler = async (coords: { latitude: any; longitude: any }) => {
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.28,
    });
  };

  const currentLocationHandler = async () => {
    const returnedValue = await Location.getCurrentPositionAsync();
    const { coords } = returnedValue;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.28,
    });
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
    <View style={styles.root}>
      <SafeAreaView>
        <View style={styles.subContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={styles.backArrow}
          >
            <BackArrow height={hp(2.1)} width={hp(2.1)} />
          </TouchableOpacity>
          <Text
            style={styles.productDetails}
            children={APP_STRINGS.PRODUCT_DETAILS}
          />
        </View>
      </SafeAreaView>
      <ScrollView
        bouncesZoom={true}
        automaticallyAdjustContentInsets={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <Pressable onPress={() => setIsVisible(!visible)}>
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMethod="resize"
          />
        </Pressable>
        <View style={styles.widthLine} />
        <View style={styles.containerLast}>
          <Text style={styles.title} children={title} />
          <Text style={styles.description} children={description} />
        </View>
        {IS_WEB ? (
          <MapView.MapView
            provider="google"
            // I did not have Google Maps API, Please add here to see the result on web browser..
            // googleMapsApiKey="AIzaSyBM4hy8c2lBHTA2frqg7-VDRey2q4Uj9oM"
            loadingFallback={
              <View>
                <Text>Loading...</Text>
              </View>
            }
          />
        ) : (
          <MapView.MapView
            minZoomLevel={15}
            showsBuildings={true}
            mapType="satellite"
            provider={MapView.PROVIDER_GOOGLE}
            style={{ width: styles.map.width, height: styles.map.height / 1.5 }}
            followsUserLocation={true}
            showsMyLocationButton={false}
            showsUserLocation={true}
            region={region}
            rotateEnabled={true}
            zoomEnabled={true}
            toolbarEnabled={true}
          >
            <MapView.Marker
              draggable={true}
              onDragEnd={(e) => onDragHandler(e.nativeEvent.coordinate)}
              tracksViewChanges={true}
              coordinate={region}
            />
          </MapView.MapView>
        )}
      </ScrollView>
      {/* This specific code allows to click and open image as a separate view, zoom in, zoom-out etc, but this library has no condiguration for web (Won't work in web). */}
      {/* Please UN-comment this code below to see this feature */}
      {/* {!IS_WEB && <ImageViewer images={images} visible={visible} setIsVisible={setIsVisible} />} */}
      {loading && <Loader />}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: SIZES.flex1,
    backgroundColor: COLORS_PRIMARY.white,
    zIndex: -1,
  },
  description: {
    fontFamily: "InterRegular",
    color: COLORS_PRIMARY.subHeading,
    fontSize: fp(1.8),
    lineHeight: SIZES.screenHeight > 926 ? 0 : 24,
    marginTop: hp(2.8),
  },
  title: {
    fontFamily: "InterMedium",
    color: COLORS_PRIMARY.heading,
    fontSize: fp(2),
    width: "80%",
  },
  containerLast: {
    backgroundColor: COLORS_PRIMARY.white,
    marginHorizontal: SIZES.p22,
    padding: SIZES.p8,
  },
  widthLine: {
    width: "100%",
    marginVertical: hp(2.5),
    height: StyleSheet.hairlineWidth * 4,
    backgroundColor: COLORS_PRIMARY.placeholder,
  },
  productImage: {
    height: hp(23),
    width: "100%",
    marginTop: hp(2),
    resizeMode: "contain",
  },
  productDetails: {
    fontSize: fp(2.2),
    color: COLORS_PRIMARY.heading,
    fontFamily: "InterMedium",
  },
  backArrow: {
    shadowColor: COLORS_PRIMARY.shadowColor,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    padding: SIZES.p8,
    borderRadius: SIZES.r60,
    marginRight: SIZES.m10,
    marginLeft: SIZES.m4,
    backgroundColor: COLORS_PRIMARY.white,
  },
  subContainer: {
    flexDirection: "row",
    backgroundColor: COLORS_PRIMARY.white,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: SIZES.p8,
    shadowColor: COLORS_PRIMARY.shadowColor,
    marginTop: StatusBar.currentHeight,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  root: { flex: SIZES.flex1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
