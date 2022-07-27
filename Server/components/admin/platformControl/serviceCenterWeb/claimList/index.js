import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import axios from "axios";
import List from "./List";
import Paging from "../../../Paging";

const ControlClaimList = ({user,claim}) => {
    const [addState,setAddState] = useState(false)
    const [claimType,setClaimType] = useState("택가")
    const [claimPercent,setClaimPercent] = useState("")


    
    const [filted,setFilted] =useState(claimSort(claim))



    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slcNum))



    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slcNum)

    const addClaim= async() =>{
        if(claimPercent){
            if(String(claimType).length>0){

                let data ={
                    claimValue :  parseFloat(claimPercent) / 100,
                    claimText : claimPercent+"%",
                    claimType : claimType,
                    headquarterId :user.headquarter_id
                }


                const [result] = await Promise.all([
                    axios
                    .post(`${process.env.API_URL}/claim/addClaim`,data)
                    .then(({ data }) => data.data), 
                ])
                alert("추가되었습니다")
                
                window.location.reload();
                
            }
        }else if(!claimPercent){
            alert("클레임가 비율을 설정해주세요")
        }
        
    }
    return(
        <Wrapper>
            <div>
              
            
                <h2 style={{marginLeft:20}}>클레임가 – 설정과 관리</h2>

                <div style={{fontSize:"13px",marginLeft:20}}>{"ㆍ 위치: 서비스센터 WEB > 수선접수/처리 탭 > 본사 섹션 > 클레임가 "}</div>
                <div style={{fontSize:"13px",marginLeft:20}}>{"ㆍ 아래 기본 설정된 조건의 사용여부를 변경하거나 새롭게 추가 가능합니다"}</div>
                   
        
                <div style={{display:"flex",flexDirection:"row"}}>
                        
                    <InputTableBox style={{marginTop:30}}>
                        <LaView style={{justifyContent:"space-between"}}>

                            <DivButton style={{marginLeft:20,fontWeight:"bold"}} onClick={()=>{setAddState(!addState)}}>
                                추가
                            </DivButton>
                            

                            
                            <Paging max={max} width={"600px"} num={pageNumber} setNum={setPageNumber}/>
                            
                            <div style={{marginRight:20,width:50,padding:"5px"}} >
                                {claim.length}건
                            </div>

                        </LaView>
                        <div style={{marginBottom:10}}>
                            
                        </div>

                        <PrView style={{paddingLeft:2,paddingRight:2}}>
                            
                                <HeaderCell>
                                    클레임가 기준
                                </HeaderCell>
                                <HeaderCell>
                                    클레임가 비율
                                </HeaderCell>

                                
                                <HeaderCell style={{flex:3,width:"300px"}}>
                                    사용 여부
                                </HeaderCell>
                                
                        </PrView>

                        
                        
                        <List list={slicedArray[pageNumber-1]}/>

                        <div style={{marginTop:10}}>
                            <Paging max={max} width={"700px"} num={pageNumber} setNum={setPageNumber}/>
                        </div>

                    </InputTableBox>

                    {addState &&
                        

                        <div style={{marginTop:60,marginLeft:20,height:180,borderRadius:"10px"}}>
                        
                        <LaView style={{justifyContent:"space-evenly",height:60,width:345,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px 10px 0 0 "}}>
                            <HeaderCell style={{borderRadius:"10px 10px 0 0"}}>
                                클레임가 추가
                            </HeaderCell>
                        </LaView>
                        <LaView style={{height:60,width:345,}}>
                            <HeaderCell style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,backgroundColor:COLOR.LIGHT_GRAY}}>
                                클레임가 기준 선택
                            </HeaderCell>
                            <div style={{display:"flex",flexDirection:"row",alignItems:"center",borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <SelectOption value={claimType} style={{height:60,width:198,}} onChange={(e)=>{setClaimType(e.target.value)}}>
                                        <option value={"택가"}>택가</option>
                                        <option value={"원가"}>원가</option>
                                    </SelectOption>
                            </div>
                        </LaView>
                        <LaView style={{height:60,width:345,}}>
                            <HeaderCell style={{borderTop:`2px solid rgb(244,244,244)`,border:`2px solid ${COLOR.LIGHT_GRAY}`,backgroundColor:COLOR.LIGHT_GRAY}}>
                                클레임가 비율 설정
                            </HeaderCell>
                            <div style={{display:"flex",flexDirection:"row",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine type={"number"} placeholder={"100"} value={claimPercent || ""} style={{height:58,width:160,textAlign:"center"}} onChange={(e)=>{setClaimPercent(e.target.value)}}/>
                                <div style={{fontSize:22,marginRight:"20px"}}>{"%"}</div>
                            </div>
                        </LaView>
                        <LaView style={{justifyContent:"space-evenly",height:60,width:345,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:" 0 0 10px 10px"}}>
                            <DivButton style={{color:COLOR.CYAN_BLUE}} onClick={()=>{addClaim()}}>
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

const claimSort =(array)=>{
    let sort1=_.sortBy(array,"claim_value")
    let sort2=_.sortBy(sort1,"claim_type").reverse();
    
    return(sort2)
}

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;


const SelectOption = styled.select`
    border :0;
    font-size:14px;
    padding:20px;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
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
    width:200px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    flex:2;
    padding:5px;
`;

const InputTableBox  = styled.div`
    width:700px;
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
    width:700px;
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

export default ControlClaimList