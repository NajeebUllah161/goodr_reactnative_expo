import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize as fp} from 'react-native-responsive-dimensions';
import {APP_STRINGS, COLORS_PRIMARY, SIZES} from '../constants';
import {useSelector} from 'react-redux';

const EmptyListComponent = () => {
  const currentTheme = useSelector((state: any) => state.util?.currentTheme);
  return (
    <View style={styles(currentTheme).emptyListContainer}>
      <Text style={styles(currentTheme).emptyListStyle}>
        {APP_STRINGS.NO_RECORD_FOUND}
      </Text>
    </View>
  );
};

const styles = (currentTheme: any) =>
  StyleSheet.create({
    emptyListContainer: {
      flex: SIZES.flex1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyListStyle: {
      fontSize: fp(2.5),
      textAlign: 'center',
      color:
        currentTheme === 'dark'
          ? COLORS_PRIMARY.heading
          : COLORS_PRIMARY.heading,
    },
  });

export default EmptyListComponent;
