import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';


const Register = () => {
  return (
    <ScrollView contentContainerStyle={styles.main}>
      <Text style={styles.title}>Tela de Register</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'green',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});

export default Register;
