import React, { useEffect } from "react";
import cookies from "next-cookies";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

import { OptionContext ,UserContext } from "../store/Context";
import Header from "../components/Header";
import MENUS from "../constants/menu";

import SMS from '../components/sms';
import store from "../store/store";

const Sms = ({options, user,infos}) => {
  const router = useRouter();
  if(user.level === 5){
    if(!(_.find(MENUS, {'title': "브래키츠 관리자"}))){
      MENUS.push({
        title: "브래키츠 관리자",
        link: "/adminBrackets/admin",
      },)
    }
  }
  useEffect(()=>{
    console.log(store.getState().send_sms_data)
  },[])
  return (
    <>
      <Header path={router.pathname} />
      <UserContext.Provider value={user}>
      <OptionContext.Provider value={options}>
        <SMS infos={infos}/>
      </OptionContext.Provider>
      </UserContext.Provider>
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

  const [infos] = await Promise.all([
    axios
      .get(`${process.env.API_URL}/headquarter?headquarterId=${user.headquarter_id}`,)
      .then(({ data }) => data.body), 
    ])

  if(user.level < 2 || user.level === 5){
      
      return {
        props: {
          user,
          infos,
          options: {
            storeList: stores ? stores.data : [],
          },
        },
      };
    }else{
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
  }
};

export default Sms;
