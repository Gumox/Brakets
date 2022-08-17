import React from 'react'
import {Modal, Text,View,ActivityIndicator,StyleSheet, Pressable} from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config'

function NetworkLoading({visable,setVisable =()=>{},cancelOn = true,text}){
    return(
        <View>
            <Modal
                            animationType="none"
                            transparent={true}
                            visible={visable}
                            onRequestClose={() => {
                                setVisable(!visable)
                            }}
                        >
                           
                           <View style={styles.container}>
                                <ActivityIndicator size="large" color="rgb(0,80,150)" />
                                {text && <Text>{text}</Text>}
                                {cancelOn ?
                                    <Pressable style={{margin:50}} onPress={()=>{setVisable( !visable)}}>
                                        <Text style={{color:'#000000'}}>닫기</Text>
                                    </Pressable>
                                    :<></>
                                }
                                
                            </View>
                            
                        </Modal>
        </View>
    )

}
export default NetworkLoading

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
      backgroundColor : "rgba(125,125,125,0.3)"
    }
  });