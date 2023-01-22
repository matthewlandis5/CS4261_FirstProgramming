import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, get, child, set, update, remove} from "firebase/database";
import morseConversion from './letter-morse-conversion.json';
import firebaseConfig from './config/firebase-config.json';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const convertTextToMorse = (text: String) => {
  //TODO: Convert text to morse
  //TODO: Vibrate phone with morse
};


const Elements = () => {
  const [text, setText] = useState<String>('...');
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
        }}
        defaultValue="Hello"
        maxLength={40}
        onChangeText={newText => setText(newText)}
      />
      <Button
        onPress={() => {
          convertTextToMorse(text);
        }}
        title="Convert"
      />

      {/* UPLOAD
      <Button
        onPress={() => {
          set(ref(db, 'morse'), morseConversion).catch((error) => {
            alert('Error Uploading! ' + error);
          }).then(() => {
            alert('Successful Uploading!');
          });
        }}
        title="Upload"
      />*/}
      {/* DOWNLOAD
      <Button
        onPress={() => {
          get(child(ref(db), 'morse')).then((snapshot) => {
            if (snapshot.exists()) {
              alert(JSON.stringify(snapshot.val()));
            } else {
              alert('No data available');
            }
          }).catch((error) => {
            alert('Error getting data: ' + error);
          });
        }
        }
        title="Download"
      />*/}
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