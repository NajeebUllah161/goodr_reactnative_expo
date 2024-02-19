import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS_PRIMARY} from '../constants';
import {IS_ANDROID, height} from '../constants/theme';

const Loader = () => {
  return (
    <ActivityIndicator
      color={COLORS_PRIMARY.blue}
      size={'large'}
      style={styles.loader}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    height: IS_ANDROID ? '100%' : height,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
