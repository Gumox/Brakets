import React from 'react';
import { Image ,View, Text} from 'react-native';
import Contents from '../../components/Contents';
import styled from 'styled-components/native';
import SelectButton from '../../components/SelectButton';
import Container from '../../components/Container';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import CenterText from '../../components/CenterText';
import TopInfoLess from '../../components/TopInfoLess';
import Bottom from '../../components/Bottom';
import store from '../../store/store';
import ip from '../../serverIp/Ip';

const Label = styled.Text`
    font-size: 15px;
    margin: 20px;
    color:#000000;
`;
const PView = styled.View`
    
    flex-direction: row;
    padding-bottom:24px;
    justify-content: center;
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
const BlueText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color:#78909c;
    margin-Top:40px
`;
const GrayText = styled.Text`
    font-size: 20px;
    color:#858585;
`;
const TopStateView = styled.View`
    
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;

const ImgIcon =styled.Image`
    width: 45px;
    height: 48px;
    padding : 5px;
`;
function ShopStepTwo({navigation}) {
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const bodyData = {
        "brand": store.getState().brand_id,
       
    }
    
    const getProductCategory = async () => {
        
        try {
            const response = await fetch(ip+'/api/getProductCategory',{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bodyData)
            });
            const json = await response.json();
            setData(json.body);
            console.log(json.body);
            console.log(data);
            store.dispatch({type:'GET_APL_TYPE',setAplType: json.body});
            console.log(store.getState().getProductCategory);
            store.dispatch({type:'REQUIREMENT',requirement:{name:"수선",id:1}});
            
            setLoading(false);
           
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            navigation.navigate("ShopStepThree");
        }
    }

    const updateReceipt = async (receipt_id,typeN) => {
        var formdata = new FormData();

        formdata.append("step", "2");
        formdata.append("receipt", receipt_id);
        formdata.append("type", typeN);
        console.log(formdata)

        try {
            const response = await fetch(ip+'/api/updateReceipt',{method: 'POST',
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
    
    
    return (
        <Container>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <TopInfoLess></TopInfoLess>
            <CenterText>
            
                <TopIntro>제품 정보</TopIntro>
                <BlueText>요구 사항</BlueText>
                <GrayText>을 선택하세요</GrayText>
                  
            </CenterText>  
            <PView>
                <CenterView><SelectButton iconImg = {<ImgIcon source={require('../../Icons/repair_blue.png')}/>} onPress={ ()=> {
                    updateReceipt(store.getState().receipt_id,1)
                    getProductCategory();

                }}>수선</SelectButton>
                <SelectButton  iconImg = {<ImgIcon source={require('../../Icons/exchange_blue.png')}/>} onPress={ ()=> {
                    updateReceipt(store.getState().receipt_id,2)
                    store.dispatch({type:'REQUIREMENT',requirement:{name:"교환",id:2}});
                    store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
                    navigation.navigate( 'ScanScreen',{key:'ShopStepFour'} )
                }}>교환</SelectButton></CenterView>
                <CenterView><SelectButton iconImg = {<ImgIcon source={require('../../Icons/refund_blue.png')}/>} onPress={ ()=> {
                    updateReceipt(store.getState().receipt_id,3)
                    store.dispatch({type:'REQUIREMENT',requirement:{name:"환불",id:3}});
                    store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
                    navigation.navigate( 'ScanScreen',{key:'ShopStepFour'} )
                }}>환불</SelectButton>
                <SelectButton iconImg = {<ImgIcon source={require('../../Icons/deliberating_blue.png')}/>} onPress={ ()=> {
                    updateReceipt(store.getState().receipt_id,4)
                    store.dispatch({type:'REQUIREMENT',requirement:{name:"심의",id:4}});
                    store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
                    navigation.navigate( 'ScanScreen',{key:'ShopStepFour'} )
                }}>심의</SelectButton></CenterView>
            </PView>  
            <Label>접수 유형 알아보기</Label>
            <Bottom navigation={navigation}/>
        </Container>
    )
}

export default ShopStepTwo;