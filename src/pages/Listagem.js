import React, { Component } from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet, FlatList } from 'react-native';
import Database from '../database/Database';

export default class Listagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImovel: []
        }
        this.ListarImoveis()
    }
    ListarImoveis = () => {
        const banco = new Database();
        banco.List().then(listing => { this.setState({ listImovel: listing }) })
    }
    
    render() {
        return (
            <ScrollView>
                <View>
                    {
                        this.state.listImovel.map(item => (
                            <View style={estilo.container}>
                                
                                <Text style={estilo.txt}>Imóvel: {item.id}</Text>
                                <Text style={estilo.txt}>Endereço: {item.endereco}</Text>
                                <Text style={estilo.txt}>Finalidade: {item.finalidade}</Text>
                                <Text style={estilo.txt}>Tipo: {item.tipo}</Text>
                                <Text style={estilo.txt}>Valor: R${item.valor}</Text>
                                <Image style={estilo.img} source={{ uri: item.imagem }}></Image>
                                <Text style={estilo.linha}></Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}
const estilo = StyleSheet.create({
    img: {
        width: 100,
        height: 80,
        borderWidth: 4,
        borderColor: 'gray',
        marginTop: 5

    },
    container: {
        flex: 1,
        margin: 5,
    },
    txt: {
        fontSize: 14,
        color: 'black',
        borderBottomWidth: 1,
        borderColor: '#CCC9C8'
    },
    linha: {
        borderBottomWidth: 1,
        borderColor: 'black'
    }

})
