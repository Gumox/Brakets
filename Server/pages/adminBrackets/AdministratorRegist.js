import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import axios from "axios";
import { debounce } from "lodash";
import BracketsAdminHeader from "../../components/BracketsAdminHeader";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { UserContext } from "../../store/Context";
import LeftSideBar from "../../components/BracketsAdmin/LeftSidebar";

const AdministratorRegist = ({infos,user}) =>{
    const router = useRouter();
    const [cCode,setCCode] =useState("")
    const [adminCode,setAdminCode] =useState("")
    const [IsExist,setIsExist] =useState("")

    
    const [administratorName,setAdministratorName] =useState()
    const [kakaoAcount,setKakaoAcount] =useState()
    const [administratorAddress,setAdministratorAddress] =useState()
    const [administratorEmail,setAdministratorEmail] =useState()
    const [headquarterId,setHeadquarterId] =useState()


    
   
    const sellectCompanyEvent=async(e)=>{
        setHeadquarterId(e.target.value)
        if(e.target.value !== ""){
            const code =  _.find(infos, {'value': Number(e.target.value)})
            console.log(code.headquarter_code)
            setCCode(code.headquarter_code)
            setAdminCode(code.headquarter_code+".0000")
            const [tof] = await Promise.all([
                axios
                  .get(`${process.env.API_URL}/headquarter/existStaff?headquarterId=${e.target.value}`,)
                  .then(({ data }) => data.message), 
            ])
            console.log(tof)
            setIsExist(tof)
        }else{
            setCCode(null)
            setAdminCode(null)
            setIsExist(null)
        }
    }

    
    const registAdministrator = async() =>{
        const bodyData = {
            state: true,
            account: kakaoAcount,
            name: administratorName,
            phone: administratorAddress,
            staff_code:adminCode,
            staff_email:administratorEmail,
            headquarter_id :headquarterId
        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/headquarter/registAdministrator`,bodyData)
              .then(({ data }) => data.body), 
            ])
            console.log(result)
            router.push("/adminBrackeks/AdministratorList")
    }

    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    useEffect(()=>{
        
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return (
      <UserContext.Provider value={user}>
        <Wrapper style={{height:windowHeight}}>
            <BracketsAdminHeader  user={user}/>
            
            <SrollWrapper>
                <SidebarSpace>
                    <LeftSideBar  path={'/adminBrackeks/AdministratorRegist'}/>
                </SidebarSpace>
            
                <MainSpace  style={{padding:"2%"}}>
                    
                
                <InsideWrapper>
            <InputTableBox style={{minHeight:580,height:windowHeight-135}}>
                
                
                <div style={{width:1000,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2 style={{margin:20}}>전체관리자 등록</h2>
                    
                    <RedDiv>* 는 필수 항목</RedDiv>
                </div>
                <PrView>
                    <NameBox  style={{borderRadius:"10px 0 0 0"}}>
                        <RedDiv>*</RedDiv>
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,justifyContent:"center",alignItems:"center"}}>
                        <SearchSelect style={{paddingLeft:15,minWidth:120,flex:1,fontSize:16,height:50}}
                            onChange={(e)=>{sellectCompanyEvent(e)}}
                        >
                            
                            <option  value={""}>{""}</option>
                            {
                                infos.map((item,index)=>(
                                    <option key={index} value={item.value}>{item.headquarter_name}</option>
                                ))
                            }
                        </SearchSelect>
                    </InputBox>

                    <NameBox>
                        회사코드
                    </NameBox>

                    <InputBox style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                            {cCode}
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 코드</div>
                                <div style={{color:COLOR.RED}}>
                                    {`(자동 완성)`}
                                </div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                        {adminCode}
                    </LongInputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        <RedDiv>*</RedDiv>
                        전체관리자 이름
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={administratorName} style={{flex:1, margin: 10}} onChange={(e)=>{setAdministratorName(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5,display:"flex",flexDirection:"row"}}>
                                <RedDiv>*</RedDiv>전체관리자 </div>
                                <div style={{marginLeft: 15}}>kakao 계정</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={kakaoAcount} style={{flex:1, margin: 10}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        <RedDiv>*</RedDiv>
                        전체관리자 연락처
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={administratorAddress} style={{flex:1, margin: 10}} onChange={(e)=>{setAdministratorAddress(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        <RedDiv>*</RedDiv>
                        전체관리자 이메일
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={administratorEmail} style={{flex:1, margin: 10}} onChange={(e)=>{setAdministratorEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`,borderRadius:"0 0 0 10px"}}>
                        전체관리자 존재 여부
                    </NameBox>

                    <LongInputBox style={{borderRadius:"0 0 10px 0",paddingLeft:20,alignItems:"center",fontSize:20,fontWeight:"bold",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        {
                            IsExist ?
                                <div style={{color:COLOR.CYAN_BLUE,fontSize:15}}>YES</div>
                            :   <div style={{color:COLOR.RED,fontSize:15}}>NO</div>
                        }
                    </LongInputBox>
                </PrView>
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{registAdministrator()}}>
                            등록
                        </RegistButton>
                    </CenterView>
                
                    </InputTableBox>
                    </InsideWrapper>
                </MainSpace>
            </SrollWrapper>
            

        </Wrapper>
      </UserContext.Provider>
    );
};



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
    let staffsData = []

    if(infos){
      infoData = infos
    }
    if(brands){
      brandsData = brands
    }
    if(staffs){
        staffsData = staffs
    }
    
  
  if(user.level ===5){
    return {
      props:
      {
        user:user,
        infos:infoData,
        brands:brandsData,
        staffs:staffsData
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
const RedDiv =styled.div`
    margin: 2px;
    color: ${COLOR.RED};
` 
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

const SidebarSpace = styled.div`
background-color:${COLOR.INDIGO};
`;
const MainSpace=styled.div`

    background-color:${COLOR.WHITE};
`;
const InputTableBox  = styled.div`
    height:720px;
    width:1080px;
    background-color:${COLOR.WHITE};
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





const SrollWrapper = styled.nav`
display:flex;
flex-direction:row;
  overflow: auto;
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





export default AdministratorRegist