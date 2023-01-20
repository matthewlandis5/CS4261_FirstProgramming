import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const Cat = () => {
  const [text, setText] = useState('...');

  return (
    <View>
      <Text>Hello, I am {text}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Name me!"
        maxLength={40}
        onChangeText={newText => setText(newText)}
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      {Cat()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});