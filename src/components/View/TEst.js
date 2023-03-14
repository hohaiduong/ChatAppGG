import React, { useState } from "react";

var dataMess = {}
const setData = (data) => {
    dataMess = data;
    return dataMess;
}

const getData = () => {
    return dataMess;
}

var idMess = "";
const setIDMess = (data) => {
    idMess = data;
    return idMess;
}

const getIDMess = () => {
    return idMess;
}
var ShowMap = false

const setShowMap = (showMap) => {
    ShowMap = showMap;
    return ShowMap;
}

const getShowMap = () => {
    return ShowMap;
}


export default { setData, getData, setShowMap, getShowMap, setIDMess, getIDMess }