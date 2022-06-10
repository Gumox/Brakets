import React,{useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from '../../../../constants/color';
import axios from 'axios';
import Image from "next/image";
import _ from 'lodash';
import SearchFocus from './SearchFocus';

const Designate = ({
    options = {},
    children,
    setDesignateOn = () => {},
    selectedBrand,
    brandName,
    categorysBrand=[],
    selectedCategory,
    brandCategoryList=[],
    repairShops =[]
}) => {

  const [searchName,setSearchName] = useState("")
  const [pcategoryId,setPcategoryId] = useState(selectedCategory)
  const [receiverId,setReceiverId] = useState(null)

  const brandDesignate = async()=>{

    if(pcategoryId !== "ALL" && receiverId && searchName){
        const [result] = await Promise.all([
          axios
            .post(`${process.env.API_URL}/RepairShop/brandDesignate?pcategoryId=${pcategoryId}&receiverId=${receiverId}&receiverName=${searchName}`,)
            .then(({ data }) => data.data), 
          ])
        if(result){
            alert("수선처가 지정 되었습니다")
            window.location.reload()
        }
    }else if(pcategoryId === "ALL"){
      alert("카테고리를 선택 해주세요")
    }else if(!receiverId){
      alert("올바른 수선처를 입력 해주세요")
    }

    
  }

  const dataHandler=(rValue)=>{
    setReceiverId(rValue)
  }

  return (
    <Wrapper>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"85%",height:"75%"}}>
                <PrView style={{minWidth:"350px"}}>
                  <div>
                    <SelectItemHeader>
                        브랜드
                    </SelectItemHeader>
                    <SelectItemHeader style={{borderTop: 0, borderRight: 0,color: COLOR.DARK_INDIGO, backgroundColor: COLOR.WHITE}}>
                        {
                          brandName
                        }
                    </SelectItemHeader>
                  </div>
                    
                  <div>
                    <SelectItemHeader>
                          카테고리
                      </SelectItemHeader>
                      <SearchSelect value={pcategoryId} style={{borderTop:0}}
                          onChange={(e)=>{setPcategoryId(e.target.value)}}>
                          <option value={"ALL"} >{"전체"}</option>
                          {
                              brandCategoryList.map((item,index)=>(
                                  <option key={index} value={item.pcategory_id} >{item.category_name}</option>
                              ))
                          }
                      </SearchSelect>
                  </div>
                </PrView>
                
                  
                
                   
                    <SelectItemHeader style={{minWidth:"350px",marginTop:10}}>
                        수선처
                    </SelectItemHeader>
                    <div style={{minWidth:"350px",minHeight:65,border:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                      <div style={{position:"relative"}}>
                          <SearchFocus shopList={repairShops} handler={dataHandler} name={searchName} setName={setSearchName}/>
                      </div>
                      

                    </div>

                    <PrView style={{display:"flex",flex:1}}>
               
                    <CenterView style={{minHeight:10,display:"flex",flex:1}}>
                        <CustomButton onClick={()=>{brandDesignate()}}>
                            등록
                        </CustomButton>

                        <CustomButton style={{backgroundColor:COLOR.RED}} onClick={()=>{setDesignateOn(false)}}>
                            취소
                        </CustomButton>
                    </CenterView>
                  </PrView>
              </div>
            </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    width:400px;
    height:350px;
    background-color:${COLOR.WHITE};
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-radius : 10px;
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

  height: ${({ height = "45%" }) => height};
  /* max-width: ${({ maxWidth = "760px" }) => maxWidth}; */
  margin: 0 auto;
  background-color: ${({ backgroundColor = COLOR.WHITE }) => backgroundColor};
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
export default Designate