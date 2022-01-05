
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importing pages
import RepairStepOne from './pages/RepairStepOne';
import PhotoStepOne from './pages/PhotoStepOne';
import PhotoStepTwo from './pages/PhotoStepTwo';
import RepairDetail from './pages/RepairDetail'

import Picture from './functions/Picture';
import DetectCode from './functions/DetectCode'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="RepairStepOne" component={RepairStepOne} options={{  title: '' ,headerTitleAlign: 'center'}}/>
        <Stack.Screen name="PhotoStepOne" component = {PhotoStepOne} options={ {  title: '' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="PhotoStepTwo" component = {PhotoStepTwo} options={ {  title: '' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="RepairDetail" component = {RepairDetail} options={ {  title: '수선내역' ,headerTitleAlign: 'center'} } />

        <Stack.Screen name="Picture" component = {Picture} options={ {  title: '' ,headerTitleAlign: 'center'} } />
        <Stack.Screen name="DetectCode" component = {DetectCode} options={ {  title: '' ,headerTitleAlign: 'center'} } />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
