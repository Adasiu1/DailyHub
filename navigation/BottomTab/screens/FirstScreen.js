// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const FirstScreen = () => {
//   const [weather, setWeather] = useState('');
//   const [temperature, setTemperature] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=Wroclaw%20PL';
//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key': 'fb19fa5406mshd72fa9bff19f124p1daef0jsn0655c92db202',
//           'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//         }
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         const { condition, temp_c } = result.current;
//         setWeather(condition.text);
//         setTemperature(temp_c);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View style={styles.weatherContainer}>
//       <View style={styles.headerContainer}>
//         <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
//         <Text>{temperature}</Text>
//       </View>
//       <View style={styles.bodyContainer}>
//         <Text style={styles.title}>{weather}</Text>
//         <Text style={styles.subtitle}>Idziemy na Wyspę!</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   weatherContainer: {
//     flex: 1,
//     backgroundColor: '#AED6F1'
//   },
//   headerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bodyContainer: {
//     flex: 2,
//     alignItems: 'flex-start',
//     justifyContent: 'flex-end',
//     paddingLeft: 25,
//     marginBottom: 40
//   },
//   title: {
//     fontSize: 48,
//     color: '#fff'
//   },
//   subtitle: {
//     fontSize: 24,
//     color: '#fff'
//   }
// });

// export default FirstScreen;


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
