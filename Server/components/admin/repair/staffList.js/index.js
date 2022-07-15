import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";

const StaffList = ({user,infos,repairShopStaff}) => {
    
    const [actionView,setActionView] = useState(null)

    const [insertedAdress,setInsertedAdress] = useState(null)

    const [categorys,setCategorys] = useState([])


    
    
    const [parsedRepairShopStaff,setParsedRepairShopStaff] = useState(repairShopStaff)

    const [selectedRepairShop,setSelectedRepairShop] = useState("ALL")
    
    const repairShopStaffName = _.uniqBy(repairShopStaff,"repair_shop_name")

    const searchBarRepairShopStaffHandler = (arr,value)=>{
        let result = []
        setSelectedRepairShop(value)
        if(value !== "ALL"){
            let inArr = _.filter(arr,{ 'repair_shop_name': value})
            result.push(inArr)
            //setSearchBrandList(_.uniqBy(inArr,"brand_name"))
        }else{
            result = arr
            //setSearchBrandList(_.uniqBy(repairShopStaff,"brand_name"))
        }
        
    }   

    const searchBarHandler = ()=>{
        let arr = repairShopStaff
        if(selectedRepairShop !== "ALL"){
            let inArr = _.filter(arr,{ 'repair_shop_name': selectedRepairShop})
            arr = inArr
        }
        setParsedRepairShopStaff(arr)
    }
    
    
    return(
        <Wrapper>
            {!actionView && <div>
              <SearchBar style={{width:"650px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                            <SelectItemHeader >
                                수선처
                            </SelectItemHeader>
                            <div style={{display:"flex",flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                              <SearchSelect value={selectedRepairShop} style={{paddingLeft:20,flex:1}} 
                                onChange={(e)=>{searchBarRepairShopStaffHandler(repairShopStaff,e.target.value)}}>
                                <option  value={"ALL"} >{"전체"}</option>
                                {
                                    repairShopStaffName.map((item,index)=>(
                                        <option key={index} value={item.repair_shop_name} >{item.repair_shop_name}</option>
                                    ))
                                }
                              </SearchSelect>
                            </div>
                            
                            
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                  searchBarHandler()
                }}>
                    <SearchImage  src="/icons/search.png"/>
                    
                </SearchBarButton>
              </SearchBar>
            
              <h2 style={{marginLeft:20}}>매장 목록</h2>
                  <InputTableBox>
                  <PrView>
                      
                      <HeaderCell style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
                        수선처
                      </HeaderCell>

                      <HeaderCell>
                        직원 코드
                      </HeaderCell>

                      <HeaderCell >
                        직원 이름
                      </HeaderCell>

                      <HeaderCell>
                        <ColView>
                            <InColView> 직원 </InColView>
                            <InColView> kakao 계정 </InColView>
                        </ColView>
                      </HeaderCell>

                      <HeaderCell>
                        <ColView>
                            <InColView> 직원 </InColView>
                            <InColView> 연락처 </InColView>
                        </ColView>
                      </HeaderCell>
                      
                      <HeaderCell>
                        상태
                      </HeaderCell>

                      <HeaderCell>
                        <ColView>
                            <InColView> 정보 / 상태 </InColView>
                            <InColView> 수정 </InColView>
                        </ColView>
                      </HeaderCell>
                      
                      
                      <HeaderCell style={{color: COLOR.RED,flex:1}}>
                        직원 변경
                      </HeaderCell>
                  </PrView>

                  
                    <List repairShopsStaffs={parsedRepairShopStaff} setActionView={setActionView}/>
                    
                    
                  
              </InputTableBox>
            </div>}
            {
                actionView &&
                actionView 
            }
            
        </Wrapper>
    );
};

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
    font-size: 15px;
    font-weight: bold;
    border: 2px solid ${COLOR.LIGHT_GRAY};

`;
const SearchImage =styled.img`
  width: 20px;
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
  margin:2px;
  flex:1;
  min-width:175px;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
    }
`;
export default StaffList