
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importing pages
import RepairStepOne from './pages/RepairStepOne';
import PhotoStep from './pages/PhotoStep';
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


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>

        <Stack.Screen name="RepairStepOne" component={RepairStepOne} options={{headerShown: false}}/>

        <Stack.Screen name="PhotoStep" component = {PhotoStep} options={ {  title: '' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="RepairDetail" component = {RepairDetail} options={ {  title: '수선 내역' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="RepairMore" component = {RepairMore} options={ {  title: '수선 내역' ,headerTitleAlign: 'center'} } />

        
        <Stack.Screen name="ProductSend" component = {ProductSend} options={ {  title: '수선 내역' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="RepairInfo" component = {RepairInfo} options={ {  title: '수선 내역' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="MailbagScan" component = {MailbagScan} options={ {  title: '수선 ok' ,headerTitleAlign: 'center'} } />

        <Stack.Screen name="Picture" component = {Picture} options={ {  title: '' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="DetectCode" component = {DetectCode} options={ { headerShown: false }} />
        <Stack.Screen name="PhotoDraw" component = {PhotoDraw} options={ { headerShown: false }} />
        <Stack.Screen name="TakePhoto" component = {TakePhoto} options={ { headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
