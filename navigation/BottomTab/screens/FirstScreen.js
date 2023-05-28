import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../../../utils/WeatherCondtions';

const FirstScreen = () => {
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherStyle, setWeatherStyle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=Wroclaw%20PL';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'fb19fa5406mshd72fa9bff19f124p1daef0jsn0655c92db202',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        const { condition, temp_c } = result.current;
        setWeather(condition.text);
        setTemperature(temp_c);

        const weatherKey = condition.text.trim();
        if (weatherKey in weatherConditions) {
          setWeatherStyle(weatherConditions[weatherKey]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={[styles.weatherContainer, { backgroundColor: weatherStyle.color }]}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name={weatherStyle.icon} color={'#fff'} />
        <Text style = {styles.title}>{temperature}°C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherStyle.title}</Text>
        <Text style={styles.subtitle}>{weatherStyle.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    paddingLeft:0,
    //alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default FirstScreen;
