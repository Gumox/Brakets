import React ,{useState,useEffect}from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import AdminHeader from "../../../components/admin/AdminHeader";
import { debounce } from "lodash";
import COLOR from "../../../constants/color";
import ProductSideBar from "../../../components/admin/product/ProductSideBar";
import ProductEachRegist from "../../../components/admin/product/productEachRegist";

const ProductControlProductEachRegist = ({user,infos,brands}) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };
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
  const [selectedView,setSelectedView] = useState()
  return (
    <Wrapper style={{height:`${windowHeight}px`}}>
      <AdminHeader path={"/admin/productControl"}/>
      <InSideWrapper>
        <SidebarSpace  style={{minHeight:`${windowHeight-120}px`}}>
          <ProductSideBar path={"/admin/productControl/productEachRegist"} setSelectedView={setSelectedView}/>
        </SidebarSpace>
        <MainSpace >
          <ProductEachRegist infos={infos} brands={brands} user={user}/>
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
  } const [infos] = await Promise.all([
    axios
      .get(`${process.env.API_URL}/headquarter?headquarterId=${user.headquarter_id}`,)
      .then(({ data }) => data.body), 
    ])
    const [brands] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/brand/inHeadquarter?headquarterId=${user.headquarter_id}`,)
        .then(({ data }) => data.data), 
    ])
    
    
    
  
  if(user.level ===0){
    return {
      props:
      {
        user:user,
        infos:infos,
        brands:brands,
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
    
    min-width:850px;
`;
const InSideWrapper = styled.nav`
  display:flex;
  flex-direction:row;
  
`;

export default ProductControlProductEachRegist;
