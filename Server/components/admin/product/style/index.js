import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import axios from "axios";

const ProductStyleList = ({user,infos,styles,products,brands}) => {
    
    const [action,setAction] = useState(false)
    const [filtedStyles,setFiltedStyles] =useState(styles)

    const [selectedBrand,setSelectedBrand] = useState("")
    const [selectedCategory,setSelectedCategory] = useState("")

    
    const [searchProductName,setSearchProductName] =useState("")

    
    const [insertBrand,setInsertBrand] =useState(brands[0].brand_id)
    const [insertStyleNo,setInsertStyleNo] =useState(null)
    
    const [styleCategorys,setStyleCategorys] =useState([])
    const [insertCategory,setInsertCategory] =useState(null)
    
    const [categorys,setCategorys] = useState([])
    
    const emptySpace =(str)=>{
        let name = ""
        for(let i =0; i<str.length;i++){
            if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
                name += "_"
            }else if(str[i] !== " " && str[i]){
                name += str[i]
            }
        }
        return(String(name).replace(/_/g," "))
        
    }

    const getCategorys= async(brandId) =>{

        setInsertBrand(brandId)

        const [categoryResult] = await Promise.all([
            axios
                .post(`${process.env.API_URL}/getProductCategory`,{brand: brandId })
                .then(({ data }) => data.body), 
        ])
    
        setStyleCategorys(categoryResult)
        setInsertCategory(categoryResult[0].pcategory_id)
    }

    
    const addStyle= async() =>{
        const data=
            {  
                styleNo:emptySpace(insertStyleNo),
                category:insertCategory,
                brandId:insertBrand
            }
        

        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/product/addStyle`,data)
              .then(({ data }) => data.data), 
        ])
        console.log(data)
        window.location.reload();
    }

    useEffect(()=>{
        const uniqBycategorys = _.uniqBy(styles,"category_name")
        let result =[]
        uniqBycategorys.map((item)=>{
          result.push({text:item.category_name})
        })
        setCategorys(result)
  
      },[])

    return(
        <Wrapper>
          
            <div>
              <SearchBar style={{width:"650px"}}>
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
                  setFiltedStyles(stylesFilter(styles,selectedBrand,selectedCategory))
                }}>
                    <div style={{font:"12px",fontWeight:"bold"}}>
                       조회
                    </div>
                </SearchBarButton>
              </SearchBar>
              <SearchBar>
                <SearchBarHeader >
                    스타일 코드
                </SearchBarHeader>
                
                <input value={searchProductName} style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,flex:0.6 ,fontSize:"16px"}} onChange={(e)=>{setSearchProductName(e.target.value)}}/>

                <SearchBarButton onClick={()=>{setFiltedStyles(stylesNameParse(styles,searchProductName))}}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>

                </SearchBar>
                
                <LaView>
                    <InputTableBox>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

                            <h2 style={{marginLeft:"20px",padding:"5px"}}>스타일 목록</h2>
                            <AddButton onClick={()=>{
                                getCategorys(insertBrand);
                                setAction(!action)
                            }}>추가</AddButton>

                        </div>
                        <PrView>
                        
                            <HeaderCell style={{flex:1}}>
                                브랜드
                            </HeaderCell>

                            <HeaderCell>
                                스타일 No.
                            </HeaderCell>

                            <HeaderCell>
                                카테고리
                            </HeaderCell>

                        </PrView>
                        <List styles={sortStyles(filtedStyles)}/>
                    
                    </InputTableBox>
                    {
                        action && 
                        
                        <div style={{margin:40,marginTop:140,height:"300px",width:"300px",display:"flex",flexDirection:"column",borderRadius:"15px",border:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <LaView style={{flex:1,borderRadius: "10px 10px 0% 0%",justifyContent:"center",alignItems:"center"}}>
                                <h2>스타일 추가</h2>
                            </LaView>
                            <LaView style={{flex:1,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <div style={{flex:1,backgroundColor:COLOR.MENU_MAIN}}>
                                    <HeaderCell style={{flex:1}}>
                                        브랜드
                                    </HeaderCell>
                                </div>
                                <div style={{flex:2,display:"flex",backgroundColor:COLOR.WHITE}}>
                                    <select style={{flex:1,textAlign:"center",border:"0px"}} value={insertBrand} onChange={(e)=>{getCategorys(e.target.value)}} 
                                        >
                                        {
                                            brands.map((item,index)=>(
                                            <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </LaView>
                            <LaView style={{flex:1,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <div style={{flex:1,backgroundColor:COLOR.MENU_MAIN}}>
                                    <HeaderCell>
                                        카테고리
                                    </HeaderCell>
                                </div>
                                <div style={{flex:2,display:"flex",backgroundColor:COLOR.WHITE}}>
                                    <select style={{flex:1,textAlign:"center",border:"0px"}} value={insertCategory} onChange={(e)=>{setInsertCategory(e.target.value)}} 
                                        >
                                        {
                                            styleCategorys.map((item,index)=>(
                                            <option key={index} value={item.pcategory_id}>{item.category_name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </LaView>
                            <LaView style={{flex:1,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <div style={{flex:1,backgroundColor:COLOR.MENU_MAIN}}>
                                    <HeaderCell>
                                        스타일 No.
                                    </HeaderCell>
                                </div>
                                <div style={{flex:2,display:"flex",backgroundColor:COLOR.WHITE}}>
                                    <input value={insertStyleNo||""} style={{flex:1,border:0,textAlign:"center"}} onChange={(e)=>{setInsertStyleNo(e.target.value)}}/>
                                </div>
                            </LaView>
                            <LaView style={{flex:1,borderRadius: "0px 0px 10px 10px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,justifyContent:"space-evenly",alignItems:"center"}}>
                                <AddButton style={{margin:0,color:COLOR.CYAN_BLUE}} onClick={()=>{addStyle()}}>추가</AddButton>
                                <AddButton style={{margin:0}} onClick={()=>{
                                    setAction(!action)
                                    setInsertStyleNo(null)
                                }}>취소</AddButton>
                            </LaView>
                        </div>
                    }
                </LaView>
                
            </div>
            
            
        </Wrapper>
    );
};
const stylesNameParse=(styles,text)=>{
  let result
  if(text && text !==""){
      let filt = _.filter(styles,function(obj){
        return obj.text.indexOf(text) !== -1;
      })
      result = filt
  }else{
      result =styles
  }
  return result
}
const stylesFilter =(styles,brand,category)=>{
  let result = styles
  if(brand){
    result = (_.filter(result,function(o){
      return o.brand_id == brand
    }))
  }
  if(category){
    result = (_.filter(result,function(o){
      return o.category_name == category
    }))
  }
  console.log(result)
  return (result)
}

const sortStyles =(styles)=>{
  let sortByBrand = _.sortBy(styles,"brand_name")
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

const InputTableBox  = styled.div`
    width:810px;
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
 
const AddButton =styled.h2`
    color:${COLOR.RED};
    margin-right:20px;
    cursor: pointer;
    border-radius:5px;
    padding:5px;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }
`

export default ProductStyleList