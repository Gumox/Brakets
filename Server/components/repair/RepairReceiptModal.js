
import React,{useEffect,useState,useRef} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import formatDate from "../../functions/formatDate";
import RepairHistory from "./RepairHistory";
import RepairReturn from "./RepairReturn";
import RepairOthers from "./RepairOthers";
import ip from "../../constants/ip";
import store from "../../store/store";
import { getSelectList,setSelectList,getRepairType,checkHaveRepairDetail } from "../../functions/useInRepairReceiptModal";
import { debounce } from "lodash";
import RecepitionImage from "./RecepitionImage";

function RepairReceiptModal (props) {
  const el =props.item;
  const info = props.info;
  const imageList = props.images;
  const fullImage = ip+el.image;
  const hq_id = el.headquarter_id;
  const needImages = props.need;
  const shop = props.shop
  const [needResult,setNeedResult] = useState([]);
  const [lineColor,setLineColor] = useState()


  const [cancelSJN,setCancelSJN] = useState()
  const [cancelSJI,setCancelSJI] = useState()
  const [cancelSF,setCancelSF] = useState()
  const [cancelSA,setCancelSA] = useState()

  const [repairRegistDate,setRepairRegistDate] = useState("미등록")
  const [registDate,setRegistDate] = useState(null)
  const [selectJudgmentName,setSelectJudgmentName] = useState()
  const [selectJudgmentValue,setSelectJudgmentValue] = useState(0)
  const [selectFault,setSelectFault] =useState(0)
  const [selectAnalysis,setSelectAnalysis] = useState(0)
  const [deliveryType,setDeliveryType] = useState(1)

  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)
  
  const [fontSizeTop,setFontSizeTop] =useState(15) 
  const [fontSizeBottom,setFontSizeBottom] =useState(12) 
  const modalRef = useRef();
  const closeTool = () => modalRef.current.close();
  const closeTooltip = () => {
    setSelectJudgmentName(cancelSJN)
    setSelectJudgmentValue(cancelSJI)
    setSelectFault(cancelSF)
    setSelectAnalysis(cancelSA)
    closeTool()
  }
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
        <RecepitionImage key={index} color={COLOR.MENU_MAIN} item={{name:"근접"+(index+1),image:uri}}/>
    )
    imageView[index] = (img);
  })

  let date = formatDate(el.receipt_date)

  const [faultLists,setFaultLists] = useState();
  const [judgmentLists,setJudgmentLists] = useState()
  const [analysisLists,setAnalysisLists] =useState()
  const [repiarTypeList,setRepiarTypeList] = useState()
  
  let selectJudgmentBox;
  if(selectJudgmentName == "외주수선"){
    selectJudgmentBox =(
      <RepairHistory hqId={hq_id} {...{closeTooltip}} infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType, result: selectJudgmentValue}} brands={el.brand_id} selectList={repiarTypeList} shopId={info.store_id} receipt={el.receipt_id}></RepairHistory>
    )
  }else if(selectJudgmentName == "매장반송"){
    selectJudgmentBox =(
      <RepairReturn _receiver={"매장"} {...{closeTooltip}} registDate ={registDate} _receiverId={el.store_id} infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType ,result: selectJudgmentValue}} shopId={info.store_id} receipt={el.receipt_id}></RepairReturn>
    )
  }else if(selectJudgmentName == "본사반송"){
    selectJudgmentBox =(
      <RepairReturn _receiver={"본사"} {...{closeTooltip}} registDate ={registDate} _receiverId={1} infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType ,result: selectJudgmentValue}} shopId={info.store_id} receipt={el.receipt_id}></RepairReturn>
    )
  }else if(selectJudgmentName == "기타"){
    selectJudgmentBox =(
      <RepairOthers {...{closeTooltip}} infos = {{fault:selectFault,analysis:selectAnalysis ,delivery: deliveryType ,result: selectJudgmentValue}} shopId={info.store_id} receipt={el.receipt_id}></RepairOthers>
    )
  }else{
    selectJudgmentBox =(
      <></>
    )
  }


  const fetchData = async () => {
    const fI = await getSelectList('faultDivision',hq_id)
    const jI = await getSelectList('judgmentResult',hq_id)
    const aI = await getSelectList('analysisType',hq_id)
    const typeInfo = await getRepairType(hq_id);


    store.dispatch({type:"ANALYSIS",analysis:aI});
    store.dispatch({type:"JUDIMENT",judiment:jI});
    store.dispatch({type:"FAULT",fault:fI});
    store.dispatch({type:"REPAIR_TYPE",repair_type:typeInfo});//변경필요

    sessionStorage.setItem('ANALYSIS',JSON.stringify(aI));
    sessionStorage.setItem('JUDIMENT',JSON.stringify(jI));
    sessionStorage.setItem('FAULT',JSON.stringify(fI));
    sessionStorage.setItem('REPAIR_TYPE',JSON.stringify(typeInfo));

    fI.unshift({faultItems_name:"선택",level:1})
    jI.unshift({judgmentResult_name:"선택",level:1})
    aI.unshift({analysisType_name:"선택",level:1})
    typeInfo.unshift({text:"선택",level:1})
    
    setJudgmentLists(setSelectList(jI))
    
    for(let i=1;i<4;i++){
      let resultId =`repair${i}_result_id`
      let repairStoreId=`repair${i}_store_id`
      let name =`repair${i}_result_name`
      let fault = `repair${i}_fault_id`
      let analysis =`repair${i}_analysis_id`
      if(el[repairStoreId] == shop){
        setSelectJudgmentValue(el[resultId])
        setSelectJudgmentName(el[name])
        setCancelSJI(el[resultId])
        setCancelSJN(el[name])
      }
      if(el[fault] !== null){
        setSelectFault(el[fault])
        setCancelSF(el[fault])
      }
      if(el[analysis]!== null){
        setSelectAnalysis(el[analysis])
        setCancelSA(el[analysis])
      }
      if(el[`repair${i}_register_date`]){
        setRepairRegistDate(formatDate(el[`repair${i}_register_date`]))
        setRegistDate(el[`repair${i}_register_date`])
      }

    }
    
    setFaultLists(setSelectList(fI))
    
    setAnalysisLists(setSelectList(aI))
    setRepiarTypeList(setSelectList(typeInfo))
  }

   

  useEffect( () => {
    
    fetchData();
    setLineColor(checkHaveRepairDetail(el,info.store_id))
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    if(window.innerWidth<1125){
      setFontSizeTop((window.innerWidth)*0.012)
      setFontSizeBottom((window.innerWidth)*0.011)
    }
    needImages.map((arr) => {
      arr.map((item,i)=>{
        if(item.receipt_id === el.receipt_id){
          let result =(
            <RecepitionImage key={i} color={COLOR.MADARIN} item={{name:"추가"+(i+1),image:ip+item.need_point_image}}/>
          )
          needResult[i]=(result);
        }
      })
    })
    window.addEventListener('resize',handleResize);
    return ()=>{
        window.removeEventListener('resize',handleResize);
    }
  },[1,el,info]);

  return (
    <div suppressHydrationWarning={true}>
       {process.browser &&
    <Popup  
      ref={modalRef}
      trigger={
      <PrView style={{backgroundColor:lineColor}}>
                <ItemView style={{marginLeft:10}}>{el.receipt_code}</ItemView>
                <ItemView>{date}</ItemView>
                <ItemView>{el.store_name}</ItemView>
                <ItemView>{el.brand_name}</ItemView>
                <ItemViewMessage style={{flex:1,marginRight:10}}>{el.store_message}</ItemViewMessage>
      </PrView>
      }  
      modal
      contentStyle={{ 
        width: windowWidth*0.92,
        minWidth: 1080*0.92,
        height:windowHeight*0.90,
        minHeight: 720*0.9
        }}>
      
        
      
      {(close) => (<Container>
          <Half style={{flex :1, height:windowHeight*0.9}}>
            <div style={{height:520}}>
              <div style={{fontSize:windowHeight*0.025,fontWeight:"bold",marginLeft:30,padding:10}}>매장 접수 정보</div>
              <Line/>
              <div style={{marginLeft:20,marginRight:20,flex:1}}>
                <LeView>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>브랜드</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.brand_name}</ItemTextBottom></ItemBox>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>서비스 번호</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.receipt_code}</ItemTextBottom></ItemBox>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>수선처</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{info.name}</ItemTextBottom></ItemBox>
                </LeView>
                <LeView>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>매장명</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.name}</ItemTextBottom></ItemBox>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>매장 연락처</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.store_contact}</ItemTextBottom></ItemBox>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>고객명</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.customer_name}</ItemTextBottom></ItemBox>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>고객 연락처</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.customer_phone}</ItemTextBottom></ItemBox>
                </LeView>
                <LeView>
                  <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>시즌</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.season_name}</ItemTextBottom></ItemBoxSmall>
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>스타일 No.</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.style_code}</ItemTextBottom></ItemBox>
                  <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>Color</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.color}</ItemTextBottom></ItemBoxSmall>
                  <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>Size</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.size}</ItemTextBottom></ItemBoxSmall>
                  <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>차수</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.degree}</ItemTextBottom></ItemBoxSmall>
                </LeView>
                <Line2/>
                <ItemText>매장 접수 내용</ItemText>
                <ItemTable><div style={{margin:10}}>{el.store_message}</div></ItemTable>
                <ItemText>본사 설명</ItemText>
                <ItemTable><div style={{margin:10}}>{el.message}</div></ItemTable>
              </div>
            </div>
              <div style={{marginLeft :12}}>
                <LeView>
                  
                  
                  <RecepitionImage color={COLOR.MADARIN} item={{name:"전체사진",image:fullImage}}/>
                  {
                    imageView
                  }
                  
                </LeView>
                <LeView style={{marginTop:((windowHeight)*0.9-550)/2-34,marginLeft:((windowHeight)*0.9+140)/8}}>
                  {
                    needResult
                  }
                </LeView>
              </div>
              
          </Half>
          
          <Half>
          <div style={{fontSize:windowHeight*0.025,fontWeight:"bold",marginLeft:30,padding:10}}>수선처 접수 입력</div>
            <Line/>
            <div style={{marginLeft:20,marginRight:20,flex:1}}>
              <RaView>
                <ItemTextTop style={{fontSize:fontSizeTop}}>수선처 접수일<ItemTextBottom style={{marginLeft:20}}>{repairRegistDate}</ItemTextBottom></ItemTextTop>
                <ItemTextTop style={{fontSize:fontSizeTop}}>운송 형태<ItemTextBottom style={{marginLeft:20}}>
                    <select onChange={(e)=>{setDeliveryType(e.target.value)}}  style={styles.selectStyle} >
                    <option value={1} key={'매장행낭'}>매장행낭</option>
                    <option value={2} key={'본사행낭'}>본사행낭</option>
                    <option value={3} key={'택배'}>택배</option>
                    <option value={4} key={'퀵배송'}>퀵배송</option>
                    </select>
                </ItemTextBottom></ItemTextTop>
              </RaView>
              <RaView>
                <RightItemBox>
                  <ItemTextTop style={{fontSize:fontSizeTop}}>과실구분</ItemTextTop>
                  <ItemTextBottom style={{fontSize:fontSizeBottom}}>
                    <select onChange={(e)=>{setSelectFault(e.target.value)}} value={selectFault || ""} style={styles.selectStyle} >
                      { 
                        faultLists
                      }
                    </select>
                  </ItemTextBottom>
                </RightItemBox>
                <RightItemBox>
                  <ItemTextTop style={{fontSize:fontSizeTop}}>냬용분석</ItemTextTop>
                  <ItemTextBottom style={{fontSize:fontSizeBottom}}>
                    <select onChange={(e)=>{setSelectAnalysis(e.target.value)}} value={selectAnalysis || ""}  style={styles.selectStyle} >
                      {
                        analysisLists
                      }
                    </select>
                  </ItemTextBottom>
                </RightItemBox>
                <RightItemBox>
                  <ItemTextTop style={{fontSize:fontSizeTop}}>판정결과</ItemTextTop>
                  <ItemTextBottom style={{fontSize:fontSizeBottom}}>
                    <select id="selectBox" style={styles.selectStyle} value={selectJudgmentValue || ""} onChange={(e)=>{
                        var target = document.getElementById("selectBox");
                        setSelectJudgmentName(target.options[target.selectedIndex].text)
                        setSelectJudgmentValue(e.target.value)
                      }}>
                      {
                        judgmentLists
                      }
                    </select>
                  </ItemTextBottom>
                </RightItemBox>
              </RaView>
              
                {selectJudgmentBox}

              
            </div>
            
          </Half>
          <CloseButton className="close" onClick={closeTooltip} >
          <img
              src="/close.png"
              alt="close"
              width="15px"
              height="15px"
              layout="fixed"
            />
          </CloseButton>
      </Container> )
      }
    </Popup>
    }
    </div>
    
  );
  
};

export default RepairReceiptModal;

const styles = {
  contentStyle:{
  maxWidth: "95%",
  minWidth: 1080,
  maxHeight:"90%"
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
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10; 
`;
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
  background-color: ${COLOR.BRAUN};
`;
const Line2 =styled.div`
  margin:10px;
  height:1.5px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: #C4C4C4;
`;
const Half = styled.div`
  flex:1;
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
const LeView = styled.div`
  padding:10px;
  display: flex;  
  align-items:center;
`;
const RaView = styled.div`
  padding:5px;
  display: flex;  
  align-items:center;
  justify-content: space-around;
`;
const PrView = styled.div`
  display: flex;  
  align-items:center;
  border-bottom:2px solid #f2f2f2;;

  &: hover {
    background-color: ${COLOR.BRAUN};
    color:${COLOR.WHITE};
  }
`;
const ItemBox =styled.div`
  margin-left:10px;
  margin-right:10px;
  flex:1;
  height : 42px;
  
`;
const RightItemBox =styled.div`
  
  
`;
const ItemBoxSmall =styled.div`
  margin-left:10px;
  margin-right:10px;
  flex:0.7;
  height : 50px;
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
  
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  margin-right:10px;
  margin-left:10px;
  min-height : 60px;
`;
const ItemViewMessage = styled.div`
  font-size :12px;
  min-height: 20px;
  padding-left:10px;
  padding-right:10px;
  display: flex;  
  `;
const ItemView = styled.div`
  font-size :12px;
  padding-top:10px;
  padding-bottom:10px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center;
  `;