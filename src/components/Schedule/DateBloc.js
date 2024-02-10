import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DateBloc = ({ title, date, onBackward, onForward }) => {
  const formattedDate = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity onPress={onBackward}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <TouchableOpacity onPress={onForward}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#201f25',
  },
  arrowText: {
    color: 'white',
    fontSize: 20,
    padding: 16,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DateBloc;
