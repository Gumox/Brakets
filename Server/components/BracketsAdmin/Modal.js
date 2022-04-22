import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import bracketsAdminSelect from "../../functions/bracketsAdminSelect";

import COLOR from "../../constants/color";
import axios from "axios";

const Modal = ({ options, children, handleCloseButtonClick ,width}) => {
  const router = useRouter();
  const [companys,setCompanys] = useState([])
  const [selectCompany,setSelectCompany] = useState(0)
  
  const getCompanys =async()=>{
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/headquarter`,)
        .then(({ data }) => data.body)
        .catch(error=>{

        })
    ]);
    console.log(data)
    setCompanys(data)
  } 
  const setCompanyID =async()=>{
    
    
    sessionStorage.setItem('ADMIN_OPTIONS',JSON.stringify(await bracketsAdminSelect(selectCompany)));
    
    sessionStorage.setItem('ADMIN_HEADQURTER',selectCompany);

    router.push("/")

  } 
  useEffect(async()=>{
    await getCompanys();
  },[])
  return (
    <>
      <Wrapper>
        <Section {...options} style={{width:width*0.7}}>
          
            <ModalAlart > 
              <SelectMenuName>회사 선택</SelectMenuName>
            <SelectMenuName/>
              {companys&&
                
                <select style={{minWidth:130,fontSize:18}}  onChange={(e)=>{setSelectCompany(e.target.value)}} >
                  <option value={null}>{" "}</option>
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
              <PrView>
                <CloseButton onClick={handleCloseButtonClick}>취소</CloseButton>
                <SubmitButton onClick={()=>{
                  if(selectCompany >0){
                    setCompanyID()
                  }else{
                    alert("회사를 선택해주세요")
                  }
                }}>확인</SubmitButton>
              </PrView>
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
const PrView = styled.div`  
  display: flex;
  flex-direction: row;
  width:500px;
  justify-content: space-around;
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



const CloseButton = styled.button`
  
  display: flex;
  width: 65px;
  height: 30px;
  padding-Bottom:5px;
  justify-content: center;
  align-items: center;
  font-size:20px;
  cursor: pointer;
  border-radius:10px;
  background-color:${COLOR.GRAY};
  color : ${COLOR.WHITE};
`;

const SubmitButton = styled.button`
  
  display: flex;
  width: 65px;
  height: 30px;
  padding-Bottom:5px;
  justify-content: center;
  align-items: center;
  font-size:20px;
  cursor: pointer;
  border-radius:10px;
  background-color:${COLOR.INDIGO};
  color : ${COLOR.WHITE};
`;

export default Modal;
