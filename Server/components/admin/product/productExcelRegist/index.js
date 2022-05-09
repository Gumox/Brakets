import React,{useState} from "react";
import styled from "styled-components";
import axios from "axios";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";

const XLSX = require('xlsx');

const ProductExcelRegist =({infos})=>{
    const router = useRouter();
    const [excelName,setExcelName] = useState("첨부파일")

    const [excelToJson,setExcelToJson] = useState([])

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files&&e.target.files[0]) {
            console.log(e.target.files[0].name)
            setExcelName(e.target.files[0].name)
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                console.log(json);
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
                <label htmlFor="file" >
                    <div style={{marginLeft:20,marginRight:10,borderRadius:5,backgroundColor:COLOR.GRAY,display:"flex",justifyContent:"center",alignItems:"center",height:30,width:60,color:COLOR.WHITE}}>
                        찾아보기
                    </div>
                </label> 
                <input disabled value={excelName} placeholder="첨부파일" onChange={()=>{}}/>
                <button style={{marginLeft:20,marginRight:10,borderRadius:5,backgroundColor:COLOR.DARK_INDIGO,display:"flex",justifyContent:"center",alignItems:"center",height:30,width:60,color:COLOR.WHITE}}
                    onClick={()=>{registProduct()}}
                >
                    등록
                </button>
                
                <CustomInput type="file" id="file" 
                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e)=>{readUploadFile(e)}}/>
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