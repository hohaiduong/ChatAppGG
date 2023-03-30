import GetMessages from "./GetMessages";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const openImageLib = async (roomID, idUser, idClient) => {
    const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
    };
    const images = await launchImageLibrary(options);
    const msgType = "image"
    const lastMSG = "Đã gửi một ảnh";
    GetMessages.getMess(roomID, images.assets[0].base64, idUser, idClient, msgType, lastMSG)
}

const openCamera = (roomID, idUser, idClient) => {
    var images = "";
    const options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
            saveToPhotos: true,
            quality: 1
        },
        includeBase64: true,
    };
    launchCamera(options, response => {
        images = response;
        const msgType = "image"
        const lastMSG = "Đã gửi một ảnh";
        GetMessages.getMess(roomID, images.assets[0].base64, idUser, idClient, msgType, lastMSG)
    })

}


export default { openImageLib, openCamera }