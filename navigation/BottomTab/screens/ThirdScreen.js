import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import * as FileSystem from 'expo-file-system';

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
  monthNamesShort: [
    'Sty',
    'Lut',
    'Mar',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paź',
    'Lis',
    'Gru',
  ],
  dayNames: [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ],
  dayNamesShort: ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
};

LocaleConfig.defaultLocale = 'pl';

const ThirdScreen = () => {
  const [markedDate, setMarkedDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadEventsData();
  }, []);

  const loadEventsData = async () => {
    try {
      const eventsData = await getEventsData();
      setEventsData(eventsData);
    } catch (error) {
      console.log('Błąd podczas ładowania danych wydarzeń:', error);
    }
  };

  const handleDateSelect = (day) => {
    const selectedDate = day.dateString;

    if (markedDate[selectedDate]) {
      // Wybrano już tę datę, odznacz
      const updatedMarkedDate = { ...markedDate };
      delete updatedMarkedDate[selectedDate];
      setMarkedDate(updatedMarkedDate);
      setSelectedDate(null);
      setSelectedEvent(null);
    } else {
      // Odznacz poprzednio wybraną datę i zaznacz nową
      const updatedMarkedDate = {};
      updatedMarkedDate[selectedDate] = {
        selected: true,
        marked: true,
        dotColor: 'blue',
        selectedColor: 'lightblue', // Kolor tła zaznaczonej daty
        textColor: 'black', // Kolor tekstu zaznaczonej daty
      };
      setMarkedDate(updatedMarkedDate);
      setSelectedDate(selectedDate);

      const event = eventsData.find((item) => item.date === selectedDate);
      setSelectedEvent(event);
    }

    setEventName('');
    setEventDescription('');
    setIsEditing(false);
  };

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

  const handleEditEvent = () => {
    setIsEditing(true);
  };

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

  const saveEventsData = async (eventsData) => {
    const filePath = `${FileSystem.documentDirectory}events.json`;
    const fileContent = JSON.stringify(eventsData);
    await FileSystem.writeAsStringAsync(filePath, fileContent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDate}
          onDayPress={handleDateSelect}
          theme={{
            selectedDayBackgroundColor: 'lightblue',
            selectedDayTextColor: 'black',
            todayTextColor: 'blue',
          }}
        />
      </View>

      {selectedDate && !selectedEvent && !isEditing && (
        <View style={styles.formContainer}>
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
          <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
            <Text style={styles.buttonText}>Dodaj wydarzenie</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedEvent && !isEditing && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{selectedEvent.name}</Text>
          <Text style={styles.eventDescription}>{selectedEvent.description}</Text>
          <TouchableOpacity style={styles.button} onPress={handleEditEvent}>
            <Text style={styles.buttonText}>Edytuj wydarzenie</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedEvent && isEditing && (
        <View style={styles.formContainer}>
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
          <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
            <Text style={styles.buttonText}>Zapisz zmiany</Text>
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
    backgroundColor: '#AED6F1',
  },
  calendarContainer: {
    marginBottom: 16,
    marginTop: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  eventContainer: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',

  },
  eventDescription: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  formContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    alignSelf: 'center',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#e1dbd6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#23395d',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ThirdScreen;
