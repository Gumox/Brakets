import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import axios from "axios";
import _,{ debounce, set } from "lodash";
import BracketsAdminHeader from "../../components/BracketsAdminHeader";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { UserContext } from "../../store/Context";
import LeftSideBar from "../../components/BracketsAdmin/LeftSidebar";
import Administrator from "../../components/BracketsAdmin/List/Administrator"


const AdministratorList = ({user,infos,brands,staffs}) => {
    const router = useRouter();
    
    const [searchStaff,setSearchStaff] = useState(staffs)
    
    const [modifyAcion,setModifyAcion] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(
      () => setIsModalOpen(false),
      []
    );
    const staffParse=(companyId)=>{
        if(companyId !==""){
            let filt = _.filter(staffs,{headquarter_id: Number(companyId)})
            setSearchStaff(filt)
        }else{
            setSearchStaff(staffs)
        }

    }
    

    const [pageNumber,setPageNumber] = useState(0)
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
        <Wrapper>
            <BracketsAdminHeader/>
            
            <SrollWrapper>
                <SidebarSpace>
                    <LeftSideBar setIsModalOpen={setIsModalOpen}/>
                </SidebarSpace>
            
                {!modifyAcion && <MainSpace  style={{height:windowHeight,padding:"2%"}}>
                    
                
                    <h2 style={{marginLeft:20}}>회사 조회</h2>
                        <PrView >
                            <PrView style={{borderWidth:2,borderColor: COLOR.BLACK,borderStyle:"solid",flex:1}}>
                                    
                                <div style={{minWidth:120,display:"flex",justifyContent:"center",alignItems:"center",flex:1,fontWeight:"bold",fontSize:18}}>
                                    회사이름
                                </div>
                                <div style={{flex:1,margin:5}}>
                                    <select style={{minWidth:120,margin:5,flex:1,fontSize:16}} onChange={(e)=>{staffParse(e.target.value)}}>
                                        <option value={""}>{"전체"}</option>
                                        {
                                            infos.map((item,index)=>(
                                                <option key={index} value={item.value}>{item.headquarter_name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </PrView>
                            <div style={{flex:3,display:"flex",alignItems:"center"}}>
                               
                            </div>
                        </PrView>
                    <h2 style={{marginLeft:20}}>전체 관리자 목록</h2>
                        <InputTableBox>
                        <PrView>
                            
                            <HeaderCell style={{borderLeft:"2px solid"}}>
                                회사이름
                            </HeaderCell>

                            <HeaderCell>
                                회사 코드
                            </HeaderCell>

                            <HeaderCell>
                                관리자 코드
                            </HeaderCell>
                            
                            <HeaderCell>
                                관리자 이름
                            </HeaderCell>

                            <HeaderCell>
                                관리자 연락처
                            </HeaderCell>
                            <HeaderCell>
                                관리자 E-mail
                            </HeaderCell>
                            
                            <HeaderCell>
                                상태
                            </HeaderCell>
                            
                            <HeaderCell style={{color: COLOR.CYAN_BLUE}}>
                                수정
                            </HeaderCell>
                            
                            <HeaderCell style={{color: COLOR.RED}}>
                                관리자 변경
                            </HeaderCell>
                        </PrView>
                        <Administrator staffs={searchStaff} setModifyAcion={setModifyAcion}/>
                    </InputTableBox>
        
                </MainSpace>}
                {modifyAcion && <MainSpace  style={{height:windowHeight,padding:"2%"}}>{modifyAcion}</MainSpace>}
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


const SidebarSpace = styled.div`
background-color:${COLOR.INDIGO};
`;
const MainSpace=styled.div`
    postion:fixd;
    left: 230px;
    background-color:${COLOR.WHITE};
    width :100%;
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


const Title = styled.div`
  margin-bottom: 30px;
  padding: 10px 30px;
  font-size: 45px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 10px;
`;

const Logout = styled.button`
  border: 1px solid;
  background-color: transparent;
  height: 26px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 10px;
`;

const CustomButton =styled.button`
    background-color : ${COLOR.GRAY};
    width:50px;
    height : 35px;
    color:${COLOR.WHITE};
    margin-left:15px;
    font-size:15px;
    border-radius:10px;

`

const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:20px;
    flex:1;
    padding:5px;
    border:2px solid ${COLOR.BLACK};
    border-left : 0px solid ${COLOR.BLACK};
`;

const InputTableBox  = styled.div`
    min-height:720px;
    min-width:1080px;
    margin-top:20px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;

export default AdministratorList