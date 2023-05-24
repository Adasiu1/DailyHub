// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'

// const SecondScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>SecondScreen</Text>
//     </View>
//   )
// }

// export default SecondScreen

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });
  
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// const SecondScreen = () => {
//   const [newsData, setNewsData] = useState([]);

//   useEffect(() => {
//     fetchNewsData();
//   }, []);

//   const fetchNewsData = async () => {
//     try {
//       const response = await fetch(
//         'https://newsapi.org/v2/top-headlines?country=pl&apiKey=68154425776d46c591e138c7297da56c'
//       );
//       const data = await response.json();
//       setNewsData(data.articles);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const renderNewsItem = ({ item }) => {
//     return (
//       <View style={styles.newsItemContainer}>
//         <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
//         <Text style={styles.newsTitle}>{item.title}</Text>
//         <Text style={styles.newsDescription}>{item.description}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>News</Text>
//       <FlatList
//         data={newsData}
//         renderItem={renderNewsItem}
//         keyExtractor={(item) => item.url}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   newsItemContainer: {
//     marginBottom: 20,
//   },
//   newsImage: {
//     width: 200,
//     height: 120,
//     marginBottom: 10,
//   },
//   newsTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   newsDescription: {
//     fontSize: 14,
//   },
// });

// export default SecondScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SecondScreen = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=68154425776d46c591e138c7297da56c'
      );
      const data = await response.json();
      setNewsData(data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsItemPress = (articleUrl) => {
    // Przenieś na stronę artykułu
    navigation.navigate('ArticleScreen', { url: articleUrl });
  };

  const renderNewsItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.newsItemContainer}
        onPress={() => handleNewsItemPress(item.url)}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wiadomości</Text>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: '10%',
    backgroundColor: '#AED6F1',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop:'5%'
  },
  newsItemContainer: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transparent: "100%",
    
  },
  newsImage: {
    width: 200,
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    //wysrodkowanie tekstu
    textAlign: 'center',
    alignSelf: 'center',
  },
  newsDescription: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default SecondScreen;
