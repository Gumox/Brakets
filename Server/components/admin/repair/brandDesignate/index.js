import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import Designate from "./Designate";
import Deassign from "./Deassign";

const BrandDesignate = ({user,infos,store,categorys,repairShops}) => {

    const [category,setCategory] = useState([])

    
    const [selectedBrand,setSelectedBrand] = useState()
    const [selectedCategory,setSelectedCategory] = useState("ALL")

    
    const [searchResult,setSearchResult] = useState([])


    
    const [brandCategoryList,setBrandCategoryList] = useState([])
    console.log(brandCategoryList)

    const categorysBrand = _.uniqBy(categorys,"brand_name")

    const [designateOn,setDesignateOn] = useState(false)
    const [deassignOn,setDeassignOn] = useState(false)
    
    const categorysBrandHandler =()=>{
        const brandCategorys = _.uniqBy(_.filter(_.sortBy(categorys,"category_name"),{"brand_id":Number(selectedBrand)}),"category_name")
        setBrandCategoryList(brandCategorys)
    }
    
    const searchHandler =(value)=>{
        let result = []
        result = _.filter(categorys,{"brand_id":Number(value)})
        if(selectedCategory !== "ALL"){
            let filt = _.filter(result,{"pcategory_id":Number(selectedCategory)})
            console.log("selectedCategory")
            console.log(selectedCategory)
            console.log(filt)
            result = filt
        }
        setSearchResult(result)
    }
    useEffect(()=>{
        if(categorys.length>0){
            setSelectedBrand(categorys[0].brand_id)
            searchHandler(categorys[0].brand_id)
        }
        
    },[])
    useEffect(()=>{
        categorysBrandHandler()
    },[selectedBrand])
    
    return(
        <Wrapper>
            <div>
              <SearchBar style={{width:"750px"}}>
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
                                {
                                    categorysBrand.map((item,index)=>(
                                        <option key={index} value={item.brand_id} >{item.brand_name}</option>
                                    ))
                                }
                            </SearchSelect>

                            <SelectItemHeader >
                                카테고리
                            </SelectItemHeader>
                            <SearchSelect value={selectedCategory} style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                                onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                                <option value={"ALL"} >{"전체"}</option>
                                {
                                    brandCategoryList.map((item,index)=>(
                                        <option key={index} value={item.pcategory_id} >{item.category_name}</option>
                                    ))
                                }
                            </SearchSelect>
                          
                      </PrView> 
                    </PrView>

                    <SearchBarButton onClick={()=>{
                        searchHandler(selectedBrand)
                    }}>
                    <SearchImage  src="/icons/search.png"/>
                    
                    </SearchBarButton>
                </SearchBar>
            
                <h2 style={{marginLeft:20}}>검색 결과</h2>
                <LaView style={{justifyContent:"end",width:"550px"}}>
                    <DivButton onClick={()=>{setDesignateOn(true)}}>추가</DivButton>
                    <DivButton style={{color:COLOR.RED,marginLeft:20}} >삭제</DivButton>
                </LaView>
                <InputTableBox style={{width:"550px"}}>
                    {
                        searchResult.length > 0 ?
                        <div>
                            <PrView>
                                <HeaderCell style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
                                    카테고리
                                </HeaderCell>

                                <HeaderCell>
                                    수선처
                                </HeaderCell>

                                
                            </PrView>
                            
                            <List infos={infos} user={user} categorys={searchResult} />
                        </div>
                        :
                        <PrView style={{backgroundColor:COLOR.WHITE,justifyContent:"center"}}>
                            결과 없음
                        </PrView>
                    }

                  {/*

                  
                   */}
                    
                  
              </InputTableBox>
            </div>
            {designateOn &&
                <Designate  setDesignateOn={setDesignateOn} selectedBrand={selectedBrand} 
                            selectedCategory={selectedCategory} categorysBrand={categorysBrand} 
                            brandCategoryList={brandCategoryList} repairShops={repairShops}/>
            }
            {deassignOn &&
                <Deassign />
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
    font-size:16px;
    flex:1;
    padding:5px;
`;

const InputTableBox  = styled.div`
    min-width:550px;
    margin-top:20px;
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
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
  }
`;

const DivButton = styled.div`
    color:${COLOR.CYAN_BLUE};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:16px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

export default BrandDesignate