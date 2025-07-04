import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
import store from '../../../store/store';
import ViewShot from 'react-native-view-shot';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default class DrawBoard extends Component {
 
    constructor(props) {
        super(props);
    }
 
 
   
 
    onSketchSave() {
        this.refs.viewShot.capture().then(uri => {

            //console.log("do something with ", uri);
            store.dispatch({type:'DRAW',drawingImage: uri});
            //store.dispatch({type:'PHOTO',photo: uri});
            const params = this.props.children[1];
            wait(500).then(() => {
        
                if(params === undefined){
                
                    this.props.navigation.replace("ShopStepThree2");
                    
                }else if(params['toGo'] == 'PhotoControl'){
                    
                    this.props.navigation.replace('Capture');
                    
                }  
            });
            
        })
        
    }
    
    render() {
        //console.log(this.props.children[0]);
        const params = this.props.children[1];
        //console.log("????")
        //console.log(params)
        return (
            <View style={{flex: 1, flexDirection: 'column' ,width : Dimensions.get('window').width, height : Dimensions.get('window').height}}>
                
                <ViewShot ref="viewShot" style ={{flex:1}}>
                    <SketchCanvas
                        ref="canvasRef"
                        style={{ flex: 1 }}
                        strokeColor={this.props.children[0]}
                        strokeWidth={5}
                    />
                </ViewShot>
 
 
                <View style={{ flexDirection: 'row', backgroundColor: '#000',marginTop:10 , height : '10%'}}>
                    <TouchableHighlight underlayColor={"#CCCFFF"} style={{ flex: 1, justifyContent:"center",alignItems: 'center', paddingVertical:20 }} onPress={() => { this.refs.canvasRef.clear() }}>
                        <Text style={{color:'#fff'}}>CLEAR</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCCFFF"} style={{ flex: 1, alignItems: 'center',justifyContent:"center", paddingVertical:20, borderLeftWidth:1, borderRightWidth:1, borderColor:'#000' }} onPress={() => { {
                        this.onSketchSave();
                       
                    } }}>
                        <Text style={{color:'#fff'}}>저장</Text>
                    </TouchableHighlight>
                    
                </View>
            </View>
        );
    }
}