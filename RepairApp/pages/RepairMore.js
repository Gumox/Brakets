import React, { useState, useEffect,useCallback } from 'react';
import { Text, Image, Alert, View, Pressable } from 'react-native';
import dayjs from 'dayjs';
import axios from "axios";
import _ from 'lodash';

import Contents from '../components/Contents';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import SmallButton from '../components/SmallButton';
import Bottom from '../components/Bottom';
import Ip from '../serverIp/Ip';
import store from '../store/store';
import { PathToFlie } from '../functions/PathToFlie';
import NetworkLoading from '../components/NetworkLoading';

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
    const [visable,setVisable] = useState(false)

    const [takeNeedPhotos,setTakeNeedPhotos] = useState(store.getState().needPhotos);
    const getTargetData = useCallback(async (code) => {
        const { data } = await axios.get(Ip+`/api/RepairDetailInfo?code=${code}`);
        setBrandNum(data.data['brand_name'])
        setStoreName(data.data['store_name'])
        setReceiptId(data.data['receipt_id'])
        setCustomerName(data.data['customer_name'])
        setStyleNum(data.data['style_code'])
        setColor(data.data['color'])
        setSize(data.data['size'])
        setRequire(data.data["store_message"])
        setImage(data.data["image"])
        store.dispatch({type:"IMG",img:Ip+data.data["image"]})
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
            console.log(obj)
            needImages.push({photo:Ip+obj["need_point_image"] , repair_need_id:obj["repair_need_id"],after:Ip+obj["after_need_point_image"],num : obj["number"]})
            console.log()
            console.log(needImages)
            console.log()
            
        });
        setBeforeImages(beforeImgList)
        setAfterImages(afterImgList)
        console.log("********************************")
            console.log(needImages.length)
            console.log()
        if(needImages.length>0){
            let uniqueArr =_.uniqBy([...needImages,...takeNeedPhotos], "repair_need_id");
            setTakeNeedPhotos(uniqueArr)
            store.dispatch({type:"SET_NEED_PHOTOS",needPhotos:uniqueArr})
        }
        
        ////console.log("error : "+Ip+data.data["image"])
        
    });

    const postRepairNeedPoint = async (receipt_id,image,takeNeedPhotos) => {
        let formdata = new FormData();

        formdata.append("receipt", receipt_id);
        formdata.append("store", store.getState().shopId);
        formdata.append("image",  PathToFlie(image));
        console.log(takeNeedPhotos)

        let sortedPhoto = _.sortBy(takeNeedPhotos,"num")

        if(sortedPhoto != null|| sortedPhoto != undefined ||sortedPhoto !== []){

            sortedPhoto.forEach((obj,index) => {
                const img = 'image'+(index+1)
                //console.log(img)
                formdata.append(img, PathToFlie(sortedPhoto[index].photo))
            });
            
        }
        console.log()
        console.log()
        console.log()
        console.log(formdata["_parts"])
        
        
        try {
            const response = await fetch(Ip+'/api/needRepair',{method: 'POST',
            headers: {
                'Accept': ''
                },
            body: formdata
            });
            const json = await response.json();
            console.log(json)
            setVisable(false)
            navigation.popToTop();
            navigation.navigate("PhotoStep")
        } catch (error) {
            console.error(error);
            setVisable(false)
            Alert.alert("전송실패", "다시 시도해 주세요",[{text:"확인"}])
        } finally {

        }
    }




    let beforeImageViews =[];
    for (let i = 0; i < beforeImages.length; i++) {
        const element = beforeImages[i];
        const obj = afterImages[i]
        const key = i
        let afterImage = null
        if(obj){
            if(obj.indexOf("null") < 0 ){
                afterImage = obj
            }
        }
        let before;
        let photo ='afterImageUri'+(key+1);
        
        before =(
            <View key={key} style ={{flexDirection:"row",justifyContent : "space-between"}}> 
                <Pressable onPress={()=>{navigation.navigate("PhotoControl",{img:element})}}>
                    <Image style={{width: 90, height: 120 , margin:15, padding:10, marginLeft:30}} source={{uri : element}}></Image>
                </Pressable>
                <Pressable onPress={()=>{
                    if(afterImage !== null){
                        console.log("afterImage : ",afterImage)
                        navigation.navigate("PhotoControl",{img:afterImage})
                    }
                }}>
                    <Image style={{width: 90, height: 120 , margin:15, padding:10, marginRight:30}} source={{uri : afterImage}}></Image>
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
        pullImage =(
            <View style={{minWidth: 100}}>
                <Label>전체 사진</Label>
                <View style = {{flexDirection:"row", alignItems: "center",justifyContent:"space-around"}}>
                    <Pressable onPress={() => {navigation.navigate('PhotoDraw',{photo : Ip+image ,code:code})}}>
                        <Image
                            style={{ width: 120, height: 160 }}
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
        pullImage =(
            <View style={{minWidth: 100}}>
                <Label>전체 사진</Label>
                <View style = {{flexDirection:"row", alignItems: "center",justifyContent:"space-around"}}>
                    <Pressable onPress={() => {navigation.navigate('PhotoDraw',{photo : Ip+image ,code:code})}}>
                        <Image
                            style={{ width: 120, height: 160 }}
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
    
    
    const repairNeedImage = store.getState().addRepairImageUri;
    let needRepair =[];
    let repairNeeds =[];
        if(repairNeedImage !== null || store.getState().needPhotos !== []){
            let set =(<View key={0} style ={{flexDirection:"row",justifyContent : "space-between"}}><Label>추가 사진</Label></View>)
            repairNeeds[0]= (set)
            takeNeedPhotos.forEach((obj,index) => {
                //console.log(obj)
                let photo=(
                    <View key={index+1} style ={{flexDirection:"row",justifyContent : "space-around"}}>
    
                    <Pressable  style={{ width: 90, height: 140 , paddingTop:10,paddingBottom:10}} onPress={() => {navigation.navigate("AddPhotoControl",{img:obj.photo,code:code})}}>
                        <Image
                            style={{ width: 90, height: 120 }}
                            source={
                                { uri: obj.photo }
                            }
                        />
                    </Pressable>
                    
                    <Pressable  style={{ width: 90, height: 140 , paddingTop:10,paddingBottom:10}} 
                        onPress={() => {
                            if(obj.after){
                                navigation.navigate("PhotoControl",{img:obj.after})
                            }
                        }}>
                        <Image
                            style={{ width: 90, height: 120  }}
                            source={
                                { uri: obj.after }
                            }
                        />
                    </Pressable>
                </View>
                )
                repairNeeds[index+1]=(photo)
    
            });
            if(store.getState().needPhotos.length<4){
                let need = (
                    <View key={takeNeedPhotos.length+1} style ={{flexDirection:"row",justifyContent : "space-between"}}>
    
                        <Pressable onPress={() => {navigation.navigate('TakePhoto',{key:"need",code:code})}}>
                            <View style={{width: 90, height: 120 ,justifyContent:"center",alignContent:"center",backgroundColor:"#828282" ,margin:15, padding:10, marginLeft:30}}>
                                <Text style={{color:"#ffffff",fontSize:16}}>{" 필요 수선"}</Text>
                                <Text style={{color:"#ffffff",fontSize:16}}>{" 부위 추가"}</Text>
                            </View>
                        </Pressable>
                        
                        <Pressable >
                        <View style={{width: 90, height: 120 ,margin:15, padding:10, marginLeft:30}}>
    
                        </View>
                        </Pressable>
                    </View>
                );
                repairNeeds[((takeNeedPhotos).length)+1]=(need)
            }
            needRepair = (repairNeeds)
        }
    useEffect(() => {
        let isApiSubscribed = true;
       
        if (isApiSubscribed) {
            getTargetData(code);
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
        
    }, []);
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
                            style={{ width: 80 }}
                        />

                        <Label>사이즈</Label>
                        <Input
                            editable={true}
                            selectTextOnFocus={false}
                            value={size}
                            onChangeText={text => setSize(text)}
                            style={{ width: 80 }}
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
                    {needRepair}
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
                            setVisable(true)
                            postRepairNeedPoint(receiptId,store.getState().photo,takeNeedPhotos)
                            store.dispatch({type:"STORE_ADD_REPAIR_IMAGE",addRepairImageUri:null})
                            store.dispatch({type:"SET_NEED_PHOTOS",needPhotos:[]})
                    }}>
                        <Text>
                            저장
                        </Text>
                    </SmallButton>
                </BottomView>
            </Contents>
            <NetworkLoading visable={visable} setVisable={setVisable}/>
            <Bottom navigation={navigation} />
        </ContainView>
    )

}


export default RepairMore;

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
