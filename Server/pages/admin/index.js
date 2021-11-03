import React from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

const AdminHome = ({ token }) => {
  const router = useRouter()
  const handleLogout = async () => {
    await axios.get('/api/auth/logout');
    router.push('/admin/login');
  }
  return (
    <Wrapper>
      <Title>수선 OK Admin Home</Title>
        <button onClick={handleLogout}>Logout</button>
    </Wrapper>
  );
};

AdminHome.getInitialProps = async (ctx) => {
  const { token } = cookies(ctx);
  if (!token || token === "") {
    if (ctx.req && ctx.res) {
      ctx.res.writeHead(302, { Location: "/admin/login" });
      ctx.res.end();
    } else {
      Router.push("/admin/login");
    }
  }
  return { props: { token } };
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  margin-bottom: 20px;
  font-size: 40px;
  font-wieght: bold;
`;

export default AdminHome;
