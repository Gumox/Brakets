
import React,{useEffect,useState,useRef,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import formatDate from "../../functions/formatDate";
import axios from "axios";
import { checkHaveMfrDetail } from "../../functions/useInRepairReceiptModal";
import { debounce } from "lodash";
import Modal from "../Modal";
import SelectInquiryImageModal from "./SelectInquiryImageModal";
import ToggleButton from "./toggleButton";

function MfrReceiptModal (props) {
  const el =props.item;
  const info = props.info;
  const imageList = props.images;
  const fullImage = el.image;

  /*const hq_id = el.headquarter_id;*/
  const shop = props.shop

  const needImages = props.need;
  const [lineColor,setLineColor] = useState()

  

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const closeReceiptImage = useCallback(
    () => setIsImageModalOpen(false),
    []
  );
  
  const [registerDate,setRegisterDate] = useState(el.mfr_register_date);
  const [message,setMessage] = useState("");
  const [completeDate,setCompleteDate] = useState(null);

  const [YesOrNo, setYesOrNo] = useState(false);

  const YesOrNoFunc = useCallback(
    (tof) => {
      console.log(completeDate)
      setYesOrNo(tof)
      if(!tof){
        console.log(tof)
        
        setCompleteDate(null)
      }
    },[]
  );

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
    closeTool()
  }
  let images= [];
  imageList.forEach((obj) => {
    if(obj.receipt_id === el.receipt_id){
      images.push(obj)
    }
  });

  let date = formatDate(new Date(el.receipt_date))

  const onSave = async()=>{
    
    let res;

    const body ={
      mfr_id:el.mfr_id,
      receipt_id:el.receipt_id,	
      store_id:shop,
      register_date:String(registerDate).slice(0,10),	
      substitute:Number(YesOrNo),	
      message:message,	
      complete_date:completeDate,
      headquarter_id:el.headquarter_store_id

    }
    console.log(body)
    axios.post(`${process.env.API_URL}/mfr/setMfr`, body , {
      headers: {
        'Content-type': 'application/json'
      }})
      .then((response) => {
      // 응답 처리
          const json =  response.data;
          console.log(json);
          window.location.reload();
      })
      .catch((error) => {
      // 예외 처리
      console.error(error);
      })
   
  }

  useEffect( () => {
    
    console.log(el)
    const today = formatDate(new Date)
    if(!el.mfr_register_date){
      setRegisterDate(today)
    }
    if(Boolean(el.mfr_substitute)){
      setYesOrNo(Boolean(el.mfr_substitute))
    }
    setMessage(el.mfr_message)
    setLineColor(checkHaveMfrDetail(el))
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    if(window.innerWidth<1125){
      setFontSizeTop((window.innerWidth)*0.012)
      setFontSizeBottom((window.innerWidth)*0.011)
    }
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
      <PrView style={{backgroundColor:lineColor}}><ContainText>
                <ItemView>{el.receipt_code}</ItemView>
                <ItemView>{date}</ItemView>
                <ItemView>{el.store_name}</ItemView>
                <ItemView>{el.brand_name}</ItemView>
      </ContainText></PrView>
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
                  <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>생산업체</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.mfr_name}</ItemTextBottom></ItemBox>
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
                <textarea disabled value={el.store_message} style={{height:(windowHeight*0.08),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.DARK_GREEN,borderRadius:5,resize:"none"}}/>
                <ItemText>본사 설명</ItemText>
                <textarea disabled value={el.message} style={{height:(windowHeight*0.08),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.DARK_GREEN,borderRadius:5,resize:"none"}}/>
              </div>
            </div>

            <div style={{marginLeft :30, display:"flex",justifyContent:"center",alignItems:"center",height:(windowHeight*0.9)/5}}>
                {
                  <ImageButton onClick={()=>{
                    setIsImageModalOpen(true)
                  }}>사진 보기</ImageButton>
                }
                
            </div>
            {isImageModalOpen&&(
              <Modal handleCloseButtonClick ={closeReceiptImage}>
                  <SelectInquiryImageModal overallImg = {fullImage} imageData ={images} needImageData = {needImages} tof ={false}/>
              </Modal>
            )}
              
          </Half>
          
          <Half>
          <div style={{fontSize:windowHeight*0.025,fontWeight:"bold",marginLeft:30,padding:10}}>업체 접수 입력</div>
            <Line/>
            <div style={{marginLeft:20,marginRight:20,flex:1}}>
              <RaView style={{height:153}}>
                <ItemTextTop style={{fontSize:fontSizeTop}}>업체 접수일<ItemTextBottom style={{marginLeft:20}}>{formatDate(new Date(registerDate))}</ItemTextBottom></ItemTextTop>
              </RaView>
              
              <div>
                <ItemText>수선 내역</ItemText>
                <Line2/>
                <ItemText>업체 설명</ItemText>
                <textarea value={message} style={{height:(windowHeight*0.08)+55,fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.DARK_GREEN,borderRadius:5,resize:"none"}}
                    onChange ={(e)=>{
                        setMessage(e.target.value)
                    }}
                ></textarea>

                
                <RaView style={{paddingBottom:0}}>
                  <ItemText2 style={{fontSize:fontSizeTop}}>수선대체상품<ToggleButton tof={YesOrNo} tofClick={YesOrNoFunc}/></ItemText2>
                </RaView>
                {YesOrNo&&(
                  <div>
                    <LaView>
                      <ItemText2>수선처 발송일
                        <input type="date" style={{marginLeft:10}} onChange={(e)=>{setCompleteDate(e.target.value)}}></input>
                      </ItemText2>
                      <div style={{color :"#ff0000"}}>
                          <h6>⚠️발송일 입력없이 저장이 불가능합니다</h6>
                        </div>
                        
                    </LaView>
                        
                    <LaView><ItemText2>받는곳<ItemText2 style={{color:COLOR.DARK_GREEN}}>{el.headquarter_store_name}</ItemText2></ItemText2></LaView>
                  </div>
                )}
                  
               

                <LaView style={{justifyContent : "space-around" ,width:"50%",position:"absolute",bottom:0,right:0}}>
                <Cancel onClick={()=>{
                  closeTooltip()
                  }}>취소</Cancel>
                  <CustomButton onClick={()=>{
                    onSave()
                  }}>저장</CustomButton>
                </LaView>
            
            </div>

              
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

export default MfrReceiptModal;

const ImageButton = styled.button`
  width: 180px;
  height:80px;
  min-height: max-content;
  font-size: 15px;
  font-weight: bold;
  background-color: ${COLOR.DARK_GREEN};
  color: ${COLOR.WHITE};
  padding: 3px;
  border-radius: 20px;
`;

const Cancel =styled.button`
    min-width:50px;
    min-height:30px;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
    padding:5px;
    border:2px;
    color: #ffffff;
    background-color: #4F4F4F;
    &: hover{
        background-color: ${COLOR.DARK_GREEN};
        color: ${COLOR.WHITE};
    }

`;

const CustomButton = styled.button`
  width:50px;
  height:30px;
  font-size:15px;
  color: #ffffff;
  display:flex;
  margin:10px;
  align-items: center;
  background-color: ${COLOR.DARK_GREEN};
  border-radius : 7px;
  justify-content : center;
  
  &&:focus {     
    background-color:${COLOR.GRAY};    
`;

const LaView = styled.div`
  display: flex;  
  margin:5px;
  align-items:center;
  flex-direction: row;
`;
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
  background-color: ${COLOR.DARK_GREEN};
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
  padding:10px;
  display: flex;  
  align-items:center;

  &: hover {
    background-color: ${COLOR.DARK_GREEN};
    color:${COLOR.WHITE};
  }
`;
const ItemBox =styled.div`
  margin-left:10px;
  margin-right:10px;
  flex:1;
  height : 42px;
  
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
const ItemText2 = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  flex:1;
  margin-left:20px;
  margin-top:5px;
  margin-bottom:5px;
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
  color:${COLOR.DARK_GREEN};
  font-weight: bold;
  
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center
  `;