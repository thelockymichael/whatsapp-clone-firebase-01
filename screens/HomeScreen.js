import React, {useContext, useState, useEffect} from 'react'
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {List, Divider} from 'react-native-paper'
import {Title} from 'react-native-paper'
import {AuthContext} from '../navigation/AuthProvider'
import FormButton from '../components/FormButton'
// after other import statements
import * as firebase from 'firebase'
import 'firebase/firestore'

import Loading from '../components/Loading'

// Statusbar color changing
import useStatusBar from '../utils/useStatusBar'

export default HomeScreen = ({navigation}) => {
  useStatusBar('light-content')
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('THREADS')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          }
        })

        setThreads(threads)

        if (loading) {
          setLoading(false)
        }
      })

    /**
     * unsubscribe listener
     */
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', {thread: item})}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
})
