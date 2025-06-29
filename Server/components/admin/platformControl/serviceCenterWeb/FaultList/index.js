import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import axios from "axios";
import List from "./List";
import Paging from "../../../Paging";

const ControlFaultList = ({user,faultType}) => {
    const [addState,setAddState] = useState(false)
    const [faultName,setFaultName] = useState("")


    const [filted,setFilted] =useState(faultType)



    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slcNum))



    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slcNum)

    const addFault= async() =>{
        if(String(faultName).length>0){
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/faultDivision/addFault?headquarterId=${user.headquarter_id}&faultName=${faultName}`)
                .then(({ data }) => data.data), 
            ])
            alert("추가되었습니다")
            
            window.location.reload();
            
        }
        
    }
    return(
        <Wrapper>
            <div>
              
                <h2 style={{marginLeft:20}}>과실구분 - 종류 설정과 관리 </h2>

                <LaView style={{justifyContent:"space-between"}}>
                    <div style={{fontSize:"13px",marginLeft:20}}>{"ㆍ 위치: 서비스센터 WEB > 수선접수/처리 탭 > 본사 섹션 > 과실구분 "}</div>
                    
                </LaView>
                <LaView style={{justifyContent:"space-between"}}>
                    
                    <div style={{fontSize:"13px",marginLeft:20}}>{"ㆍ 아래 기본 설정된 종류들의 사용여부를 변경하거나 새롭게 추가 가능합니다"}</div>
                    
                </LaView>
        
                <div style={{display:"flex",flexDirection:"row"}}>
                        
                    <InputTableBox style={{marginTop:30}}>

                        <LaView style={{justifyContent:"space-between"}}>

                            <DivButton style={{marginLeft:20, fontWeight:"bold"}} onClick={()=>{setAddState(!addState)}}>
                                추가
                            </DivButton>
                            
                            <Paging max={max} width={"420px"} num={pageNumber} setNum={setPageNumber}/>
                            
                            <div style={{marginRight:20,width:50,padding:"5px"}} >
                                {faultType.length}건
                            </div>

                        </LaView>
                        <div style={{marginBottom:10}}>
                            
                        </div>

                        <PrView style={{paddingLeft:2,paddingRight:2}}>
                            
                                <HeaderCell>
                                    과실구분
                                </HeaderCell>

                                <HeaderCell style={{flex:3}}>
                                    수선처의 선택 여부 
                                </HeaderCell>

                                <HeaderCell style={{flex:3}}>
                                    사용 여부
                                </HeaderCell>
                                
                        </PrView>

                        
                        
                        <List list={slicedArray[pageNumber-1]}/>

                        <div style={{marginTop:10}}>
                            <Paging max={max} width={"750px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>

                    </InputTableBox>
            
                
                    {addState &&
                        <div style={{marginTop:60,marginLeft:20,height:180,borderRadius:"10px"}}>
                            <HeaderCell style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px 10px 0 0"}}>
                                과실구분 추가
                            </HeaderCell>
                            <LaView style={{height:60,width:345,}}>
                                <HeaderCell style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,backgroundColor:COLOR.LIGHT_GRAY}}>
                                    과실구분
                                </HeaderCell>
                                <InputLine value={faultName} placeholder={"ex) 고객과실"} style={{height:60,borderLeft:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}} onChange={(e)=>{setFaultName(e.target.value)}}/>
                            </LaView>
                            <LaView style={{justifyContent:"space-evenly",height:60,width:345,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:" 0 0 10px 10px"}}>
                                <DivButton style={{color:COLOR.CYAN_BLUE}} onClick={()=>{addFault()}}>
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
    font-size:14px;
    flex:2;
    padding:5px;
`;
const InputLine  = styled.input`
    border 0px;
    padding-left:20px;
    font-size:14px;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
`;
const InputTableBox  = styled.div`
    width:750px;
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
    width:750px;
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
const SearchImage =styled.img`
  width:25px;
  height: 25px;
  cursor: pointer;
`;

export default ControlFaultList