import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import ImageZoom from "react-native-image-pan-zoom";
import store from "../store/store";

import { Image, View, StyleSheet, Modal, Text } from "react-native";


import Button from '../components/Button';
import CenterText from '../components/CenterText';
import _ from 'lodash';
import StateBarSolid from '../components/StateBarSolid';
import StateBarVoid from '../components/StateBarVoid';
import ButtonBlack from '../components/ButtonBlack';

const CenterView =styled.View`
    align-items: center;
`;

const AllImage = styled.Image`
  width
  height : 50%;
`;

function ShopStepThree2 ({ navigation }) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const imgUri =store.getState().picture;

  
  const styles = StyleSheet.create({
    
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      paddingRight: 5,
      paddingLeft: 5,
      paddingTop: 15,
      paddingBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    }
  });
  return (
    <Container>
      <CenterView>
                                  
        
            <Image
            style = {{ width : window.width, height : 500}}
            source={{uri:imgUri}}
            />

            <ButtonBlack onPress={ ()=> navigation.navigate('ShopStepFour') }>
                다음 단계
            </ButtonBlack>
      </CenterView>
    </Container>

  );
}


export default ShopStepThree2;