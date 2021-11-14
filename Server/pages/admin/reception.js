import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
  return {
    props: {
      options: {
        storeList: stores.data.data,
        repairList: repairs.data.data,
        producerList: producers.data.data,
      },
    },
  };
};

export default ReceptionPage;
