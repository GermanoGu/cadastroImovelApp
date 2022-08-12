import SQLite from "react-native-sqlite-storage";
import Imovel from "../models/Imovel";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "imob.db";
const database_version = "1.0";
const database_displayname = "Imobiliaria";
const database_size = 200000;

export default class Database {

    Connect() {
        let db;
        return new Promise((resolve) => {
            console.log("Checando a integridade do plugin ...");

            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...");
                console.log("Abrindo Banco de Dados ...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Imovel LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Imovel (id INTEGER PRIMARY KEY AUTOINCREMENT, endereco VARCHAR(100),  finalidade VARCHAR(30), tipo VARCHAR(30), valor double, imagem TEXT)');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    }

    Desconnect(db) {
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };


    List() {
        return new Promise((resolve) => {
            const listImovel = [];
            this.Connect().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Imovel', []).then(([tx, results]) => {
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, endereco, finalidade, tipo, valor, imagem } = row;
                            listImovel.push({ id, endereco, finalidade, tipo, valor, imagem });
                        }
                        resolve(listImovel);
                    });
                }).then((result) => {
                    this.Desconnect(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


    Insert(item) {
        return new Promise((resolve) => {
            this.Connect().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Imovel(endereco, finalidade, tipo, valor, imagem) VALUES (?, ?, ?, ?, ?)', [item.endereco, item.finalidade, item.tipo, item.valor, item.imagem]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconnect(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

}