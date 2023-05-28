// import React from 'react';
// import { StyleSheet, Text, View, Animated } from 'react-native';


// import FirstScreen from './navigation/BottomTab/screens/FirstScreen';
// import MainContainer from './navigation/MainContainer';
// import SecondScreen from './navigation/BottomTab/screens/SecondScreen';

// export default class App extends React.Component {
//   state = {
//     isLoading: false,
//     temperature: 0,
//     weatherCondition: null,
//     error: null
//   };



//   componentDidMount() {

//         this.fetchWeather();
//     }


//   fetchWeather(){
//     this.setState({ isLoading: true });
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=Wroclaw&appid=d3ae3662e845fd57258468bc19e8316f&units=metric`
//       //https://api.openweathermap.org/data/3.0/weather?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}&units=metric
//     )

//       .then(res => res.json())
//       .then(json => {
//         console.log(json);
//         this.setState({
//           temperature: json.main.temp,
//           weatherCondition: json.weather[0].main,
//           isLoading: false
//         });
//       });
//   }


//   render() {
//     const { isLoading, weatherCondition, temperature } = this.state;
//     return (
//       <View style={styles.container}>
//         <MainContainer>
//             <FirstScreen  weather={weatherCondition} temperature={temperature} />

//         </MainContainer>
//       </View>
//     );
//   }
// }  


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   }
// });

// import React from 'react';
// import { StyleSheet, Text, View, Animated } from 'react-native';

// import FirstScreen from './navigation/BottomTab/screens/FirstScreen';
// import MainContainer from './navigation/MainContainer';
// import SecondScreen from './navigation/BottomTab/screens/SecondScreen';

// export default class App extends React.Component {
//   state = {
//     isLoading: false,
//     temperature: 0,
//     weatherCondition: null,
//     error: null
//   };

//   componentDidMount() {
//     this.fetchWeather();
//   }

//   fetchWeather() {
//     this.setState({ isLoading: true });
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=Wroclaw&appid=a7c0b63f4841cbc238df580642069706&units=metric`
//     )
//       .then(res => res.json())
//       .then(json => {
//         console.log(json);
//         this.setState({
//           temperature: json.main.temp,
//           weatherCondition: json.weather[0].main,
//           isLoading: false
//         });
//       })
//       .catch(error => {
//         console.error(error);
//         this.setState({ error: error.message, isLoading: false });
//       });
//   }

//   render() {
//     const { isLoading, weatherCondition, temperature, error } = this.state;
//     return (
//       <View style={styles.container}>
//         <MainContainer>
//           <FirstScreen
//             weather={weatherCondition}
//             temperature={temperature}
//             error={error}
//           />
//         </MainContainer>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   }
// });

//import React from 'react';
// import { StyleSheet, Text, View, Animated } from 'react-native';

// import FirstScreen from './navigation/BottomTab/screens/FirstScreen';
// import MainContainer from './navigation/MainContainer';
// import SecondScreen from './navigation/BottomTab/screens/SecondScreen';

// export default class App extends React.Component {
//   state = {
//     isLoading: false,
//     temperature: 0,
//     weatherCondition: null,
//     error: null
//   };

//   componentDidMount() {
//     this.fetchWeather();
//   }

//   fetchWeather() {
//     this.setState({ isLoading: true });
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=Wroclaw&appid=d3ae3662e845fd57258468bc19e8316f&units=metric`
//     )
//       .then(res => res.json())
//       .then(json => {
//         console.log(json);
//         this.setState({
//           temperature: json.main.temp,
//           weatherCondition: json.weather[0].main,
//           isLoading: false
//         });
//       })
//       .catch(error => {
//         console.error(error);
//         this.setState({ error: 'Failed to fetch weather' });
//       });
//   }

//   render() {
//     const { isLoading, weatherCondition, temperature } = this.state;
//     return (
//       <View style={styles.container}>
//         <MainContainer>
//           <FirstScreen weatherCondition={weatherCondition} temperature={temperature} />
//         </MainContainer>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   }
// });


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';


import FirstScreen from './navigation/BottomTab/screens/FirstScreen';
import MainContainer from './navigation/MainContainer';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: null,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
    this.setState({ isLoading: true });
    fetch(
      'https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/current.json?key=dd60681d58474f4688c113344232605&q=Wroclaw&aqi=no'
    )
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        console.log(json.current.temp_c)
        this.setState({
          temperature: json.current.temp_c,
          weatherCondition: json.current.condition.text,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: 'Error fetching weather' });
      });
  }

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
  }
});
