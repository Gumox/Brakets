import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image,
    Pressable
} from 'react-native';

import SketchDraw from 'react-native-sketch-draw';
import styled from 'styled-components';
import store from '../../store/store';

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
const PrView = styled.View`
    flex-direction: row;
    justify-content:space-around;
`;
export default class CustomerSignPad extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            color: '#FFFFFF',
            toolSelected: SketchDrawConstants.toolType.pen.id
        };
    }
 
 
   
 
    onSketchSave(saveEvent) {
        this.props.onSave && this.props.onSave(saveEvent);
        
        const image = "file://"+saveEvent.localFilePath;

        console.log(image);
        store.dispatch({type:'CUSTOMER_SIGN',customerSign: image});
    }
    
    render() {
        
        return (
            <View style={{flex: 1, flexDirection: 'column',width:"100%",height:"100%"}}>
                <PrView><Pressable  onPress={() => { this.refs.sketchRef.clearSketch() }}><Text>Clear</Text></Pressable><Pressable onPress={()=>{this.refs.sketchRef.saveSketch()}}><Text>Save</Text></Pressable></PrView>
                <SketchDraw style={{flex: 1 }} ref="sketchRef"
                selectedTool={this.state.toolSelected} 
                toolColor={"#000000"} 
                onSaveSketch={this.onSketchSave.bind(this)}
                />
 
                
            </View>
        );
    }
}