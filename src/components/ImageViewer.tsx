import { View, Text } from "react-native";
import React from "react";
import ImageView from "react-native-image-viewing";

const ImageViewer = ({ images, visible, setIsVisible }) => {
  return (
    <View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default ImageViewer;
