import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SecondScreen = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]); // dane wiadomosci
  const [expandedArticles, setExpandedArticles] = useState([]); //ktore artykuly sa rozwinięte

  useEffect(() => {
    fetchNewsData(); // pobieranie newsow
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=68154425776d46c591e138c7297da56c'
      );
      const data = await response.json();
      setNewsData(data.articles); // Zaktualizuj stan danych 
      setExpandedArticles(new Array(data.articles.length).fill(false)); //rozwiniecie artykulow na false
    } catch (error) {
      console.error(error);
    }
  };

  // const handleNewsItemPress = (articleUrl) => {
  //   navigation.navigate('ArticleScreen', { url: articleUrl }); //nie dziala poki co
  // };

  const toggleExpanded = (articleIndex) => {
    setExpandedArticles((prevExpandedArticles) => {
      const updatedExpandedArticles = [...prevExpandedArticles];
      updatedExpandedArticles[articleIndex] = !updatedExpandedArticles[articleIndex]; // Przełącz stan rozwinięcia dla wybranego artykułu
      return updatedExpandedArticles;
    });
  };

  const renderNewsItem = ({ item, index }) => {
    const isExpanded = expandedArticles[index] || false; // Sprawdź, czy artykuł o danym indeksie jest rozwinięty
  
    return (
      <TouchableOpacity
        style={styles.newsItemContainer}
        onPress={() => handleNewsItemPress(item.url)}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
        <Text style={styles.newsTitle}>{item.title}</Text>
        {isExpanded && <Text style={styles.newsDescription}>{item.description}</Text>}
        {isExpanded ? ( // Jeśli artykuł jest rozwinięty
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => toggleExpanded(index)}
          >
            <Text style={styles.readMoreButtonText}>Czytaj mniej</Text> // Wyświetl przycisk "Czytaj mniej"
          </TouchableOpacity>
        ) : ( // Jeśli artykuł nie jest rozwinięty
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => toggleExpanded(index)}
          >
            <Text style={styles.readMoreButtonText}>Czytaj więcej</Text> // Wyświetl przycisk "Czytaj więcej"
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wiadomości</Text>
      <FlatList
        data={newsData} // newsy z api do flatlist
        renderItem={renderNewsItem} // Renderuj każdy element wiadomości przy użyciu funkcji renderNewsItem
        keyExtractor={(item) => item.url} // Użyj adresu URL artykułu jako klucza dla każdego elementu
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
