import * as firebase from 'firebase';
require('firebase/firestore');

//　Firebaseのサーバー管理。firebaseを使う時はこのオーバーラップしたものをインポート

export default class Firebase {

    //アクセス修飾子(publicなど) static 型名 変数名
    //これを使うとインスタンスを作成しなくてもアクセスできる
    private static instance: Firebase;

    // private name: string;みたいな要領でかく
    private db: firebase.firestore.Firestore | null;

    private constructor() {
       this.db = firebase.firestore();
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new Firebase();
        }
        return this.instance
    }

    public load(table: string) {
        return this.db.collection(table);
    }

    public saveData(collection: string, data: firebase.firestore.DocumentData) {
        return this.db.collection(collection).add(data)
    }

    public static saveImage(filename: string, blob: Blob | Uint8Array | ArrayBuffer) {
        return firebase.storage().ref().child('images/' + filename).getDownloadURL();
    }

    public static createAnonimousUser() {
        return firebase.auth().signInAnonymously()
    }



}
