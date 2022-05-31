import React ,{useState,useEffect}from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import AdminHeader from "../../../components/admin/AdminHeader";
import { debounce } from "lodash";
import COLOR from "../../../constants/color";
import PlatformSideBar from "../../../components/admin/platformControl/PlatformSideBar";
import RepairTypeEachRegist from "../../../components/admin/platformControl/RepairshopWeb/RepairTypeEachRegist";

const ControlFault = ({user,brands,repairShops}) => {
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
          <PlatformSideBar path={"/admin/platformControl/controlRepairTypeEachRegist"}/>
        </SidebarSpace>
        <MainSpace >
          <RepairTypeEachRegist user={user} brands={brands} repairShops={repairShops}/>
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
    
      const [brands] = await Promise.all([
        axios
          .get(`${process.env.API_URL}/brand/inHeadquarter?headquarterId=${user.headquarter_id}`,)
          .then(({ data }) => data.data), 
      ])
      const [repairShops] = await Promise.all([
        axios
          .get(`${process.env.API_URL}/RepairShop?headquarterId=${user.headquarter_id}`,)
          .then(({ data }) => data.data), 
      ])
        
        
      
      if(user.level ===0){
        return {
          props:
          {
            user:user,
            brands:brands,
            repairShops:repairShops
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

export default ControlFault;
