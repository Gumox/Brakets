import React from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

import Header from "../components/Header";
import Claim from "../components/claim";

const ClaimPage = (props) => {
  const router = useRouter();
  return (
    <>
      <Header path={router.pathname} />
      <Claim {...props}/>
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

export default ClaimPage;
