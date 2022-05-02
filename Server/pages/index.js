import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import MENUS from "../constants/menu";
import _ from "lodash";
import store from "../store/store";


const Home = ({user}) => {
  const router = useRouter();
  
  if(user.level === 5){
    if(!(_.find(MENUS, {'title': "브래키츠 관리자"}))){
      MENUS.push({
        title: "브래키츠 관리자",
        link: "/adminBrackeks/admin",
      },)
    }
  }
  
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };
  return (
    <Wrapper>
      <Title>수선 OK</Title>
      <Logout onClick={handleLogout}>Logout</Logout>
      <CuetomLink onClick={() => router.push("/reception")}>
        수선접수/처리
      </CuetomLink>
      <CuetomLink onClick={() => router.push("/return")}>
        하자반품
      </CuetomLink>
      <CuetomLink onClick={() => router.push("/claim")}>
        업체클레임
      </CuetomLink>
      <CuetomLink onClick={() => router.push("/paid-repair")}>
        유상수선
      </CuetomLink>
      <CuetomLink onClick={() => router.push("/sms")}>
        SMS 전송
      </CuetomLink>
      {/*<CuetomLink onClick={() => router.push("/sms-result")}>
        SMS 결과
      </CuetomLink> */}
      <CuetomLink onClick={() => router.push("/repair")}>
        수선업체
      </CuetomLink>
      {
        user.level ==5 &&
        <CuetomLink onClick={() => router.push("/adminBrackeks/admin")}>
          브래키츠 관리자
        </CuetomLink>
      }
      {
        user.level == 0 &&
        <CuetomLink onClick={() => router.push("/admin/serviceCenterControl")}>
          관리자
        </CuetomLink>
      }
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
  )
  if (!isAuthorized) {
    
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  if(user.level <2){
    return { props: {user} };
  }else if(user.level ===5){
    return { props: {user:user} };
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export default Home;
