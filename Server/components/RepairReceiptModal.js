
import React from "react";
import styled from "styled-components";
import COLOR from "../constants/color";
import Popup from 'reactjs-popup';
import formatDate from "../functions/formatDate";
import ip from "../constants/ip";

function RepairReceiptModal (props) {

  const el =props.item;
  const info = props.info;
  console.log(el.receipt_id)
  
  const imageList = props.images;
  const fullImage = ip+el.image
  let images= [];
  imageList.forEach((obj,index) => {
    if(obj.receipt_id === el.receipt_id){
      images.push(obj)
    }
  });
  let imageView =[];
  images.forEach((obj,index)=>{
    console.log(el.receipt_id+" : "+index)
    const uri = ip + obj.before_image
    let img = (
      <div key={index} style={{display:"flex",flexDirection:"column",alignItems:"center",margin:10}}>
        <div style={{fontSize:15,fontWeight:"bold",margin:10}}>세부 이미지 {index+1}</div>
        <img src={uri}
        alt="Trulli" width="200" height="150"/>
      </div>
    )
    imageView[index] = (img);
  })
  let date = formatDate(new Date(el.receipt_date))
  return (
    <Popup  trigger={
      <PrView ><ContainText>
                <ItemView>{el.receipt_code}</ItemView>
                <ItemView>{date}</ItemView>
                <ItemView>{el.store_name}</ItemView>
                <ItemView>{el.brand_name}</ItemView>
      </ContainText></PrView>
      }  
      modal
      contentStyle={styles.contentStyle}>
      
        
      
      <Container>
        <Half>
          <h2 style={{marginLeft:40,marginRight:20}}>매장 접수 정보</h2>
          <Line/>
          <div style={{marginLeft:20,marginRight:20,flex:1}}>
            <LaView>
              <ItemBox><ItemTextTop>브랜드</ItemTextTop><ItemTextBottom>{el.brand_name}</ItemTextBottom></ItemBox>
              <ItemBox><ItemTextTop>서비스 번호</ItemTextTop><ItemTextBottom>{el.receipt_code}</ItemTextBottom></ItemBox>
              <ItemBox><ItemTextTop>수선처</ItemTextTop><ItemTextBottom>{info.name}</ItemTextBottom></ItemBox>
              <ItemBox><ItemTextTop>생산업체</ItemTextTop><ItemTextBottom>{el.mfr_name}</ItemTextBottom></ItemBox>
            </LaView>
            <LaView>
              <ItemBox><ItemTextTop>매장명</ItemTextTop><ItemTextBottom>{el.name}</ItemTextBottom></ItemBox>
              <ItemBox><ItemTextTop>매장 연락처</ItemTextTop><ItemTextBottom>{el.store_contact}</ItemTextBottom></ItemBox>
              <ItemBox><ItemTextTop>고객명</ItemTextTop><ItemTextBottom>{el.customer_name}</ItemTextBottom></ItemBox>
              <ItemBox><ItemTextTop>고객 연락처</ItemTextTop><ItemTextBottom>{el.customer_phone}</ItemTextBottom></ItemBox>
            </LaView>
            <LaView>
              <ItemBoxSmall><ItemTextTop>시즌</ItemTextTop><ItemTextBottom>{el.season_name}</ItemTextBottom></ItemBoxSmall>
              <ItemBox><ItemTextTop>스타일 No.</ItemTextTop><ItemTextBottom>{el.style_code}</ItemTextBottom></ItemBox>
              <ItemBoxSmall><ItemTextTop>Color</ItemTextTop><ItemTextBottom>{el.color}</ItemTextBottom></ItemBoxSmall>
              <ItemBoxSmall><ItemTextTop>Size</ItemTextTop><ItemTextBottom>{el.size}</ItemTextBottom></ItemBoxSmall>
              <ItemBoxSmall><ItemTextTop>차수</ItemTextTop><ItemTextBottom>{el.degree}</ItemTextBottom></ItemBoxSmall>
            </LaView>
            <Line2/>
            <ItemText>매장 접수 내용</ItemText>
            <ItemTable><div style={{margin:10}}>{el.store_message}</div></ItemTable>
            <ItemText>본사 설명</ItemText>
            <ItemTable><div style={{margin:10}}>{el.message}</div></ItemTable>
          </div>
          <div style={{flex:0.3,borderWidth:2,borderColor:"#FFffff",
                      borderStyle:"solid",minHeight:380,margin:30,alignItems:"center",
                      justifyContent:"center",display:"flex",flexDirection:"column"}}>
            <div style={{fontSize:15,fontWeight:"bold",margin:10}}>전체 이미지</div>
            <img src={fullImage} style={{margin:10}}
              alt="Trulli" width="200" height="150"></img>
          
            {imageView}
          </div>
        </Half>
        
        <Half>
        <h2 style={{marginLeft:40,marginRight:20}}>수선처 접수 입력</h2>
          <Line/>
          <div style={{marginLeft:20,marginRight:20,flex:1}}>
            <LaView>
              <RightItemBox><ItemTextTop>수선처 접수일</ItemTextTop><ItemTextBottom>{formatDate(new Date(el.receipt_date))}</ItemTextBottom></RightItemBox>
              <RightItemBox><ItemTextTop>운송 형태</ItemTextTop><ItemTextBottom>???</ItemTextBottom></RightItemBox>
            </LaView>
            <LaView>
              <RightItemBox>
                <ItemTextTop>과실구분</ItemTextTop>
                <ItemTextBottom>???</ItemTextBottom>
              </RightItemBox>
              <RightItemBox>
                <ItemTextTop>냬용분석</ItemTextTop>
                <ItemTextBottom>???</ItemTextBottom>
              </RightItemBox>
              <RightItemBox>
                <ItemTextTop>판정결과</ItemTextTop>
                <ItemTextBottom>???</ItemTextBottom>
              </RightItemBox>
            </LaView>
            <LaView><ItemText>수선 내역</ItemText></LaView>
            <Line2/>
            <ItemText>매장 접수 내용</ItemText>
            <LaView>?</LaView>
            <LaView>?</LaView>
            <ItemText>수선처 설명</ItemText>
            <ItemTable></ItemTable>
          </div>
          <div style={{marginLeft:20,marginRight:20}}>
            <LaView>
              <div style={{fontSize:15,color:`${COLOR.RED}`,marginLeft:20,marginRight:20,marginTop:10,fontWeight:"bold"}}>유상수선비</div>
              <input style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0, borderBottomColor:`${COLOR.RED}`}}></input>
            </LaView>
            <LaView>
              <div style={{fontSize:15,color:`${COLOR.BLACK}`,marginLeft:20,marginRight:20,marginTop:10,fontWeight:"bold"}}>현금영수증 번호</div>
              <input style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0}}></input>
            </LaView>
          </div>
        </Half>
    </Container> 
    </Popup>
    
  );
  
};

export default RepairReceiptModal;
const styles = {
  contentStyle:{
  maxWidth: "95%",
  minWidth: 1400,
  maxHeight:"98%"
  }
};
const Line =styled.div`
  margin:10px;
  height:2px;
  margin-bottom:10px;
  margin-top:10px;
  margin-right:30px;
  margin-left:30px;
  background-color: ${COLOR.BRAUN}
`;
const Line2 =styled.div`
  margin:10px;
  height:1.5px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: #C4C4C4
`;
const Half = styled.div`
  flex:1;
  max-height: 700px;
  overflow: scroll;

`
const ContainText =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container =styled.div`
  display: flex;
  justify-content: center;
  max-height: 1000px;
`;
const LaView = styled.div`
  padding:10px;
  display: flex;  
  align-items:center;
`;
const PrView = styled.div`
  padding:10px;
  display: flex;  
  align-items:center;

  &: hover {
    background-color: ${COLOR.BRAUN};
  }
`;
const ItemBox =styled.div`
  margin-left:10px;
  margin-right:10px;
  flex:1;
  height : 50px;
  
`;
const RightItemBox =styled.div`
  margin-left:10px;
  margin-right:10px;
  height : 50px;
  
`;
const ItemBoxSmall =styled.div`
  margin-left:10px;
  margin-right:10px;
  flex:0.7;
  height : 50px
`;
const ItemText = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  flex:1;
  margin-left:20px;
  margin-top:20px;
  margin-bottom:10px;
`;
const ItemTextTop = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  flex:1;
  margin:5px;
  justify-content: center;
`;

const ItemTextBottom = styled.div`
  font-size:12px;
  display: flex;
  flex:1;  
  align-items: center;
  justify-content: center;
  color:${COLOR.BRAUN};
  font-weight: bold;
  margin:5px;
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  margin-right:10px;
  margin-left:10px;
  min-height : 60px

`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center
  `;