// In App.js in a new project

import React ,{useState}from 'react';
import { Platform,StatusBar} from 'react-native';
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
import ShopStepFour2 from './pages/receipt/ShopStepFour2';
import ShopStepFive from './pages/receipt/ShopStepFive';
import ShopStepComplete from './pages/receipt/ShopStepComplete';

import TakeOverPage from './pages/takeOver/TakeOverPage';
import CheckBarcode from './pages/takeOver/CheckBarcode';

import LookupPage from './pages/lookup/LookupPage';
import LookupInfo from './pages/lookup/LookupInfo';
import LookupInfo2 from './pages/lookup/LookupInfo2';
import LookupInfo3 from './pages/lookup/LookupInfo3';
import LookupInfo4 from './pages/lookup/LookupInfo4';

import Setting from './pages/setting/Setting';

import InputAlternativeNumber from './pages/receipt/InputAlternativeNumber';
import manualInputNumber from './pages/receipt/manualInputNumber';
import ProductInfo from './pages/receipt/ProductInfo';
import ScanScreen from './Functions/ScanScreen';
import TakePhoto from './Functions/TakePhoto';
import BarcodeScreen from './Functions/BarcodeScreen';
import PhotoControl from './Functions/PhotoControl';
import Capture from './Functions/Capture';
import AddCustomer from './pages/searchCustomer/addCustomer/AddCustomer'
import CustomerInfo from './pages/searchCustomer/CustomerInfo';
import CustomerSearchList from './pages/searchCustomer/CustomerSearchList';
import Notice from './pages/searchCustomer/Notice'
import SmsNotice from './pages/searchCustomer/SmsNotice';
import PrivacyNotice from './pages/searchCustomer/PrivacyNotice';
import EnlargePhoto from './Functions/EnlargePhoto';

const Stack = createNativeStackNavigator();

function App() {
  const textColor = "rgb(0,80,130)";
  let statusBarColor = "#000000";
  let statusBarStyle = "light-content"
  if(Platform.OS === 'ios'){
    statusBarColor = "#ffffff";
    statusBarStyle = "dark-content"
  }

  

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle}/>
      <Stack.Navigator >


        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="StartPage" component={StartPage} /> */}

        {/*접수*/}
        <Stack.Screen name="ReceiptDivision" component={ReceiptDivision} options={{title: '', headerLeft: null, headerTintColor: textColor}} />
        <Stack.Screen name="InputAlternativeNumber" component={InputAlternativeNumber} options={{ title: '' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="manualInputNumber" component={manualInputNumber} options={{ title: '' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ title: '1단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="ShopStepOne" component={ShopStepOne} options={{ title: '1단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />

        <Stack.Screen name="ShopStepTwo" component={ShopStepTwo} options={{ title: '2단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />


        <Stack.Screen name="ShopStepThree" component={ShopStepThree} options={{ title: '3단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="ShopStepThree2" component={ShopStepThree2} options={{ headerShown: false }} />
        <Stack.Screen name="ShopStepThree3" component={ShopStepThree3} options={{ headerShown: false }} />
        <Stack.Screen name="ShopStepThree4" component={ShopStepThree4} options={{ title: '3단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="ShopStepThree5" component={ShopStepThree5} options={{ title: '3단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />

        <Stack.Screen name="ShopStepFour" component={ShopStepFour} options={{ title: '4단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="ShopStepFour2" component={ShopStepFour2} options={{ title: '4단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />

        <Stack.Screen name="ShopStepFive" component={ShopStepFive} options={{ title: '5단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="ShopStepComplete" component={ShopStepComplete} options={{ title: '5단계' ,headerTitleAlign: 'center', headerTintColor: textColor}} />

        {/*인수*/}
        <Stack.Screen name="TakeOverPage" component={TakeOverPage} options={{  title: '인수' ,headerTitleAlign: 'center', headerTintColor: textColor}}/>
        <Stack.Screen name="CheckBarcode" component={CheckBarcode} options={{  title: '' ,headerTitleAlign: 'center', headerTintColor: textColor}}/>

        {/*조회*/}
        <Stack.Screen name="LookupPage" component={LookupPage} options={{ title: '조회' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="LookupInfo" component={LookupInfo} options={{ title: '조회' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="LookupInfo2" component={LookupInfo2} options={{ title: '조회' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="LookupInfo3" component={LookupInfo3} options={{ title: '조회' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="LookupInfo4" component={LookupInfo4} options={{ title: '조회' ,headerTitleAlign: 'center', headerTintColor: textColor}} />

        <Stack.Screen name="Setting" component={Setting} options={{  title: '설정' ,headerTitleAlign: 'center', headerTintColor: textColor}}/>
        
        
        
        {/*고객*/}
        <Stack.Screen name="SearchCustomer" component={SearchCustomer} options={{  title: '',headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="CustomerSearchList" component={CustomerSearchList} options={{  title: '',headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="CustomerInfo" component={CustomerInfo} options={{  title: '',headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} options={{  title: '',headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="Notice" component={Notice} options={{  title: '수선 관련 고지 사항',headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="SmsNotice" component={SmsNotice} options={{  title: '문자 수신 동의 여부',headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="PrivacyNotice" component={PrivacyNotice} options={{  title: '개인 정보 동의 여부',headerTitleAlign: 'center', headerTintColor: textColor}} />
        
        {/*기능*/}
        <Stack.Screen
          name="ScanScreen" 
          component = {ScanScreen} 
          options={ 
            (
              Platform.OS == 'ios'
            ) ? (
              {headerShown: true, title: '', headerTintColor: textColor}
            ) : (
              {headerShown: false}
            )}
        />
        <Stack.Screen name="TakePhoto" component={TakePhoto} options={{ headerShown: false }}  />
        <Stack.Screen name="BarcodeScreen" component={BarcodeScreen}  options={{ title: '스캔' ,headerTitleAlign: 'center', headerTintColor: textColor}} />
        <Stack.Screen name="PhotoControl" component={PhotoControl} options={{ headerShown: false }}  />
        <Stack.Screen name="Capture" component={Capture} options={{ headerShown: false }}  />
        <Stack.Screen name="EnlargePhoto" component={EnlargePhoto}  options={{ headerShown: false }}   />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
