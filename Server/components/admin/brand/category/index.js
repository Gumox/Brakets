import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import axios from "axios";
import Paging from "../../Paging";

const CategoryList = ({user,infos,categorys,brands}) => {
    
    const [action,setAction] = useState(false)
    const [filtedCategorys,setFiltedCategorys] =useState(sortCategorys(categorys))



    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filtedCategorys,slcNum))



    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filtedCategorys.length/slcNum)
    
    const SearchBarHandler = ()=>{
        setPageNumber(1)
        let brandParse = categorysNameParse(categorys,selectedBrand)
        let sort = sortCategorys(brandParse)

        console.log(categorys)
        console.log(brandParse)
        console.log(sort)

        setFiltedCategorys(sort)
        setSlicedArray(slicingArray(sort,slcNum))

    }

    const [selectedBrand,setSelectedBrand] = useState("")
    
    const [insertBrand,setInsertBrand] =useState(brands[0].brand_id)
    const [insertCategoryName,setInsertCategoryName] =useState(null)
    
    const emptySpace =(str)=>{
        console.log("s ",str)
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

    
    const addCategory= async() =>{
        const data=
            {  
                categoryName:emptySpace(insertCategoryName),
                brandId:insertBrand
            }
        

        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/brand/addCategory`,data)
              .then(({ data }) => data.data), 
        ])
        window.location.reload();
    }

    return(
        <Wrapper>
          
            <div>
                
            <h2 style={{marginLeft:"20px",padding:"5px"}}>카테고리 목록</h2>
              <SearchBar style={{width:"450px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            브랜드
                          </SelectItemHeader>
                          
                          <div style={{display:"flex",flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                            <SearchSelect value={selectedBrand} style={{paddingLeft:20,flex:1}} 
                                onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                                <option  value={""} >{"전체"}</option>
                                {
                                    brands.map((item,index)=>(
                                    <option key={index} value={item.brand_name}>{item.brand_name}</option>
                                    ))
                                }
                            </SearchSelect>
                          </div>
                          
                      </PrView> 
                    </PrView>
                <SearchBarButton onClick={()=>{
                    SearchBarHandler()
                  
                }}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
              
                
                <LaView>
                    <InputTableBox>

                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <LaView style={{width:"100%",justifyContent:"space-between",marginBottom:10}}>

                                    <DivButton style={{marginLeft:20,paddingBottom:10, fontWeight:"bold"}} onClick={()=>{setAction(!action)}}>
                                        추가
                                    </DivButton>

                                    <Paging max={max} width={"420px"} num={pageNumber} setNum={setPageNumber}/>

                                    <div style={{marginRight:20,marginBottom:5,width:50,padding:"5px"}} >
                                        {categorys.length}건
                                    </div>

                                </LaView>
                        </div>
                        <PrView>
                        
                            <HeaderCell style={{flex:1}}>
                                브랜드
                            </HeaderCell>

                            <HeaderCell>
                                카테고리
                            </HeaderCell>

                        </PrView>
                        <List categorys={slicedArray[pageNumber-1]}/>

                        <div style={{marginTop:10}}>
                            <Paging max={max} width={"580px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>
                    </InputTableBox>
                    {
                        action && 
                        
                        <div style={{margin:40,marginTop:140,height:"240px",width:"300px",display:"flex",
                                    flexDirection:"column",borderRadius:"15px",border:`2px solid ${COLOR.LIGHT_GRAY}`,
                                    position:"sticky",top:"30px"
                                    }}>
                            <LaView style={{flex:1,borderRadius: "10px 10px 0% 0%",justifyContent:"center",alignItems:"center"}}>
                                <h2>카테고리 추가</h2>
                            </LaView>
                            <LaView style={{flex:1,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <div style={{flex:1,backgroundColor:COLOR.MENU_MAIN}}>
                                    <HeaderCell style={{flex:1}}>
                                        브랜드
                                    </HeaderCell>
                                </div>
                                <div style={{flex:2,display:"flex",backgroundColor:COLOR.WHITE}}>
                                    <SearchSelect style={{flex:1,textAlign:"center",border:"0px"}} value={insertBrand} onChange={(e)=>{setInsertBrand(e.target.value)}} 
                                        >
                                        {
                                            brands.map((item,index)=>(
                                            <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                            ))
                                        }
                                    </SearchSelect>
                                </div>
                            </LaView>
                            <LaView style={{flex:1,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <div style={{flex:1,backgroundColor:COLOR.MENU_MAIN}}>
                                    <HeaderCell>
                                        카테고리
                                    </HeaderCell>
                                </div>
                                <div style={{flex:2,display:"flex",backgroundColor:COLOR.WHITE}}>
                                    <InputLine value={insertCategoryName||""} style={{flex:1,border:0,textAlign:"center"}} onChange={(e)=>{setInsertCategoryName(e.target.value)}}/>
                                </div>
                            </LaView>
                            <LaView style={{flex:1,borderRadius: "0px 0px 10px 10px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,justifyContent:"space-evenly",alignItems:"center"}}>
                                <AddButton style={{margin:0,color:COLOR.CYAN_BLUE}} onClick={()=>{addCategory()}}>추가</AddButton>
                                <AddButton style={{margin:0}} onClick={()=>{
                                    setAction(!action)
                                    setInsertCategoryName(null)
                                }}>취소</AddButton>
                            </LaView>
                        </div>
                    }
                </LaView>
                
            </div>
            
            
        </Wrapper>
    );
};
const categorysNameParse=(categorys,text)=>{
    let result
    if(text && text !==""){
        let filt = _.filter(categorys,{"brand_name" : text})
        result = filt
    }else{
        result = categorys
    }
    
  return result
}


const sortCategorys =(categorys)=>{
    let sortByCategory= _.sortBy(categorys,"category_name")
    let sortByBrand = _.sortBy(sortByCategory,"brand_name")
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
    width:780px;
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
    font-size: 15px;
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
const DivButton = styled.div`
color:${COLOR.RED};
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

export default CategoryList