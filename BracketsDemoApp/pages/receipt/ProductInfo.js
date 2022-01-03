import React, {useState} from 'react';
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

const Label = styled.Text`
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
    
    const option = {
        url: 'http://34.64.182.76/api/getProductInfo',
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

    axios(option)
    .then(
        response => (response.status == '200') ? (
            // TODO
            // () ? (qrcode) : (barcode)
            setCodeInput(response.data.body[0].qrcode),

            setSerialInput(String(response.data.body[0].product_id)),
            setProuctName(response.data.body[0].name),
            setSeason(response.data.body[0].season),
            setColorValue(response.data.body[0].color),
            setSize(response.data.body[0].size),
            setMeasure(response.data.body[0].degree),
            setImageFile(response.data.body[0].image),
            setMfrid(response.data.body[0].mfr_id),
            setPid(response.data.body[0].product_id)
            
        ) : (
            //navigation.goBack(),
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



   
    
    const addReceipt = async () => {
        var formdata = new FormData();

        formdata.append("store", 2);// 임시
        formdata.append("brand", 2);// 임시
        formdata.append("staff", store.getState().receptionDivision.id);
        formdata.append("customer", store.getState().customer.cId);//임시
        
        formdata.append("pid", serialInput);
        formdata.append("pcode", codeInput);
        formdata.append("substitute", 0);//임시
        formdata.append("mfrid", mfrid);

        formdata.append("signature",  PathToFlie(store.getState().customerSign));
        console.log(formdata)
        
        try {
            const response = await fetch('http://34.64.182.76/api/addReceipt',{method: 'POST',
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

                    }}>

                        2단계: 접수 유형 선택
                    </Button>

                </CenterView>
                <Bottom navigation={navigation}/>
            </ContainView>

    )
}

export default ProductInfo;