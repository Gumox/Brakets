import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

const KAKAO_OAUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
const Login = () => {
  const router = useRouter();
  const { r } = router.query;
  return (
    <Wrapper>
      <Title>수선 OK</Title>
      <Link href={KAKAO_OAUTH_URL}>
        <a>
          <Image
            src="/kakao_login_large_wide.png"
            alt="Kakao Login"
            width="400px"
            height="60px"
            layout="fixed"
          />
        </a>
      </Link>
      {r === "fail" && <Warning>등록되지 않은 사용자 입니다.</Warning>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  margin-bottom: 50px;
  padding: 10px 30px;
  font-size: 45px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 10px;
`;

const Warning = styled.div`
  font-size: 15px;
  color: red;
`

export default Login;
