import React, {useState} from 'react';
import Contents from '../components/Contents';
import Button from '../components/Button';
import styled from 'styled-components/native';
import ContainView from '../components/ContainView';
import { Image, View} from 'react-native';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { Alert } from 'react-native';
import Bottom from '../components/Bottom';


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
    border-radius:10px
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
    
    const option = {
        url: 'http://13.125.232.214/api/getProductInfo',
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
            setImageFile(response.data.body[0].image)

            // console.log(response.data.body[0].qrcode)
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
            "QR코드/Barcode 오류",             
            "error",                   
            [                              
                { text: "확인"},
            ]
        )
        //navigation.goBack()
    })


    return (
       
        
            <ContainView>
                <TopStateView><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
                <Contents>
                    
                    <CenterView><TopIntro>제품 정보</TopIntro></CenterView>

                    <Label>제품 바코드 / QR코드 번호</Label>

                    <Input     
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {codeInput}
                        // onChange = { () =>
                        //     alert("코드 변경 불가")
                        // }
                    />

                    <Label>품번</Label>

                    <Input 
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {serialInput}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setSerialInput(text);
                        //   }
                        // }
                    />

                    <Label>제품명</Label>

                    <Input  
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {productName}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setProuctName(text);
                        //   }
                        // }
                    />

                    <Label>시즌</Label>

                    <Input 
                        editable={false} 
                        selectTextOnFocus={false}
                        value = {season}
                        // onChange={(event) => {
                        //     const {eventCount, target, text} = event.nativeEvent;
                        //     setSeason(text);
                        //   }
                        // }
                        
                    />
                    
                    <PrView>

                        <View>

                            <Label>컬러</Label>

                            <Input 
                                editable={false} 
                                selectTextOnFocus={false}
                                value = {colorValue}
                                // onChange={(event) => {
                                //     const {eventCount, target, text} = event.nativeEvent;
                                //     setColorValue(text);
                                //     }
                                // }
                            />

                            <Label>사이즈</Label>

                            <Input
                                editable={false} 
                                selectTextOnFocus={false}
                                value = {size}
                                // onChange={(event) => {
                                //     const {eventCount, target, text} = event.nativeEvent;
                                //     setSize(text);
                                //     }
                                // }
                                style={{ width: 150 }}
                            />

                            <Label>차수</Label>

                            <Input
                                editable={false} 
                                selectTextOnFocus={false}
                                value = {measure}
                                // onChange={(event) => {
                                //     const {eventCount, target, text} = event.nativeEvent;
                                //     setMeasure(text);
                                //     }
                                // }
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

                    <Button  onPress={ ()=> navigation.navigate( 'ShopStepTwo',
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
                    ) }>

                        2단계: 접수 유형 선택
                    </Button>

                </CenterView>
                <Bottom navigation={navigation}/>
            </ContainView>

    )
}

export default ProductInfo;