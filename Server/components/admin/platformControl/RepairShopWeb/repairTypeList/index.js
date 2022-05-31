import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import axios from "axios";
import List from "./List";
import Paging from "../../../Paging";

const RepairTypeListControl = ({user,repairTypes,brands}) => {
    const [addState,setAddState] = useState(false)
    const [analysisName,setAnalysisName] = useState("")

    
    const [filted,setFilted] =useState(sortArray(repairTypes))

    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slcNum))

    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slcNum)

    
    const sortedBrands =uniqArrayBrand(brands)
    const [brand,setBrand] =useState("ALL")
    const sortedRepairShop =uniqArrayStore(repairTypes)
    const [repairShop,setRepairShop] =useState("ALL")

   
    const onSearch = () => {
        let result = sortArray(repairTypes)

        if(brand !== "ALL"){
            console.log("is")
            result = _.filter(sortArray(repairTypes),{"brand_id":Number(brand)})
        }
        if(repairShop !== "ALL"){
            result = _.filter(sortArray(repairTypes),{"store_id":Number(repairShop)})
        }
        console.log(result.length)
        setFilted(result)
        setSlicedArray(slicingArray(result,slcNum))
    }
    return(
        <Wrapper>
            <div>
              
            
                <h2 style={{marginLeft:20}}>수선처 WEB – 수선 내용, 수선비(수선 단가) 목록</h2>

                <SearchBar style={{width:"750px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader style={{borderLeft:0,borderRight:0}}>
                            브랜드
                          </SelectItemHeader>
                          <SelectOption value={brand}  style={{flex:1}} onChange={(e)=>{setBrand(e.target.value)}}>
                                <option value={"ALL"}>{"전체"}</option>
                                {
                                    sortedBrands.map((item,index)=>(
                                        <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                    ))
                                }
                            </SelectOption>
                      </PrView> 
                    </PrView>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader style={{borderLeft:0,borderRight:0}}>
                            수선처
                          </SelectItemHeader>
                          <SelectOption value={repairShop}  style={{flex:1}} onChange={(e)=>{setRepairShop(e.target.value)}}>
                                <option value={"ALL"}>{"전체"}</option>
                                {
                                    sortedRepairShop.map((item,index)=>(
                                        <option key={index} value={item.store_id}>{item.store_name}</option>
                                    ))
                                }
                            </SelectOption>
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                  onSearch()
                }}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>

                <LaView style={{justifyContent:"space-between"}}>
                    <h5 style={{marginLeft:20}}>{"  "}</h5>
                    <div style={{width:50}}>
                        {repairTypes.length}건
                        
                    </div>
                </LaView>
        

                <div style={{display:"flex",flexDirection:"row"}}>
                        
                    <InputTableBox>
                        <div style={{marginBottom:10}}>
                            <Paging max={max} width={"850px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>

                        <PrView style={{paddingLeft:2,paddingRight:2}}>
                            
                                <HeaderCell>
                                    브랜드
                                </HeaderCell>

                                <HeaderCell>
                                    수선처
                                </HeaderCell>

                                <HeaderCell style={{flex:3}}>
                                    수선내용
                                </HeaderCell>

                                <HeaderCell>
                                    수선비(수선 단가)
                                </HeaderCell>

                                <HeaderCell>
                                    
                                </HeaderCell>
                                
                        </PrView>

                        
                        
                        <List list={slicedArray[pageNumber-1]}/>
                        

                        <div style={{marginTop:10}}>
                            <Paging max={max} width={"850px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>

                    </InputTableBox>

                    {addState &&
                        <div style={{marginTop:60,marginLeft:20,height:180,width:350,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px"}}>
                            <HeaderCell style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px 10px 0 0"}}>
                                내용분석 추가
                            </HeaderCell>
                            <LaView style={{height:60,width:340,}}>
                                <HeaderCell style={{backgroundColor:COLOR.LIGHT_GRAY}}>
                                    내용분석
                                </HeaderCell>
                                <InputLine value={analysisName} placeholder={"ex) 원단"} style={{height:60,borderLeft:`2px solid ${COLOR.LIGHT_GRAY}`}} onChange={(e)=>{setAnalysisName(e.target.value)}}/>
                            </LaView>
                            <LaView style={{justifyContent:"space-evenly",height:60,width:345,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <DivButton style={{color:COLOR.CYAN_BLUE}} onClick={()=>{addAnalysis()}}>
                                    추가
                                </DivButton>
                                <DivButton onClick={()=>{setAddState(!addState)}}>
                                    취소
                                </DivButton>
                            </LaView>
                        </div>
                    }
                </div>
                
            </div>
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
const sortArray =(array)=>{
    let sort1=_.sortBy(array,"text")
    let sort2=_.sortBy(sort1,"store_name")
    let sort3=_.sortBy(sort2,"brand_name")
    
    return(sort3)
}
const uniqArrayBrand =(array)=>{
    let sort1=_.sortBy(array,"brand_name")
    let uniq =_.uniqBy(sort1,"brand_name")
    
    return(uniq)
}
const uniqArrayStore =(array)=>{
    let sort1=_.sortBy(array,"store_name")
    let uniq =_.uniqBy(sort1,"store_name")
    
    return(uniq)
}
const SelectOption = styled.select`
    border : 2px solid ${COLOR.LIGHT_GRAY};
    font-size:15px;
    padding-left:20px;
    &:focus { 
        outline: none !important;
    }
`;

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
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
    flex:0.25;
    background-color :${COLOR.MENU_MAIN};
    border-radius: 0px 10px 10px 0px;
    display: flex;
    justify-content:center;
    align-items:center;
`;
 
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:2;
    padding:5px;
`;
const InputLine  = styled.input`
    border 0px;
    padding-left:20px;
    font-size:16px;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
`;
const InputTableBox  = styled.div`
    width:850px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 10px 0% 0%;
`;
const LaView  = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center; 
    width:850px;
`;
const DivButton = styled.div`
    color:${COLOR.RED};
    width:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:15px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

export default RepairTypeListControl