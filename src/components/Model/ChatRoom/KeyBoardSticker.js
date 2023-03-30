import AnimatedStickerKeyboard from 'react-native-animated-stickers-chz/AnimatedKeyBoard';
import React, {useState} from 'react';
import SendSticker from '../../controller/ChatRoom/SendSticker';
const KeyBoardSticker = ({roomID, idUser, idClient, getVis}) => {

    const handleBackButtonClick = async () => {
        if (getVis) {
            return !getVis;
        } else {
            BackHandler.exitApp()
            //Other think when backPress on invisible keyboard
            return true
        }
    }
    return (
        <AnimatedStickerKeyboard
            textButtonColor={'#000'}
            infoText={false}
            visibility={getVis}
            onSend={(uri) => { [SendSticker.sendSticker(uri, roomID, idUser, idClient)] }}
            keyBoardStyle={{ backgroundColor: '#FFDEAD' }}
            menuButtonStyle={{ backgroundColor: '#00000010' }}
            onBackPress={() => { handleBackButtonClick() }}
            textColor={'black'}
            hideDes={true}
            hideFooter={true}
            placeHolderColor={'#00000010'}
        />
    )
}

export default KeyBoardSticker;