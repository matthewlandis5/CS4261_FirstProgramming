import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, get, child, set, update, remove} from "firebase/database";
//import morseConversion from './letter-morse-conversion.json';
import firebaseConfig from './config/firebase-config.json';
import {Vibration} from 'react-native';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ONE_SECOND_IN_MS = 1000;

const convertTextToMorse = (text: String, morse: JSON) => {

  let vibPattern = [.05 * ONE_SECOND_IN_MS]; // .05 second pause at beginning

  for (let i = 0; i < text.length; i++) {

    const letter: string = text.charAt(i).toLowerCase();
    const morsePattern: string = morse[letter] || "";
    console.log("Converted " + letter + " to " + morsePattern);

    for (let j = 0; j < morsePattern.length; j++) {
      const morseChar: string = morsePattern.charAt(j);
      if (morseChar === ".") {
        vibPattern.push(0.2 * ONE_SECOND_IN_MS);
      } else if (morseChar === "-") {
        vibPattern.push(.95 * ONE_SECOND_IN_MS);
      }
      if (j < morsePattern.length - 1) {
        vibPattern.push(0.05 * ONE_SECOND_IN_MS); // .05 second between dots and dashes
      }
    }
    if (letter === " ") {
      vibPattern.push(.01 * ONE_SECOND_IN_MS);
      vibPattern.push(1 * ONE_SECOND_IN_MS); // 1 second between words
    } else {
      vibPattern.push(0.5 * ONE_SECOND_IN_MS); // .2 second between letters
    }
  }

  Vibration.vibrate(vibPattern);
};

const Elements = () => {
  const [text, setText] = useState<string>('Hello');
  const [morse, setMorse] = useState<JSON | null>();

  if (morse == null) {
    get(child(ref(db), 'morse')).then((snapshot) => {
      if (snapshot.exists()) {
        setMorse(snapshot.val());
        console.log('Morse data downloaded from DB')
      } else {
        alert('No morse data available');
      }
    }).catch((error) => {
      alert('Error getting data from DB: ' + error);
    });
  }

  return (
    <View>
      <Text>What would you like to hear in morse?</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          color: 'hotpink',
        }}
        defaultValue={text}
        maxLength={40}
        onChangeText={newText => setText(newText)}
      />
      <Button
        onPress={() => {
          convertTextToMorse(text, morse);
        }}
        title="Convert"
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      {Elements()}
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