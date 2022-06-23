import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import axios from "axios";
import { debounce } from "lodash";
import BracketsAdminHeader from "../../components/BracketsAdminHeader";
import { UserContext } from "../../store/Context";

import LeftSideBar from "../../components/BracketsAdmin/LeftSidebar";

import Company from "../../components/BracketsAdmin/List/Company";

const CompanyList = ({infos,brands,user,staffs}) =>{
    const [modifyAcion,setModifyAcion] = useState()

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(
      () => setIsModalOpen(false),
      []
    );
    

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
    
    return(
        <UserContext.Provider value={user}>
        <Wrapper style={{height:windowHeight}}>
            <BracketsAdminHeader  user={user}/>
            
            <SrollWrapper>
                <SidebarSpace style={{height: windowHeight-75}}>
                    <LeftSideBar path={'/adminBrackets/CompanyList'}/>
                </SidebarSpace>
            
                <MainSpace  style={{padding:"2%"}}>
                {!modifyAcion &&<h2 style={{margin:20}}>회사 목록</h2>}
                    {!modifyAcion &&
                    <InputTableBox>
                        <PrView>
                            <HeaderCell style={{flex:0.1}}>
                                #
                            </HeaderCell>
                            <HeaderCell>
                                회사이름
                            </HeaderCell>
                            
                            <HeaderCell>
                                등록일
                            </HeaderCell>
                            
                            <HeaderCell>
                                브랜드 목록
                            </HeaderCell>
                            
                            <HeaderCell>
                                회사 코드
                            </HeaderCell>
                            
                            <HeaderCell>
                                수선 OK 사용
                            </HeaderCell>
                            
                            <HeaderCell >
                                회사정보수정
                            </HeaderCell>
                        </PrView>
                        <Company infos={infos} brands={brands} setModifyAcion={setModifyAcion}/>
                    </InputTableBox>}
                    {modifyAcion && modifyAcion}
                </MainSpace>
            </SrollWrapper>

           

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




const SidebarSpace = styled.div`
  background-color:${COLOR.INDIGO};
`;
const MainSpace=styled.div`

  background-color:${COLOR.WHITE};
`;
const InputTableBox  = styled.div`
  width:1080px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 10px 0% 0%;
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    flex:1;
    padding:5px;
`;
const SrollWrapper = styled.nav`
display:flex;
flex-direction:row;
  
`;



export default CompanyList