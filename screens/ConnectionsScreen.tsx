import * as React from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Button, Overlay, ListItem, Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ProfileTabParamList} from '../types';

// /send_message
// message = {
//   sender_id: 'int',
//   receiver_id: 'int',
//   text: 'string'
// }


export default function ConnectionsScreen({ navigation }) {
  // React.useEffect(() => {
  //   fetch('/messages/1/2').then(response =>
  //     response.json().then(data => {

  //     }))
  // }, []);
  // return (

  let default_messages = [
    {
      _id: 1,
      text: 'Hey! What have you been studying?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Robert Null',
        // avatar: 'https://placeimg.com/140/140/any',
      }
    },
    {
      _id: 1,
      text: "This physics pset is killing me lmao how are you",
      createdAt: new Date(),
      user: {
        _id: 3,
        name: 'Jess Merigold',
        // avatar: 'https://placeimg.com/140/140/any',
      }
    },
    {
      _id: 1,
      text: "I saw you're studying CS. I'm a senior, do you need help with anything?",
      createdAt: new Date(),
      user: {
        _id: 4,
        name: 'Banana Split',
        // avatar: 'https://placeimg.com/140/140/any',
      }
    }
  ]
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    setMessages([
      default_messages[(Math.random * default_messages.length) | 0]
    ])
  }, [])

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
