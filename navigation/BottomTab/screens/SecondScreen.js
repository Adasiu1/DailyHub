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
  const [newsData, setNewsData] = useState([]); // State variable to store news data
  const [expandedArticles, setExpandedArticles] = useState([]); // State variable to track expanded articles

  useEffect(() => {
    fetchNewsData(); // Fetch news data when the component mounts
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=68154425776d46c591e138c7297da56c'
      );
      const data = await response.json();
      setNewsData(data.articles); // Update news data state with fetched data
      setExpandedArticles(new Array(data.articles.length).fill(false)); // Initialize expanded articles state with false values
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsItemPress = (articleUrl) => {
    navigation.navigate('ArticleScreen', { url: articleUrl }); // Navigate to the ArticleScreen with the selected article URL
  };

  const toggleExpanded = (articleIndex) => {
    setExpandedArticles((prevExpandedArticles) => {
      const updatedExpandedArticles = [...prevExpandedArticles];
      updatedExpandedArticles[articleIndex] = !updatedExpandedArticles[articleIndex]; // Toggle the expanded state of the selected article
      return updatedExpandedArticles;
    });
  };

  const renderNewsItem = ({ item, index }) => {
    const isExpanded = expandedArticles[index] || false; // Check if the article at the given index is expanded

    return (
      <TouchableOpacity
        style={styles.newsItemContainer}
        onPress={() => handleNewsItemPress(item.url)}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
        <Text style={styles.newsTitle}>{item.title}</Text>
        {isExpanded && <Text style={styles.newsDescription}>{item.description}</Text>}
        {isExpanded ? (
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => toggleExpanded(index)}
          >
            <Text style={styles.readMoreButtonText}>Czytaj mniej</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => toggleExpanded(index)}
          >
            <Text style={styles.readMoreButtonText}>Czytaj więcej</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wiadomości</Text>
      <FlatList
        data={newsData} // Set the news data as the data source for the FlatList
        renderItem={renderNewsItem} // Render each news item using the renderNewsItem function
        keyExtractor={(item) => item.url} // Use the article URL as the key for each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: '5%',
  },
  newsItemContainer: {
    marginBottom: 20,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  newsDescription: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  readMoreButton: {
    alignSelf: 'center',
    backgroundColor: '#9370DB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  readMoreButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SecondScreen;

