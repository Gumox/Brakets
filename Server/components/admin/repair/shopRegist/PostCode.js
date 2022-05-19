import React,{useEffect} from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components";
import COLOR from '../../../../constants/color';
import Image from "next/image";

const PostCode = ({
    options = {},
    setAddress = () => {},
    setPostCodeOn = () => {}
}) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setAddress(fullAddress)
    setPostCodeOn(false)
  }

  return (
    <Wrapper>
      <Section {...options}>
        <CloseButton onClick={()=>{setPostCodeOn(false)}}>
          <Image
            src="/close.png"
            alt="close"
            width="15px"
            height="15px"
            layout="fixed"
          />
        </CloseButton>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"45px"}}>주소 입력</div>
          <DaumPostcode
              onComplete={handleComplete}
              style={{height:500}}
          />
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
  min-height:450px;
`;

const Section = styled.div`
  position: relative;
  width: 380px;

  border
  max-height: 100%;
  margin: 0 auto;
  background-color: rgb(245,245,245);
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
  background-color:rgb(245,245,245);;
  border-radius : 12.5px;
`;
export default PostCode