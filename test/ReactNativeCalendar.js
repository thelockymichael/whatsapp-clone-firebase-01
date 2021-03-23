import React, {
  SafeAreaView,
  useEffect,
  useState,
  useContext,
  useReducer,
} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Agenda} from 'react-native-calendars'
import {Card, Avatar} from 'react-native-paper'

// import {AuthContext} from '../contexts/AuthContext'

const timeToString = (time) => {
  const date = new Date(time)
  return date.toISOString().split('T')[0]
}

export default ReactNativeCalendar = () => {
  const {signIn} = useContext(AuthContext)

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignOut: false,
      userToken: null,
    }
  )

  // useEffect(() => {
  //   const immediateSignIn = async () => {
  //     const token = await signIn()

  //     console.log('immediateSignIn', token)
  //   }

  //   immediateSignIn()
  // }, [])

  const [items, setItems] = useState({})

  const loadItems = (day) => {
    console.log('what isa day', day)
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000
        const strTime = timeToString(time)
        if (!items[strTime]) {
          items[strTime] = []
          const numItems = Math.floor(Math.random() * 3 + 1)
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            })
          }
        }
      }
      const newItems = {}
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key]
      })
      setItems(newItems)
    }, 1000)
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2020-03-21'}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
