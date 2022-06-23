import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { debounce } from "lodash";
import BracketsAdminHeader from "../../components/BracketsAdminHeader";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { UserContext } from "../../store/Context";
import Link from 'next/link';
import LeftSideBar from "../../components/BracketsAdmin/LeftSidebar";
import PostCode from "../../components/BracketsAdmin/PostCode";

const CompanyRegist = ({user,infos,brands,staffs}) =>{
    const router = useRouter();


    
    

    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    

    const [check,setCheck] = useState(true)
    const [compayName,setCompayName] = useState("")
    const [compayNameEN,setCompayNameEN] = useState("")
    const [compayCode,setCompayCode] = useState("")
    
    const [postCodeOn,setPostCodeOn]=useState(false)
    const [address,setAddress] = useState("")
    const [detailAddress,setDetailAddress] = useState("")

    const [ceo,setCeo] = useState()
    const [ceoAddress,setCeoAddress] = useState()
    const [ceoEmail,setceoEmail] = useState()
    const [companyRegistrationNumber,setCompanyRegistrationNumber] = useState()
    const [call,setCall] = useState()
    const [storeAddress,setStoreAddress] = useState()

    const codeNameHandler =(e)=>{
        e.target.value = e.target.value.replace(/[^a-zA-Z_\s_0-9-]/ig, '')
        let nameEN =e.target.value;
        nameEN.toUpperCase();
        setCompayNameEN(e.target.value);
        if(e.target.value.length>0){
            let Ccode =`H.${nameEN.toUpperCase()}`
            let spaceChange = Ccode.replace(/ /g, '_');
            setCompayCode(spaceChange)
        }else{
            setCompayCode("")
        }
    }

    const registHeadquarter = async() =>{
        const bodyData = {
            state : check,
            headquarter_name:compayNameEN,
            headquarter_name_kr:compayName,
            headquarter_code:compayCode,
            ceo:ceo,
            ceo_address:ceoAddress,
            ceo_email:ceoEmail,
            company_registration_number:companyRegistrationNumber,
            headquarter_call:call,
            address:storeAddress


        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/headquarter/regist`,bodyData)
              .then(({ data }) => data.body), 
            ])
            console.log(result)
            router.push("/adminBrackeks/CompanyList")
    }

    useEffect(()=>{
        
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    
    return(
        <UserContext.Provider value={user}>
        <Wrapper style={{height:windowHeight }}>
            <BracketsAdminHeader  user={user}/>
            
            <RowWrapper>
                <SidebarSpace>
                    <LeftSideBar  path={'/adminBrackeks/CompayRegist'}/>
                </SidebarSpace>
            
            <MainSpace  style={{padding:"2%"}}>
                    
                    
            <InsideWrapper>
            <InputTableBox style={{height:windowHeight-135}}>
                
                <h2 style={{margin:20}}>회사 정보 등록</h2>
                <PrView>
                    <NameBox  style={{borderRadius:"10px 0 0 0"}}>
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <TwoNameBox >
                        <ColView style={{ marginLeft:10,}}>
                            <div style={{marginBottom:5,fontSize:15}}>한글</div>
                            <div style={{marginTop:5,fontSize:15}}>영문</div>
                            
                        </ColView>
                        <ColView>
                            <div style={{ marginLeft:10,marginBottom:5,fontSize:15, flex:1}}>
                                <InputLine value={compayName} style={{fontSize:13,}} onChange={(e)=>{setCompayName(e.target.value)}}></InputLine>
                            </div>

                            <div style={{ marginLeft:10,marginTop:5,fontSize:15, flex:1}}>
                                <InputLine value={compayNameEN}  
                                    style={{fontSize:13,}}
                                    onChange={(e)=>{
                                        codeNameHandler(e);
                                }}></InputLine>
                            </div>
                            
                        </ColView>
                    </TwoNameBox>
                    </InputBox>

                    <NameBox>
                        회사코드설정
                    </NameBox>

                    <InputBox  style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <CenterView>
                        <div style={{marginLeft:10,fontSize:20}}>
                        {compayCode}
                        </div>
                    </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        대표자 이름
                    </NameBox>

                    <InputBox  style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={ceo} style={{flex:1, margin: 10}} onChange={(e)=>{setCeo(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        사업자 등록 번호
                    </NameBox>

                    <InputBox  style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={companyRegistrationNumber} style={{flex:1, margin: 10}} onChange={(e)=>{setCompanyRegistrationNumber(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        대표자 연락처
                    </NameBox>

                    <InputBox  style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={ceoAddress} style={{flex:1, margin: 10}} 
                            onChange={(e)=>{setCeoAddress(e.target.value)}}                        
                        />
                    </InputBox>

                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        대표자 이메일
                    </NameBox>

                    <InputBox  style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={ceoEmail} style={{flex:1, margin: 10}} onChange={(e)=>{setceoEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>

                <PrView style={{height:"120px"}}>
                        
                        <NameBox style={{height:"120px",borderTop:`2px solid rgb(244,244,244)`}}>
                            <div>서비스 센터 주소</div>
                        </NameBox>

                        <LongInputBox style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,borderLeft:0,borderBottom:0,height:"120px",flexDirection:"column"}}>
                            
                            <InColViewV2 style={{flex:1}}>
                                <input value={address || ""} placeholder={"주소"} readOnly style={{flex:1 ,padding:"8px"}} onClick={()=>{setPostCodeOn(true)}}/>
                            </InColViewV2>
                            <InColViewV2 style={{flex:1}}>
                                <input  value={detailAddress || ""} placeholder={"상세 주소"} disabled={address.length === 0} style={{flex:1 ,padding:"8px"}} onChange={(e)=>{setDetailAddress(e.target.value)}}/>
                            </InColViewV2>
                            
                        </LongInputBox>

                    </PrView>
                
                <PrView>
                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        <div>
                            <div>
                                SMS 대표전화
                            </div>
                            <div>
                            (발신 전용)
                            </div>
                        </div>
                        
                    </NameBox>
                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={call} style={{flex:1, margin: 10}} onChange={(e)=>{setCall(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        <Link href={{ pathname: "https://smartsms.aligo.in/login.html"}}>
                            <a target="_blank">
                                <RegistAligo>**알리고에 등록하기</RegistAligo>
                            </a>
                        </Link>
                        
                    </NameBox>

                    <InputBox  style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}/>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderRadius:"0 0 0 10px", borderTop: `2px solid rgb(244,244,244)`}}>
                        수선 OK 사용 여부
                    </NameBox>

                    <LongInputBox style={{borderRadius:"0 0 10px 0", border:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <PrView>
                            <CenterView style={{margin:10}}>
                            <CheckBox type="checkbox" checked={check} onChange={()=>{setCheck(!check)}}/>
                            <div>사용함</div>

                            </CenterView>
                            <CenterView style={{margin:15}}>
                            <CheckBoxRed type="checkbox" checked={!check} onChange={()=>{setCheck(!check)}}/>
                            <div>사용 안함</div>

                            </CenterView>
                        </PrView>
                    </LongInputBox>
                </PrView>
                <PrView style={{width:1000,display:"flex",flex:1}}>
               
                    <CenterView style={{height:100,display:"flex",flex:1}}>
                        <RegistButton onClick={()=>{registHeadquarter()}}>
                            등록
                        </RegistButton>
                    </CenterView>
                </PrView>
                
                
                
                
                </InputTableBox>
                    
                </InsideWrapper>
                </MainSpace>
            </RowWrapper>
           
            {postCodeOn && <PostCode setAddress={setAddress} setPostCodeOn={setPostCodeOn}/>}
        </Wrapper>
      </UserContext.Provider>
    )
}
export const getServerSideProps = async (ctx) => {
    const {
      data: { isAuthorized, user },
    } = await axios.get(
      `${process.env.API_URL}/auth`,
      ctx.req
        ? {
            withCredentials: true,
            headers: {
              cookie: ctx.req.headers.cookie || {},
            },
          }
        : {}
    );
    if (!isAuthorized) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    const [infos] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/headquarter`,)
        .then(({ data }) => data.body), 
      ])
      const [brands] = await Promise.all([
        axios
          .get(`${process.env.API_URL}/brand/AllBrandList`,)
          .then(({ data }) => data.data), 
      ])
      const [staffs] = await Promise.all([
        axios
          .get(`${process.env.API_URL}/headquarter/staff`,)
          .then(({ data }) => data.body), 
      ])
      
      
        
    let infoData = []
    let brandsData = []
    let userData = []

    if(infos){
      infoData = infos
    }
    if(brands){
      brandsData = brands
    }
    if(user){
      userData = user
    }
      
    
    if(user.level ===5){
      return {
        props:
        {
          user:user,
          infos:infoData,
          brands:brandsData,
          staffs:userData
        } 
      };
    }else{
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      }
    }
  };
  const styles = {
      menu:{
          color:COLOR.BLACK
      },
  }

const Wrapper = styled.div`
    
    background-color:${COLOR.WHITE};

    overflow:auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 10px;
        background: rgba(210, 210, 210, 0.4);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
      }
`;

const RowWrapper = styled.nav`
display:flex;
background-color :${COLOR.WHITE}
flex-direction:row;

`;


const SidebarSpace = styled.div`
background-color:${COLOR.INDIGO};
`;
const MainSpace=styled.div`

    background-color:${COLOR.WHITE};
`;
const InputTableBox  = styled.div`
    height:720px;
    width:1080px;
`;
const InputLineArea  = styled.textarea`
    border 1px solid;
    border-radius: 5px;
    resize: none;

`;

const RegistAligo  = styled.div`
    border-radius: 5px;
    color:${COLOR.RED};
    font-size:15px;
    &:hover {
        color: #ff8585;
        }

`;
const InColViewV2  = styled.div`
    display:flex;
    font-size:14px;
    padding:10px;
    align-items:center;
`;

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

const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width: 60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin: 20px;
    font-size: 16px;
    border-radius: 10px;

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

const TwoNameBox  = styled.div`
    font-size: 14px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 14px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    border-left: 2px solid ${COLOR.LIGHT_GRAY};
    height : 60px;
    width:355px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
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
    width:855px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-bottom:0;
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:18px;

`;
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;
const InputSelect  = styled.select`
    border: 0px;
    margin: 2px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;

const ImageInput = styled.input`
    visibility:hidden;
`
const ImageButton = styled.img`
    width:100px;
    height:100px;
    object-fit: contain;
    background-color:${COLOR.WHITE};
    padding:10px;
    margin-left: 25px;
`
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


export default CompanyRegist