import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";

const StoreList = ({user,infos,store,brands}) => {
    
    const [actionView,setActionView] = useState(null)

    const [filted,setFilted] =useState(store)

    const [selectedBrand,setSelectedBrand] = useState("")
    const [insertedAdress,setInsertedAdress] = useState(null)
    const [selectedCategory,setSelectedCategory] = useState("")

    
    const [searchProductName,setSearchProductName] =useState("")
    
    const [seasons,setSeasons] = useState([])
    const [categorys,setCategorys] = useState([])

    /*useEffect(()=>{
      const uniqByseasons = _.uniqBy(store,"season_name")
      let result =[]
      uniqByseasons.map((item)=>{
        result.push({text:item.season_name})
      })
      setSeasons(result)

    },[])*/


    useEffect(()=>{
      const uniqBycategorys = _.uniqBy(store,"category_name")
      let result =[]
      uniqBycategorys.map((item)=>{
        result.push({text:item.category_name})
      })
      setCategorys(result)

    },[])
    
    
    return(
        <Wrapper>
            {!actionView && <div>
              <SearchBar style={{width:"950px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            브랜드
                          </SelectItemHeader>
                          <select value={selectedBrand} style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                            onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                              <option  value={""} >{"전체"}</option>
                              {
                                brands.map((item,index)=>(
                                  <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                ))
                              }
                          </select>
                          <SelectItemHeader >
                            주소
                          </SelectItemHeader>
                          <AdressSearchInput type={"text"} value={insertedAdress || ""} style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:` 2px solid ${COLOR.LIGHT_GRAY}`}}
                                             onChange={(e)=>{setInsertedAdress(e.target.value)}}/>
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                  setFilted(storeFilter(store,selectedBrand,insertedAdress))
                }}>
                    <div style={{font:"12px",fontWeight:"bold"}}>
                       조회
                    </div>
                </SearchBarButton>
              </SearchBar>
              {/*<SearchBar>
                <SearchBarHeader >
                    매장 명
                </SearchBarHeader>
                
                <input value={searchProductName} style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,flex:0.6 ,fontSize:"16px"}} onChange={(e)=>{setSearchProductName(e.target.value)}}/>

                <SearchBarButton onClick={()=>{setFiltedstore(storeNameParse(store,searchProductName))}}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
            </SearchBar>*/}
            
              <h2 style={{marginLeft:20}}>매장 목록</h2>
                  <InputTableBox>
                  <PrView>
                      
                      <HeaderCellV2 style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
                        브랜드
                      </HeaderCellV2>

                      <HeaderCellV2>
                        매장코드
                      </HeaderCellV2>

                      <HeaderCellV2 >
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

                  <List infos={infos} user={user} brands={brands} store={sortStore(filted)} setActionView={setActionView}/>
                  
              </InputTableBox>
            </div>}
            {
                actionView &&
                actionView 
            }
            
        </Wrapper>
    );
};


const storeNameParse=(store,name)=>{
  let result
  if(name && name !==""){
      let filt = _.filter(store,function(obj){
        return obj.name.indexOf(name) !== -1;
      })
      result = filt
  }else{
      result =store
  }
  return result
}
const storeFilter =(store,brand,adress)=>{
  let result = store

  console.log(store)

  if(brand){
    result = (_.filter(result,function(o){
      return o.brand_id == brand
    }))
  }
  if(adress){
    result = (_.filter(result,function(o){
      
      return String(o.address).includes(adress) 
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
    font-size:16px;
    flex:1;
    padding:5px;
`;
const HeaderCellV2 = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    background-color:${COLOR.MENU_MAIN};
    flex:1;
    padding:5px;
`;

const InputTableBox  = styled.div`
    min-width:1080px;
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
  width:25px;
  height: 25px;
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
  }
`;
export default StoreList