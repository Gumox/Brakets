import React, {useEffect, useState} from 'react';
import Contents from '../../components/Contents';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import { Image, View, Text} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { Alert } from 'react-native';
import TopInfoLess from '../../components/TopInfoLess';
import Bottom from '../../components/Bottom';
import store from '../../store/store';
import { PathToFlie } from '../../Functions/PathToFlie';
import ip from '../../serverIp/Ip';

const Label = styled.Text`
    color:#000000;
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
    margin-bottom:30px;
    padding-bottom:30px;
`;
const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
    color:#000000
`;
const CenterView =styled.View`
    align-items: center;
`;
const TopIntro =styled.Text`
    color:#000000;
    font-size: 25px;
    font-weight: bold;
    margin: 15px;
`;
const ContainImg =styled.View`
    margin-top: 40px;
    background-color:#d6d6d6;
    border-radius:12px;
    justify-content: center;
    align-items: center;
`;
const TopStateView = styled.View`
 
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;


function ProductInfo({navigation, route}) {
   
    const codeType = route.params.codeType
    const [codeInput, setCodeInput] = useState(route.params.code)
    const [serialInput, setSerialInput] = useState(route.params.serial)
    const [productName, setProuctName] = useState('')
    const [season, setSeason] = useState('')
    const [colorValue, setColorValue] = useState('')
    const [size, setSize] = useState('')
    const [measure, setMeasure] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [pid, setPid] = useState('')
    const [mfrid, setMfrid] = useState('')
    const [brandId, setBrandId] = useState('')

    const checkBrand=(myBrand,productBrand)=>{
        if(myBrand != productBrand){
            navigation.goBack();
            Alert.alert("","자사 브랜드 제품이 아닙니다 제품을 확인 해주세요");
        }
    }
    
    
    useEffect(()=>{
        const fetch= ()=>{
            const option = {
                url: ip+'/api/getProductInfo',
                method: 'POST',
        
                // 
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    type: codeType,
                    code: codeInput
                }
            }
            console.log(codeType)
            axios(option)
            .then(
                response => (response.status == '200') ? (
                    // TODO
                    // () ? (qrcode) : (barcode)
                    setCodeInput(response.data.body[0].qrcode),
        
                    setSerialInput(String(response.data.body[0].style_code)),
                    setProuctName(response.data.body[0].name),
                    setSeason(response.data.body[0].season_code),
                    setColorValue(response.data.body[0].color),
                    setSize(response.data.body[0].size),
                    setMeasure(response.data.body[0].degree),
                    setImageFile(response.data.body[0].image),
                    setMfrid(response.data.body[0].mfr_id),
                    setPid(response.data.body[0].product_id),
                    setBrandId(response.data.body[0].brand_id),
                    store.dispatch({type:'SEASON_ID',season_id: response.data.body[0].season_id}),
                    console.log(response.data.body[0]),
                    
                    checkBrand(store.getState().brand_id,response.data.body[0].brand_id)
                    
                ) : (
                    navigation.goBack(),
                    Alert.alert(            
                        "QR코드/Barcode 오류",             
                        "알맞은 QR코드/Barcode를 입력하세요",                   
                        [                              
                            { text: "확인"},
                        ]
                    ),
                    console.log("204")
                )
                )
            .catch(function(error){
                console.log(error)
                Alert.alert(            
                    "인터넷 연결 실패",                                
                    [                              
                        { text: "확인"},
                    ]
                )
                navigation.goBack()
            })
        }
        fetch();
    },[])



    
    
    const addReceipt = async () => {
        
        var formdata = new FormData();

        formdata.append("store", store.getState().store_id);
        formdata.append("brand", store.getState().brand_id);
        formdata.append("staff", store.getState().userInfo[0].staff_id);
        formdata.append("category", store.getState().receptionDivision.id);
        console.log("store.getState().receptionDivision:",store.getState().receptionDivision)
        if(store.getState().receptionDivision.id == 3){
        
            formdata.append("customer", 0);
            
        }else{
            formdata.append("customer", store.getState().customer.cId);
            
        }
        
        
        formdata.append("pid", serialInput);
        formdata.append("pcode", codeInput);
        formdata.append("substitute", 0);//임시
        formdata.append("mfrid", mfrid);

        formdata.append("signature",  PathToFlie(store.getState().customerSign));
        console.log(formdata)
        
        try {
            const response = await fetch(ip+'/api/addReceipt',{method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'multipart/form-data'
                },
            body: formdata
            });
            const json = await response.json();
            
            console.log(json);
            if(json.receipt_id != undefined){

                store.dispatch({type:'RECEIPT_ID',receipt_id: json.receipt_id});
            }
            console.log(store.getState().receipt_id + "...........")
            navigation.navigate( 'ShopStepTwo',
                { 
                codeType: codeType, 
                code: codeInput, 
                serialInput: serialInput,
                productName: productName,
                season: season,
                colorValue: colorValue,
                size: size,
                measure: measure,
                imageFile: imageFile
                }
            )
            
            
        } catch (error) {
            console.error(error);
        } finally {
            
        }
        

    }


    return (
       
        
            <ContainView>
                <TopStateView><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
                
                <TopInfoLess/>
                
                <Contents>
                    
                    <CenterView><TopIntro>제품 정보</TopIntro></CenterView>

                    <Label>제품 바코드 / QR코드 번호</Label>

                    <Input     
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {codeInput}
                    />

                    <Label>스타일 No.</Label>

                    <Input 
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {serialInput}
                    />

                    <Label>제품명</Label>

                    <Input  
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {productName}
                    />

                    <Label>시즌</Label>

                    <Input 
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {season}
                        
                    />
                    
                    <PrView>

                        <View>

                            <Label>컬러</Label>

                            <Input 
                                editable={false} 
                                selectTextOnFocus={false}
                                value = {colorValue}
                            />

                            <Label>사이즈</Label>

                            <Input
                                editable={false} 
                                selectTextOnFocus={false}
                                value = {size}
                                style={{ width: 150 }}
                            />

                            <Label>차수</Label>

                            <Input
                                editable={false} 
                                selectTextOnFocus={false}
                                value = {measure}
                                style={{ width: 150 }}
                            />
                            
                        </View>
                        
                        <ContainImg>

                            <Image 
                                style={{width:160,height:180}}
                                resizeMode = 'contain'
                                source = {imageFile ? {
                                    uri: imageFile
                                } : 
                                    null
                                }
                            />

                        </ContainImg>

                    </PrView>
                
                </Contents>

                <CenterView>

                    <Button  onPress={ ()=> {
                        console.log(codeInput)
                        addReceipt();
                        

                    }}>

                        2단계: 접수 유형 선택
                    </Button>

                </CenterView>
                <Bottom navigation={navigation}/>
            </ContainView>

    )
}

export default ProductInfo;