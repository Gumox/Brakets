// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
import StartPage from './pages/StartPage';

import ReceiptDivision from './pages/receipt/ReceiptDivision';
import SearchCustomer from './pages/searchCustomer/SearchCustomer';
import ShopStepOne from './pages/receipt/ShopStepOne';
import ShopStepTwo from './pages/receipt/ShopStepTwo';


import ShopStepThree from './pages/receipt/stepThree/ShopStepThree';
import ShopStepThree2 from './pages/receipt/stepThree/ShopStepThree2';
import ShopStepThree3 from './pages/receipt/stepThree/ShopStepThree3';
import ShopStepThree4 from './pages/receipt/stepThree/ShopStepThree4';
import ShopStepThree5 from './pages/receipt/stepThree/ShopStepThree5';

import ShopStepFour from './pages/receipt/ShopStepFour';
import ShopStepFive from './pages/receipt/ShopStepFive';
import ShopStepComplete from './pages/receipt/ShopStepComplete';

import TakeOverPage from './pages/takeOver/TakeOverPage';
import CheckBarcode from './pages/takeOver/CheckBarcode';

import LookupPage from './pages/lookup/LookupPage'
import LookupPage2 from './pages/lookup/LookupPage2';
import LookupPage3 from './pages/lookup/LookupPage3';
import LookupInfo from './pages/lookup/LookupInfo';
import LookupInfo2 from './pages/lookup/LookupInfo2';
import LookupInfo3 from './pages/lookup/LookupInfo3';
import LookupInfo4 from './pages/lookup/LookupInfo4';

import Setting from './pages/setting/Setting';

import InputAlternativeNumber from './pages/receipt/InputAlternativeNumber';
import ProductInfo from './pages/receipt/ProductInfo';
import ScanScreen from './Functions/ScanScreen';
import TakePhoto from './Functions/TakePhoto';
import BarcodeScreen from './Functions/BarcodeScreen';
import PhotoControl from './Functions/PhotoControl';
import Capture from './Functions/Capture';
import CustomerInfo from './pages/searchCustomer/CustomerInfo';
import CustomerSearchList from './pages/searchCustomer/CustomerSearchList'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >


        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="StartPage" component={StartPage} />

        {/*접수*/}
        <Stack.Screen name="ReceiptDivision" component={ReceiptDivision} options={{  title: '',headerTitleAlign: 'center' }} />
        <Stack.Screen name="InputAlternativeNumber" component={InputAlternativeNumber} options={{ title: '대체 품번 입력' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ title: '1단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepOne" component={ShopStepOne} options={{ title: '1단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepTwo" component={ShopStepTwo} options={{ title: '2단계' ,headerTitleAlign: 'center'}} />


        <Stack.Screen name="ShopStepThree" component={ShopStepThree} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepThree2" component={ShopStepThree2} options={{ headerShown: false }} />
        <Stack.Screen name="ShopStepThree3" component={ShopStepThree3} options={{ headerShown: false }} />
        <Stack.Screen name="ShopStepThree4" component={ShopStepThree4} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepThree5" component={ShopStepThree5} options={{ title: '3단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepFour" component={ShopStepFour} options={{ title: '4단계' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="ShopStepFive" component={ShopStepFive} options={{ title: '5단계' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="ShopStepComplete" component={ShopStepComplete} options={{ title: '5단계' ,headerTitleAlign: 'center'}} />

        {/*인수*/}
        <Stack.Screen name="TakeOverPage" component={TakeOverPage} options={{  title: '인수' ,headerTitleAlign: 'center'}}/>
        <Stack.Screen name="CheckBarcode" component={CheckBarcode} options={{  title: '' ,headerTitleAlign: 'center'}}/>

        {/*조회*/}
        <Stack.Screen name="LookupPage" component={LookupPage} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="LookupPage2" component={LookupPage2} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="LookupPage3" component={LookupPage3} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="LookupInfo" component={LookupInfo} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="LookupInfo2" component={LookupInfo2} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="LookupInfo3" component={LookupInfo3} options={{ title: '조회' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="LookupInfo4" component={LookupInfo4} options={{ title: '조회' ,headerTitleAlign: 'center'}} />

        <Stack.Screen name="Setting" component={Setting} options={{  title: '설정' ,headerTitleAlign: 'center'}}/>
        
        
        
        {/*고객 검색*/}
        <Stack.Screen name="SearchCustomer" component={SearchCustomer} options={{  title: '',headerTitleAlign: 'center' }} />
        <Stack.Screen name="CustomerSearchList" component={CustomerSearchList} options={{  title: '',headerTitleAlign: 'center' }} />
        <Stack.Screen name="CustomerInfo" component={CustomerInfo} options={{  title: '',headerTitleAlign: 'center' }} />
        
        {/*기능*/}
        <Stack.Screen name="ScanScreen" component={ScanScreen}  options={{  headerShown: false }} />
        <Stack.Screen name="TakePhoto" component={TakePhoto} options={{ headerShown: false }}  />
        <Stack.Screen name="BarcodeScreen" component={BarcodeScreen}  options={{ title: '스캔' ,headerTitleAlign: 'center'}} />
        <Stack.Screen name="PhotoControl" component={PhotoControl} options={{ headerShown: false }}  />
        <Stack.Screen name="Capture" component={Capture} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
