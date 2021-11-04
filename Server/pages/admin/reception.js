import React from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

import Header from '../../components/Header'

const Reception = () => {
  const router = useRouter()
  return (
      <Header path={router.pathname}/>
  );
};

Reception.getInitialProps = async (ctx) => {
  return { props: { } };
};


export default Reception;
