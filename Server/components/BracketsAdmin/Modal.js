import React, { useEffect,useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import COLOR from "../../constants/color";
import axios from "axios";

const Modal = ({ options, children, handleCloseButtonClick ,width}) => {
  const [companys,setCompanys] = useState([])
  const [selectCompany,setSelectCompany] = useState(0)
  const getCompanys =async()=>{
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/headquarter/headquarterStore`,)
        .then(({ data }) => data.body)
        .catch(error=>{

        })
    ]);
    console.log(data)
    setCompanys(data)
  } 
  const setCompanyID =async()=>{
    const [data] = await Promise.all([
      axios
        .post(`${process.env.API_URL}/headquarter?storeId=${selectCompany}`,)
        .then(({ data }) => data.body)
        .catch(error=>{

        })
    ]);
    console.log(data)
    setCompanys(data)
  } 
  useEffect(async()=>{
    await getCompanys();
  },[])
  return (
    <>
      <Wrapper>
        <Section {...options} style={{width:width*0.7}}>
          <CloseButton onClick={handleCloseButtonClick}>
            
            &times;
            {/*<Image
              src="/close.png"
              alt="close"
              width="15px"
              height="15px"
              layout="fixed"
            /> */}
          </CloseButton>
            <ModalAlart > 
              <SelectMenuName>회사 선택</SelectMenuName>
            <SelectMenuName/>
              {companys&&
                
                <select style={{minWidth:130,fontSize:18}}  onChange={(e)=>{setSelectCompany(e.target.value)}} >
                  {
                    companys.map((item,index)=>{
                      return(
                        <option key={index} value={item.value}>{item.headquarter_name}</option>
                      )
                    })
                  }
                </select>
              }
            <SelectMenuName/>
            <SelectMenuName/>
            <SelectMenuName/>
            </ModalAlart>
        </Section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(67, 67, 67, 0.1);
  width: 100%;
`;
const ModalAlart = styled.div`
  width:500px;
  height:350px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  background-color: #f7f7f7;
  border-top:2px solid #ffffff;;
  border-bottom:2px solid #c9c9c9;
  border-left:2px solid #ffffff;
  border-right:2px solid #c9c9c9;
`;
const SelectMenuName = styled.div`  
  font-size:30px;
  margin:20px;
`;

const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: ${({ width = "50%" }) => width}; */
  width: 40%;

  height: ${({ height = "90%" }) => height};
  /* max-width: ${({ maxWidth = "760px" }) => maxWidth}; */
  max-height: 100%;
  margin: 0 auto;
  background-color: rgba(67, 67, 67, 0);
`;

const CloseButton = styled.div`
  position: absolute;
  display: flex;
  width: 32px;
  height: 32px;
  padding-Bottom:5px;
  justify-content: center;
  align-items: center;
  font-size:30px;
  top: 6px;
  right: 12px;
  cursor: pointer;
  z-index: 10; 
  color:${COLOR.WHITE}
`;

export default Modal;
