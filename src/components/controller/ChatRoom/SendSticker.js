import GetMessages from "./GetMessages";

const sendSticker = (data, roomID, idUser, idClient) => {
    const msg = data;
    const msgType = "sticker"
    const lastMSG = "Đã gửi một nhãn dán";
    GetMessages.getMess(roomID, msg, idUser, idClient, msgType, lastMSG)
}

export default { sendSticker }