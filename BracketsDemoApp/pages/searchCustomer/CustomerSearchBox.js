import React, { Component, Fragment,useState ,useEffect} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Alert } from 'react-native';

var items=[]
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default function CustomerSearchBox (props) {
  
    const [selectedItems,setSelectedItems]= useState("")
    const [placeholderItem,setPlaceholderItem]=useState("4자리")

    
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    
    const parseData=(body)=>{
        
        for (let i = 0; i < body.length; i++) {
            console.log(body[i].name);
            console.log(body[i].phone);
            items.push({name:body[i].name + " : "+body[i].phone,cName:body[i].name,cPhone:body[i].phone})
            console.log(items)
        }

    }

  
    const getCustomer = async (bodyData) => {
            
        try {
            const response = await fetch('http://13.125.232.214/api/getCustomer ',{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(bodyData)
            });
            const json = await response.json();
            setData(json.body);
            console.log(json.body);
            parseData(json.body);
            setLoading(false);
        
        } catch (error) {
            Alert.alert(
                "",
                "없는 번호 입니다",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        } finally {
            setLoading(false);
        }
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {setRefreshing(false)
        
        console.log("is refreshing")});
    }, [])
    useEffect(()=>{
        //getCustomer({})
      },[]);
  return (
    <Fragment>
        
        {/* Single */}
        <SearchableDropdown
        onItemSelect={(item) => {
            setPlaceholderItem(item.name)
            //const items = selectedItems;
            //items.push(item)
            //setSelectedItems(placeholderItem);
            
        }}
        containerStyle={{ padding: 5 }}
        
        itemStyle={{
            padding: "8%",
            backgroundColor: '#fff',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 2,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={items}
        resetValue={false}
        textInputProps={
            {
                placeholder: placeholderItem,
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: (text) => {
                    console.log(text)
                    setPlaceholderItem(text)
                    if(text.length > 3){
                        //getCustomer({"lastphone":text})
                        //props.navigation.replace('SearchCustomer')
                    }
                    console.log("")

                    console.log(text.length)
                }
            }
        }
        listProps={
            {
            nestedScrollEnabled: false,
            }
        }
    />
    </Fragment>
  );
}