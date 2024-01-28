import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import React, {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    console.log("hey!"+s);
  }

  useEffect(()=>{
    loadToDos();
  }, [])

  const addToDo = async () => {
    if (text===""){
      return;
    }
    const newToDos = {...toDos, [Date.now()] : {text, working},}
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText(""); // Reset once submitted
  }
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      {text: 'Cancel'},
      {text: "I'm Sure", onPress: async ()=>{
        const newToDos = {...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        await saveToDos(newToDos);
      },
      },
    ]);    
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
              toDos[key].working===working ? 
                <View style={styles.toDo} key={key}>
                  <Text style={styles.toDoText}> {toDos[key].text} </Text>
                  <TouchableOpacity onPress = {()=>deleteToDo(key)}>
                    <Feather name="trash-2" size={24} color="grey" />
                  </TouchableOpacity>
                </View>
                : null
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

});
