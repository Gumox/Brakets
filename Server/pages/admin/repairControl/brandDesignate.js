import React ,{useState,useEffect}from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import AdminHeader from "../../../components/admin/AdminHeader";
import { debounce } from "lodash";
import COLOR from "../../../constants/color";
import RepairSideBar from "../../../components/admin/repair/RepairSideBar";
import BrandDesignate from "../../../components/admin/repair/brandDesignate";

const RepairControlBrandDesignate = ({user,infos,repairShops,categorys}) => {
  const router = useRouter();
  
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
      <AdminHeader user={user} path={"/admin/repairControl"} minWidth={750}/>
        <InSideWrapper>
            <SidebarSpace  style={{minHeight:`${windowHeight-150}px`}}>
                <RepairSideBar path={"/admin/repairControl/brandDesignate"}/>
            </SidebarSpace>
            <MainSpace >
                <BrandDesignate categorys={categorys} repairShops={repairShops}/>
            </MainSpace>
      </InSideWrapper>
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx) => {
  const {
    data: { isAuthorized ,user},
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
          destination: '/login'
        }
      }
    }
    const [infos] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/headquarter`,)
        .then(({ data }) => data.body), 
    ])
    const [brands] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/brand/inHeadquarter?headquarterId=${user.headquarter_id}`,)
        .then(({ data }) => data.data), 
    ])
    const [categorys] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/RepairShop/getRepairShopAsBrandCategory?headquarterId=${user.headquarter_id}`,)
        .then(({ data }) => data.data), 
    ])
    const [repairShops] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/store/getAllRepairShop`,)
        .then(({ data }) => data.data), 
    ])


  
   if(user.level ===0){
      return {
        props:
        {
          user:user,
          infos:infos,
          brands:brands,
          categorys:categorys,
          repairShops:repairShops,
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
  background-color:rgb(250,250,250);
`;
const MainSpace=styled.div`
    width :100%;
`;

const InSideWrapper = styled.nav`
  display:flex;
  flex-direction:row;
  
`;

export default RepairControlBrandDesignate;
