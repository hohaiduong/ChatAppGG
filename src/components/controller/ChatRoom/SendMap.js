import GetMessages from "./GetMessages";

const sendMap = (data, roomID, idUser, idClient) => {
    const latitude = data.latitude;
    const longitude = data.longitude;
    const msg = {latitude, longitude};
    const msgType = "map"
    const lastMSG = "Đã chia sẻ vị trí";
    GetMessages.getMess(roomID, msg, idUser, idClient, msgType, lastMSG)
}

export default { sendMap }