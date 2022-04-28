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
            headquarter_id :headquarterId
        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/headquarter/regist`,bodyData)
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
            <BracketsAdminHeader/>
            
            <SrollWrapper>
                <SidebarSpace style={{}}>
                    <LeftSideBar/>
                </SidebarSpace>
            
                <MainSpace  style={{padding:"2%"}}>
                    
                
                <InsideWrapper>
            <InputTableBox>
                
                <h2>전체관리자 등록</h2>
                <PrView>
                    <NameBox  >
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{justifyContent:"center",alignItems:"center"}}>
                        <select style={{minWidth:120,margin:5,flex:1,fontSize:16,height:50}}
                            onChange={(e)=>{sellectCompanyEvent(e)}}
                        >
                            
                            <option  value={""}>{""}</option>
                            {
                                infos.map((item,index)=>(
                                    <option key={index} value={item.value}>{item.headquarter_name}</option>
                                ))
                            }
                        </select>
                    </InputBox>

                    <NameBox>
                        회사코드
                    </NameBox>

                    <InputBox>
                        <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                            {cCode}
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox>
                        
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
                    <NameBox>
                        전체관리자 이름
                    </NameBox>

                    <InputBox>
                        <InputLine value={administratorName} style={{flex:1, margin: 10}} onChange={(e)=>{setAdministratorName(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 </div>
                                <div >Kakao 계정</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <InputBox>
                        <InputLine value={kakaoAcount} style={{flex:1, margin: 10}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox>
                        전체관리자 연락처
                    </NameBox>

                    <InputBox>
                        <InputLine value={administratorAddress} style={{flex:1, margin: 10}} onChange={(e)=>{setAdministratorAddress(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        전체관리자 이메일
                    </NameBox>

                    <InputBox>
                        <InputLine style={{flex:1, margin: 10}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        전체관리자 존재 여부
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontSize:20,fontWeight:"bold"}}>
                        {
                            IsExist ?
                                <div style={{color:COLOR.CYAN_BLUE,}}>Yes</div>
                            :   <div style={{color:COLOR.RED}}>No</div>
                        }
                    </LongInputBox>
                </PrView>
                
                
                    <CenterView>
                        <RegistButton>
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
    min-height:720px;
    width:1280px;
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