import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { SEASON_LIST } from "../../constants/dummy";

import Header from "../../components/Header";
import Reception from "../../components/reception";

const ReceptionPage = ({ options, user }) => {
  const router = useRouter();
  return (
    <>
      <Header path={router.pathname} />
      <Reception options={options} user={user}/>
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
        destination: '/admin/login'
      }
    }
  }

  const [brands, stores, repairs, producers] = await Promise.all([
    axios.get(`${process.env.API_URL}/store/0`), // 브랜드 본사
    axios.get(`${process.env.API_URL}/store/1`), // 매장
    axios.get(`${process.env.API_URL}/store/2`), // 수선처
    axios.get(`${process.env.API_URL}/store/3`), // 생산업체
  ]);
  const seasons = SEASON_LIST; // TODO: 본사에서 API 제공 필요
  return {
    props: {
      user, 
      options: {
        brandList: brands.data.data,
        storeList: stores.data.data,
        repairList: repairs.data.data,
        producerList: producers.data.data,
        seasonList: seasons,
      },
    },
  };
};

export default ReceptionPage;
