import React from 'react'
import {Modal, Text,View,ActivityIndicator,StyleSheet, Pressable} from 'react-native'
import COLOR from '../contents/color'

function NetworkLoading({visable,setVisable =()=>{}}){
    console.log("visable",visable)
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
                                <ActivityIndicator size="large" color={COLOR.SOIL} />
                                <Pressable style={{margin:50}} onPress={()=>{setVisable( !visable)}}>
                                    <Text style={{color:'#000000'}}>닫기</Text>
                                </Pressable>
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