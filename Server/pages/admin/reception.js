import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {SEASON_LIST} from "../../constants/dummy"

import Header from "../../components/Header";
import Reception from "../../components/reception";

const ReceptionPage = ({ options }) => {
  const router = useRouter();
  return (
    <>
      <Header path={router.pathname} />
      <Reception options={options} />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const stores = await axios.get(`${process.env.API_URL}/store/1`);
  const repairs = await axios.get(`${process.env.API_URL}/store/2`);
  const producers = await axios.get(`${process.env.API_URL}/store/3`);
  const seasons = SEASON_LIST; // TODO: 본사에서 API 제공 필요
  return {
    props: {
      options: {
        storeList: stores.data.data,
        repairList: repairs.data.data,
        producerList: producers.data.data,
        seasonList: seasons,
      },
    },
  };
};

export default ReceptionPage;
