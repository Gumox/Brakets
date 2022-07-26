import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";
import axios from "axios";
import Paging from "../../Paging";

const StyleList = ({user,styles,products,brands}) => {
    
    const [action,setAction] = useState(false)
    const [filtedStyles,setFiltedStyles] =useState(sortStyles(styles))

    
    const slicingNumber =10
    const [slicedArray,setSlicedArray] = useState(slicingArray(filtedStyles,slicingNumber))

    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filtedStyles.length/slicingNumber)


    const [selectedBrand,setSelectedBrand] = useState("")
    const [selectedCategory,setSelectedCategory] = useState("")

    
    const [searchProductName,setSearchProductName] =useState("")

    
    const [insertBrand,setInsertBrand] =useState(null)
    const [insertStyleNo,setInsertStyleNo] =useState(null)
    
    const [styleCategorys,setStyleCategorys] =useState([])
    const [insertCategory,setInsertCategory] =useState(null)
    
    const [categorys,setCategorys] = useState([])

    useEffect(()=>{
        if(brands.length>0){
            setInsertBrand(brands[0].brand_id)
        }
    },[])

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
        window.location.reload();
    }

    const SearchSelectBarHandler = ()=>{

        setPageNumber(1)
        setFiltedStyles(sortStyles(stylesFilter(styles,selectedBrand,selectedCategory)))
        let sort =(sortStyles(stylesFilter(styles,selectedBrand,selectedCategory) ))
        setSlicedArray(slicingArray(sort,slicingNumber))
        

        
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
                
            <h2 style={{marginLeft:"15px",padding:"5px"}}>스타일 목록</h2>
              <SearchBar style={{width:"650px"}}>
                <SearchBarHeader >
                    조회 조건
                </SearchBarHeader>
                    <PrView style={{flex:1.5, backgroundColor:COLOR.WHITE}}>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            브랜드
                          </SelectItemHeader>

                          <div style={{display:"flex",flex:1,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <SearchSelect style={{paddingLeft:20}} 
                                onChange={(e)=>{setSelectedBrand(e.target.value)}}>
                                <option  value={""} >{"전체"}</option>
                                {
                                    brands.map((item,index)=>(
                                    <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                    ))
                                }
                            </SearchSelect>
                          </div>

                      </PrView>
                      <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                          <SelectItemHeader >
                            카테고리
                          </SelectItemHeader>
                          
                          <div style={{display:"flex",flex:0.7,borderLeft:0,borderRight:0,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                            <SearchSelect style={{paddingLeft:20}} 
                                onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                                <option  value={""} >{"전체"}</option>
                                {
                                    categorys.map((item,index)=>(
                                    <option key={index} value={item.text}>{item.text}</option>
                                    ))
                                }
                            </SearchSelect>
                          </div>

                          
                      </PrView>
                    </PrView>
                <SearchBarButton onClick={()=>{
                    SearchSelectBarHandler()
                }}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>
              </SearchBar>
              <SearchBar>
                <SearchBarHeader >
                    스타일 No.
                </SearchBarHeader>

                <div style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,flex:0.6,display:"flex"}}>
                    <InputLine value={searchProductName} onChange={(e)=>{setSearchProductName(e.target.value)}}/>
                </div>

                <SearchBarButton onClick={()=>{
                    setSlicedArray(slicingArray(stylesNameParse(styles,searchProductName),slicingNumber))
                    }}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchBarButton>

                </SearchBar>
                
                <LaView>
                    <InputTableBox>


                
                        
                        
                        <LaView style={{justifyContent:"space-between",alignItems:"center"}}>

                                <AddButton style={{fontSize:"15px"}} onClick={()=>{
                                     if(brands.length>0){
                                        getCategorys(insertBrand);
                                        setAction(!action)
                                    }else{
                                        alert('등록된 브랜드가 없습니다 먼저 브랜드를 등록해 주세요')
                                    }
                                }}>추가</AddButton>
                            
                            <Paging max={max} width={"420px"} num={pageNumber} setNum={setPageNumber}/>
                            
                            <div style={{marginRight:20,width:50,padding:"5px"}} >
                                {(styles).length}건
                            </div>

                        </LaView>

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
                        <List styles={slicedArray[pageNumber-1]}/>

                        <div style={{marginTop:10}}>
                            <Paging max={max} width={"810px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>
                    
                    </InputTableBox>
                    {
                        action && 
                        
                        <div style={{margin:40,marginTop:65,height:"300px",width:"300px",display:"flex",
                                    flexDirection:"column",borderRadius:"15px",border:`2px solid ${COLOR.LIGHT_GRAY}`,
                                    position:"sticky",top:"30px"
                                }}>
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
                                    <SearchSelect style={{flex:1,textAlign:"center",border:"0px"}} value={insertBrand} onChange={(e)=>{getCategorys(e.target.value)}} 
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
                                    <SearchSelect style={{flex:1,textAlign:"center",border:"0px"}} value={insertCategory} onChange={(e)=>{setInsertCategory(e.target.value)}} 
                                        >
                                        {
                                            styleCategorys.map((item,index)=>(
                                            <option key={index} value={item.pcategory_id}>{item.category_name}</option>
                                            ))
                                        }
                                    </SearchSelect>
                                </div>
                            </LaView>
                            <LaView style={{flex:1,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <div style={{flex:1,backgroundColor:COLOR.MENU_MAIN}}>
                                    <HeaderCell>
                                        스타일 No.
                                    </HeaderCell>
                                </div>
                                <div style={{flex:2,display:"flex",backgroundColor:COLOR.WHITE}}>
                                    <InputLine value={insertStyleNo||""} style={{flex:1,textAlign:"center"}} onChange={(e)=>{setInsertStyleNo(e.target.value)}}/>
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
  return (result)
}

const sortStyles =(styles)=>{
    let sortByCategory = _.sortBy(styles,"category_name")
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
    min-width:90px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    flex:1;
    padding:5px;
`;
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    flex:1;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
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
    min-width:80px;
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
 
const AddButton =styled.h2`
    color:${COLOR.RED};
    margin-left:20px;
    min-width : 50px;
    display: flex;
    justify-content : center;
    align-items:center;

    cursor: pointer;
    border-radius:5px;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }
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
export default StyleList