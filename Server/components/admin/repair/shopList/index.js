import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";

const StoreList = ({user,infos,store,brands,repairShop}) => {
    
    const [actionView,setActionView] = useState(null)

    const [filted,setFilted] =useState(store)
    const [insertedAdress,setInsertedAdress] = useState(null)

    const [categorys,setCategorys] = useState([])


    useEffect(()=>{
      const uniqBycategorys = _.uniqBy(store,"category_name")
      let result =[]
      uniqBycategorys.map((item)=>{
        result.push({text:item.category_name})
      })
      setCategorys(result)

    },[])
    
    const [parsedRepairShop,setParsedRepairShop] = useState(getRepairShopBrandList(repairShop))
    const [searchBrandList,setSearchBrandList] = useState(_.uniqBy(repairShop,"brand_name"))

    const [selectedRepairShop,setSelectedRepairShop] = useState("ALL")
    const [selectedBrand,setSelectedBrand] = useState("ALL")
    
    const repairShopName = _.uniqBy(repairShop,"repair_shop_name")
    console.log(parsedRepairShop)

    const searchBarRepairShopHandler = (arr,value)=>{
        let result = []
        setSelectedRepairShop(value)
        if(value !== "ALL"){
            let inArr = _.filter(arr,{ 'repair_shop_name': value})
            result.push(inArr)
            //setSearchBrandList(_.uniqBy(inArr,"brand_name"))
        }else{
            result = arr
            //setSearchBrandList(_.uniqBy(repairShop,"brand_name"))
        }
        
    }   

    const searchBarHandler = ()=>{
        let result = getRepairShopBrandList(repairShop)
        let arr = repairShop
        if(selectedRepairShop !== "ALL"){
            let inArr = _.filter(arr,{ 'repair_shop_name': selectedRepairShop})
            arr = inArr
            result = getRepairShopBrandList(inArr)
        }

        if(selectedBrand !== "ALL"){
            let inArr = _.filter(arr,{ 'brand_name': selectedBrand})
            result = getRepairShopBrandList(inArr)
        }
        console.log(result)
        setParsedRepairShop(result)
    }
    
    
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
                                수선처
                            </SelectItemHeader>
                            <SearchSelect value={selectedRepairShop} style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                                onChange={(e)=>{searchBarRepairShopHandler(repairShop,e.target.value)}}>
                                <option  value={"ALL"} >{"전체"}</option>
                                {
                                    repairShopName.map((item,index)=>(
                                        <option key={index} value={item.repair_shop_name} >{item.repair_shop_name}</option>
                                    ))
                                }
                            </SearchSelect>
                            <SelectItemHeader >
                                브랜드
                            </SelectItemHeader>
                            <SearchSelect value={selectedBrand} style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                                onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                                <option  value={"ALL"} >{"전체"}</option>
                                {
                                    searchBrandList.map((item,index)=>(
                                        <option key={index} value={item.brand_name} >{item.brand_name}</option>
                                    ))
                                }
                            </SearchSelect>
                          
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                  searchBarHandler()
                }}>
                    <div style={{font:"12px",fontWeight:"bold"}}>
                       조회
                    </div>
                </SearchBarButton>
              </SearchBar>
            
              <h2 style={{marginLeft:20}}>매장 목록</h2>
                  <InputTableBox>
                  <PrView>
                      
                      <HeaderCell style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
                        수선처
                      </HeaderCell>

                      <HeaderCell>
                        수선처 코드
                      </HeaderCell>

                      <HeaderCell >
                        담당 브랜드 파트
                      </HeaderCell>

                      {/*<HeaderCell>
                        카테고리
                      </HeaderCell>*/}
                      
                      <HeaderCell>
                        <ColView>
                            <InColView> 수선처 </InColView>
                            <InColView> 연락처 </InColView>
                        </ColView>
                      </HeaderCell>
                      
                      <HeaderCell>
                            상태
                      </HeaderCell>
                      
                      <HeaderCell style={{color: COLOR.RED,flex:1}}>
                            정보 변경
                      </HeaderCell>
                  </PrView>

                  
                    <List infos={infos} user={user} brands={brands} repairShops={parsedRepairShop} setActionView={setActionView}/>
                    
                  
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

const getRepairShopBrandList =(arr) =>{
    let result = []
    
    if(arr.length > 0){
        let keys = _.uniqBy(arr,"repair_shop_name")
        keys.map((item)=>{
            let inArr = _.filter(arr,{ 'repair_shop_name': item.repair_shop_name})
            result.push(inArr)
        })
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
`
const SearchSelect = styled.select`
  border :0;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
  }
`;
export default StoreList