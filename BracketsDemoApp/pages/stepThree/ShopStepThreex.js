import React,{useEffect, Component }  from 'react';
import Contents from '../../components/Contents';
import ButtonBlack from '../../components/ButtonBlack';
import styled from 'styled-components/native';
import ContainView from '../../components/ContainView';
import {Alert, Image, View,Text,useState, StyleSheet,Modal ,Pressable,Dimensions,ScrollView, TouchableOpacity, Animated, Platform, BackHandler} from 'react-native';
import StateBarSolid from '../../components/StateBarSolid';
import StateBarVoid from '../../components/StateBarVoid';
import store from '../../store/store';
import ImageZoom from 'react-native-image-pan-zoom';
import Picker from 'react-native-picker-select';

const TouchableView = styled.TouchableOpacity`
    width: 100%;
    background-color:#d6d6d6;
    border-radius:10px;
`;
const Label = styled.Text`
    font-size: 15px;
    margin-Top: 12px;
    margin-bottom: 12px;
    margin-left:12px;
`;
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-between;
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

const ImgIcon =styled.Image`
    width: 20px;
    height: 20px;
    margin:10px;
`;
const TopStateView = styled.View`
    flex-direction: row;
    padding:24px;
    justify-content: center;
`;
const InfoView =styled.View`
    width: 100%;
    border:2px solid  #78909c;
    border-radius:12px;
    
    padding:15px;
`;
const DropBackground= styled.View`
    width: 220px;
    border-radius:10px;
    font-color:#ffffff
`;
const ContainImg =styled.View`
    background-color:#d6d6d6;
    justify-content: center;
    align-items: center;
`;
export default class ShopStepThreex extends Component<{}>{
    constructor()
    {
        super();
 
        this.state = { 
          
          ViewArray: [], 
 
          Disable_Button: false ,

          
 
        }
        this.select = null;
        this.animatedValue = new Animated.Value(0);
        
        this.Array_Value_Index = 0;

        this.photoUri  =[];
        this.route -this.props;

        
       
 
    }
    componentDidMount() {

        this.props.navigation.addListener(
          'didFocus',
          payload => {
            this.forceUpdate();
          }
        );
        
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton = () => {
        store.dispatch({type:'SELECTTYPERESET',typeSelect: null});
        
        store.dispatch({type:'PHOTORESET',typeSelect: null});
        
        console.log(store.getState().selectType);
        
    }
 
    Add_Repaier_Type = () =>
    {
       console.log("sddd")
        this.animatedValue.setValue(0);
        
        console.log(this.select);
        let New_Added_View_Value = { Array_Value_Index: this.Array_Value_Index }
 
        this.setState({ Disable_Button: true, ViewArray: [ ...this.state.ViewArray, New_Added_View_Value ] }, () =>
        {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() =>
            {
 
                this.setState({ Disable_Button: false });
                console.log(this.Array_Value_Index);
               
            }); 
        });              
    }
 
    
    render()
    {       
        const FullPhotoUri =store.getState().photoArr[0]["value"];
        const PhotoUri =store.getState().photoArr[1]["value"];
        
        var data =[];
        var dataList=[];
        
        var isLoadingStore=true;

        const AnimationValue = this.animatedValue.interpolate(
        {
            inputRange: [ 0, 1 ],
 
            outputRange: [ -59, 0 ]
        });
        
        
        
        let Render_Animated_View = this.state.ViewArray.map(( item, key ) =>
        {
            if(( key ) == this.Array_Value_Index)
            {
                return(
 
                    <Animated.View 
                      key = { key } 
                      style = {[  { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>
                        
                       
                    
                    </Animated.View>
                
              );
            }
            else
            {
                var otherPhotoApi =[];
                const num = 0;
                
                this.photoUri =store.getState().photoArr;
                
                /*for(var i = 0; i<this.photoUri.length;i++){
                   if(this.photoUri[i]["key"] === this.Array_Value_Index ){
                       console.log("");
                   }
                }*/
                return(
                    
                    <View 
                      key = { key } >
 
                        <Text > This Is Row { item.Array_Value_Index } </Text>
                <InfoView>

                    <Text>수선</Text>
                    
                    <TopStateView>
                        <Image style={{width:90, height:100}}
                                            source={{uri:FullPhotoUri}}/>
                        <Image style={{width:90, height:100}}
                                            source={{uri:PhotoUri}}/>
                        <ContainImg><Image style={{width:90, height:100}}/></ContainImg>
                        
                    </TopStateView>

                    <Label>추가 요청 사항</Label>
                    <Input  multiline={ true }/>
                    <Label>수선처</Label>
                        
                </InfoView>
                    </View>
 
                );
            }
        });
        
       

        return(
            <ContainView>
            <TopStateView><StateBarSolid/><StateBarSolid/><StateBarSolid/><StateBarVoid/><StateBarVoid/></TopStateView>
            <Contents>
            <CenterView><TopIntro>수선 정보 확인</TopIntro></CenterView>
            <Label>수선 유형</Label>
            <InfoView>

            <Text>수선</Text>
            
            <TopStateView>
                <Image style={{width:90, height:100}}
                                    source={{uri:FullPhotoUri}}/>
                <Image style={{width:90, height:100}}
                                    source={{uri:PhotoUri}}/>
                <ContainImg><Image style={{width:90, height:100}}/></ContainImg>
                
            </TopStateView>

            <Label>추가 요청 사항</Label>
            <Input  multiline={ true }/>
            <Label>수선처</Label>
            
            </InfoView>
            
            <View style = {{ flex: 1, padding: 2 }}>
                    {
                        Render_Animated_View
                    }
                    </View>
            <Label>수선 유형 추가</Label>
            <InfoView>    
                <Picker
                    placeholder = {{label : '[선택] 옵션을 선택하세요',value: null}}
                    style = { {border :'solid', borderWidth : '3', borderColor : 'black'} }
                    onValueChange={(value) => 
                        {
                            this.select = value;
                            this.Array_Value_Index = this.Array_Value_Index + 1;
                            this.Add_Repaier_Type();
                            store.dispatch({type:'SELECTTYPE',typeSelect: value})
                            console.log(store.getState().selectType)
                            this.props.navigation.replace("TakePhoto",{key:"FullShot",value:this.Array_Value_Index});
                        }
                    }
                    items={[
                        { label: '1.원단', value: '원단' },
                        { label: '2.봉제', value: '봉제' },
                        { label: '3.부자재', value: '부자재' },
                        { label: '4.아트워크', value: '아트워크' },
                        { label: '5.액세서리', value: '액세서리' },
                        { label: '6.기타', value: '기타' }
                    ]}
                    />
            </InfoView>
            <Label>{this.select}</Label>
            
            <Label/>
            </Contents>

        
            
            
            <CenterView>
                <ButtonBlack onPress={ ()=>
                    
                    this.props.navigation.navigate( 'ShopStepFour' ) }>
                    다음
                </ButtonBlack>
            </CenterView>
        </ContainView>
            
        );
    }
}
 
