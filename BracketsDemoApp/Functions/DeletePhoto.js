import React from "react";
import store from "../store/store";

export default function DeletePhoto(photoUri){
    const storedPhotoData = store.getState().photoArr;

    const newData =[];
    storedPhotoData.array.forEach(obj => {
        if(obj.value !== photoUri){
            newData.push(obj);
        }
    });
    console.log(newData);
    
    
}