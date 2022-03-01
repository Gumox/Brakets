import React from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

import { OptionContext } from "../store/Context";
import Header from "../components/Header";

import SMS from '../components/sms';

const Sms = ({options, user}) => {
  const router = useRouter();
  return (
    <>
      <Header path={router.pathname} />
      <OptionContext.Provider value={options}>
        <SMS/>
      </OptionContext.Provider>
    </>
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

export default Sms;
