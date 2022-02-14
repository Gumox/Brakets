
import React,{useCallback, useEffect,useState} from "react";
import styled from "styled-components";
import COLOR from "../constants/color";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import formatDate from "../functions/formatDate";
import RepairHistory from "./RepairHistory";
import RepairReturn from "./RepairReturn";
import RepairOthers from "./RepairOthers";
import axios from "axios";
import ip from "../constants/ip";
import store from "../store/store";
import Image from 'next/image';

function RepairReceiptModal (props) {
  const el =props.item;
  const info = props.info;
  const imageList = props.images;
  const fullImage = ip+el.image;
  const hq_id = el.headquarter_id;
  const [faultItems,setFaultItems] = useState([])
  const [judgmentItems,setJudgmentItems] = useState([])
  const [analysisItems,setAnalysisItems] = useState([])
  const [repiarType,setRepiarType] = useState([])
  const [selectJudgment,setSelectJudgment] = useState(0)
  const [selectFault,setSelectFault] =useState(0)
  const [selectAnalysis,setSelectAnalysis] = useState(0)
  const [deliveryType,setDeliveryType] = useState(1)

  let images= [];
  imageList.forEach((obj) => {
    if(obj.receipt_id === el.receipt_id){
      images.push(obj)
    }
  });
  let imageView =[];
  images.forEach((obj,index)=>{
    const uri = ip + obj.before_image
    let img = (
      <div key={index} style={{display:"flex",flexDirection:"column",alignItems:"center",margin:10}}>
        <div style={{fontSize:15,fontWeight:"bold",margin:10}}>세부 이미지 {index+1}</div>
        <DetailImg src={uri} alt="세부이미지" />
      </div>
    )
    imageView[index] = (img);
  })

  const getSelectList = useCallback(async (api) => {
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/`+api,{
          params: { hq_id:hq_id},})
        .then(({ data }) => data),
    ]);
    //setSelectItems(data.body)
    return(data.body);
  },[])
  

  const setSelectList = (selectItems,text) => {
    let type = text +"_name";
    if(text === "repair_type"){
      type = "text";
    }
    const code = text +"_code";

    let resultItems =[];
    if(selectItems !== undefined){
      selectItems.map((item,index) => {
        let resultItem;
        const key = index;                    
        if(item.level == 1){
            resultItem =(
              <option value={item[code]} key={key}>
              {item[type]}
              </option>
            )
        }else if(item.level == 0){
            resultItem =(
              <option disabled value={item[code]} key={key} style={{backgroundColor:`${COLOR.LIGHT_GRAY}`}}>
              {item[type]}
              </option>
            )
        }
        resultItems[index] = (resultItem)
      })
    }
    return(resultItems)
  }
  const getRepairType= useCallback(async()=>{
    const [data] = await Promise.all([
        axios
        .get(`${process.env.API_URL}/type/repair`,{
        params: { headquarterId: 2},})
        .then(({ data }) => data),
    ]);
    return(data.data);
},[])
  let date = formatDate(new Date(el.receipt_date))
  let faultLists = setSelectList(faultItems,"fault")
  let judgmentLists = setSelectList(judgmentItems,"judgment")
  let analysisLists = setSelectList(analysisItems,"analysis")
  let repiarTypeList = setSelectList(repiarType,"repair_type")
  
  let selectJudgmentBox;
  if(selectJudgment == 3){
    selectJudgmentBox =(
      <RepairHistory infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType, result: selectJudgment}} selectList={repiarTypeList} shop={info.store_id} receipt={el.receipt_id}></RepairHistory>
    )
  }else if(selectJudgment == 7){
    selectJudgmentBox =(
      <RepairReturn reciver={"매장"} infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType ,result: selectJudgment}} shop={info.store_id} receipt={el.receipt_id}></RepairReturn>
    )
  }else if(selectJudgment == 8){
    selectJudgmentBox =(
      <RepairReturn reciver={"본사"} infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType ,result: selectJudgment}} shop={info.store_id} receipt={el.receipt_id}></RepairReturn>
    )
  }else if(selectJudgment == 11){
    selectJudgmentBox =(
      <RepairOthers infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType ,result: selectJudgment}} shop={info.store_id} receipt={el.receipt_id}></RepairOthers>
    )
  }else{
    selectJudgmentBox =(
      <></>
    )
  }
  useEffect( () => {
    const fetchData = async () => {
      const fI = await getSelectList('faultDivision')
      const jI = await getSelectList('judgmentResult')
      const aI = await getSelectList('analysisType')
      const typeInfo = await getRepairType();
      
      store.dispatch({type:"ANALYSIS",analysis:aI});
      store.dispatch({type:"JUDIMENT",judiment:jI});
      store.dispatch({type:"FAULT",fault:fI});
      store.dispatch({type:"REPAIR_TYPE",repair_type:typeInfo});

      localStorage.setItem('ANALYSIS',JSON.stringify(aI));
      localStorage.setItem('JUDIMENT',JSON.stringify(jI));
      localStorage.setItem('FAULT',JSON.stringify(fI));
      localStorage.setItem('REPAIR_TYPE',JSON.stringify(typeInfo));

      fI.unshift({faultItems_name:"선택",level:1})
      jI.unshift({judgmentResult_name:"선택",level:1})
      aI.unshift({analysisType_name:"선택",level:1})
      typeInfo.unshift({text:"선택",level:1})

      setFaultItems(fI)
      setJudgmentItems(jI)
      setAnalysisItems(aI)
      setRepiarType(typeInfo)
    }
    fetchData();
  },[]);
  return (
    <div suppressHydrationWarning={true}>
       {process.browser &&
    <Popup  
      trigger={
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
            <DetailImg src={fullImage} style={{margin:10}}
              alt="전체이미지"></DetailImg>
          
            {imageView}
          </div>
        </Half>
        
        <Half>
        <h2 style={{marginLeft:40,marginRight:20}}>수선처 접수 입력</h2>
          <Line/>
          <div style={{marginLeft:20,marginRight:20,flex:1}}>
            <LaView>
              <RightItemBox><ItemTextTop>수선처 접수일</ItemTextTop><ItemTextBottom>{formatDate(new Date(el.receipt_date))}</ItemTextBottom></RightItemBox>
              <RightItemBox><ItemTextTop>운송 형태</ItemTextTop><ItemTextBottom>
                  <select onChange={(e)=>{setDeliveryType(e.target.value)}}  style={styles.selectStyle} >
                  <option value={1} key={'매장행낭'}>매장행낭</option>
                  <option value={2} key={'본사행낭'}>본사행낭</option>
                  <option value={3} key={'택배'}>택배</option>
                  <option value={4} key={'퀵배송'}>퀵배송</option>
                  <option value={5} key={'행낭 (행낭 바코드 X)'}>행낭 (행낭 바코드 X)</option>
                  </select>
              </ItemTextBottom></RightItemBox>
            </LaView>
            <LaView>
              <RightItemBox>
                <ItemTextTop>과실구분</ItemTextTop>
                <ItemTextBottom>
                  <select onChange={(e)=>{setSelectFault(e.target.value)}}  style={styles.selectStyle} >
                    { 
                      faultLists
                    }
                  </select>
                </ItemTextBottom>
              </RightItemBox>
              <RightItemBox>
                <ItemTextTop>냬용분석</ItemTextTop>
                <ItemTextBottom>
                  <select onChange={(e)=>{setSelectAnalysis(e.target.value)}}  style={styles.selectStyle} >
                    {
                      analysisLists
                    }
                  </select>
                </ItemTextBottom>
              </RightItemBox>
              <RightItemBox>
                <ItemTextTop>판정결과</ItemTextTop>
                <ItemTextBottom>
                  <select onChange={(e)=>{setSelectJudgment(e.target.value)}}  style={styles.selectStyle} >
                    {
                      judgmentLists
                    }
                  </select>
                </ItemTextBottom>
              </RightItemBox>
            </LaView>
            
              {selectJudgmentBox}

            
          </div>
          
        </Half>
    </Container> 
    </Popup>
    }
    </div>
    
  );
  
};

export default RepairReceiptModal;
const styles = {
  contentStyle:{
  maxWidth: "95%",
  minWidth: 1450,
  maxHeight:"98%"
  },
  selectStyle:{
    marginLeft:10,
    marginRight:10,
    borderTop:0,
    borderLeft:0,
    borderRight:0,
    paddingBottom:5,
    borderBottomWidth:2,
    borderColor:COLOR.BRAUN
  }
};
const DetailImg = styled.img`
  width:270px;
  height:480px;
`;
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
  height: 700px;
  overflow-y: scroll;
`
const ContainText =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container =styled.div`
  display: flex;
  justify-content: center;
  max-height: 95%;
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