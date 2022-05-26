import React ,{useState,useEffect}from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import AdminHeader from "../../components/admin/AdminHeader";
import { debounce } from "lodash";
import ServiceCenterSideBar from "../../components/admin/serviceCenter/ServiceCenterSideBar";

const AdminHome = () => {
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
      router.push("admin/serviceCenterControl")
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
      <AdminHeader  path={"/admin"}/>
      <ServiceCenterSideBar/>
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
  if(user.level !== 0){
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  return { props: {} };
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

const CuetomLink = styled.div`
  margin-top: 20px;
  font-size: 20px;
  border-bottom: 1px solid;
  cursor: pointer;
`;

export default AdminHome;
