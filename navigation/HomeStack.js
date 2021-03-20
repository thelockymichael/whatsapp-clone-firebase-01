import React, {useContext} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'

import {IconButton} from 'react-native-paper'

import AddRoomScreen from '../screens/AddRoomScreen'

import RoomScreen from '../screens/RoomScreen'

import {AuthContext} from '../navigation/AuthProvider'

// create two new instances
const ChatAppStack = createStackNavigator()
const ModalStack = createStackNavigator()

const ChatApp = () => {
  const {logout} = useContext(AuthContext)

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}
    >
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="logout"
              size={28}
              color="#ffffff"
              onPress={() => logout()}
            />
          ),
        })}
      />
      <ChatAppStack.Screen
        name="Room"
        component={RoomScreen}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />
    </ChatAppStack.Navigator>
  )
}

export default HomeStack = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddRoom" component={AddRoomScreen} />
    </ModalStack.Navigator>
  )
}
