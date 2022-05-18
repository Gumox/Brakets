import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";

const ProductList = ({user,infos,products,brands}) => {
    
    
    const [actionView,setActionView] = useState(null)
    const [filtedProducts,setFiltedProducts] =useState(products)

    const [selectedBrand,setSelectedBrand] = useState("")
    const [selectedSeason,setSelectedSeason] = useState("")
    const [selectedCategory,setSelectedCategory] = useState("")

    
    const [searchProductName,setSearchProductName] =useState("")
    
    const [seasons,setSeasons] = useState([])
    const [categorys,setCategorys] = useState([])

    useEffect(()=>{
      const uniqByseasons = _.uniqBy(products,"season_name")
      let result =[]
      uniqByseasons.map((item)=>{
        result.push({text:item.season_name})
      })
      setSeasons(result)

    },[])


    useEffect(()=>{
      const uniqBycategorys = _.uniqBy(products,"category_name")
      let result =[]
      uniqBycategorys.map((item)=>{
        result.push({text:item.category_name})
      })
      setCategorys(result)

    },[])
    
    
    return(
        <Wrapper>
          {!actionView &&
            <div>
              <SearchBar style={{width:"950px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            브랜드
                          </SelectItemHeader>
                          <select style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                            onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                              <option  value={""} >{"전체"}</option>
                              {
                                brands.map((item,index)=>(
                                  <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                ))
                              }
                          </select>
                      </PrView> 
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            시즌
                          </SelectItemHeader>
                          <select style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                            onChange={(e)=>{setSelectedSeason(e.target.value)}}>
                              <option  value={""} >{"전체"}</option>
                              {
                                seasons.map((item,index)=>(
                                  <option key={index} value={item.text}>{item.text}</option>
                                ))
                              }
                          </select>
                      </PrView>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            카테고리
                          </SelectItemHeader>
                          <select style={{paddingLeft:20,flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} 
                            onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                              <option  value={""} >{"전체"}</option>
                              {
                                categorys.map((item,index)=>(
                                  <option key={index} value={item.text}>{item.text}</option>
                                ))
                              }
                          </select>
                      </PrView>
                    </PrView>
                <SearchBarButton onClick={()=>{
                  setFiltedProducts(productsFilter(products,selectedBrand,selectedSeason,selectedCategory))
                }}>
                     <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
              <SearchBar>
                <SearchBarHeader >
                    제품 명
                </SearchBarHeader>
                
                <input value={searchProductName} style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,flex:0.6 ,fontSize:"16px"}} onChange={(e)=>{setSearchProductName(e.target.value)}}/>

                <SearchBarButton onClick={()=>{setFiltedProducts(productsNameParse(products,searchProductName))}}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
            
              <h2 style={{marginLeft:20}}>제품 목록</h2>
                  <InputTableBox>
                  <PrView>
                      
                      <HeaderCell style={{flex:1}}>
                        브랜드
                      </HeaderCell>

                      <HeaderCell>
                        시즌
                      </HeaderCell>

                      <HeaderCell >
                        카테고리
                      </HeaderCell>

                      <HeaderCell >
                        바코드
                      </HeaderCell>

                      <HeaderCell>
                        스타일 NO.
                      </HeaderCell>
                      
                      <HeaderCell>
                        컬러
                      </HeaderCell>
                      
                      <HeaderCell>
                        차수
                      </HeaderCell>
                      
                      <HeaderCell>
                        사이즈
                      </HeaderCell>
                      
                      <HeaderCell style={{flex:3}}>
                        제품명
                      </HeaderCell>

                      <HeaderCell style={{color: COLOR.RED,flex:1}}>
                        
                      </HeaderCell>
                  </PrView>

                  <List infos={infos} user={user} brands={brands} products={sortProducts(filtedProducts)} setActionView={setActionView}/>
                  
              </InputTableBox>
            </div>
            }
            {
              actionView && actionView
            }
        </Wrapper>
    );
};
const productsNameParse=(products,name)=>{
  let result
  if(name && name !==""){
      let filt = _.filter(products,function(obj){
        return obj.name.indexOf(name) !== -1;
      })
      result = filt
  }else{
      result =products
  }
  return result
}
const productsFilter =(products,brand,seasonName,categoryName)=>{
  let result = products
  console.log("brand",brand,"\nseasonName",seasonName,"\ncategoryName",categoryName)
  console.log(products)
  if(brand){
    result = (_.filter(result,function(o){
      return o.brand_id == brand
    }))
  }
  if(seasonName && seasonName !==""){
    result = (_.filter(result,{"season_name":seasonName}))
  }
  if(categoryName && categoryName !==""){
    result = (_.filter(result,{"category_name":categoryName}))
  }
  console.log(result)
  return (result)
}

const sortProducts =(products)=>{
  let sortByCategory =_.sortBy(products,"category_name");
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
    /*border:2px solid ${COLOR.BLACK};
    border-left : 0px solid ${COLOR.BLACK};*/
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

export default ProductList