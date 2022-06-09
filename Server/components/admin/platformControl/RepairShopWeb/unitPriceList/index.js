import React,{useState} from "react";
import styled from "styled-components";
import axios from "axios";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import Router, { useRouter } from "next/router";
import Link from 'next/link';
import fileDownload from 'js-file-download'
import ip from "../../../../../constants/ip";

const XLSX = require('xlsx');

const UnitPriceListControl =({user,brands})=>{
    const router = useRouter();
    const [excelName,setExcelName] = useState("첨부파일")

    const sortedBrands =SortArray(brands)
    const [brandId,setBrandId] = useState(sortedBrands[0].brand_id)
    const [brandName,setBrandName] = useState(sortedBrands[0].brand_name)

    const [excelFile,setExcelFile] = useState([])

    const [unitPriceList,setUnitPriceList] = useState(null)


    const downLoadUnitPriceList = async(brandId) =>{
        
        router.push(ip+unitPriceList.unit_price_list)
    }

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files&&e.target.files[0]) {
            console.log(e.target.files[0])
            setExcelName(e.target.files[0].name)
            setExcelFile(e.target.files[0])
        }
    }
    const selectHandeler = async(value)=>{
        const selectBrand = _.find(brands,{"brand_id" : Number(value)})
        setBrandId(value)
        setBrandName(selectBrand.brand_name)


        const [result] = await Promise.all([
            axios
              .get(`${process.env.API_URL}/unitPriceList?brandId=${value}`)
              .then(({ data }) => data.data), 
        ])

        setUnitPriceList(result)
        

    }
    
    const registUnitPriceList = async() =>{
        
        const formData = new FormData();
        formData.append('brand', brandName)
        formData.append('brand_id', brandId)
        formData.append('brand_id', brandId)

        if(unitPriceList){
            formData.append('unit_price_list_id', unitPriceList.unit_price_list_id)
        }
        formData.append('unitPriceList', excelFile)

        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/unitPriceList/regist`,formData)
              .then(({ data }) => data), 
            ])
        alert("고객유상단가표가 등록되었습니다.")
        window.location.reload()
    }

    useState(()=>{
        const fetch =async()=>{
            const [result] = await Promise.all([
                axios
                  .get(`${process.env.API_URL}/unitPriceList?brandId=${brandId}`)
                  .then(({ data }) => data.data), 
            ])
    
            setUnitPriceList(result)
        }
        fetch()
        
    },[])
    

    return(
        <Wrapper>
            <InsideWrapper>
            <div style={{marginBottom:10,marginLeft:10,fontSize:20,fontWeight:"bold"}}>수선처 Web – 고객유상단가표 – 엑셀 등록(업로드) </div>

            <LaView style={{marginBottom:20,justifyContent:"space-between"}}>
                <ColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 위치: 수선처 WEB > 접수 탭 > 해당 서비스번호 클릭 > 접수용 팝업창 내 수선처 입력 섹션 "}</InColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ *.xlsx 또는 *.xls 형식의 엑셀 파일만 등록(업로드) 가능합니다. "}</InColView>
                </ColView>
            </LaView>

            <SearchBar style={{width:"300px"}}>
                    <PrView style={{flex:1, backgroundColor:COLOR.WHITE,borderRadius:0,}}>
                        <SearchBarHeader >
                        브랜드
                        </SearchBarHeader>

                        <SelectOption style={{flex:0.7,borderRadius: "0px 10px 10px 0px"}} onChange={(e)=>{selectHandeler(e.target.value)}}>
                            {
                                sortedBrands.map((item,index)=>(
                                    <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                ))
                            }
                        </SelectOption>
                    </PrView> 
              </SearchBar>
              

            <div style={{marginTop:20,marginBottom:20,paddingLeft:10,width:"100%",borderBottom:`2px solid ${COLOR.GRAY}`}}>
                <LaView style={{marginBottom:20}}>

                    <div style={{height:30,marginRight:20,fontSize:15,fontWeight:"bold",color:COLOR.CYAN_BLUE,display:"flex",justifyContent:"center",alignItems:"center"}}>
                        고객유상단가표
                    </div>
                    <ExcelDownload   onClick={()=>{downLoadUnitPriceList(unitPriceList.unitPriceList,`${brandName}.xlsx`)}}>
                        <ExcelDownloadImage  src="/icons/excel.png"/>
                        <ExcelDownloadText style={{}}>
                                다운로드
                        </ExcelDownloadText>
                    </ExcelDownload>

                </LaView>
            </div>

            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{minWidth:120,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:COLOR.LIGHT_GRAY,paddingLeft:10,paddingRight:10,height:30}}>엑셀파일 업로드</div>
                <label htmlFor="file" >
                    <div style={{marginLeft:10,marginRight:10,borderRadius:5,backgroundColor:COLOR.GRAY,display:"flex",justifyContent:"center",alignItems:"center",height:30,width:60,color:COLOR.WHITE}}>
                        찾아보기
                    </div>
                </label> 
                <input disabled value={excelName} placeholder="첨부파일" onChange={()=>{}}/>
                <button style={{minWidth:180,marginLeft:20,marginRight:10,borderRadius:5,backgroundColor:COLOR.DARK_INDIGO,display:"flex",justifyContent:"center",alignItems:"center",height:30,width:150,color:COLOR.WHITE}}
                    onClick={()=>{registUnitPriceList()}}
                >
                   고객유상단가표 등록
                </button>
                
                <CustomInput type="file" id="file" 
                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e)=>{readUploadFile(e)}}/>
            </div>
            
            </InsideWrapper>
        </Wrapper>
    )
}
export default UnitPriceListControl

const SortArray =(array)=>{
    let sort1=_.sortBy(array,"brand_name")
    
    return(sort1)
}
const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    flex-direction:coloum; 
    display:flex;
    min-width:750px;
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
const SelectItemHeader = styled.div`
    display : flex;
    flex:0.3;
    justify-content : center;
    align-items : center;
    font-size: 12px;
    font-weight: bold;
    border: 2px solid ${COLOR.LIGHT_GRAY};

`;
const SearchBarHeader = styled.div`
    flex:0.3;
    display:flex;
    font-size:15px;
    font-weight: bold;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 0px 0px 10px;
    justify-content:center;
    align-items:center;
    
`;
const SelectOption = styled.select`
    border :2px solid ${COLOR.LIGHT_GRAY};
    font-size:15px;
    padding-left:20px;
    &:focus { 
        outline: none !important;
    }
`;
const SearchBarButton = styled.div`
    flex:0.25;
    min-width:50px;
    background-color :${COLOR.MENU_MAIN};
    border-radius: 0px 10px 10px 0px;
    display: flex;
    justify-content:center;
    align-items:center;
`;
const InsideWrapper  = styled.div`
    display:flex;
    width:1000px;
    justify-content:center;
    flex-direction: column;
`;

const PrView  = styled.div`
    min-width:540px;
    display:flex;
    flex-direction:row;
`;
const LaView  = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center; 
    width:700px;
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:13px;
    align-items:center;
`;
const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;
const CustomInput = styled.input`
    object-fit:contain;
    visibility:hidden;
`
const ExcelDownloadImage = styled.img`
    width:35px;
    height:30px;
    background-color:rgb(240,240,240);
    padding-right:5px;
    border:1px solid rgb(240,240,240);
    
`
const ExcelDownloadText  = styled.div`
    width:140px;
    display:flex;
    align-items:center;
    justify-content: center;
    padding-left:10px;
    padding-right:15px;
    display:flex;
    border:1px solid rgb(240,240,240);
   
`;
const ExcelDownload =styled.div`
    display:flex;
    width:175px;
    flexDirection:row;
    cursor: pointer;
    &: hover {
        background-color: ${COLOR.LIGHT_GRAY};
    }
`