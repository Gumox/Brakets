import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import { useRouter } from "next/router";
import axios from "axios";
import remakeCallNumber from "../../../../functions/remakeCallNumber";
import PostCode from "./PostCode";

const ShopRegist = ({infos,brands,user,stores}) =>{
    const router = useRouter();

    const [shopName,setShopName] = useState("")
    const [shopCode,setShopCode] = useState("")

    
    const [ceoName,setCeoName] = useState("")
    const [contact,setContact] = useState("")

    const [registrationNumber,setRegistrationNumber] = useState("")
    const [useMailbag,setUseMailbag] = useState(1)

    
    const [postCodeOn,setPostCodeOn]=useState(false)

    const [address,setAddress]=useState(null)
    const [detailAddress,setDetailAddress]=useState("")

    const codeMaker =(value)=>{
        setShopName(value)
        if(String(value).length > 0){
                
            let code =`R.${value}`
            setShopCode(code)
        }else{
            setShopCode("")
        }
    }
    const registRepairShop = async()=>{
        const body = {
            shopName : shopName,
            storeCode : shopCode,
            
            useMailbag,
            contact : contact,
            address : address+" "+detailAddress,
            storeRegistrationNumber : registrationNumber
        }

        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/RepairShop/regist`,body)
              .then(({ data }) => data.data), 
        ])
        console.log(result)
        if(result){
            alert("수선처가 등록 되었습니다")
            router.push("/admin/repairControl")
        }
    }

    return (
        <Wrapper style={{width:"1020px"}}>
           
          
                
                <h2 style={{fontSize:18,marginLeft:"20px"}}>수선처 등록</h2>
                <PrView>
                    <NameBox style={{borderRadius:"10px 0 0 0"}}>
                        수선처 이름
                    </NameBox>
                    

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine  placeholder="ex) 수선처" value={shopName} onChange={(e)=>{codeMaker(e.target.value)}}/>
                    </InputBox>

                    <NameBox>
                        수선처 코드
                    </NameBox>

                    <InputBox style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <CenterView style={{fontSize:"18px",fontWeight:"bold",padding:"10px"}}>
                            {shopCode}
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244 ,244, 244)`}}>
                        대표자 이름
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine  placeholder="ex) 홍길동" value={ceoName} onChange={(e)=>{setCeoName(e.target.value)}}/>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244 ,244, 244)`}}>
                        <ColView >
                            <InColView>사업자</InColView>
                            <InColView>등록 번호</InColView>
                        </ColView>
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine  value={registrationNumber} onChange={(e)=>{setRegistrationNumber(e.target.value)}}/>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244 ,244, 244)`}}>
                        <ColView >
                            <InColView>수선처</InColView>
                            <InColView>전화번호</InColView>
                        </ColView>
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine  placeholder="ex) xxx-xxx-xxxx" value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244 ,244, 244)`}}>
                        행낭 사용 여부
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <SearchSelect value={useMailbag} style={{flex:1,border:0,paddingLeft:140,fontSize:16}} onChange={(e)=>{ setUseMailbag(e.target.value) }}>
                            <option value={1}>사용 함</option>
                            <option value={0}>사용 안함</option>
                        </SearchSelect>
                    </InputBox>
                </PrView>

                <PrView>
                    <NameBox style={{height :"120px",borderRadius:"0 0 0 10px",borderTop:`2px solid rgb(244 ,244, 244)`}}>
                        수선처 주소
                    </NameBox>
                    <LongInputBox style={{height :"120px",borderRadius:"0 0 10px 0"}}>
                        <InColViewV2 style={{flex:1}}>
                            <input value={address || ""} placeholder={"주소"} readOnly style={{flex:1 ,padding:"8px"}} onClick={()=>{setPostCodeOn(true)}}/>
                        </InColViewV2>
                        <InColViewV2 style={{flex:1}}>
                            <input  value={detailAddress || ""} placeholder={"상세 주소"}  style={{flex:1 ,padding:"8px"}} onChange={(e)=>{setDetailAddress(e.target.value)}}/>
                        </InColViewV2>
                    </LongInputBox>

                    

                </PrView>
                
                
                <PrView style={{display:"flex",flex:1}}>
               
                    <CenterView style={{height:100,display:"flex",flex:1}}>
                        <RegistButton onClick={()=>{registRepairShop()}}>
                            등록
                        </RegistButton>
                    </CenterView>
                </PrView>
                
                
                {postCodeOn && <PostCode setAddress={setAddress} setPostCodeOn={setPostCodeOn}/>}
        </Wrapper>
    );
};


const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColViewV2  = styled.div`
    display:flex;
    font-size:14px;
    padding:10px;
    align-items:center;
`;
const InColView  = styled.div`
    display:flex;
    font-size:14px;
    justify-content:center;
    align-items:center;
`;
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:14px;
    border-radius:10px;

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

const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;

const TwoNameBox  = styled.div`
    font-size: 14px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    min-width:145px;
    max-width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 14px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    border-left: 2px solid ${COLOR.LIGHT_GRAY};
    height : 60px;
    min-width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    flex:1;
    color: ${COLOR.DARK_INDIGO};
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    font-size: 14px;
    display:flex;
    justify-content:center;
    width:210px;
`;
const LongInputBox  = styled.div`
    height : 60px;
    min-width:865px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-top:2px solid ${COLOR.LIGHT_GRAY};
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    flex-direction: column;
    font-size:14px;
    flex:1;

`;

const InputLine  = styled.input`
    border:0;
    margin: 2px;
    margin-right:3px;
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
const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`



export default ShopRegist