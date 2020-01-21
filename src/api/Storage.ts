import NativeStorage from 'react-native-storage';
import {AsyncStorage} from 'react-native';


export default class Storage {

    //定数を設定（自分のユーザーID）
    static readonly KEY_USER_ID = 'userId';

    private storage: NativeStorage;

    private static instance: Storage;

    public constructor() {
        this.storage = new NativeStorage({
            size: 1000,
            // AsyncStorageを使う（WEBでもRNでも）
            // セットしないとリロードでデータが消えるよ。
            storageBackend: AsyncStorage,
            // 期限なしにキャッシュする
            defaultExpires: null,
            // メモリーにもキャッシュする
            enableCache: true,

        });
    }

    // インスタンス獲得
    public static getInstance(): Storage {
        if (!this.instance) {
            this.instance = new Storage();
        }
        return this.instance;
    }


    public save(key: string, value, expires: null) {
        return this.storage.save(
            {key: key,
                     data: value,
                     expires: expires
            })
            .catch(error => {
                throw error
            })
    }

    public load(key: string) {
        return this.storage.load({
            key: key,
            autoSync: true,
            syncInBackground: true,
        })
    }


}

