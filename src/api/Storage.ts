import NativeStorage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

export default class Storage {

    //定数を設定
    static readonly KEY_USER_ID = 'userId';

    storage: NativeStorage;

    public constructor() {
        this.storage = new NativeStorage({
            // 最大容量, 1000がデフォルト
            size: 1000,
            // AsyncStorageを使う（WEBでもRNでも）
            // セットしないとリロードでデータが消えるよ。
            storageBackend: AsyncStorage,
            // 期限なしにキャッシュする
            defaultExpires: null,
            // メモリーにもキャッシュする
            enableCache: true
        })
    }


    public save(key: string, value) {
        return this.storage.save(
            {key: key,
                     data: value
            })
    }

    public load(key: string) {
        return this.storage.load({
            key: key
        })
    }


}

