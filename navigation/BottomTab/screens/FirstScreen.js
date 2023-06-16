import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../../../utils/WeatherCondtions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as Location from 'expo-location';

const FirstScreen = () => {
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherStyle, setWeatherStyle] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`;
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
        const { condition, temp_c } = result.current;
        console.log(result);
        setWeather(condition.text);
        setTemperature(temp_c);
        const weatherKey = condition.text.trim().replace(/\s/g, '');
        console.log(weatherKey)
        if (weatherKey in weatherConditions) {
          setWeatherStyle(weatherConditions[weatherKey]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();


    const getEventsData = async () => {
      try {
        const data = await AsyncStorage.getItem('eventsData');
        if (data !== null) {
          const parsedData = JSON.parse(data);
          const filteredData = parsedData.filter(event => {
            const eventDate = moment(event.date, 'YYYY-MM-DD');
            const currentDate = moment().startOf('day');
            const nextDate = moment().add(2, 'day').startOf('day');
            return eventDate.isSameOrAfter(currentDate) && eventDate.isBefore(nextDate);
            //return eventDate.isSameOrAfter(currentDate) && eventDate.isBefore(nextDate);
          });
          setEvents(filteredData);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Błąd podczas odczytywania danych z AsyncStorage:', error);
      }
    };

    getEventsData();

    // Wczytuj ponownie wydarzenia co pół minuty
    const interval = setInterval(() => {
      getEventsData();
      //fetchData();
    }, 1000);

    return () => {
      clearInterval(interval); // Zatrzymaj interwał po odmontowaniu komponentu
    };

  }, []);

  
  const formatEventDate = (eventDate) => {
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    
    if (eventDate.isSame(today, 'day')) {
      return 'Dzisiaj';
    } else if (eventDate.isSame(tomorrow, 'day')) {
      return 'Jutro';
    }
  };

  return (
    <View style={[styles.weatherContainer, { backgroundColor: weatherStyle.color }]}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name={weatherStyle.icon} color={'#fff'} />
        <Text style={styles.title}>{temperature}°C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherStyle.title}</Text>
        <Text style={styles.subtitle}>{weatherStyle.subtitle}</Text>
      </View>
      <View style={styles.eventsContainer}>
          {events.map((event, index) => (
            <View key={index}>
              <Text style={styles.title}>{formatEventDate(moment(event.date, 'YYYY-MM-DD'))}: </Text>
              <Text style={styles.eventTitle}>  {event.name}</Text>
              <Text style={styles.eventDesc}>    {event.description}</Text>
            </View>
          ))}

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    paddingLeft: 0,
    marginTop: 20,
    alignItems: 'center'
  },
  eventsContainer: {
    alignItems: 'flex-start',
    marginHorizontal: '10%',
    marginTop: '15%'
  },
  title: {
    fontSize: 44,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  eventTitle: {
    fontSize: 24,
    color: '#fff'
  },
  eventDesc: {
    fontSize: 16,
    color: '#fff'
  }
});

export default FirstScreen;

