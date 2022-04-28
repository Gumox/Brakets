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
    const [address,setAddress] = useState("")

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
            <BracketsAdminHeader/>
            
            <RowWrapper>
                <SidebarSpace>
                    <LeftSideBar/>
                </SidebarSpace>
            
            <MainSpace  style={{padding:"2%"}}>
                    
                    
            <InsideWrapper>
            <InputTableBox>
                
                <h2>회사 정보 등록</h2>
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
                        <InputLine value={ceo} style={{flex:1, margin: 10}} onChange={(e)=>{setCeo(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        사업자 등록 번호
                    </NameBox>

                    <InputBox>
                        <InputLine value={companyRegistrationNumber} style={{flex:1, margin: 10}} onChange={(e)=>{setCompanyRegistrationNumber(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        대표자 연락처
                    </NameBox>

                    <InputBox>
                        <InputLine value={ceoAddress} style={{flex:1, margin: 10}} 
                            onChange={(e)=>{setCeoAddress(e.target.value)}}                        
                        />
                    </InputBox>

                    <NameBox>
                        대표자 이메일
                    </NameBox>

                    <InputBox>
                        <InputLine value={ceoEmail} style={{flex:1, margin: 10}} onChange={(e)=>{setceoEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>

                <PrView>
                    <NameBox>
                        <div>
                            <div>
                            서비스 센터 주소
                            </div>
                        </div>
                        
                    </NameBox>
                    <LongInputBox >
                        <InputLineArea  value={storeAddress} style={{flex:1, margin: 10}} onChange={(e)=>{setStoreAddress(e.target.value)}} />
                    </LongInputBox>

                    

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
                        <InputLine value={call} style={{flex:1, margin: 10}} onChange={(e)=>{setCall(e.target.value)}}></InputLine>
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
                <PrView style={{display:"flex",flex:1}}>
               
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
      
      
      
    
    if(user.level ===5){
      return {
        props:
        {
          user:user,
          infos:infos,
          brands:brands,
          staffs:staffs
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
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
const InsideWrapper  = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;
const InputTableBox  = styled.div`
    height:720px;
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

export default CompanyRegist