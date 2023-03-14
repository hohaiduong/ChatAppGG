import React, { useState } from "react";

var dataMess = {}
const setData = (data) => {
    dataMess = data;
    return dataMess;
}

const getData = () => {
    return dataMess;
}

var ShowMap = false

const setShowMap = (showMap) => {
    ShowMap = showMap;
    return ShowMap;
}

const getShowMap = () => {
    return ShowMap;
}


export default { setData, getData, setShowMap, getShowMap }