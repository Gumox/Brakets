import React,{useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from '../../../../constants/color';
import axios from 'axios';
import Image from "next/image";
import _ from 'lodash';
import SearchFocus from './SearchFocus';

const Deassign = ({
    options = {},
    children,
    setDeassignOn = () => {},
    checkedList=[],
    brandName=""
}) => {
  
  const selectedRepairShopList = []
  
  if(checkedList.length > 0){
    checkedList.map((item,index)=>{
      
      if(item.receiver_name){
        selectedRepairShopList.push(item.receiver_name)
      }
    })
  }


  const brandDeassign = ()=>{
    if(selectedRepairShopList.length>0){

      checkedList.map(async(item)=>{
        const [result] = await Promise.all([
          axios
            .post(`${process.env.API_URL}/RepairShop/brandDeassign?pcategoryStoreId=${item.pcategory_store_id}`,)
            .then(({ data }) => data.data), 
          ])
      })
      alert("수선처가 해제 되었습니다")
      window.location.reload()
    }else{
      alert("선택된 수선처가 없습니다")
    }

  }

  const dataHandler=(rValue)=>{
    setReceiverId(rValue)
  }

  return (
    <Wrapper>
      <Section {...options}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
              <div style={{marginTop:20,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"85%",height:"75%"}}>
                    <PrView>
                        <HeaderCell>
                            브랜드
                        </HeaderCell>
                        <HeaderCell >
                            카테고리
                        </HeaderCell>

                        <HeaderCell>
                            지정 수선처
                        </HeaderCell>

                        
                    </PrView>
                    {
                      checkedList.map((item,index)=>{
                        return(
                          <PrView key ={index}>
                            <HeaderCell>
                                {brandName}
                            </HeaderCell>
                            <HeaderCell >
                                {item.category_name}
                            </HeaderCell>
    
                            <HeaderCell >
                                {item.receiver_name}
                            </HeaderCell>
  
                          </PrView>
  
                        )
                      })
                    }
                  <PrView style={{display:"flex",flex:1,position:"absolute",bottom:0}}>
               
                    <CenterView style={{minHeight:10,display:"flex",flex:1}}>
                        <CustomButton style={{backgroundColor:COLOR.RED}}  onClick={()=>{brandDeassign()}}>
                            삭제
                        </CustomButton>

                        <CustomButton onClick={()=>{setDeassignOn(false)}}>
                            취소
                        </CustomButton>
                    </CenterView>
                  </PrView>
              </div>
            </div>
      </Section>
    </Wrapper>
  );
}

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
    background-color: rgba(67, 67, 67, 0.5);
    width: 100%;
    min-width:800px;
    min-height:650px;
`;
const HeaderCell = styled.div`
    display:flex;
    min-width:150px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    flex:1;
    padding:5px;
`;

const InsideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(67, 67, 67, 0.5);
  width: 100%;
  min-width:800px;
  min-height:1080px;
`;
const Section = styled.div`
  position: relative;
  /* width: ${({ width = "80%" }) => width}; */
  width: 45%;

  min-height: ${({ height = "45%" }) => height};
  max-height: ${({ height = "90%" }) => height};
  /* max-width: ${({ maxWidth = "760px" }) => maxWidth}; */
  margin: 0 auto;
  background-color: ${({ backgroundColor = COLOR.WHITE }) => backgroundColor};

  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10; 
  
  display: flex;
  align-items: center;
  justify-content: center;

  width : 25px;
  height : 25px;
  background-color:rgb(255,255,255);;
  border-radius : 12.5px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;


const SearchSelect = styled.select`
  border :0;
  border: 2px solid ${COLOR.LIGHT_GRAY};
  height:30px;
  min-width:175px;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
  }
`;
const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;
const SelectItemHeader = styled.div`
    display : flex;
    min-width:175px;
    justify-content : center;
    align-items : center;
    height:30px;
    font-size: 12px;
    font-weight: bold;
    background-color:${COLOR.LIGHT_GRAY};
    border: 2px solid ${COLOR.LIGHT_GRAY};

`;

const CustomButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 35px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
export default Deassign