import React from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

import Header from '../components/Header'
import SMSResult from "../components/sms-result";

const SmsResult = () => {
  const router = useRouter()
  return (
      <>
            <Header path={router.pathname}/>
            <SMSResult/>
      </>
  );
};

export const getServerSideProps = async (ctx) => {
  return { props: { } };
};


export default SmsResult;
