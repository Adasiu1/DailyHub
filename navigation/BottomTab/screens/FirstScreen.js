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

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { weatherConditions } from '../../../utils/WeatherCondtions';

// const FirstScreen = ({ weather, temperature }) => {
//   return (
//     <View style={styles.weatherContainer}>
//       <View style={styles.headerContainer}>
//         <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
//         <Text style={styles.tempText}>{temperature}°C</Text> {/* Dodano styl dla temperatury */}
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

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const FirstScreen = ({ weather, temperature }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Weather: {weather}</Text>
//       <Text style={styles.text}>Temperature: {temperature}°C</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default FirstScreen;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FirstScreen = ({ weather, temperature }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.weatherText}>Warunki: {weather}</Text>
      <Text style={styles.temperatureText}>Temperatura: {temperature}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 18,
  },
});

export default FirstScreen;
