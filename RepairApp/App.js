
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

// importing pages
import RepairStepOne from './pages/RepairStepOne';
import PhotoStep from './pages/PhotoStep';
import InputAlternativeNumber from './pages/InputAlternativeNumber';
import RepairDetail from './pages/RepairDetail'
import RepairMore from './pages/RepairMore';
import MailbagScan from './pages/MailbagScan';
import RepairInfo from './pages/RepairInfo';
import ProductSend from './pages/ProductSend';
import PhotoDraw from './functions/PhotoDraw';

import Picture from './functions/Picture';
import DetectCode from './functions/DetectCode'
import Login from './pages/Login';
import TakePhoto from './functions/TakePhoto';
import DrawStep from './functions/DrawStep';
import PhotoControl from './functions/PhotoControl';
import AddPhotoControl from './functions/AddPhotoControl';
const Stack = createNativeStackNavigator();

function App() {
  const textColor ="#806946"
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"#ffffff"}}}>

        <Stack.Screen name="Login" component={Login} options={{headerShown: false, headerTintColor: textColor}}/>

        <Stack.Screen name="PhotoStep" component = {PhotoStep} options={ {  title: '수선 촬영 선택' ,headerTitleAlign: 'center', headerTintColor: textColor} } />

        <Stack.Screen name="InputAlternativeNumber" component = {InputAlternativeNumber} options={ {  title: '코드 수동 입력' , headerTitleAlign: 'center', headerTintColor: textColor} } />

        <Stack.Screen name="RepairDetail" component = {RepairDetail} options={ {  title: '수선 내역' ,headerTitleAlign: 'center', headerTintColor: textColor} } />
        <Stack.Screen name="RepairMore" component = {RepairMore} options={ {  title: '수선 내역' ,headerTitleAlign: 'center', headerTintColor: textColor} } />

        
        <Stack.Screen name="ProductSend" component = {ProductSend} options={ {  title: '수선 내역' ,headerTitleAlign: 'center', headerTintColor: textColor} } />
        <Stack.Screen name="RepairInfo" component = {RepairInfo} options={ {  title: '수선 내역' ,headerTitleAlign: 'center', headerTintColor: textColor} } />
        <Stack.Screen name="MailbagScan" component = {MailbagScan} options={ {  title: '수선 ok' ,headerTitleAlign: 'center', headerTintColor: textColor} } />


        <Stack.Screen name="RepairStepOne" component={RepairStepOne} options={{title: '', headerLeft: null, headerTintColor: textColor}}/>

        <Stack.Screen name="Picture" component = {Picture} options={ {  title: '', headerTintColor: textColor} } />
        <Stack.Screen 
          name="DetectCode" 
          component = {DetectCode} 
          options={ 
            (
              Platform.OS == 'ios'
            ) ? (
              {headerShown: true, title: '', headerTintColor: textColor}
            ) : (
              {headerShown: false}
            )}
          />

        <Stack.Screen 
          name="PhotoDraw"
          component = {PhotoDraw} 
          options={ 
            (
              Platform.OS == 'ios'
            ) ? (
              {headerShown: true, title: '', headerTintColor: textColor}
            ) : (
              {headerShown: false}
            )}
        />
        <Stack.Screen name="TakePhoto" component = {TakePhoto} options={ { headerShown: false }} />
        <Stack.Screen name="DrawStep" component = {DrawStep} options={ { headerShown: false }} />
        <Stack.Screen name="PhotoControl" component = {PhotoControl} options={ { headerShown: false }} />
        <Stack.Screen name="AddPhotoControl" component = {AddPhotoControl} options={ { headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
