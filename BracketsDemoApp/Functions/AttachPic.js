import React, {Component} from 'react';
import {View, Text, Image, Button,Alert} from 'react-native';
 
import * as ImagePicker from "react-native-image-picker"
 
export default class AttachPic extends Component{
 
    constructor(){
            super();
            this.state={
                img:{uri : "https://pbs.twimg.com/media/EGR6H_dXkAE9Pu8.jpg"},
            }
        }
        render(){
            return(
                <View style={{flex:1, padding:16}}>
                    <Button title="show Picker" onPress={this.showPicker}></Button>
                    <Button title="CAMERA" onPress={()=>{ImagePicker.launchCamera(null,()=>{})}}></Button>
                    <Button title="GALLERY" onPress={()=>{ImagePicker.launchImageLibrary(null,()=>{})}}></Button>
                    <Text style={{margin:8}}> {this.state.img.uri}</Text>
                    <Image source={this.state.img} style={{marginTop:8, flex:1}}></Image>
                </View>
            );
        }//render method ..
     
        showPicker=()=>{
            //ImagePicker를 이용해서 카메라 or 사진선택앱을 선택하여 이미지 가져오기
            // 카메라를 다루려면 Camera, External Storage 퍼미션이 필요함
            // Android의 경우 퍼미션을 주려면 .. AndroidManifest.xml에서 직접 작성
            // <uses-permission android:name="android.permission.CAMERA" />
            // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
     
            // PickerDialog의 옵션 객체
            const options= {
                title:'Select Picker', //다이얼로그의 제목
                takePhotoButtonTitle: '카메라',
                chooseFromLibraryButtonTitle:'이미지 선택',
                cancelButtonTitle: '취소',
                customButtons: [
                    {name:'fb',title:'페이스북 이미지 선택'},
                    {name:'kb',title:'카카오 이미지 선택'}
                ],
                storageOptions:{
                    skipBackup: true, //ios에서 icloud에 백업할 것인가?- 안드로이드에서는 무시됨
                    path: 'images',//카메라로 캡쳐시에 저장될 폴더명 [ Pictures/[path] 경로]
                }
            };
     
            //위에서 만든 옵션을 기준으로 다이얼로그 보이기 
            ImagePicker.showImagePicker(options, (response)=>{
     
                if(response.didCancel){
                    Alert.alert('사용자가 취소하였습니다.','',
                    { text: "확인", onPress: () =>{}}
                    );
                }else if(response.error){
                    Alert.alert('에러 : ', response.error,'',
                    { text: "확인", onPress: () =>{}}
                    );
                }else if(response.customButton){
                    Alert.alert('커스텀버튼 선택 :'+response.customButton,'',
                    { text: "확인", onPress: () =>{}}
                    );
                }else{
                    // 이곳에 왔다면 이미지가 잘 선택된 것임
                    // 선택된 이미지의 경로 uri 얻어오기
                    const uri= {uri: response.uri};
                    this.setState({img:uri});
                }
            });
     
        } //showPicker method..
    }//Main class..