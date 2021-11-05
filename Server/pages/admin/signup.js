import React, { useRef } from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router from "next/router";
import "semantic-ui-css/semantic.min.css";

const SignUp = () => {
  const form = useRef();
  const handleSubmit = () => {
    form.current.submit();
  };
  return (
    <Wrapper>
      <Title>추가 정보 입력</Title>
      <div className="ui form">
        <Form
          ref={form}
          method="POST"
          action="/api/auth/signup"
          acceptCharset="utf-8"
        >
          <div className="field">
            <label>소속</label>
            <select
              className="ui fluid dropdown"
              name="store_id"
              defaultValue={1}
            >
              <option value={1}>아디다스코리아(본사)</option>{" "}
              {/** TODO: DB 에서 리스트 가져오도록 수정 */}
            </select>
          </div>
          <div className="field">
            <label>이름</label>
            <input type="text" name="name" />
          </div>
          <div className="field">
            <label>Phone</label>
            <input type="text" name="phone" />
          </div>
          <div className="ui submit button" onClick={handleSubmit}>
            Submit
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = cookies(ctx);
  if (!id || id === "") {
    if (ctx.req && ctx.res) {
      ctx.res.writeHead(302, { Location: "/admin/login" });
      ctx.res.end();
    } else {
      Router.push("/admin/login");
    }
  }
  return { props: { id } };
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

const Form = styled.form`
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default SignUp;
