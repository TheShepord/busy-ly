import * as React from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Button, Overlay, ListItem, Avatar } from 'react-native-elements';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const friends = [
  {
    name: 'Amy Farha',
    id: 2,
    subtitle: 'Vice President',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: 'Chris Jackson',
    id: 3,
    subtitle: 'Vice Chairman',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },

]
// const Stack = createStackNavigator();

// /send_message
// message = {
//   sender_id: 'int',
//   receiver_id: 'int',
//   text: 'string'
// }


export default function ConnectionsScreen() {
  // React.useEffect(() => {
  //   fetch('/messages/1/2').then(response =>
  //     response.json().then(data => {

  //     }))
  // }, []);
  // return (
  // <View>
  //   {
  //     friends.map((l, i) => (
  //       <ListItem key={i} bottomDivider>
  //         <Avatar source={{uri: l.avatar_url}} />
  //         {/* <Avatar source={{uri: l.avatar_url}} /> */}
  //         <ListItem.Content>
  //           <ListItem.Title>{l.name}</ListItem.Title>
  //           <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
  //         </ListItem.Content>
  //       </ListItem>
  //     ))
  //   }
  // </View>)
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
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
