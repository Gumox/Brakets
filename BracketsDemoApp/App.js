// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartPage from './pages/StartPage';

import ShopStepOne from './pages/ShopStepOne';
import ShopStepTwo from './pages/ShopStepTwo';
import ShopStepThree from './pages/ShopStepThree';
import ShopStepFour from './pages/ShopStepFour';
import ShopStepFour2 from './pages/ShopStepFour2';
import ShopStepFive from './pages/ShopStepFive';
import ShopStepComplete from './pages/ShopStepComplete';

import Detail from './pages/Detail';
import Form from './pages/Form';
import InputAlternativeNumber from './pages/InputAlternativeNumber';
import ProductInfo from './pages/ProductInfo';
import ScanScreen from './Functions/ScanScreen';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartPage" component={StartPage} />
        
        <Stack.Screen name="ShopStepOne" component={ShopStepOne} options={{ title: '1단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepTwo" component={ShopStepTwo} options={{ title: '2단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepThree" component={ShopStepThree} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />
        

        <Stack.Screen name="ShopStepFour" component={ShopStepFour} options={{ title: '4단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepFour2" component={ShopStepFour2} options={{ title: '4단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepFive" component={ShopStepFive} options={{ title: '5단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepComplete" component={ShopStepComplete} options={{ title: '5단계' ,headerTitleAlign: 'center'}} />


        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Form" component={Form} options={{ title: '일기 작성' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="InputAlternativeNumber" component={InputAlternativeNumber} options={{ title: '대체 품번 입력' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ title: '1단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ScanScreen" component={ScanScreen}  options={{ title: 'QR 코드 / 바코드 스캔' ,headerTitleAlign: 'center'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
