import React,{useState,useEffect} from "react";
import { View ,Text,TextInput ,TouchableHighlight,ScrollView, SafeAreaView, StyleSheet,Alert} from "react-native";


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      
      padding: 10,
    },
  });
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default function CustomSearch () {
    const [selectedItems,setSelectedItems]= useState("")
    const [placeholderItem,setPlaceholderItem]=useState("4자리")

    
    const [data, setData] = useState([]);
    const [isLoading, setLoading] =useState(true);

    const [searchResult,setSearchResult] =useState([]);

    const parseData=(body)=>{
        
        for (let i = 0; i < body.length; i++) {
            console.log(body[i].name);
            console.log(body[i].phone);
            searchResult.push({name:body[i].name + " : "+body[i].phone})
        }

    }
    const [refreshing, setRefreshing] = React.useState(false);
    const OnRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => {setRefreshing(false)
        
        console.log("is refreshing")});
    }, [])


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
           console.log(error)
        } finally {
            setLoading(false);
        }
    }
    var searchLine = [];

    const ItemsStack = () => {
        for (let i = 0; i < searchResult.length; i++) {
            const key =i;
            var searchItem = (

                <TouchableHighlight style = {{borderBottomWidth:2, borderBottomColor : "#828282"}}><Text>{searchResult[key].name}</Text></TouchableHighlight>
            );
            searchLine[key] = (searchLine);
        }
    }       
    return(
        <View>
            <ScrollView>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text)=>{
                        console.log(text)
                        if(text.length>3){
                            getCustomer({"lastphone":text})
                            ItemsStack();
                        }
                    }}
                    placeholder="useless placeholder"
                    value={(text)=>setSelectedItems(text)}
                    keyboardType="numeric"/>
                {searchLine}
            </ScrollView>
        </View>
    );
}