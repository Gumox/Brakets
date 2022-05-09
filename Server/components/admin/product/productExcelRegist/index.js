import React,{useState} from "react";
import styled from "styled-components";
import axios from "axios";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import Link from 'next/link';
import fileDownload from 'js-file-download'

const XLSX = require('xlsx');

const ProductExcelRegist =({infos})=>{
    const router = useRouter();
    const [excelName,setExcelName] = useState("첨부파일")

    const [excelToJson,setExcelToJson] = useState([])

    const handleClick = (url, filename) => {
        axios.get(url, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, filename)
        })
      }

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files&&e.target.files[0]) {
            setExcelName(e.target.files[0].name)
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setExcelToJson(json)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    const registProduct = async() =>{
        const data = {headquarterId:infos[0].value ,list:excelToJson}
        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/product/registToExcel`,data)
              .then(({ data }) => data.body), 
            ])
        alert("제품이 등록되었습니다.")
        router.push("/admin/productControl")
    }

    return(
        <Wrapper>
            <InsideWrapper>
            <div style={{marginBottom:20,fontSize:20,fontWeight:"bold"}}>제품 엑셀 업로드</div>

            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:COLOR.LIGHT_GRAY,paddingLeft:10,paddingRight:10,height:30}}>엑셀파일 업로드</div>
                <label htmlFor="file" >
                    <div style={{marginLeft:10,marginRight:10,borderRadius:5,backgroundColor:COLOR.GRAY,display:"flex",justifyContent:"center",alignItems:"center",height:30,width:60,color:COLOR.WHITE}}>
                        찾아보기
                    </div>
                </label> 
                <input disabled value={excelName} placeholder="첨부파일" onChange={()=>{}}/>
                <button style={{marginLeft:20,marginRight:10,borderRadius:5,backgroundColor:COLOR.DARK_INDIGO,display:"flex",justifyContent:"center",alignItems:"center",height:30,width:80,color:COLOR.WHITE}}
                    onClick={()=>{registProduct()}}
                >
                    제품 등록
                </button>
                
                <CustomInput type="file" id="file" 
                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e)=>{readUploadFile(e)}}/>
            </div>
            <div style={{marginTop:20,paddingLeft:10,width:"100%",borderTop:`2px solid ${COLOR.GRAY}`}}>
                <div style={{marginTop:20,fontSize:15,fontWeight:"bold",color:COLOR.CYAN_BLUE}}>
                    엑셀 샘플 다운로드
                </div>
                    <ExcelDownload onClick={()=>{handleClick("/Product_example.xlsx","Product_example.xlsx")}}>
                        <ExcelDownloadImage  src="/icons/excel.png"/>
                        <ExcelDownloadText style={{}}>
                            엑셀 샘플 다운로드
                        </ExcelDownloadText>
                    </ExcelDownload>
            </div>
            </InsideWrapper>
        </Wrapper>
    )
}
export default ProductExcelRegist

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    flex-direction:coloum; 
    display:flex;
    min-width:750px;
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
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
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
    margin-top:10px;
    display:flex;
    width:175px;
    flexDirection:row;
    cursor: pointer;
    &: hover {
        background-color: ${COLOR.LIGHT_GRAY};
    }
`