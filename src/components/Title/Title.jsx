import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';

export default function Title() {
  return (
    <View>
      <Text>Головна сторінка</Text>
      <StatusBar style='auto' />
    </View>
  );
}