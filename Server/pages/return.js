import React, {useEffect} from "react";
import ReactDOM from "react-dom";

import Router, { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

import Header from "../components/Header";
import MENUS from "../constants/menu";
import Return from "../components/return";


const ReturnPage = (props) => {

  const router = useRouter();
  if(props.user.level === 5){
    if(!(_.find(MENUS, {'title': "브래키츠 관리자"}))){
      MENUS.push({
        title: "브래키츠 관리자",
        link: "/adminBrackets/admin",
      },)
    }
  }

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
        destination: "/login",
      },
    };
  }
  const stores = await axios
    .get(`${process.env.API_URL}/store/1`)
    .then(({ data }) => data);

  const { headquarter_id: headquarterId } = user;
  const [results] =
      await Promise.all([
        
        axios
          .get(`${process.env.API_URL}/judgmentResult`, {
            params: {hq_id: headquarterId}
          })
          .then(({ data }) => data.body), // 판정결과
  ]);

  if(user.level < 2 || user.level === 5){
      
      return {
        props: {
          user,
          results:results,
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

export default ReturnPage;
