import React, { Component } from 'react';
import { View, ScrollView, Pressable, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './src/pages/Cadastro';
import Listagem from './src/pages/Listagem';

function Home({ navigation }) {
  return (
    <ScrollView>
      <View style={estilo.container}>
        <View>
          <TouchableOpacity
            style={estilo.botao}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={estilo.txt}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={estilo.botao2}
            onPress={() => navigation.navigate('Listagem')}
          >
            <Text style={estilo.txt}>Listar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='BUYAHOUSE Imobiliária' component={Home} />
        <Stack.Screen name='Cadastro' component={Cadastro}  options={{title:"Cadastro de Imóveis"}}/>
        <Stack.Screen name='Listagem' component={Listagem}  options={{title:"Imóveis disponíveis"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const estilo = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
    marginTop: 100
  },
  txt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  botao: {

    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    borderRadius:15,
    color: 'white'

  },
  botao2: {

    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
    margin: 5,
    borderRadius:15,
    color: 'white'

  },
})
