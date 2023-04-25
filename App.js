import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';


import FirstScreen from './navigation/BottomTab/screens/FirstScreen';
import MainContainer from './navigation/MainContainer';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        error => {
          this.setState({
            error: 'Error Getting Weather Conditions',
            isLoading: false
          });
        }
      );
    } else {
      this.setState({
        error: 'Geolocation is not supported on this platform',
        isLoading: false
      });
    }
  }

  fetchWeather(lat = 25, lon = 25) {
    this.setState({ isLoading: true });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${part}&appid=${bd770dc13eb778858626c0754394b8c1}&units=metric`
      //https://api.openweathermap.org/data/3.0/weather?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}&units=metric
    )
    
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: true
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        <MainContainer>
          {isLoading ? (
            <Text>Fetching The Weather</Text>
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
