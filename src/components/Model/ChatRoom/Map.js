import React, { useState, useEffect} from 'react';

import { MarkerAnimated, MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { View, Pressable, Text, SafeAreaView } from 'react-native';
import TEst from '../../View/TEst';
import { width, height } from '../../Util/Constant';

const Map = () => {
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
                <MarkerAnimated
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