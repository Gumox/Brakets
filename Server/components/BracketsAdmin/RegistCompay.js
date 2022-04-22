import React,{useState,useEffect} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Link from 'next/link';
const RegistCompay = () =>{
    const [check,setCheck] = useState(false)
    const [compayNameEN,setCompayNameEN] = useState("")
    const [compayCode,setCompayCode] = useState("")
    const [address,setAddress] = useState("")

    const codeNameHandler =(e)=>{
        //e.target.value = e.target.value.replace(/[^A-Za-z]/ig, '')
        let nameEN =e.target.value;
        nameEN.toUpperCase();
        setCompayNameEN(e.target.value);
        if(e.target.value.length>0){
            setCompayCode(`H.${nameEN.toUpperCase()}`)
        }else{
            setCompayCode("")
        }
    }
    const addressHandler =(e)=>{
        let add = e.target.value
        console.log(add)
        
        setAddress(add)
        
    }
    
    return(
        <Wrapper>
            <InsideWrapper>
            <InputTableBox>
                
                <h3>회사 정보 등록</h3>
                <PrView>
                    <NameBox  >
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{}}>
                    <TwoNameBox >
                        <ColView style={{ marginLeft:10,}}>
                            <div style={{marginBottom:5,fontSize:15}}>한글</div>
                            <div style={{marginTop:5,fontSize:15}}>영문</div>
                            
                        </ColView>
                        <ColView>
                            <div style={{ marginLeft:10,marginBottom:5,fontSize:15, flex:1}}><InputLine style={{textTransform: "uppercase",fontSize:13,}}></InputLine></div>
                            <div style={{ marginLeft:10,marginTop:5,fontSize:15, flex:1}}>
                            <InputLine value={compayNameEN}  
                                style={{textTransform: "uppercase",fontSize:13,}}
                                onChange={(e)=>{
                                    codeNameHandler(e);
                            }}></InputLine></div>
                            
                        </ColView>
                    </TwoNameBox>
                    </InputBox>

                    <NameBox>
                        회사코드설정
                    </NameBox>

                    <InputBox>
                    <CenterView>
                        <div style={{marginLeft:10,fontSize:20}}>
                        {compayCode}
                        </div>
                    </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox>
                        대표자 이름
                    </NameBox>

                    <InputBox>
                        <InputLine style={{flex:1, margin: 10}}></InputLine>
                    </InputBox>

                    <NameBox>
                        사업자 등록 번호
                    </NameBox>

                    <InputBox>
                        <InputLine type="number" style={{flex:1, margin: 10}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        대표자 연락처
                    </NameBox>

                    <InputBox>
                        <InputLine value={address} type="number" style={{flex:1, margin: 10}} 
                            onChange={(e)=>{addressHandler(e)}}                        
                        />
                    </InputBox>

                    <NameBox>
                        대표자 이메일
                    </NameBox>

                    <InputBox>
                        <InputLine style={{flex:1, margin: 10}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        <div>
                            <div>
                                SMS 대표전화
                            </div>
                            <div>
                            (발신 전용)
                            </div>
                        </div>
                        
                    </NameBox>
                    <InputBox style={{borderRight:0}}>
                        <InputLine style={{flex:1, margin: 10}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderLeft:0,borderRight:0,borderColor:COLOR.BLACK }}>
                        <Link href={{ pathname: "https://smartsms.aligo.in/login.html"}}>
                            <a target="_blank">
                                <RegistAligo>**알리고에 등록하기</RegistAligo>
                            </a>
                        </Link>
                        
                    </NameBox>

                    <InputBox style={{borderLeft:0}}>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        수선 OK 사용 여부
                    </NameBox>

                    <LongInputBox style={{}}>
                        <PrView>
                            <CenterView style={{margin:10}}>
                            <CheckBox type="checkbox" checked={check} onClick={()=>{setCheck(!check)}}/>
                            <div>사용함</div>

                            </CenterView>
                            <CenterView style={{margin:15}}>
                            <CheckBoxRed type="checkbox" checked={!check} onClick={()=>{setCheck(!check)}}/>
                            <div>사용 안함</div>

                            </CenterView>
                        </PrView>
                    </LongInputBox>
                </PrView>
                
                <PrView >
                    <NameBox style={{height:100}}>
                        메모
                    </NameBox>

                    <LongInputBox style={{height:100}}>
                        <InputLineArea multiple={true} style={{flex:1, margin: 10}}></InputLineArea>
                    </LongInputBox>
                </PrView>
                
            </InputTableBox>
            </InsideWrapper>
        </Wrapper>
    )
}
const Wrapper  = styled.div`
    overflow:auto;
`;
const InsideWrapper  = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;
const InputTableBox  = styled.div`
    width:1080px;
`;
const PrView  = styled.div`
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

const TwoNameBox  = styled.div`
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 80px;
    width : 200px;
    border 1px solid;
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 80px;
    flex:1.3;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 80px;
    flex:3.31;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputLine  = styled.input`
    border 1px solid;
    border-radius: 5px;
    padding-left:10px;
    font-size:20px;

`;
const InputLineArea  = styled.textarea`
    border 1px solid;
    border-radius: 5px;

`;

const RegistAligo  = styled.div`
    border-radius: 5px;
    color:${COLOR.RED};
    font-size:15px;
    &:hover {
        color: #ff8585;
        }

`;

const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`
const CheckBoxRed = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.RED};
        border-radius: 10px;
    }

`

export default RegistCompay