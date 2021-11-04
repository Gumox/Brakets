import React from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

import Header from '../../components/Header'

const CashReceipt = () => {
  const router = useRouter()
  return (
      <Header path={router.pathname}/>
  );
};

CashReceipt.getInitialProps = async (ctx) => {
  return { props: { } };
};


export default CashReceipt;
