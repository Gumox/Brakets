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
      <Reception options={options} user={user} />
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

  const [brands, stores, repairs, producers, faults, analysis, results] =
    await Promise.all([
      axios.get(`${process.env.API_URL}/store/0`).then(({ data }) => data), // 브랜드 본사
      axios.get(`${process.env.API_URL}/store/1`).then(({ data }) => data), // 매장
      axios.get(`${process.env.API_URL}/store/2`).then(({ data }) => data), // 수선처
      axios.get(`${process.env.API_URL}/store/3`).then(({ data }) => data), // 생산업체
      axios.get(`${process.env.API_URL}/type/fault`).then(({ data }) => data), // 과실구분
      axios
        .get(`${process.env.API_URL}/type/analysis`)
        .then(({ data }) => data), // 내용분석
      axios.get(`${process.env.API_URL}/type/result`).then(({ data }) => data), // 판정결과
    ]);
  const seasons = SEASON_LIST; // TODO: 본사에서 API 제공 필요
  return {
    props: {
      user,
      options: {
        brandList: brands? brands.data : [],
        storeList: stores? stores.data : [],
        repairList: repairs? repairs.data : [],
        producerList: producers? producers.data : [],
        faultType: faults? faults.data : [],
        analysisType: analysis? analysis.data : [],
        resultType: results? results.data : [],
        seasonList: seasons,
      },
    },
  };
};

export default ReceptionPage;
