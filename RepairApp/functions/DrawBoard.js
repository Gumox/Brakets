import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native'
import ViewShot from 'react-native-view-shot';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import store from '../store/store';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default class DrawBoard extends Component {
 
    constructor(props) {
        super(props);
    }
 
 
   
 
    onSketchSave() {
        this.refs.viewShot.capture().then(uri => {

            console.log("do something with ", uri);
            store.dispatch({type:"STORE_ADD_REPAIR_IMAGE",addRepairImageUri:uri})
            
            const params = this.props.children[1];
            wait(250).then(() => {
                this.props.navigation.replace("DrawStep",{data:this.props.code,image:this.props.image}); 
            });
            
        })
        
    }
    
    render() {
        console.log(this.props.children[0]);
        const params = this.props.children[1];
        console.log("????")
        console.log(params)
        return (
            <View style={{flex: 1, flexDirection: 'column' ,width : Dimensions.get('window').width, height : Dimensions.get('window').height}}>
                
                <ViewShot ref="viewShot" style ={{flex:1}}>
                    <SketchCanvas
                        ref="canvasRef"
                        style={{ flex: 1 }}
                        strokeColor={this.props.children[0]}
                        strokeWidth={14}
                    />
                </ViewShot>
 
 
                <View style={{ flexDirection: 'row', backgroundColor: '#000',marginTop:10 , height : '10%'}}>
                    <TouchableHighlight underlayColor={"#CCCFFF"} style={{ flex: 1, alignItems: 'center', paddingVertical:20 }} onPress={() => { this.refs.canvasRef.clear() }}>
                        <Text style={{color:'#fff',fontWeight:'600'}}>CLEAR</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCCFFF"} style={{ flex: 1, alignItems: 'center', paddingVertical:20, borderLeftWidth:1, borderRightWidth:1, borderColor:'#000' }} onPress={() => { {
                        this.onSketchSave();
                       
                    } }}>
                        <Text style={{color:'#fff',fontWeight:'600'}}>저장</Text>
                    </TouchableHighlight>
                    
                </View>
            </View>
        );
    }
}