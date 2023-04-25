import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'
import Calendar  from 'react-native-calendars/src/calendar'
import { useState } from 'react'
// zeby dzialalo komenda w terminalu npm install react-native-calendars


const ThirdScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'black', borderRadius: 10, margin: 40, padding: 10, width: 200, alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 22 }}>Show Calendar</Text>
      </TouchableOpacity>
      <Modal visible = {showModal} animationType = 'fade'>
        <Calendar style = {{borderRadius: 10, elevation: 4, margin: 40}}

        />
      </Modal>
    </View>
  )
}

export default ThirdScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


