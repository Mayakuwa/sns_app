import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerResult} from "expo-image-picker";

export class ImageSelecter {

    public static async execute(): Promise<ImagePickerResult> {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

        // カメラのパーミッションが得られていない場合の処理
        if (permission.status !== 'granted') {
        //ユーザーにパーミッションを再度きく
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status !== 'granted') {
                return {cancelled: true}
            }
        }

        return ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [9, 9],
            quality: 0.5,
            base64: true,
            exif: true
        })
    }

}
