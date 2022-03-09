import React, { useEffect } from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

import { OptionContext ,UserContext } from "../store/Context";
import Header from "../components/Header";
import SMSResult from "../components/sms-result";

const SmsResult = ({options, user}) => {
  const router = useRouter()

  return (
      <UserContext.Provider value={user}>
            <Header path={router.pathname}/>
            <SMSResult/>
      </UserContext.Provider>
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
  const {
    result
  } = await axios.post(
    `${process.env.API_URL}/sms/updateList?headquarterId=${user.headquarter_id}`,
  );
  if (!isAuthorized) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const stores = await axios
    .get(`${process.env.API_URL}/store/1`)
    .then(({ data }) => data);

  return {
    props: {
      user,
      options: {
        storeList: stores ? stores.data : [],
      },
    },
  };
};


export default SmsResult;
