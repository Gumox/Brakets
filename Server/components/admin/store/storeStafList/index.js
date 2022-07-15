import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import Paging from "../../Paging";
import List from "./List";

const StoreStaffList = ({user,storeStaffs,store,brands}) => {
    
    const [actionView,setActionView] = useState(null)

    const slicingNumber =10
    const [filted,setFilted] =useState(sortStoreStaff(storeStaffs))
    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slicingNumber))

    const [selectedBrand,setSelectedBrand] = useState("")
    const [insertedStoreName,setInsertedStoreName] = useState("")
    const [insertedStaffName,setInsertedStaffName] = useState("")
    
    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slicingNumber)

    const SearchSelectBarHandler = ()=>{

      setPageNumber(1)
      setFilted(storeFilter(storeStaffs,selectedBrand,insertedStoreName,insertedStaffName))
      let sort = sortStoreStaff(storeFilter(storeStaffs,selectedBrand,insertedStoreName,insertedStaffName))
    

      setFilted(sort)

      setSlicedArray(slicingArray(sort,slicingNumber))

    }

    const staffNameHandlePress = useCallback(
      (e) => {
        if (e.key == "Enter") {
          SearchSelectBarHandler()
        }
      },
      
      [insertedStaffName]
    );
    const storeNameHandlePress = useCallback(
      (e) => {
        if (e.key == "Enter") {
          SearchSelectBarHandler()
        }
      },
      
      [insertedStoreName]
    );
    return(
        <Wrapper>
            {!actionView && <div>
                    <div style={{margin:20,fontSize:"18px",fontWeight:"bold"}}>직원 목록</div>
              <SearchBar style={{width:"950px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            브랜드
                          </SelectItemHeader>
                          <div style={{display:"flex",flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                              
                            <SearchSelect value={selectedBrand} style={{paddingLeft:20,flex:1}} 
                              onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                                <option  value={""} >{"전체"}</option>
                                {
                                  brands.map((item,index)=>(
                                    <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                  ))
                                }
                            </SearchSelect>

                          </div>
                          <SelectItemHeader >
                            매장
                          </SelectItemHeader>
                          <div style={{display:"flex",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:` 2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine type={"text"} value={insertedStoreName || ""} style={{flex:1}}
                                              onKeyPress={(e)=>{storeNameHandlePress(e)}} onChange={(e)=>{setInsertedStoreName(e.target.value)}}/>

                          </div>
                          
                          <SelectItemHeader > 
                            직원
                          </SelectItemHeader>
                          <div style={{display:"flex",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:` 2px solid ${COLOR.LIGHT_GRAY}`}}>
                              
                            <InputLine type={"text"} value={insertedStaffName || ""} style={{flex:1}}
                                              onKeyPress={(e)=>{staffNameHandlePress(e)}} onChange={(e)=>{setInsertedStaffName(e.target.value)}}/>
                          </div>
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                  SearchSelectBarHandler()
                }}>
                     <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
            
              <PrView style={{justifyContent:"space-between",backgroundColor:COLOR.WHITE,minWidth:"1080px",alignItems:"end",}}>
                  <div style={{marginLeft:20,width:50}}></div>
                  <Paging max={max} minWidth={"750px"} num={pageNumber} setNum={setPageNumber}/>
                  <div style={{marginRight:20,width:50}}>{sortStoreStaff(store).length} 건</div>
              </PrView>
                  
                <InputTableBox>
                  <PrView>
                      
                      <HeaderCell >
                        매장
                      </HeaderCell>

                      <HeaderCell>
                        직원
                      </HeaderCell>

                      <HeaderCell >
                        직급
                      </HeaderCell>

                      <HeaderCell>
                        kakao 계정
                      </HeaderCell>
                      
                      <HeaderCell>
                        연락처
                      </HeaderCell>
                      
                      <HeaderCell>
                        상태
                      </HeaderCell>
                      
                      <HeaderCell style={{color: COLOR.RED,flex:1}}>
                            정보 수정
                      </HeaderCell>
                  </PrView>

                  <List brands={brands} store={slicedArray[pageNumber-1]} allStore={storeStaffs} setActionView={setActionView}/>

                </InputTableBox>
                <Paging max={max} minWidth={"1080px"} num={pageNumber} setNum={setPageNumber}/>
            </div>}
            {
                actionView &&
                actionView 
            }
            
        </Wrapper>
    );
};
const slicingArray =(array,num)=>{
  let len = array.length
  let result=[]
  let itemBox=[]
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

const getStaffList =(arr) =>{
    let result = []
    if(arr.length > 0){
        let keys = _.uniqBy(arr,"staff_id")
        
        keys.map((item)=>{
            let inArr = _.filter(arr,{ 'staff_id': item.staff_id})
            result.push(inArr)
        })
    }

    return(result)
}
const storeFilter =(store,brand,storeName,staffName)=>{
  let result = store


  if(brand){
    result = (_.filter(result,function(o){
      return o.brand_id == brand
    }))
  }
  if(storeName.length > 0){
    result = (_.filter(result,function(o){
      
      return String(o.store_name).includes(storeName) 
    }))
  }
  if(staffName.length > 0){
    result = (_.filter(result,function(o){
      
      return String(o.staff_name).includes(staffName) 
    }))
  }
  return (result)
}



const sortStoreStaff =(storeStaff)=>{
  let sortByStaffCode =_.sortBy(storeStaff,"staff_code");
  let sortByStore = _.sortBy(sortByStaffCode,"store_name")
  return (sortByStore)
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
    font-size:14px;
    flex:1;
    padding:5px;
`;

const SearchSelect = styled.select`
  border :0;
  min-width:175px;
  
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
  }
`;

const InputTableBox  = styled.div`
    min-width:1080px;
    margin-top:10px;
    margin-bottom:10px;
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
    font-size: 15px;
    min-width:60px;
    font-weight: bold;
    border: 2px solid ${COLOR.LIGHT_GRAY};

`;
const SearchImage =styled.img`
  width : 20px;
  height : 20px;
  cursor : pointer;
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
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;
export default StoreStaffList