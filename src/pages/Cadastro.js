import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Database from '../database/Database';
import Imovel from '../models/Imovel';


export default class Cadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            endereco: "null",
            finalidade: "null",
            tipo: "null",
            valor: "null",
            imagem: "null",
        }
    }
    SaveImovel = (endereco, finalidade, tipo, valor, imagem) => {
        const newImovel = new Imovel(endereco, finalidade, tipo, valor, imagem)
        const banco = new Database();
        banco.Insert(newImovel);
        if (endereco != "null" & finalidade != "null" & tipo != "null" & valor !="null" & imagem != "null") {
            return (Alert.alert("Cadastro realizado!", "Seu cadastro foi realizado com sucesso :)"))
        }else { return ( Alert.alert("Você fez o cadastro com alguns campos em Branco >:( ", "Certifique-se de preencher os campos corretamente, Você cadastrou alguns campos em Branco!"))}
    }
    tekpix = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.setState({ imagem: data.uri })
            if(data.uri != null){
            Alert.alert("Imagem capturada com sucesso!", "o(*￣▽￣*)ブ")}
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={estilo.espaco}>
                    <TextInput style={estilo.linha} placeholder='Endereço do Imóvel' onChangeText={(valor) => { this.setState({ endereco: valor }) }}></TextInput>
                    <TextInput style={estilo.linha} placeholder='Finalidade: Venda ou Aluguel' onChangeText={(valor) => { this.setState({ finalidade: valor }) }}></TextInput>
                    <TextInput style={estilo.linha} placeholder='Tipo: Casa, Apartamento ou Comércio' onChangeText={(valor) => { this.setState({ tipo: valor }) }}></TextInput>
                    <TextInput style={estilo.linha} keyboardType={'numeric'} placeholder='Valor:' onChangeText={(val) => { this.setState({ valor: val }) }}></TextInput>
                </View>
                <View style={estilo.pic} >
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={estilo.picview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permissão para usar a câmera',
                            message: 'Nós precisamos da sua permissão para usar a câmera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancelar',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permissão para usar gravação de áudio',
                            message: 'Precisamos da sua permissão para usar seu áudio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancelar',
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={this.tekpix.bind(this)} style={estilo.capture}>
                        <Text style={estilo.txtpic}> TIRAR FOTO </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={estilo.botao} onPress={() => { this.SaveImovel(this.state.endereco, this.state.finalidade, this.state.tipo, this.state.valor, this.state.imagem) }}>
                        <Text style={estilo.txtbotao}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const estilo = StyleSheet.create({
    botao: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        margin: 5,
        color: 'white',
        borderRadius: 15
    },
    linha: {
        margin: 5,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 15
    },
    picview: {
        height: 20,
        width: 100,
    },
    pic: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    capture: {
        backgroundColor: 'green',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 15,
        marginTop: 50,
        borderRadius: 15
    },
    espaco: {
        marginBottom: 60
    },
    txtpic: {
        fontSize: 12,
        color: 'white'
    },
    txtbotao: {
        color: 'white',
        fontWeight: 'bold'
    }
})