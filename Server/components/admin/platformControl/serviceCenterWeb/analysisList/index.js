import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import axios from "axios";
import List from "./List";
import Paging from "../../../Paging";

const ControlAnalysisList = ({user,analysisType}) => {
    const [addState,setAddState] = useState(false)
    const [analysisName,setAnalysisName] = useState("")

    
    const [filted,setFilted] =useState(analysisType)



    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slcNum))



    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slcNum)

    const addAnalysis= async() =>{
        if(String(analysisName).length>0){
            console.log(analysisName)
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/analysisType/addAnalysis?headquarterId=${user.headquarter_id}&analysisName=${analysisName}`)
                .then(({ data }) => data.data), 
            ])
            alert("추가되었습니다")
            
            window.location.reload();
            
        }
        
    }
    return(
        <Wrapper>
            <div>
              
            
                <h2 style={{marginLeft:20}}>내용분석 - 종류 설정과 관리 </h2>

                <div style={{fontSize:"13px",marginLeft:20}}>{"ㆍ 위치: 서비스센터 WEB > 수선접수/처리 탭 > 본사 섹션 > 내용분석 "}</div>
                <div style={{fontSize:"13px",marginLeft:20}}>{"ㆍ 아래 기본 설정된 종류들의 사용여부를 변경하거나 새롭게 추가 가능합니다"}</div>
                    
        
                <div style={{display:"flex",flexDirection:"row"}}>
                        
                    <InputTableBox style={{marginTop:30}}>
                        <LaView style={{justifyContent:"space-between"}}>

                            <DivButton style={{marginLeft:20,fontWeight:"bold"}} onClick={()=>{setAddState(!addState)}}>
                                추가
                            </DivButton>

                            
                            <Paging max={max} width={"420px"} num={pageNumber} setNum={setPageNumber}/>
                            
                            <div style={{marginRight:20,width:50,padding:"5px"}} >
                                {analysisType.length}건
                            </div>
                        </LaView>
                        <div style={{marginBottom:10}}>
                            
                        </div>

                        <PrView style={{paddingLeft:2,paddingRight:2}}>
                            
                                <HeaderCell>
                                    내용분석
                                </HeaderCell>

                                
                                <HeaderCell style={{flex:3}}>
                                    사용 여부
                                </HeaderCell>
                                
                        </PrView>

                        
                        
                        <List list={slicedArray[pageNumber-1]}/>

                        <div style={{marginTop:10}}>
                            <Paging max={max} width={"475px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>

                    </InputTableBox>

                    {addState &&
                        <div style={{marginTop:60,marginLeft:20,height:180,width:350,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px"}}>
                            <HeaderCell style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px 10px 0 0"}}>
                                내용분석 추가
                            </HeaderCell>
                            <LaView style={{height:60,width:340,}}>
                                <HeaderCell style={{backgroundColor:COLOR.LIGHT_GRAY}}>
                                    내용분석
                                </HeaderCell>
                                <InputLine value={analysisName} placeholder={"ex) 원단"} style={{height:60,borderLeft:`2px solid ${COLOR.LIGHT_GRAY}`}} onChange={(e)=>{setAnalysisName(e.target.value)}}/>
                            </LaView>
                            <LaView style={{justifyContent:"space-evenly",height:60,width:345,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <DivButton style={{color:COLOR.CYAN_BLUE}} onClick={()=>{addAnalysis()}}>
                                    추가
                                </DivButton>
                                <DivButton onClick={()=>{setAddState(!addState)}}>
                                    취소
                                </DivButton>
                            </LaView>
                        </div>
                    }
                </div>
                
            </div>
        </Wrapper>
    );
};
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
const SearchStaffBar = styled.div`
    width:540px;
    height:50px;
    margin-bottom:30px;
    display: flex;
    flex-direction : row;
`
const SearchStaffBarHeader = styled.div`
    flex:0.4;
    display:flex;
    font-size:15px;
    font-weight: bold;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 0px 0px 10px;
    justify-content:center;
    align-items:center;
    
`
const SearchStaffBarButton = styled.div`
    flex:0.15;
    background-color :${COLOR.MENU_MAIN};
    border-radius: 0px 10px 10px 0px;
    display: flex;
    justify-content:center;
    align-items:center;
    
`
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColViewTop  = styled.div`
    display:flex;
    font-size:15px;
    justify-content:center;
    align-items:center;
`;
const InColViewBottom  = styled.div`
    display:flex;
    font-size:10px;
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
    flex:2;
    padding:5px;
`;
const InputLine  = styled.input`
    border 0px;
    padding-left:20px;
    font-size:16px;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
`;
const InputTableBox  = styled.div`
    width:475px;
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
    align-items:center; 
    width:475px;
`;
const DivButton = styled.div`
    color:${COLOR.RED};
    width:50px;
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
const SearchImage =styled.img`
  width:25px;
  height: 25px;
  cursor: pointer;
`;

export default ControlAnalysisList