import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import Paging from "./Paging";

const CustomerList = ({user,infos,customers,brands}) => {
    
    
    const [actionView,setActionView] = useState(null)
    const [filtedCustomers,setFiltedCustomers] =useState(sortCustomers(customers))

    const [slicedArray,setSlicedArray] = useState(slicingArray(filtedCustomers,10))

    
    const [searchCustomerName,setSearchCustomerName] =useState("")
    const [searchCustomerPhone,setSearchCustomerPhone] =useState("")

    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filtedCustomers.length/10)
    
    //console.log(sortCustomers(customers),10)

    const SearchBarHandler = ()=>{
        setPageNumber(1)
        let nameParse = customersNameParse(customers,searchCustomerName,)
        let phoneParse = customersPhoneParse(nameParse,searchCustomerPhone,)
        setFiltedCustomers(sortCustomers(phoneParse))
        setSlicedArray(slicingArray(sortCustomers(phoneParse),10))
    }

    const nameHandlePress = useCallback(
        (e) => {
          if (e.key == "Enter") {
            SearchBarHandler()
          }
        },
        
        [searchCustomerName]
    );
    const phoneHandlePress = useCallback(
        (e) => {
          if (e.key == "Enter") {
            SearchBarHandler()
          }
        },
        
        [searchCustomerPhone]
    );
    
    return(
        <Wrapper>
          
            <div>
              <SearchBar style={{width:"850px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            고객 명
                          </SelectItemHeader>

                          <InsertInput value={searchCustomerName}
                            placeholder={"ex) 홍길동"}  
                            onKeyPress={(e)=>{nameHandlePress(e)}}
                            onChange={(e)=>{setSearchCustomerName(e.target.value)}}/>
                          
                      </PrView> 
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                              연락처
                          </SelectItemHeader>
                          <InsertInput value={searchCustomerPhone} 
                            placeholder={""} 
                            onKeyPress={(e)=>{phoneHandlePress(e)}}
                            onChange={(e)=>{setSearchCustomerPhone(e.target.value)}}/>
                          
                      </PrView>
                      
                    </PrView>
                <SearchBarButton 
                    style={{font:"12px",fontWeight:"bold",cursor:"pointer"}}
                    onClick={()=>{SearchBarHandler()
                }}>
                
                  <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
            
                <PrView style={{justifyContent:"space-between",backgroundColor:COLOR.WHITE,width:"850px",alignItems:"end",}}>
                    <div style={{marginLeft:20,fontSize:"18px",fontWeight:"bold"}}>고객 목록</div>
                    <div style={{marginRight:20,}}>{sortCustomers(customers).length} 건</div>
                </PrView>

                <Paging max={max} width={"850px"} num={pageNumber} setNum={setPageNumber}/>

                <InputTableBox style={{marginBottom:"10px"}}>
                  <PrView>
                      
                      <HeaderCell style={{flex:1}}>
                        고객이름
                      </HeaderCell>

                      <HeaderCell>
                        연락처
                      </HeaderCell>

                      
                      <HeaderCell style={{color: COLOR.RED,flex:1}}>
                        
                      </HeaderCell>
                  </PrView>

                  {
                      <List infos={infos} user={user} brands={brands} customers={slicedArray[pageNumber-1]} setActionView={setActionView}/>
                  }
                  
                </InputTableBox>

                <Paging max={max} width={"850px"} num={pageNumber} setNum={setPageNumber}/>
            </div>
            
            
            
        </Wrapper>
    );
};
const customersNameParse=(customers,name)=>{
  let nameResult
  if(name && name !==""){
      let filt = _.filter(customers,function(obj){
        return obj.name.indexOf(name) !== -1;
      })
      nameResult = filt
  }else{
    nameResult = customers
  }

  return nameResult
}
const customersPhoneParse=(customers,phone)=>{
    let phoneResult
    if(phone && phone !==""){
        let filt = _.filter(customers,function(obj){
          return obj.phone.indexOf(phone) !== -1;
        })
        phoneResult = filt
    }else{
        phoneResult = customers
    }
  
    
  
    return phoneResult
}

const sortCustomers =(customers)=>{
  let sortByName =_.sortBy(customers,"name");
  let uniqByName =_.uniqBy(sortByName,"phone");
  return (sortByName)
}

const slicingArray =(array,num)=>{
    let len = array.length
    let result=[]
    let itemBox=[]
    let itemIndex=0
    let index = 0
    let nextIndex = num
    while(index<len){
        itemBox=_.slice(array,index,nextIndex)
        index = index + num;
        nextIndex = nextIndex + num
        result.push(itemBox)
    }
    return(result)
}


const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:1;
    padding:5px;
`;

const InputTableBox  = styled.div`
    width:850px;
    margin-top:20px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 10px 0% 0%;
`;
const SelectItemHeader = styled.div`
    display : flex;
    flex:0.3;
    justify-content : center;
    align-items : center;
    font-size: 12px;
    font-weight: bold;
    border: 2px solid ${COLOR.LIGHT_GRAY};

`;
const SearchImage =styled.img`
  width:20px;
  height: 20px;
  cursor: pointer;
`;

const SearchBar = styled.div`
    width:540px;
    height:50px;
    margin-bottom:30px;
    display: flex;
    flex-direction : row;
`;
const SearchBarHeader = styled.div`
    flex:0.4;
    display:flex;
    font-size:15px;
    font-weight: bold;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 0px 0px 10px;
    justify-content:center;
    align-items:center;
    
`;
const SearchBarButton = styled.div`
    flex:0.15;
    background-color :${COLOR.MENU_MAIN};
    border-radius: 0px 10px 10px 0px;
    display: flex;
    justify-content:center;
    align-items:center;
`;
const InsertInput = styled.input`
    padding-left : 20px;
    flex : 0.7;
    border-left : 0;
    border-right : 0;
    border-top : 2px solid ${COLOR.LIGHT_GRAY};
    border-bottom : 2px solid ${COLOR.LIGHT_GRAY};
    &:focus { 
        outline: none !important;
        //border-bottom-color: #719ECE;
      }
`;

export default CustomerList