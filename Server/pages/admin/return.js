import React from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";

import Header from "../../components/Header";
import Return from "../../components/return";

const ReturnPage = (props) => {
  const router = useRouter();
  return (
    <>
      <Header path={router.pathname} />
      <Return {...props} />
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
        destination: "/admin/login",
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

export default ReturnPage;
