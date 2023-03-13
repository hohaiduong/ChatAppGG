import React, { useState } from "react";

var dataMess = []
const setData = (data) => {
    dataMess = data;
    return dataMess;
}

const getData = () => {
    return dataMess;
}

export default { setData, getData }