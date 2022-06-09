import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import axios from "axios";
import List from "./List";
import Paging from "../../../Paging";

const ControlSmsMessageList = ({user,list}) => {
    const [addState,setAddState] = useState(false)
    const [changeState,setChangeState] = useState(false)

    
    const [smsMessageId,setSmsMessageId] = useState("")
    const [smsMessageType,setSmsMessageType] = useState(1)
    const [changeText,setChangeText] = useState("")
    const [addText,setAddText] = useState("")


    
    const [filted,setFilted] =useState(SortArray(list))



    const slcNum =10

    const [slicedArray,setSlicedArray] = useState(slicingArray(filted,slcNum))



    const [pageNumber,setPageNumber] = useState(1)
    
    const max = Math.ceil(filted.length/slcNum)

    const changeSmsMessage= async() =>{
        if(smsMessageId > 0){
            let data ={
                smsMessage:changeText,
                smsMessageId
                
            }
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/sms/smsMessageModify`,data)
                .then(({ data }) => data.data), 
            ])
            
            alert("변경되었습니다")
            
            window.location.reload();
        }
        
    }
    
    const addSmsMessage= async() =>{

        if(String(addText).length > 0){
            let data ={
                smsMessage:addText,
                headquarterId:user.headquarter_id,
                level:smsMessageType
            }
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/sms/smsMessageAdd`,data)
                .then(({ data }) => data.data), 
            ])
            
            alert("추가되었습니다")
            
            window.location.reload();
        }else{
            
            alert("문구를 입력해주세요")
        }
        
    }
    
    const changeHandler = (value,smsId) =>{
        setAddState(false)
        setAddText("")
        setChangeText(value)
        setSmsMessageId(smsId)
        setSmsMessageType(1)
        setChangeState(true)

    }

    const changeCancel = () =>{
        setAddState(false)
        setAddText("")
        setChangeText("")
        setSmsMessageId(0)
        setSmsMessageType(1)
        setChangeState(false)

    }

    const addHandler = () =>{
        setChangeState(false)
        setChangeText("")
        setSmsMessageId(0)
        setSmsMessageType(1)
        setAddState(true)
    }

    const addCancel = () =>{
        setAddState(false)
        setChangeText("")
        setAddText("")
        setSmsMessageId(0)
        setSmsMessageType(1)
        setChangeState(false)

    }

    return(
        <Wrapper>
            <div>
              
            
                <h2 style={{marginLeft:20}}>SMS 전송 탭 – 기본 메시지 문구 설정과 관리 </h2>

                <LaView style={{justifyContent:"space-between",marginBottom:10}}>
                    <ColView>
                        <InColView style={{marginLeft:20}}>{"ㆍ 위치: 서비스센터 WEB > SMS전송 탭"}</InColView>
                        <InColView style={{marginLeft:20}}>{"ㆍ 아래 예시 문구를 참고하여 회사정책 또는 브랜드에 맞게 자주 사용하는 문자메시지 문구를 만드세요."}</InColView>
                        
                    </ColView>
                </LaView>
        

                <div style={{display:"flex",flexDirection:"row"}}>
                        
                    <InputTableBox style={{marginTop:30}}>

                        <PrView style={{paddingLeft:2,paddingRight:2}}>
                            
                                <HeaderHash>
                                    #
                                </HeaderHash>
                                <HeaderCell style={{flex:3,width:"300px"}}>
                                    SMS 기본 메시지 문구 입력 사항
                                </HeaderCell>

                                
                                <HeaderCell style={{flex:0.5,width:"300px"}}>
                                    
                                </HeaderCell>
                                
                        </PrView>

                        
                        
                        <List list={slicedArray[pageNumber-1]} addState={addState} changeState={changeState} addHandler={addHandler} changeHandler={changeHandler}/>


                    </InputTableBox>

                    {addState &&
                        <div style={{marginTop:60,marginLeft:20,minHeight:220,maxHeight:420,width:350,borderRadius:"10px"}}>
                        <HeaderCell style={{width:348,backgroundColor:COLOR.LIGHT_GRAY,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px 10px 0 0"}}>
                            메시지 문구 추가
                        </HeaderCell>

                        <LaView style={{height:60,width:348,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:0}}>
                            <div style={{width:130,height:58,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,display:"flex",justifyContent:"center",alignItems:"center",fontSize:"15px",color:COLOR.DARK_INDIGO}}>
                                메시지 타입
                            </div>
                            <SelectOption value={smsMessageType} style={{flex:1,height:58}} onChange={(e)=>{setSmsMessageType(e.target.value)}}>
                                <option value={1}>
                                    일반
                                </option>
                                <option value={2}>
                                    유상수선비
                                </option>
                            </SelectOption>
                        </LaView>

                        <LaView style={{minHeight:100,maxHeight:300,width:348,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:0}}>
                            <TextInsider value={addText || ""} style={{height:60}} onChange={(e)=>{setAddText(e.target.value)}}/>
                        </LaView>

                        <LaView style={{justifyContent:"space-evenly",height:60,width:348,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0 0 10px 10px"}}>
                            <DivButton style={{color:COLOR.CYAN_BLUE}} onClick={()=>{addSmsMessage()}}>
                                추가
                            </DivButton>
                            <DivButton onClick={()=>{addCancel()}}>
                                취소
                            </DivButton>
                        </LaView>
                    </div>
                    }
                     {changeState &&
                        <div style={{marginTop:60,marginLeft:20,minHeight:220,maxHeight:420,width:350,borderRadius:"10px"}}>
                            <HeaderCell style={{width:348,backgroundColor:COLOR.LIGHT_GRAY,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"10px 10px 0 0"}}>
                                메시지 문구 편집
                            </HeaderCell>

                            <LaView style={{minHeight:100,maxHeight:300,width:348,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:0}}>
                                <TextInsider value={changeText} placeholder={"ex) 고객과실"} style={{height:60}} onChange={(e)=>{setChangeText(e.target.value)}}/>
                            </LaView>

                            <LaView style={{justifyContent:"space-evenly",height:60,width:348,border:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0 0 10px 10px"}}>
                                <DivButton style={{color:COLOR.CYAN_BLUE}} onClick={()=>{changeSmsMessage()}}>
                                    변경
                                </DivButton>
                                <DivButton onClick={()=>{changeCancel()}}>
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

const SortArray =(array)=>{
    let sort1=_.sortBy(array,"text")
    
    return(sort1)
}

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const TextInsider = styled.textarea`
    flex:1;
    background-color:${COLOR.WHITE};
    min-height:80px;
    max-height:150px;
    font-size:15px;
    text-align: left;
    border:0;
    padding: 5px 5px 5px 20px;

    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
`;

const SelectOption = styled.select`
    border :0;
    font-size:16px;
    padding:20px;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
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
const InColView  = styled.div`
    display:flex;
    font-size:13px;
    align-items:center;
`;
const HeaderHash  = styled.div`
    display:flex;
    height:60px;
    width:50px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    padding:5px;
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    width:200px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:2;
    padding:5px;
`;

const InputTableBox  = styled.div`
    margin-top:10px;
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

export default ControlSmsMessageList