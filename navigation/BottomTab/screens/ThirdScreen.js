import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { Dimensions } from 'react-native';

const ThirdScreen = () => {
  // Variables
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { width, height } = Dimensions.get('window');
  const calendarWidth = width * 0.9;
  const calendarHeight = height * 0.85;

  // Fetch events data on component mount
  useEffect(() => {
    getEventsData().then((data) => setEventsData(data));
  }, []);

  // Create marked dates for the calendar
  const markedDate = {};
  eventsData.forEach((event) => {
    markedDate[event.date] = { selected: true, marked: true };
  });

  // Handle date selection from the calendar
  const handleDateSelect = (date) => {
    const event = eventsData.find((event) => event.date === date.dateString);
    setSelectedDate(date.dateString);
    setSelectedEvent(event);
    setEventName('');
    setEventDescription('');
  };

  // Handle adding a new event
  const handleAddEvent = async () => {
    if (!eventName) {
      Alert.alert('Błąd', 'Wprowadź nazwę wydarzenia.');
      return;
    }

    try {
      const newEvent = {
        date: selectedDate,
        name: eventName,
        description: eventDescription,
      };

      const updatedEventsData = [...eventsData, newEvent];

      await saveEventsData(updatedEventsData);
      setEventsData(updatedEventsData);

      setSelectedEvent(newEvent);
      setIsEditing(false);

      Alert.alert('Sukces', 'Wydarzenie zostało dodane.');
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił błąd podczas dodawania wydarzenia.');
    }
  };

  // Handle editing an event
  const handleEditEvent = () => {
    setIsEditing(true);
  };

  // Handle saving changes to an event
  const handleSaveEvent = async () => {
    if (!eventName) {
      Alert.alert('Błąd', 'Wprowadź nazwę wydarzenia.');
      return;
    }

    try {
      const updatedEvent = {
        ...selectedEvent,
        name: eventName,
        description: eventDescription,
      };

      const updatedEventsData = eventsData.map((event) =>
        event.date === selectedDate ? updatedEvent : event
      );

      await saveEventsData(updatedEventsData);
      setEventsData(updatedEventsData);

      setSelectedEvent(updatedEvent);
      setIsEditing(false);

      Alert.alert('Sukces', 'Wydarzenie zostało zaktualizowane.');
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił błąd podczas aktualizacji wydarzenia.');
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async () => {
    try {
      const filteredEventsData = eventsData.filter(
        (event) => event.date !== selectedDate
      );

      await saveEventsData(filteredEventsData);
      setEventsData(filteredEventsData);
      setSelectedEvent(null);
      setSelectedDate('');

      Alert.alert('Sukces', 'Wydarzenie zostało usunięte.');
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił błąd podczas usuwania wydarzenia.');
    }
  };

  // Retrieve events data from the file system
  const getEventsData = async () => {
    const filePath = `${FileSystem.documentDirectory}events.json`;
    const fileExists = await FileSystem.getInfoAsync(filePath);

    if (fileExists.exists) {
      const fileContent = await FileSystem.readAsStringAsync(filePath);
      return JSON.parse(fileContent);
    } else {
      return [];
    }
  };

  // Save events data to the file system
  const saveEventsData = async (eventsData) => {
    const filePath = `${FileSystem.documentDirectory}events.json`;
    const fileContent = JSON.stringify(eventsData);
    await FileSystem.writeAsStringAsync(filePath, fileContent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        {/* Calendar component */}
        <Calendar
          markedDates={markedDate}
          onDayPress={handleDateSelect}
          style={{
            borderWidth: 1,
            borderColor: '#9370DB',
            borderRadius: 8,
            backgroundColor: 'white',
            height: calendarHeight,
          }}
        />
      </View>

      {selectedEvent && !isEditing && (
        <View style={styles.eventContainer}>
          {/* Display selected event details */}
          <Text style={styles.eventTitle}>{selectedEvent.name}</Text>
          <Text style={styles.eventDescription}>{selectedEvent.description}</Text>
          {/* Edit event button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#9370DB' }]}
            onPress={handleEditEvent}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>Edytuj wydarzenie</Text>
          </TouchableOpacity>
          {/* Delete event button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red', marginTop: 8 }]}
            onPress={handleDeleteEvent}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>Usuń wydarzenie</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedEvent && isEditing && (
        <View style={styles.formContainer}>
          {/* Event editing form */}
          <TextInput
            style={styles.input}
            placeholder="Nazwa wydarzenia"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Opis wydarzenia"
            value={eventDescription}
            onChangeText={(text) => setEventDescription(text)}
          />
          {/* Save changes button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#9370DB' }]}
            onPress={handleSaveEvent}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>Zapisz zmiany</Text>
          </TouchableOpacity>
        </View>
      )}

      {!selectedEvent && (
        <View style={styles.formContainer}>
          {/* Event creation form */}
          <TextInput
            style={styles.input}
            placeholder="Nazwa wydarzenia"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Opis wydarzenia"
            value={eventDescription}
            onChangeText={(text) => setEventDescription(text)}
          />
          {/* Add event button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#9370DB' }]}
            onPress={handleAddEvent}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>Dodaj wydarzenie</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  calendarContainer: {
    marginBottom: 16,
    marginTop: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  eventContainer: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
    color: 'black',
  },
  eventDescription: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'center',
    color: 'black',
  },
  formContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    alignSelf: 'center',
    borderColor: 'lightgray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    color: '#9370DB',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#9370DB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ThirdScreen;
