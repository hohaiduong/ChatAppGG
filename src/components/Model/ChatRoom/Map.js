import React, { useState, useEffect} from 'react';

import { AnimatedRegion, MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { View, Pressable, Text, SafeAreaView } from 'react-native';
import TEst from '../../View/TEst';
import { width, height } from '../../Util/Constant';
import GetLocation from 'react-native-get-location';
import { API_GG_KEY } from '../../Util/Constant';

const Map = ({latitude, longitude}) => {

    const origin = {latitude: latitude, longitude: longitude};
    const destination = {latitude: TEst.getShowMap().latitude, longitude: TEst.getShowMap().longitude}
    
    return (
        <SafeAreaView style={{ position: "absolute" }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                style={{ height: height - 80, width: width }}
                zoomControlEnabled={true}
                followsUserLocation={true}
                region={{
                    latitude: TEst.getData().latitude,
                    longitude: TEst.getData().longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.0015,
                }}
            >
                <MapMarker
                    coordinate={{
                        latitude: TEst.getData().latitude,
                        longitude: TEst.getData().longitude,
                    }}
                />
            </MapView>
        </SafeAreaView>
    )
}

export default Map;