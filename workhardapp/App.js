import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './colors';
import React, {useState} from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if (text===""){
      return;
    }
    const newToDos = {...toDos, [Date.now()] : {text, work:working},}
    setToDos(newToDos);
    setText(""); // Reset once submitted
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setWorking(true)}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWorking(false)}>
          <Text style={{...styles.btnText, color: working ? theme.grey : "white"}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
          <TextInput
            placeholder={working ? "Add a TODO" : 'Where do you want to go?'} 
            style={styles.input}
            placeholderTextColor={styles.btnText.grey}
            onChangeText={onChangeText}
            onSubmitEditing={addToDo}
            returnKeyType='done'
            value = {text}
          />
          <ScrollView>
            {Object.keys(toDos).map((key) => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}> {toDos[key].text} </Text>
            </View>
            ))}
          </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo:{
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,

  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

});
