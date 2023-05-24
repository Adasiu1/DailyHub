// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { weatherConditions } from '../../../utils/WeatherCondtions';
// //import { withInternalTheme } from 'react-native-paper/lib/typescript/src/core/theming';


// const FirstScreen = ({ weather , temperature }) => {
//   console.log(temperature);
//   console.log('dupa');
//   console.log(temperature);
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
//   tempText: {
//     fontSize: 48,
//     color: '#fff'
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../../../utils/WeatherCondtions';

const FirstScreen = ({ weather, temperature }) => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
        <Text style={styles.tempText}>{temperature}°C</Text> {/* Dodano styl dla temperatury */}
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weather}</Text>
        <Text style={styles.subtitle}>Idziemy na Wyspę!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#AED6F1'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
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
