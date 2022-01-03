import React,{Component} from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import CenterText from '../../components/CenterText';
import _, { values } from 'lodash';
import Bottom from '../../components/Bottom';
import CustomSearch from './CustomSearch';
import Contents from '../../components/Contents'; 
import { CheckBox, Icon } from 'react-native-elements';


import {
    View,
    Pressable,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image,
    StyleSheet,
    Modal,
    Alert
} from 'react-native';
import SketchDraw from 'react-native-sketch-draw';
import store from '../../store/store';
import { PathToFlie } from '../../Functions/PathToFlie';

const SketchDrawConstants = SketchDraw.constants;
 
const tools = {};
 
tools[SketchDrawConstants.toolType.pen.id] = {
    id: SketchDrawConstants.toolType.pen.id,
    name: SketchDrawConstants.toolType.pen.name,
    nextId: SketchDrawConstants.toolType.eraser.id
};
tools[SketchDrawConstants.toolType.eraser.id] = {
    id: SketchDrawConstants.toolType.eraser.id,
    name: SketchDrawConstants.toolType.eraser.name,
    nextId: SketchDrawConstants.toolType.pen.id
};

const Title = styled.Text`
  font-size : 24px;
  font-weight : bold;
`;

const BlackText = styled.Text`
  margin-Top : 15px ;
  font-size : 15px;
  color : black;
`;
const DropBackground= styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff;
    border:2px solid #78909c;
    margin-top:10px;
`;
const Label = styled.Text`
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
    width: 80%;
    padding: 8px;
    font-size: 20px;
    background-color:#d6d6d6;
    border-radius:10px
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
export default class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#FFFFFF',
            toolSelected: SketchDrawConstants.toolType.pen.id,
            modalVisible: false,
            check1: false,
            check2: false,
            check3: false
        };
    }
 
    onSketchSave(saveEvent) {
        this.props.onSave && this.props.onSave(saveEvent);
        
        const image = "file://"+saveEvent.localFilePath;

        console.log(image);
        store.dispatch({type:'CUSTOMER_SIGN',customerSign: image});
        this.setState({modalVisible: false})
        console.log(PathToFlie(image));
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
                            <PrView><Label>수선 관련 고지 사항</Label><TextPrassble>
                                <Text>자세히 보기</Text></TextPrassble>
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
                            <PrView><Label>문자 수신 동의 여부</Label><TextPrassble><Text>자세히 보기</Text></TextPrassble>
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
                            <PrView><Label>개인 정보 동의 여부</Label><TextPrassble><Text>자세히 보기</Text></TextPrassble>
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
                                    <Pressable  onPress={() => { this.refs.sketchRef.clearSketch() }}><Text>Clear</Text></Pressable>
                                    <Pressable onPress={()=>{this.refs.sketchRef.saveSketch()}}><Text>Save</Text></Pressable>
                                </PrView>
                                <SketchDraw style={{flex: 1 }} ref="sketchRef"
                                selectedTool={this.state.toolSelected} 
                                toolColor={"#000000"} 
                                onSaveSketch={this.onSketchSave.bind(this)}
                                />
                
                                
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
                            this.props.navigation.navigate('ShopStepOne')
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
