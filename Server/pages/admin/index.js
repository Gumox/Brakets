import React from "react";
import Link from "next/link";
import cookies from "next-cookies";
import styled from "styled-components";

const AdminHome = ({ token }) => {
  return (
    <Wrapper>
      <Title>수선 OK Admin Home</Title>
      <Link href="/api/auth/logout">Logout</Link>
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
