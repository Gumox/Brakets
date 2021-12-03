import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
import SketchDraw from 'react-native-sketch-draw';
import store from '../../store/store';

import RNImageTools from 'react-native-image-tools-wm';

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
 
export default class DrawBoard extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            color: '#FFFFFF',
            toolSelected: SketchDrawConstants.toolType.pen.id
        };
    }
 
    isEraserToolSelected() {
        return this.state.toolSelected === SketchDrawConstants.toolType.eraser.id;
    }
 
    toolChangeClick() {
        this.setState({toolSelected: tools[this.state.toolSelected].nextId});
    }
 
    getToolName() {
        return tools[this.state.toolSelected].name;
    }
 
    onSketchSave(saveEvent) {
        this.props.onSave && this.props.onSave(saveEvent);
        //console.log(saveEvent.localFilePath)
        const params = this.props.children[1];
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log(params)
        console.log("");
        console.log("");
        const imageUri ="file://"+saveEvent.localFilePath;
        
        const image1 = "file://"+this.props.localSourceImagePath;
        const image2 = "file://"+saveEvent.localFilePath;

        RNImageTools.merge(
            [
                image1,
                image2
            ]
        ).then(mergedImage => {
            
            if(params === undefined){
                
                store.dispatch({type:'PHOTO',photo: mergedImage.uri});
                console.log("::: " + store.getState().photo)
                this.props.navigation.replace("ShopStepThree2");

            }else if(params['toGo'] == 'PhotoControl'){
                console.log("????????")
                store.dispatch({type:'PHOTO',photo: mergedImage.uri});
                
                this.props.navigation.replace('PhotoControl',{index: params.index,value: mergedImage.uri});
            }
            //console.log(mergedImage.uri)
            
        }).catch(console.error);
        
    }
    
    render() {
        console.log(this.props.children[0]);
        const params = this.props.children[1];
        console.log("????")
        console.log(params)
        return (
            <View style={{flex: 1, flexDirection: 'column' ,width : Dimensions.get('window').width, height : Dimensions.get('window').height}}>
                
                <SketchDraw style={{flex: 1 }} ref="sketchRef"
                selectedTool={this.state.toolSelected} 
                toolColor={this.props.children[0]} //Yelow Example! you can changIT!
                onSaveSketch={this.onSketchSave.bind(this)}
                />
 
                <View style={{ flexDirection: 'row', backgroundColor: '#000',marginTop:10}}>
                    <TouchableHighlight underlayColor={"#CCCFFF"} style={{ flex: 1, alignItems: 'center', paddingVertical:20 }} onPress={() => { this.refs.sketchRef.clearSketch() }}>
                        <Text style={{color:'#fff',fontWeight:'600'}}>CLEAR</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"#CCCFFF"} style={{ flex: 1, alignItems: 'center', paddingVertical:20, borderLeftWidth:1, borderRightWidth:1, borderColor:'#000' }} onPress={() => { {
                        this.refs.sketchRef.saveSketch()
                       
                    } }}>
                        <Text style={{color:'#fff',fontWeight:'600'}}>저장</Text>
                    </TouchableHighlight>
                    
                </View>
            </View>
        );
    }
}