import React ,{useState,useEffect}from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import AdminHeader from "../../../components/admin/AdminHeader";
import { debounce } from "lodash";
import COLOR from "../../../constants/color";
import PlatformSideBar from "../../../components/admin/platformControl/PlatformSideBar";
import AppNoticeControl from "../../../components/admin/platformControl/storeApp/appNotice";

const ControlAppNotice = ({user,notice,smsNotice,privacy}) => {
  console.log(notice)
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
    <Wrapper style={{height:`${windowHeight}px`}}>
      <AdminHeader user={user} path={"/admin/platformControl"}/>
      <InSideWrapper>
        <SidebarSpace  style={{minHeight:`${windowHeight-120}px`}}>
          <PlatformSideBar path={"/admin/platformControl/controlAppNotice"}/>
        </SidebarSpace>
        <MainSpace >
            <AppNoticeControl user={user} notice={notice[0]} smsNotice={smsNotice[0]} privacy={privacy[0]}/>
        </MainSpace>
      </InSideWrapper>
    </Wrapper>
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

        let noticeData ={
          noticeType:1,
          headquarterId:user.headquarter_id
        }
        const[notice] =await Promise.all([

          axios.post(`${process.env.API_URL}/notice/noticeByNoticeType`,noticeData)
          .then(({ data }) => data.data)
          .catch(error=>{

          })
        ])
        let smsNoticeData ={
          noticeType:2,
          headquarterId:user.headquarter_id
        }
        const[smsNotice] =await Promise.all([

          axios.post(`${process.env.API_URL}/notice/noticeByNoticeType`,smsNoticeData)
          .then(({ data }) => data.data)
          .catch(error=>{

          })
        ])

        let privacyData ={
          noticeType:3,
          headquarterId:user.headquarter_id
        }
        const[privacy] =await Promise.all([

          axios.post(`${process.env.API_URL}/notice/noticeByNoticeType`,privacyData)
          .then(({ data }) => data.data)
          .catch(error=>{

          })
        ])
        
        
        
      
      if(user.level ===0){
        return {
          props:
          {
            user:user,
            notice:notice,
            smsNotice:smsNotice,
            privacy:privacy
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
  height:200px;
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
  background-color:${COLOR.MENU_MAIN};
`;
const MainSpace=styled.div`
    width :100%;
`;
const InSideWrapper = styled.nav`
  display:flex;
  flex-direction:row;
  
`;
const CuetomLink = styled.div`
  margin-top: 20px;
  font-size: 20px;
  border-bottom: 1px solid;
  cursor: pointer;
`;

export default ControlAppNotice;
