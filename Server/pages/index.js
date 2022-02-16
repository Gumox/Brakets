import React from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";

const Home = () => {
  const router = useRouter();
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
      <CuetomLink onClick={() => router.push("/RepairReception")}>
        수선처
      </CuetomLink>
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx) => {
  const {
    data: { isAuthorized,user },
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
  return { props: {} };
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
