import React, { useState, useEffect,useCallback } from 'react';
import { Text, Image, Alert, View, Pressable } from 'react-native';
import dayjs from 'dayjs';
import axios from "axios";

import Contents from '../components/Contents';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import SmallButton from '../components/SmallButton';
import Bottom from '../components/Bottom';
import Ip from '../serverIp/Ip';
import store from '../store/store';
import { PathToFlie } from '../functions/PathToFlie';

function RepairMore({ navigation, route }) {
    const code = route.params.data;
    
    const [cardId, setCardID] = useState(code);
    const [receiptId, setReceiptId] = useState(code);
    const [brandNum, setBrandNum] = useState('');
    const [storeName, setStoreName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [styleNum, setStyleNum] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [require,setRequire] = useState('');
    const [image,setImage] = useState('')
    const [beforeImages,setBeforeImages] =useState([]);        //제품 수선 전 세부 사진
    const [afterImages,setAfterImages] =useState([]);
    const [needImages,setNeedImages] =useState([]);

    const [takeNeedPhotos,setTakeNeedPhotos] = useState(store.getState().needPhotos);
    const getTargetData = useCallback(async (code) => {
        const { data } = await axios.get(Ip+`/api/RepairDetailInfo?code=${code}`);
        console.log(data)
        setBrandNum(data.data['brand_name'])
        setStoreName(data.data['store_name'])
        setReceiptId(data.data['receipt_id'])
        setCustomerName(data.data['customer_name'])
        setStyleNum(data.data['style_code'])
        setColor(data.data['color'])
        setSize(data.data['size'])
        setRequire(data.data["store_message"])
        setImage(data.data["image"])
        console.log(data.needRepairImage)
        
        const beforeImgList =[];
        const afterImgList =[];                       
        for (let i = 0; i < data.imageList.length; i++) {
            const element = data.imageList[i];
            
            beforeImgList.push(Ip+element["before_image"])
            if(element["after_image"] !== null || element["after_image"]!==undefined){
                afterImgList.push(Ip+element["after_image"])
            }
        }
        const needImages =[]
        data.needRepairImage.forEach((obj,index) => {
            needImages.push({photo:Ip+obj["need_point_image"]})
            
        });
        setBeforeImages(beforeImgList)
        setAfterImages(afterImgList)
        console.log()
        console.log()
        console.log()
        console.log()
        store.dispatch({type:"SET_NEED_PHOTOS",needPhotos:needImages})
        
        console.log(store.getState().needPhotos)
        setTakeNeedPhotos(store.getState().needPhotos)
    });

    const postRepairNeedPoint = async (receipt_id,image,takeNeedPhotos) => {
        var formdata = new FormData();

        formdata.append("receipt", receipt_id);
        formdata.append("store", store.getState().shopId);
        formdata.append("image",  PathToFlie(image));
        if(takeNeedPhotos != null|| takeNeedPhotos != undefined ||takeNeedPhotos !== []){

            formdata.append("image1", PathToFlie(takeNeedPhotos[0].photo));
            formdata.append("image2", PathToFlie(takeNeedPhotos[1].photo));
            formdata.append("image3", PathToFlie(takeNeedPhotos[2].photo));
            formdata.append("image4", PathToFlie(takeNeedPhotos[3].photo));
            
        }
        console.log(formdata)

        try {
            const response = await fetch(Ip+'/api/needRepair',{method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json)
           
        } catch (error) {
            console.error(error);
        } finally {

        }
    }




    let beforeImageViews =[];
    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const obj = afterImages[i]
        const key = i
        let afterImage = "../Icons/camera.png"
        if(obj !== null || obj === undefined){
            afterImage = obj
        }
        let before;
        let photo ='afterImageUri'+(key+1);
        
        before =(
            <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:element})}}>
                    <Image style={{width:100,height:120, margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                </Pressable>
                <Pressable >
                    <Image style={{width:100,height:120, margin:15, padding:10, marginRight:30}} source={{uri : afterImage}}></Image>
                </Pressable>
            </View>
        )
        beforeImageViews[key] =(before)
    }
    let pullImage;
    const message =(
        <View style={{justifyContent:"center",alignItems:"center"}}>
                        <SmallLabel>
                        전체 사진을 클릭한 후,
                        </SmallLabel>
                        <SmallLabel>
                        추가 수선이 필요한 부위를 
                        </SmallLabel>
                        <SmallLabel>
                        표시하세요
                        </SmallLabel>
        </View>
    )
    if(store.getState().photo !==null){
        console.log("store.getState().photo : "+store.getState().photo)
        pullImage =(
            <View style={{minWidth: 100}}>
                <Label>전체 사진</Label>
                <View style = {{flexDirection:"row", alignItems: "center",justifyContent:"space-around"}}>
                    <Pressable onPress={() => {navigation.navigate('PhotoDraw',{photo : Ip+image ,code:code})}}>
                        <Image
                            style={{ width: 150, height: 150 }}
                            resizeMode='contain'
                            source={
                                { uri: store.getState().photo }
                            }
                        />
                    </Pressable>
                    {message}
                </View>
            </View>
        )
    }else{
        console.log("store.getState().photo : "+image)
        pullImage =(
            <View style={{minWidth: 100}}>
                <Label>전체 사진</Label>
                <View style = {{flexDirection:"row", alignItems: "center",justifyContent:"space-around"}}>
                    <Pressable onPress={() => {navigation.navigate('PhotoDraw',{photo : Ip+image ,code:code})}}>
                        <Image
                            style={{ width: 150, height: 150 }}
                            resizeMode='contain'
                            source={
                                { uri: Ip+image }
                            }
                        />
                    </Pressable>
                    {message}
                </View>
            </View>
        )
    }
    useEffect(() => {
        getTargetData(code);
    }, []);
    const repairNeedImage = store.getState().addRepairImageUri;
    let repairNeeds =[];
    if(repairNeedImage !== null || store.getState().needPhotos !== []){
        let set =(<View key={0} style ={{flexDirection:"row",justifyContent : "space-between"}}><Label>추가 사진</Label></View>)
        repairNeeds[0]= (set)
        takeNeedPhotos.forEach((obj,index) => {
            let photo=(
                <View key={index+1} style ={{flexDirection:"row",justifyContent : "space-between"}}>

                <Pressable onPress={() => {navigation.navigate("AddPhotoControl",{img:obj.photo,code:code})}}>
                    <Image
                        style={{ width: 100, height: 120 , padding:10, marginLeft:30}}
                        resizeMode='contain'
                        source={
                            { uri: obj.photo }
                        }
                    />
                </Pressable>
                
                <Pressable >
                <View style={{width:100,height:120,margin:15, padding:10, marginLeft:30}}>

                </View>
                </Pressable>
            </View>
            )
            repairNeeds[index+1]=(photo)

        });
        if(store.getState().needPhotos.length<4){
            let need = (
                <View key={takeNeedPhotos.length+1} style ={{flexDirection:"row",justifyContent : "space-between"}}>

                    <Pressable onPress={() => {navigation.navigate('TakePhoto',{key:"need",code:code})}}>
                        <View style={{width:100,height:120,justifyContent:"center",alignContent:"center",backgroundColor:"#828282" ,margin:15, padding:10, marginLeft:30}}>
                            <Text style={{color:"#ffffff", fontSize:20}}>필요 수선 부위 추가</Text>
                        </View>
                    </Pressable>
                    
                    <Pressable >
                    <View style={{width:100,height:120,margin:15, padding:10, marginLeft:30}}>

                    </View>
                    </Pressable>
                </View>
            );
            repairNeeds[((takeNeedPhotos).length)+1]=(need)
        }
    }

    return (
        <ContainView>

            <Contents>
                <OverallView>
                    <Label>서비스 카드 번호</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={cardId}
                        onChangeText={text => setCardID(text)}
                    />

                    <Label>브랜드</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={brandNum}
                        onChangeText={text => setBrandNum(text)}
                    />

                    <Label>매장명</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={storeName}
                        onChangeText={text => setStoreName(text)}
                    />

                    <Label>고객명</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={customerName}
                        onChangeText={text => setCustomerName(text)}
                    />

                    <Label>스타일 No.</Label>
                    <Input
                        editable={true}
                        selectTextOnFocus={false}
                        value={styleNum}
                        onChangeText={text => setStyleNum(text)}
                    />


                    <MiddleView>
                        <Label>컬러</Label>
                        <Input
                            editable={true}
                            selectTextOnFocus={false}
                            value={color}
                            onChangeText={text => setColor(text)}
                            style={{ width: 100 }}
                        />

                        <Label>사이즈</Label>
                        <Input
                            editable={true}
                            selectTextOnFocus={false}
                            value={size}
                            onChangeText={text => setSize(text)}
                            style={{ width: 100 }}
                        />
                    </MiddleView>

                    <Label>매장 접수 내용</Label>
                    <BiggerInput multiline={true} value={require}>
                        
                    </BiggerInput>
                </OverallView>

                <OverallView>
                    {pullImage}

                    <Label>근접 사진</Label>
                    <EnlargedPictureView>

                        <PictureView>
                            <SmallLabel>수선 전</SmallLabel>
                            <SmallLabel>(BEFORE)</SmallLabel>
                        </PictureView>

                        <PictureView>
                            <SmallLabel>수선 후</SmallLabel>
                            <SmallLabel>(AFTER)</SmallLabel>
                        </PictureView>

                    </EnlargedPictureView>
                    {beforeImageViews}
                    {repairNeeds}
                </OverallView>




                <BottomView>
                    <SmallButton onPress={() =>
                        navigation.navigate('RepairStepOne')

                    }>
                        <Text>
                            취소
                        </Text>
                    </SmallButton>

                    <SmallButton
                        onPress={() => {
                            postRepairNeedPoint(receiptId,store.getState().photo,takeNeedPhotos)
                            store.dispatch({type:"STORE_ADD_REPAIR_IMAGE",addRepairImageUri:null})
                            store.dispatch({type:"SET_NEED_PHOTOS",needPhotos:[]})
                            navigation.popToTop();
                            navigation.navigate("PhotoStep")
                    }}>
                        <Text>
                            저장
                        </Text>
                    </SmallButton>
                </BottomView>
            </Contents>

            <Bottom navigation={navigation} />
        </ContainView>
    )

}


export default RepairMore;

const DatePickerButton = styled.TouchableOpacity``;

const DateInput = styled.TextInput`
    color: #000000; 
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;

const PickerView = styled.TouchableOpacity`
    width: 100%;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px
    height: 50px;
`;

const PictureView = styled.View`
    minWidth: 100px;
    justify-content: center;
    align-items: center;
`;

const EnlargedPictureView = styled.View`
    flex-direction: row;
    margin-top: 15px;
    justify-content: space-around;
`;

const MiddleView = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
`;

const BottomView = styled.View`
    flex-direction: row;
    margin-bottom:30px;
    justify-content: center;
    align-items: center;                
`;

const ContainImg = styled.View`
    margin-top: 15px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
`;

const AttachImg = styled.TouchableOpacity`
    margin-top: 15px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
`;

const Label = styled.Text`
    font-size: 15px;
    margin: 12px;
    color: #000000;
`;

const SmallLabel = styled.Text`
    font-size: 12px;
    margin-bottom: 7px;
    color: #000000;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    color: #000000;
    border-radius:10px
    height: 50px;
`;

const BiggerInput = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    border : 1.5px;
    color: #000000;
    border-radius:10px
    height: 100px;
`;

const OverallView = styled.View`
    padding: 8px;
    padding-bottom: 30px;
    font-size: 20px;
    border : 1.5px;
    border-radius:10px;
    margin-bottom: 30px;
`;
