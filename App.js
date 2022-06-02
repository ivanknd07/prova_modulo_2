//AO RODAR APLICAÇÃO, PARA EXIBIR TODOS OS ITENS DO ARRAY DADOS, CLICAR NO BUTTON 'LUPA' COM O TEXTINPU VAZIO, 

// FUNCIONALIDADE FIM DA APLICAÇÃO, ESTAR FUNCIONANDO 

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';



import { FontAwesome5 } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Rating from './src/componetes/Rating';

import axios from 'axios';

export default function App() {

  const [buscaText, setBuscaText] = useState('');
  const [dados, setDatos] = useState('');
  //[{author:'Teste',title:'Teste', url:'Teste'}])

  
  async function getDados() {
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search/?query=${buscaText}`);
      //BUSCA POR UM AUTOR ESPECIFICO: https://hn.algolia.com/api/v1/search/?query=tags=author_:${buscaText}
      setBuscaText([])
      console.log(response.data.hits);
      setDatos(response.data.hits);

    } catch (error) {
      console.error(error);
    }

  }

 useEffect(getDados,[]);

  
  return (

    <View style={styles.container}>

      <View style={styles.tituloAplicacao}><Text style={styles.Title}> ANAGNOS - LEITURA </Text></View>

      <View style={styles.viewColuna}>

        <TextInput style={styles.input} placeholder="Ditige um Author" onChangeText={(t) => setBuscaText(t)} value={buscaText}></TextInput>

        <TouchableOpacity style={styles.btn_pesquisa} onPress={getDados}>

          <FontAwesome5 name="search" size={30} color="white" />


        </TouchableOpacity>

      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => (

          <View style={styles.containerLivros}>
              <Text style={styles.textAuthor}><Entypo name="user" size={24} color="black" /> author :{item.author} </Text>

              <Text style={styles.textTitle}><FontAwesome name="book" size={24} color="black" /> title :{item.title}</Text>

              <Text style={styles.textUrl}><Feather name="link" size={24} color="black" /> url:{item.url}</Text>

              <Text ><Ionicons name="happy" size={24} color="black" /><Rating style={styles.rating} rating={0} /></Text>
          </View>
        )
        }

      />

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 110,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: -6,
  },

  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 15,
  },

  input: {
    height: 40,
    width: 250,
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    borderColor: 'skyblue',
    flexDirection: 'row'
  },

  viewColuna: {
    flexDirection: 'row',
    marginBottom: 0

  },

  btn_pesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 35,
    marginTop: -4,
    backgroundColor: 'skyblue',
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
  },

  requisicao: {

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',


  },

  containerLivros: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    height: 160,
    width: 400,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    padding: 5, 
    position:'relative'
  },

  viewAuthor: {

  },

  textAuthor: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 15
  },

  viewTitle: {

  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },

  viewUrl: {

  },

  textUrl: {
    fontWeight: 'bold',
    fontSize: 15
  },

  textItem: {

  },

  rating:{
    fontSize: 15
  }


});









