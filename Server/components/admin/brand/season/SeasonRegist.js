import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import moment from "moment";
import Router, { useRouter } from "next/router";
import axios from "axios";


const SeasonRegist = ({user,infos,season,brands=[]}) => {
    
    const router = useRouter();
    const [selectBrandId,setSelectBrandId] = useState(brands[0].brand_id)

    const [seasonName,setSeasonName] = useState(null)
    const [seasonCode,setSeasonCode] = useState(null)

    const [seasonStartDate,setSeasonStartDate] = useState(null)
    const [seasonEndDate,setSeasonEndDate] = useState(null)

    const emptySpace =(str)=>{
        let name = ""
        for(let i =0; i<str.length;i++){
            if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
                name += "_"
            }else if(str[i] !== " " && str[i]){
                name += str[i]
            }
        }
        return(String(name).replace(/_/g," ").trim())
        
    }

    const registSeason = async() =>{
        if(String(seasonName).replace(/ /g,"").length>0 && String(seasonCode).replace(/ /g,"").length>0){

            const data ={
                seasonName : emptySpace(seasonName),
                seasonCode : emptySpace(seasonCode),
                startDate : seasonStartDate,
                endDate : seasonEndDate,
                brandId : selectBrandId
            }

            const [check] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/brand/checkRegistedSeason`,data)
                .then(({ data }) => data), 
                ])

            
            if(check.info1 && check.info2){
                const [result] = await Promise.all([
                    axios
                    .post(`${process.env.API_URL}/brand/registSeason`,data)
                    .then(({ data }) => data.body), 
                    ])
                alert("새로운 시즌이 등록되었습니다.")
                router.push("/admin/brandControl/seasonList")
            }
            if(!check.info1){
                alert("이미 등록된 시즌 이름입니다.")
            }
            if(!check.info2){
                alert("이미 등록된 시즌 코드입니다.")
            }
        }else if(String(seasonName).replace(/ /g,"").length < 1 ){
            alert("시즌 이름을 입력해주세요")
        }else if(String(seasonCode).replace(/ /g,"").length < 1 ){
            alert("시즌 코드를 입력해주세요")
        }
    }
    return(
        <Wrapper>
          
            <div>
              
            
              <h2 style={{marginLeft:20}}>시즌 등록</h2>
                  <InputTableBox>
                  <PrView style={{borderRadius: "10px 10px 0 0 "}}>
                      
                      <HeaderCell style={{borderRadius: "10px 0 0 0 "}}>
                          <NameBox  style={{borderRadius: "10px 0 0 0 "}}>
                            브랜드 이름
                            </NameBox>
                            
                            <InputBox style={{borderRadius: "0 10px 0 0 ",paddingLeft:180 ,alignItems:"center",fontSize:20,fontWeight:"bold",borderBottom:0}}>
                                <select value={selectBrandId} style={{borderRadius: "0 10px 0 0 ",border:0,fontSize:16,fontWeight:"bold"}} onChange={(e)=>{setSelectBrandId(e.target.value)}}>
                                    {
                                        brands.map((item,index)=>(
                                            <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                        ))
                                    }
                                </select>
                            </InputBox>
                      </HeaderCell>

                    </PrView>

                    <PrView>
                        <HeaderCell>
                          <NameBox  style={{borderTop:"2px solid rgb(244, 244, 244)"}}>
                            <RedDiv>*</RedDiv>
                            시즌 이름
                            </NameBox>
                            <InputBox style={{borderBottom:0}}>
                                <InputLine value={seasonName ||""} onChange={(e)=>{setSeasonName(e.target.value)}}/>
                            </InputBox>
                        </HeaderCell>
                    
                        <HeaderCell>
                          <NameBox>
                            <RedDiv>*</RedDiv>
                            시즌 코드
                            </NameBox>
                            <InputBox style={{borderBottom:0}}>
                                <InputLine value={seasonCode ||""} onChange={(e)=>{setSeasonCode(e.target.value)}}/>
                            </InputBox>
                        </HeaderCell>
                    </PrView>

                    <PrView  style={{borderRadius: "0 0 10px 10px"}}>
                        <HeaderCell style={{borderRadius: "0 0 0 10px"}}>
                          <NameBox  style={{borderRadius: "0 0 0 10px",borderTop:"2px solid rgb(244, 244, 244)"}}>
                            시즌 시작일
                            </NameBox>
                            <InputBox style={{justifyContent:"center",fontSize:20,fontWeight:"bold"}}>
                                <InputLine type="date" value={seasonStartDate} style={{border:0,fontSize:14,cursor:"pointer",textAlign:"center"}} onChange={(e)=>{setSeasonStartDate(moment(e.target.value).format("YYYY-MM-DD"))}}/>
                            </InputBox>
                        </HeaderCell>
                     
                        <HeaderCell style={{borderRadius: "0 0 10px 0"}}>
                          <NameBox style={{borderTop:"2px solid rgb(244, 244, 244)"}}>
                            시즌 종료일
                            </NameBox>
                            <InputBox style={{borderRadius: "0 0 10px 0",justifyContent:"center",fontSize:20,fontWeight:"bold"}}>
                                <InputLine type="date" value={seasonEndDate} style={{border:0,fontSize:16,cursor:"pointer",textAlign:"center"}} onChange={(e)=>{setSeasonEndDate(moment(e.target.value).format("YYYY-MM-DD"))}}/>
                            </InputBox>
                        </HeaderCell>

                    </PrView>

                    <CenterView>
                        <RegistButton onClick={()=>{
                            if(brands.length>0){
                                registSeason()
                            }else{
                                alert('등록된 브랜드가 없습니다 먼저 브랜드를 등록해 주세요')
                            }
                        }}>
                            등록
                        </RegistButton>
                    </CenterView>
                    
              </InputTableBox>
            </div>
            
            
        </Wrapper>
    );
};


const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;
const NameBox  = styled.div`
    height : 60px;
    width:180px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 16px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 60px;
    min-width:180px;
    flex:1;
    display:flex;
    border:2px solid ${COLOR.LIGHT_GRAY};
    justyfiy-content:center;
    ailgn-items:center;
`;

const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:14px;
    border-radius:10px;

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
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    flex:1;
`;

const InputTableBox  = styled.div`
    min-width:950px;
    margin-top:20px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const RedDiv =styled.div`
    margin: 2px;
    color: ${COLOR.RED};
` 


export default SeasonRegist