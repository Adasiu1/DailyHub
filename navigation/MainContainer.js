import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Screens
import FirstScreen from './BottomTab/screens/FirstScreen';
import SecondScreen from './BottomTab/screens/SecondScreen';
import ThirdScreen from './BottomTab/screens/ThirdScreen';

//Names
const FirstName = 'First';
const SecondName = 'Second';
const ThirdName = 'Third';

const Tab = createMaterialBottomTabNavigator();


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName={FirstName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === FirstName){
                        iconName = focused ? 'weather-partly-cloudy' : 'weather-partly-cloudy';
                    } else if (rn === SecondName){
                        iconName = focused ? 'email-newsletter' : 'email-newsletter';
                    } else if (rn === ThirdName){
                        iconName = focused ? 'calendar' : 'calendar';
                    }

                    return <MaterialCommunityIcons name={iconName} size={24} color={color}/>
                } 
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
            }}
            
            >

                <Tab.Screen name={FirstName} component={FirstScreen}/>
                <Tab.Screen name={SecondName} component={SecondScreen}/>
                <Tab.Screen name={ThirdName} component={ThirdScreen}/>

            </Tab.Navigator>
        
        </NavigationContainer>
    )
}