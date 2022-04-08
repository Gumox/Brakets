import React,{useState,useEffect,useCallback} from "react";
import Image from "next/image";
import styled from "styled-components";
import axios from "axios";
import formatDate from "../../functions/formatDate";
import COLOR from "../../constants/color";
import { debounce } from "lodash";
import Modal from "../Modal";
import SelectInquiryImageModal from "./SelectInquiryImageModal";
import ToggleButton from "./ToggleButton";

const InquiryModal = ({
        item,
        closeProductImage=()=>{}
  }) => {
  
  const el =item;
  console.log(el)

  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)
  const [fontSizeTop,setFontSizeTop] =useState(15) 
  const [fontSizeBottom,setFontSizeBottom] =useState(12) 
    
  const YesOrNo = Boolean(el.mfr_substitute);

  const YesOrNoFunc =()=>{}
    
  const message=el.mfr_message;

  const [overallImg , setOverallImg] = useState() 
  const [imageData , setImageData] = useState([])
  const [needImageData,setNeedImageData] = useState([])
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const closeReceiptImage = useCallback(
    () => setIsImageModalOpen(false),
    []
  );


    const getImages = async(code)=>{
        const[datas] =await Promise.all([
            axios.get(`${process.env.API_URL}/RepairShop/getInquiryInfo/images?code=${code}`, {
            })
            .then(({ data }) => data)
            .catch(error=>{
                
            })
        ])

        setOverallImg(el.image)
        console.log(datas)
        
        setImageData(datas.data)
        setNeedImageData(datas.needImages)
    }
    
 
    useEffect( () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        setOverallImg(el.image)
        
        if(window.innerWidth<1125){
            setFontSizeTop((window.innerWidth)*0.012)
            setFontSizeBottom((window.innerWidth)*0.011)
        }
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[]);
    
    return (
        <>
        <Wrapper>
            <Section >
            <CloseButton onClick={closeProductImage}>
            <Image
                src="/close.png"
                alt="close"
                width="15px"
                height="15px"
                layout="fixed"
                />
            </CloseButton>
            <Container>
                <Half style={{ height:(windowHeight*0.9)}}>
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
                          <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>매장명</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.store_name}</ItemTextBottom></ItemBox>
                          <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>매장 연락처</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.store_contact}</ItemTextBottom></ItemBox>
                          <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>고객명</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.customer_name}</ItemTextBottom></ItemBox>
                          <ItemBox><ItemTextTop style={{fontSize:fontSizeTop}}>고객 연락처</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.customer_phone}</ItemTextBottom></ItemBox>
                          </LeView>
                          <LeView>
                          <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>시즌</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.season_name}</ItemTextBottom></ItemBoxSmall>
                          <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>스타일 No.</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.style_code}</ItemTextBottom></ItemBoxSmall>
                          <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>Color</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.color}</ItemTextBottom></ItemBoxSmall>
                          <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>Size</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.size}</ItemTextBottom></ItemBoxSmall>
                          <ItemBoxSmall><ItemTextTop style={{fontSize:fontSizeTop}}>차수</ItemTextTop><ItemTextBottom style={{fontSize:fontSizeBottom}}>{el.degree}</ItemTextBottom></ItemBoxSmall>
                          </LeView>
                          <Line2/>
                          <ItemText>매장 접수 내용</ItemText>
                          
                          <textarea disabled value={el.store_message} style={{backgroundColor:COLOR.WHITE,height:(windowHeight*0.08),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.DARK_GREEN,borderRadius:5,resize:"none"}}/>
                          
                          <ItemText>본사 설명</ItemText>
                          <textarea disabled value={el.message} style={{backgroundColor:COLOR.WHITE,height:(windowHeight*0.08),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.DARK_GREEN,borderRadius:5,resize:"none"}}/>
                      </div>
                    <div style={{marginLeft :30, display:"flex",justifyContent:"center",alignItems:"center",height:(windowHeight*0.9)/5}}>
                        {
                          <ImageButton onClick={()=>{
                            getImages(el.receipt_code)
                            setIsImageModalOpen(true)
                          }}>사진 보기</ImageButton>
                        }
                        {/*
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        */}
                    </div>
                  </div>
                </Half>

                <Half style={{height:(windowHeight*0.9)}}> 
                <div style={{fontSize:windowHeight*0.025,fontWeight:"bold",marginLeft:30,padding:10}}>업체 접수 입력</div>
                    <Line/>
                    <div style={{marginLeft:20,marginRight:20,flex:1}}>
                      <RaView style={{height:153}}>
                        <ItemTextTop style={{fontSize:fontSizeTop}}>업체 접수일<ItemTextBottom style={{marginLeft:20}}>{formatDate(new Date(el.receipt_date))}</ItemTextBottom></ItemTextTop>
                      </RaView>
                      
                      <div>
                        <ItemText>수선 내역</ItemText>
                        <Line2/>
                        <ItemText>업체 설명</ItemText>
                        <textarea disabled value={message} style={{backgroundColor:COLOR.WHITE,height:(windowHeight*0.08)+55,fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.DARK_GREEN,borderRadius:5,resize:"none"}}
                            
                        ></textarea>

                        
                  <RaView style={{paddingBottom:0}}>
                    <ItemText2 style={{fontSize:fontSizeTop}}>수선대체상품<ToggleButton disabled={true} tof={YesOrNo} tofClick={YesOrNoFunc}/></ItemText2>
                  </RaView>
                  {YesOrNo&&(
                    <div>
                      <LaView>
                        <ItemText2>수선처 발송일
                          <ItemText2 style={{marginLeft:20,color:COLOR.DARK_GREEN}}>{formatDate(new Date(el.mfr_complete_date))}</ItemText2>
                        </ItemText2>
                          
                      </LaView>
                          
                      <LaView><ItemText2>받는곳<ItemText2>{el.headquarter_name}</ItemText2></ItemText2></LaView>
                    </div>
                  )}

                        
                    
                    </div>

                      
                  </div>
                </Half>
            </Container>
            
            </Section>
            {isImageModalOpen&&(
              <Modal handleCloseButtonClick ={closeReceiptImage}>
                  <SelectInquiryImageModal overallImg = {overallImg} imageData ={imageData} needImageData = {needImageData} tof={true}/>
              </Modal>
            )}
        </Wrapper>
        </>
    );
};

const LaView = styled.div`
  display: flex;  
  margin:5px;
  align-items:center;
  flex-direction: row;
`;
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
  background-color: rgba(67, 67, 67, 0.7);
  width: 100%;
`;

const Section = styled.div`
  position: relative;
  /* width: ${({ width = "90%" }) => width}; */
  width: 90%;

  height: ${({ height = "90%" }) => height};
  /* max-width: ${({ maxWidth = "760px" }) => maxWidth}; */
  max-height: 100%;
  margin: 0 auto;
  background-color: ${({ backgroundColor = COLOR.WHITE }) => backgroundColor};
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
  height: ${({ height = "90%" }) => height};
  max-height: 100%;
`
const ContainText =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container =styled.div`
  display: flex;
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
  color:${COLOR.DARK_GREEN};
  font-weight: bold;
  
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.DARK_GREEN};
  margin-right:10px;
  margin-left:10px;
  min-height : 60px;
`;
const ItemTableText = styled.textarea`
    background-color:${COLOR.WHITE};
    font-size:15px;
    padding-top:10px;
    padding-left:10px;
    width: 100%;
    border : 0px;
    resize: none;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: rgba(210, 210, 210, 0.4);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
      }
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center
  `;
export default InquiryModal;
