import React,{useEffect} from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import store from "../../store/store";

function Home({options,user})  {
  const router = useRouter();
  
  console.log(options)
  

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };
  let selectList = [{name:"전체",key:null}];
  if(options.companys != null){options.companys.map((item)=>(selectList.push({name:item.headquarter_name,key:item.hq_id})))}
  
  const  selectItems = _.uniqBy(selectList,"key")

  useEffect(()=>{

    store.dispatch({type:'USER',options:options});
    store.dispatch({type:'OPTIONS',user:user});

    localStorage.setItem('OPTIONS',JSON.stringify(options));
    localStorage.setItem('USER',JSON.stringify(user))

    

    localStorage.setItem('COMPANY',JSON.stringify(selectItems));

    localStorage.setItem('SHOP',options.info[0].store_id)
    localStorage.setItem('SHOP_NAME',options.info[0].name)
    localStorage.setItem('USER',JSON.stringify(user))
    localStorage.setItem('USER_INFO',JSON.stringify(options.info[0]))

    
    console.log(user)
    console.log(store.getState())

  },[])
  return (
    <Wrapper>
            <Title>수선 OK</Title>
            <Logout onClick={handleLogout}>Logout</Logout>
            
            <CuetomLink onClick={() => router.push("/RepairReception")}>
                접수
            </CuetomLink>
            <CuetomLink onClick={() => router.push("/inquiry")}>
                조회
            </CuetomLink>
            <CuetomLink onClick={() => router.push("/returnUnregistered")}>
                미등록 반송
            </CuetomLink>
            <CuetomLink onClick={() => router.push("/settlement")}>
                수선비 정산
            </CuetomLink>
      
    </Wrapper>
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
    )
    .catch(error=>{
  
    });
    const {email :email} =user
    
      const [companys] = await Promise.all([
        axios.get(`${process.env.API_URL}/auth/repair?email=${email}`)
        .then(({ data }) => data)
        .catch(error=>{
  
        })
      ]);
    if(user.level>2&&user.level<5){
      const[list,images] =await Promise.all([
        axios.get(`${process.env.API_URL}/RepairShop/getReceiptList?shop_id=${companys.body[0].store_id}`)
        .then(({ data }) => data),
        axios.get(`${process.env.API_URL}/RepairShop/getReceiptList/getImageList?shop_id=${companys.body[0].store_id}`)
        .then(({ data }) => data)
      
      ])
      return {
        props: {
          user,
          options:{
            companys : companys.data,
            info : companys.body,
            list : list.body,
            images: images.body,
            needImages : list.needImages
          }
        }
      };
    }
    else if(user.level<2){
      return {
        props: {
          user,
          options:{
            companys : companys.data,
            info : companys.body,
            list : [],
            images: []
          }
        }
      };
    }
  };

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  margin-bottom: 30px;
  padding: 10px 30px;
  font-size: 45px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 10px;
`;

const Logout = styled.button`
  border: 1px solid;
  background-color: transparent;
  height: 26px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 10px;
`;

const CuetomLink = styled.div`
  margin-top: 20px;
  font-size: 20px;
  border-bottom: 1px solid;
  cursor: pointer;
`;

export default Home;
