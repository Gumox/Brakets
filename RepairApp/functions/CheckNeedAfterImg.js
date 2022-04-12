import React from "react";
import { Text, Image,  View, Pressable,ImageBackground} from 'react-native';
import store from "../store/store";
import _ from "lodash";
import ip from "../serverIp/Ip";

export function NeedAfterView(needImages,navigation,code){
    
    
    let need=[]
    let needImagesView;
    let afterNeed = store.getState().needClosePhotos;
    needImages.map((item,index)=>{
        //console.log(afterNeed)
        const key =index;
        if(afterNeed.length){
             let check =false;
            for (const element of afterNeed) {
                if(element.num == item.number){
                    needImagesView=(
                        <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                                <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:ip+item.need_point_image})}}>
                                    <Image style={{width:90,height:120, margin:15, padding:10, marginLeft:30}} source={{uri :ip+item.need_point_image}}></Image>
                                </Pressable>
                                <Pressable onPress={()=>{navigation.navigate("PhotoControl",
                                                {img:needAfter,
                                                retake:{key:"NeedCloseShot",num:item.number,data:code}
                                                }
                                                )
                                            }}>
                                    <ImageBackground style={{width:90,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282",justifyContent:"center",alignItems:"center"}} source={{uri :element.photo}}>
                                            
                                       
                                    </ImageBackground>
                                </Pressable>
                            </View>
                    )
                    check= true;
                    break;
                }
            }
            if(!check){
                let needAfter = null
                if(item.after_need_point_image){
                    needAfter = ip+item.after_need_point_image
                }
                needImagesView=(
                    <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                            <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:ip+item.need_point_image})}}>
                                <Image style={{width:90,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : ip+item.need_point_image}}></Image>
                            </Pressable>
                            <Pressable onPress={()=>{navigation.navigate("PhotoControl",
                                                {img:needAfter,
                                                retake:{key:"NeedCloseShot",num:item.number,data:code}
                                                }
                                                )
                                            }}>
                                <ImageBackground style={{width:90,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282",justifyContent:"center",alignItems:"center"}} source={{uri : needAfter}}>
                                    
                                    
                                </ImageBackground>
                            </Pressable>
                        </View>
                )
            }
            
        }else{
            let needAfter = null
            if(item.after_need_point_image){
                needAfter = ip+item.after_need_point_image
                needImagesView=(
                    <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                            <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:ip+item.need_point_image})}}>
                                <Image style={{width:90,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : ip+item.need_point_image}}></Image>
                            </Pressable>
                            <Pressable onPress={()=>{navigation.navigate("PhotoControl",
                                                {img:needAfter,
                                                retake:{key:"NeedCloseShot",num:item.number,data:code}
                                                }
                                                )
                                            }}>
                                <ImageBackground style={{width:90,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282",justifyContent:"center",alignItems:"center"}} source={{uri : needAfter}}>
                                </ImageBackground>
                            </Pressable>
                        </View>
                )
            }else{
                needImagesView=(
                    <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                            <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:ip+item.need_point_image})}}>
                                <Image style={{width:90,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : ip+item.need_point_image}}></Image>
                            </Pressable>
                            <Pressable onPress={()=>{navigation.navigate("TakePhoto",{key:"NeedCloseShot",num:item.number,data:code})}}>
                                <ImageBackground style={{width:90,height:120, margin:15, padding:10, marginRight:30, backgroundColor:"#828282",justifyContent:"center",alignItems:"center"}} source={{uri : needAfter}}>
                                    <Text style={{color:"#FFFFFF"}}>사진을</Text>
                                    <Text style={{color:"#FFFFFF"}}>추가하려면</Text>
                                    <Text style={{color:"#FFFFFF"}}>클릭하세요</Text>
                                </ImageBackground>
                            </Pressable>
                        </View>
                )
            }
            
        }
        need[key] = needImagesView
    })
    return need
}
function CheckNeedAfterImg(img,number){
    let needAfterImg = store.getState().needClosePhotos;
    let result =[]
    if(needAfterImg.length>0){
        for(const item of needAfterImg){

            if(item.num == number){
                result = _.filter(needAfterImg, function(element) { return element.num !== number; });
                console.log("********************************")
                console.log()
                console.log(result)
                console.log()
                console.log("********************************")
                store.dispatch({type:'NEED_PHOTOS_CLOSE_SET',needClosePhotos:result}); 
                break;
            }
        }
        if(result.length === 0){
            result = needAfterImg
        }
        store.dispatch({type:'NEED_PHOTOS_CLOSE',needClosePhotos:{photo:img,num: number}});
        console.log("---------------------")
        console.log(needAfterImg)

        console.log(result)
        
                
        console.log(store.getState().needClosePhotos)
        console.log("---------------------")
    }else{
        store.dispatch({type:'NEED_PHOTOS_CLOSE',needClosePhotos:{photo:img,num: number}});
        console.log("---------------------")
        console.log(needAfterImg)

        console.log(result)
        
                
        console.log(store.getState().needClosePhotos)
        console.log("---------------------")
    }
}
export default CheckNeedAfterImg
