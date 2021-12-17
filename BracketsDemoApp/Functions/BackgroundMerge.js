import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';

import store from '../store/store';

import RNImageTools from 'react-native-image-tools-wm';

import RnBgTask from 'react-native-bg-thread';

export function BackgroundMerge(image1,image2){
    
        RnBgTask.runInBackground_withPriority("MIN",()=>{

        console.log("hello")
        RNImageTools.merge(
            [
                image1,
                image2
            ]
        ).then(mergedImage => {
            store.dispatch({type:'PHOTO',photo: mergedImage.uri});
        }).catch(console.error);

    })
}
           