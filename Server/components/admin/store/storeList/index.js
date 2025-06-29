import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import Paging from "../../Paging";

const StoreList = ({user,infos,store,brands}) => {
    
    const [actionView,setActionView] = useState(null)

    const slicingNumber =10
    const [filted,setFilted] =useState(sortStore(store))
    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slicingNumber))

    const [selectedBrand,setSelectedBrand] = useState("")
    const [insertedStoreName,setInsertedStoreName] = useState(null)
    
    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slicingNumber)

    const SearchSelectBarHandler = ()=>{

      setPageNumber(1)
      setFilted(storeFilter(store,selectedBrand,insertedStoreName))
      let sort = sortStore(storeFilter(store,selectedBrand,insertedStoreName))
      setFilted(sort)
      setSlicedArray(slicingArray(sort,slicingNumber))

    }

    const nameHandlePress = useCallback(
      (e) => {
        if (e.key == "Enter") {
          SearchSelectBarHandler()
        }
      },
      
      [insertedStoreName]
    );

    return(
        <Wrapper>
            {!actionView && 
              <div>
                
                <div style={{margin:20,fontSize:"18px",fontWeight:"bold"}}>매장 목록</div>
                <SearchBar style={{width:"950px"}}>
                  <SearchBarHeader >
                      조회 조건
                  </SearchBarHeader>
                      <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                        <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                            <SelectItemHeader >
                              브랜드
                            </SelectItemHeader>
                            <SearchSelect value={selectedBrand} style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                              onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                                <option  value={""} >{"전체"}</option>
                                {
                                  brands.map((item,index)=>(
                                    <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                  ))
                                }
                            </SearchSelect>
                            <SelectItemHeader >
                              매장명
                            </SelectItemHeader>
                            <div style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:` 2px solid ${COLOR.LIGHT_GRAY}`,display:"flex"}}>
                                

                              <InputLine type={"text"} value={insertedStoreName || ""} style={{flex:1}}
                                                onKeyPress={(e)=>{nameHandlePress(e)}} onChange={(e)=>{setInsertedStoreName(e.target.value)}}/>
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
                  <Paging max={max} minWidth={"720px"} num={pageNumber} setNum={setPageNumber}/>
                  <div style={{marginRight:20,width:50}}>{sortStore(store).length} 건</div>
                </PrView>
                    
                  
                  <InputTableBox>
                    <PrView>
                        
                        <HeaderCellV2 style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
                          브랜드
                        </HeaderCellV2>

                        <HeaderCellV2>
                          매장코드
                        </HeaderCellV2>

                        <HeaderCellV2 style={{border:`2px solid ${COLOR.MENU_MAIN}`}}>
                          매장명
                        </HeaderCellV2>

                        <HeaderCell>
                          매장 매니저
                        </HeaderCell>
                        
                        <HeaderCell>
                          <ColView>
                              <InColView> 매니저 </InColView>
                              <InColView> kakao 계정 </InColView>
                          </ColView>
                        </HeaderCell>
                        
                        <HeaderCell>
                          매니저 연락처
                        </HeaderCell>
                        
                        <HeaderCell style={{color: COLOR.RED,flex:1}}>
                          
                        </HeaderCell>
                    </PrView>

                    <List infos={infos} user={user} brands={brands} store={slicedArray[pageNumber-1]} setActionView={setActionView}/>
                    

                  </InputTableBox>
                  <Paging max={max} minWidth={"1080px"} num={pageNumber} setNum={setPageNumber}/>
              </div>
            }
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


const storeFilter =(store,brand,storeName)=>{
  let result = store

  if(brand){
    result = (_.filter(result,function(o){
      return o.brand_id == brand
    }))
  }
  if(storeName){
    result = (_.filter(result,function(o){
      
      return String(o.store_name).includes(storeName) 
    }))
  }
  
  return (result)
}



const sortStore =(store)=>{
  let sortByCategory =_.sortBy(store,"category_name");
  let sortBySeason = _.sortBy(sortByCategory,"season_name")
  let sortByBrand = _.sortBy(sortBySeason,"brand_name")
  return (sortByBrand)
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
const HeaderCellV2 = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    background-color:${COLOR.MENU_MAIN};
    flex:1;
    padding:5px;
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
    margin-bottom:60px;
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
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:14px;
    justify-content:center;
    align-items:center;
`;
const AdressSearchInput = styled.input`
  border :0;
  padding-left:10px;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
  }
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
const SearchSelect = styled.select`
  border :0;
  border: 2px solid ${COLOR.LIGHT_GRAY};
  min-width:175px;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
  }
`;
export default StoreList