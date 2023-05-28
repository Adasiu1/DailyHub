import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';

import FirstScreen from './navigation/BottomTab/screens/FirstScreen';
import MainContainer from './navigation/MainContainer';

export default class App extends React.Component {
  state = {
    isLoading: false,
    error: null
  };



  render() {
    const { isLoading, weatherCondition, temperature, error } = this.state;
    return (
      <View style={styles.container}>
        <MainContainer>
          {error ? (
            <Text>{error}</Text>
          ) : (
            <FirstScreen weather={weatherCondition} temperature={temperature} />
          )}
        </MainContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

