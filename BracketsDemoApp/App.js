// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartPage from './pages/StartPage';

import TakeOverPage from './pages/takeOver/TakeOverPage';
import TakeOverPage2 from './pages/takeOver/TakeOverPage2';
import TakeOverPage3 from './pages/takeOver/TakeOverPage3';
import TakeOverPage4 from './pages/takeOver/TakeOverPage4';

import LookupPage from './pages/lookup/LookupPage'
import Mypage from './pages/mypage/Mypage';
import ReceiptDivision from './pages/receipt/ReceiptDivision';

import ShopStepOne from './pages/ShopStepOne';
import ShopStepTwo from './pages/ShopStepTwo';


import ShopStepThree from './pages/stepThree/ShopStepThree';
import ShopStepThree2 from './pages/stepThree/ShopStepThree2';
import ShopStepThree3 from './pages/stepThree/ShopStepThree3';
import ShopStepThree4 from './pages/stepThree/ShopStepThree4';
import ShopStepThree5 from './pages/stepThree/ShopStepThree5';

import ShopStepFour from './pages/ShopStepFour';
import ShopStepFour2 from './pages/ShopStepFour2';
import ShopStepFive from './pages/ShopStepFive';
import ShopStepComplete from './pages/ShopStepComplete';

import Detail from './pages/Detail';
import Form from './pages/Form';
import InputAlternativeNumber from './pages/InputAlternativeNumber';
import ProductInfo from './pages/ProductInfo';
import ScanScreen from './Functions/ScanScreen';
import TakePhoto from './Functions/TakePhoto';
import BarcodeScreen from './Functions/BarcodeScreen';
import PhotoControl from './Functions/PhotoControl';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="TakeOverPage" component={TakeOverPage} options={{  title: '인수 정보\n(1)고객정보' ,headerTitleAlign: 'center' }}/>
        <Stack.Screen name="TakeOverPage2" component={TakeOverPage2} options={{  title: '인수 정보\n(2)제품정보' ,headerTitleAlign: 'center'}}/>
        <Stack.Screen name="TakeOverPage3" component={TakeOverPage3} options={{  title: '인수 정보\n(3)고객요구' ,headerTitleAlign: 'center'}}/>
        <Stack.Screen name="TakeOverPage4" component={TakeOverPage4} options={{  title: '인수 정보\n(4)수선정보' ,headerTitleAlign: 'center'}}/>
        <Stack.Screen name="LookupPage" component={LookupPage} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="MyPage" component={Mypage} options={{  title: '마이페이지' ,headerTitleAlign: 'center'}}/>
        
        
        <Stack.Screen name="ReceiptDivision" component={ReceiptDivision} options={{  title: '',headerTitleAlign: 'center' }} />
        <Stack.Screen name="ShopStepOne" component={ShopStepOne} options={{ title: '1단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepTwo" component={ShopStepTwo} options={{ title: '2단계' ,headerTitleAlign: 'center'}} />


        <Stack.Screen name="ShopStepThree" component={ShopStepThree} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepThree2" component={ShopStepThree2} options={{ headerShown: false }} />
        <Stack.Screen name="ShopStepThree3" component={ShopStepThree3} options={{ headerShown: false }} />
        <Stack.Screen name="ShopStepThree4" component={ShopStepThree4} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepThree5" component={ShopStepThree5} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />
        
        

        <Stack.Screen name="ShopStepFour" component={ShopStepFour} options={{ title: '4단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepFour2" component={ShopStepFour2} options={{ title: '4단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepFive" component={ShopStepFive} options={{ title: '5단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepComplete" component={ShopStepComplete} options={{ title: '5단계' ,headerTitleAlign: 'center'}} />


        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Form" component={Form} options={{ title: '일기 작성' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="InputAlternativeNumber" component={InputAlternativeNumber} options={{ title: '대체 품번 입력' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ title: '1단계' ,headerTitleAlign: 'center'}} />


        <Stack.Screen name="ScanScreen" component={ScanScreen}  options={{ title: 'QR 코드 스캔' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="TakePhoto" component={TakePhoto} options={{ headerShown: false }}  />
        <Stack.Screen name="BarcodeScreen" component={BarcodeScreen}  options={{ title: '스캔' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="PhotoControl" component={PhotoControl} options={{ headerShown: false }}  />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
