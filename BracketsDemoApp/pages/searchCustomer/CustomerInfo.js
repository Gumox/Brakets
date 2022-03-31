import React,{Component} from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _ from 'lodash';
import Bottom from '../../components/Bottom';
import { CheckBox } from 'react-native-elements';
import ViewShot from "react-native-view-shot";
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import ip from '../../serverIp/Ip';

import {
    View,
    Pressable,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    Modal,
    Alert
} from 'react-native';
import store from '../../store/store';
import { PathToFlie } from '../../Functions/PathToFlie';




export default class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#FFFFFF',
            modalVisible: false,
            check1: false,
            check2: false,
            check3: false
        };
    }
    addReceipt = async () => {
        
        var formdata = new FormData();
        
        formdata.append("step",0);
        formdata.append("store", store.getState().store_id);
        formdata.append("staff", store.getState().userInfo[0].staff_id);

        if(store.getState().receptionDivision.id == 3){
        
            formdata.append("customer", 0);
            
        }else{
            formdata.append("customer", store.getState().customer.cId);
            
        }
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
                
                this.props.navigation.navigate('ShopStepOne')
            }
            
            
        } catch (error) {
            console.error(error);
        } finally {
            
        }
        

    }
    
    render(){
        var cstSign;
        if(store.getState().customerSign == ""){console.log("''")}
        if(store.getState().customerSign != ""){
            console.log("this Sav :    "+store.getState().customerSign);
            cstSign =(
                <Image source={{uri: store.getState().customerSign}} style={{width:250,height:140, position : 'absolute',left:0,top:0}}/>
            )
        }else{
            cstSign = (
                <View style={{width:250,height:140, position : 'absolute',left:0,top:0}}></View>
            )
        }
        return (
            <Container>
                    <ContentsScroll>
                        <CenterText>
                            <Label/>
                            <Title>고객 정보</Title>
                            <Label/>
                            <BtView><Label>이름</Label><Label/></BtView>
                            <Input value ={store.getState().customer.cName}></Input>
                            <BtView><Label>연락처</Label><Label/></BtView>
                            <Input value ={store.getState().customer.cPhone}></Input>        
                        </CenterText>
                        <CenterText>
                            <PrView><ImgIcon source={require('../../Icons/caution.png')}/><CautionText>아래 사항들은 고객이 직접 입력하셔야 합니다</CautionText></PrView>
                            <PrView><Label>수선 관련 고지 사항</Label>
                            <TextPrassble onPress={()=>{ this.props.navigation.navigate("Notice")}}>
                                <Text style={{color:"#000000"}}>자세히 보기</Text></TextPrassble>
                                <CheckBox
                                    center
                                    checked={this.state.check1}
                                    checkedColor="red"
                                    onPress={() =>{
                                        const tof = this.state.check1 
                                        this.setState({ check1 :!tof})
                                    }}
                                />
                            </PrView>
                            <PrView><Label>문자 수신 동의 여부</Label>
                            <TextPrassble onPress={()=>{this.props.navigation.navigate("SmsNotice")}}><Text style={{color:"#000000"}} >자세히 보기</Text></TextPrassble>
                                <CheckBox
                                    center
                                    checked={this.state.check2}
                                    checkedColor="red"
                                    onPress={() =>{
                                        const tof = this.state.check2 
                                        this.setState({ check2 :!tof})
                                    }}
                                />
                            </PrView>
                            <PrView><Label>개인 정보 동의 여부</Label>
                            <TextPrassble onPress={()=>{this.props.navigation.navigate("PrivacyNotice")}}><Text style={{color:"#000000"}} >자세히 보기</Text></TextPrassble>
                                <CheckBox
                                    center
                                    checked={this.state.check3}
                                    checkedColor="red"
                                    onPress={() =>{
                                        const tof = this.state.check3 
                                        this.setState({ check3 :!tof})
                                    }}
                                />
                            </PrView>
                        </CenterText>
                        <CenterText>
                            <BtView><Label>고객 서명란</Label><Label/></BtView>
                            <Pressable  onPress={() => this.setState({modalVisible: true})}><View style={{backgroundColor:"#a2a2a2",width:250,height:150,justifyContent:"center",alignItems:"center"}}>
                                <Text style = {{color:"#ffffff" ,fontSize:20}}>고객님 직접 서명하세요</Text>
                                {cstSign}
                            </View></Pressable>
                            <Label/>
                        </CenterText>
                    </ContentsScroll>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({modalVisible: false})
                       
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style ={styles.xView} >    
                        <View style={styles.modalView} >
                           
                            <View style={{flex: 1, flexDirection: 'column',width:"100%",height:"100%"}}>
                                <PrView>
                                    <Pressable style={{height:20}} onPress={() => { this.refs.canvasRef.clear() }}><Text style={{color:"#000000"}}>Clear</Text></Pressable>
                                    <Pressable style={{height:20}} onPress={()=>{

                                        this.refs.viewShot.capture().then(uri => {

                                            console.log("do something with ", uri);
                                            store.dispatch({type:'CUSTOMER_SIGN',customerSign: uri});
                                            this.setState({modalVisible: false})
                                            
                                        })

                                    }}><Text style={{color:"#000000"}}>Save</Text></Pressable>
                                </PrView>
                                <ViewShot ref="viewShot" style ={{flex:1}}>
                                <SketchCanvas
                                    ref="canvasRef"
                                    style={{ flex: 1 }}
                                    strokeColor={'#000000'}
                                    strokeWidth={5}
                                />
                                </ViewShot>
                
                                
                            </View>
                            
                            
                        </View>
                        </View>
                        </View>
                    </Modal>
                    <View style ={{
                        width :"100%",justifyContent:"center",alignItems:'center' ,borderTopColor:"#e2e2e2",borderTopWidth:1 }}>    
                    <Button onPress = {() => {
                        if(this.state.check1 == false){
                            Alert.alert(            
                                "",             
                                "수선 관련 고지 사항에 체크해주세요",                   
                                [                              
                                    { text: "확인"},
                                ]
                            )
                        }else if(this.state.check2 == false){
                            Alert.alert(            
                                "",             
                                "문자 수신 동의 여부에 체크해주세요",                   
                                [                              
                                    { text: "확인"},
                                ]
                            )
                        }else if(this.state.check3 == false){
                            Alert.alert(            
                                "",             
                                "개인 정보 동의 여부에 체크해주세요",                   
                                [                              
                                    { text: "확인"},
                                ]
                            )
                        }else if(store.getState().customerSign == ""){
                            Alert.alert(            
                                "",             
                                "고객 서명란에 싸인해주세요",                   
                                [                              
                                    { text: "확인"},
                                ]
                            )
                        }else {
                            this.addReceipt();
                        }
                    }}>
                        접수하기
                    </Button>
                    </View>
                
                <Bottom navigation={this.props.navigation}/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    xView:{
        backgroundColor: "#78909c",
        borderRadius: 20,
    },
    modalView: {
      margin: 10,
      width : Dimensions.get('window').width-30, 
      height: Dimensions.get('window').height-400,
      backgroundColor: "white",
      borderRadius: 20,
      paddingRight: 5,
      paddingLeft: 5,
      paddingTop: 15,
      
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    }
  });
  const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin-Right:5px;
`;
const Title = styled.Text`
    color:#000000;
  font-size : 24px;
  font-weight : bold;
`;


const Label = styled.Text`
    color:#000000;
    font-size: 18px;
    margin:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-around;
`;
const BtView = styled.View`
    flex-direction: row;
    justify-content:space-between;
    width: 75%;
`;
const Input = styled.TextInput`
    color:#000000;
    width: 80%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const CautionText = styled.Text`
    color: #FF0000;
    font-size:15px;
    margin-Bottom:10px;
`;
const ContentsScroll = styled.ScrollView`
    width: 100%;
    flex: 1;
    align-content: center;
`;
const TextPrassble = styled.Pressable`
    border-bottom: 2px solid;
    margin:12px;
    justifyContent: center;
    align-items: center;
`; 