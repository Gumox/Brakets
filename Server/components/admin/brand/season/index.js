import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import Paging from "../../Paging";


const SeasonList = ({user,infos,season=[],brands=[]}) => {
    
    const [actionView,setActionView] = useState(null)

    const [filtedSeason,setFiltedSeason] =useState(sortSeason(season))

    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filtedSeason,slcNum))



    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filtedSeason.length/slcNum)
    
    const [selectedBrand,setSelectedBrand] = useState("ALL")

    const SearchBarHandler = ()=>{
        setPageNumber(1)
        let brandParse = seasonBrandParse(season,selectedBrand,)
        let sort = sortSeason(brandParse)
        setFiltedSeason(sort)
        setSlicedArray(slicingArray(sort,slcNum))
    }
    
    return(
        <Wrapper>
          {!actionView &&
            <div>
                <div style={{marginLeft:20,fontSize:"18px",fontWeight:"bold",marginBottom:20}}>시즌 목록</div>
              <SearchBar style={{width:"450px"}}>
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
                              <option  value={"ALL"} >{"전체"}</option>
                              {
                                brands.map((item,index)=>(
                                  <option key={index} value={item.brand_name}>{item.brand_name}</option>
                                ))
                              }
                          </select>
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                    SearchBarHandler()
                }}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
            
                <PrView style={{justifyContent:"space-between",backgroundColor:COLOR.WHITE,minWidth:"750px",alignItems:"end",}}>
                    
                    <div style={{marginLeft:20,}}></div>
                    <Paging max={max} minWidth={"750px"} num={pageNumber} setNum={setPageNumber}/>
                    <div style={{marginRight:20,minWidth:50}}>{(season).length} 건</div>
                </PrView>

                


                <InputTableBox>
                    <PrView>
                      
                        <HeaderCell>
                            브랜드 이름
                        </HeaderCell>

                        <HeaderCell>
                            시즌 이름
                        </HeaderCell>

                        <HeaderCell>
                            시즌 코드
                        </HeaderCell>

                        <HeaderCell>
                            시즌 시작일
                        </HeaderCell>
                        
                        <HeaderCell>
                            시즌 종료일
                        </HeaderCell>

                    </PrView>
                    
                    <List season={slicedArray[pageNumber-1]}/>

                </InputTableBox>
                <Paging max={max} minWidth={"750px"} num={pageNumber} setNum={setPageNumber}/>
                
            </div>
            }
                
            {
              actionView && actionView
            }
        </Wrapper>
    );
};



const seasonBrandParse=(seasons,value)=>{
    let result
    if(value && value !=="ALL"){
        let filt = _.filter(seasons,{"brand_name" : value})
        result = filt
    }else{
      result = seasons
    }
  
    return result
  }

  
  const sortSeason =(Brands)=>{
    let sortByName =_.sortBy(Brands,"season_name");
    let sortByBrand =_.sortBy(sortByName,"brand_name");
    return (sortByBrand)
  }
  
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
  

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
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

const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:12px;
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
    flex:1;
    padding:5px;
    /*border:2px solid ${COLOR.BLACK};
    border-left : 0px solid ${COLOR.BLACK};*/
`;

const InputTableBox  = styled.div`
    min-width:750px;
    margin-top:10px;
    margin-bottom:10px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 10px 0% 0%;
`;

const SearchImage =styled.img`
  width:25px;
  height: 25px;
  cursor: pointer;
`;

export default SeasonList