import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { CUSTOMER, STORE, RECEIPT, PRODUCT } from "../../constants/dummy";
import Header from '../../components/Header'
import Reception from '../../components/reception'

const ReceptionPage = ({data}) => {
  const router = useRouter()
  return (<>
      <Header path={router.pathname}/>
      <Reception data={data}/>
      </>
  );
};

export const getServerSideProps = async (ctx) => {
  return { props: { data: {...CUSTOMER, ...STORE, ...RECEIPT, ...PRODUCT}} };
};


export default ReceptionPage;
