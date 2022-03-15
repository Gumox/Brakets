import React, { useState,useEffect,useRef, useContext} from "react";
import { useRouter } from 'next/router';
import { debounce } from "lodash";
import styled from "styled-components";
import COLOR from "../constants/color";
import ReactToPrint from "react-to-print";
import store from "../store/store";
import { UserContext } from "../store/Context";

const Request = (props) => { 
    
    const myWidth = 210*3.8;
    const per =3.8
    const { printRef,windowWidth,windowHeight,queryData,userName,headquarterId } = props;
    //console.log(userName)
    const targetData= JSON.parse(queryData)
    const [companyName,setCompanyName] =useState('')
    const [companyStaffName,setCompanyStaffName] =useState(userName)
    const [companyContract,setCompanyContract] =useState('')
    const [customerName,setCustomerName] =useState(targetData.customer_name)
    const [customerContract,setCustomerContract] =useState(targetData.customer_phone)
    const [cName,setCName] =useState('')
    const [brandName,setBrandName] =useState(targetData.brand_name)
    const [modelStyle,setModelStyle] =useState(targetData.product_style_code)
    const [color,setColor] =useState(targetData.product_color)
    return (
        <div style={{display:"flex",justifyContent:"center" , alignItems : "center",width:windowWidth,height:windowHeight}}>
            <div ref={printRef} style={{backgroundColor: COLOR.WHITE,width:(210)*per,height:(297)*per,display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <RequestBox>
                            
                            <PrView >
                                <CenterDiv style={{width:"72.8%", height:(14.142)*per*2}}><h1>의류,장신구사고 분쟁조정 의뢰서</h1></CenterDiv>
                                <Box style={{height:(14.142)*per*2,width:myWidth*0.123,borderBottom:0}}>접수번호</Box>
                                <InputBox style={{height:(14.142)*per*2, width:myWidth*0.15,borderBottom:0}}></InputBox></PrView>
                        
                        <PrView>
                            <Box style={{height:(14.142)*per, width:myWidth*0.117}}>업체</Box>
                            <Box style={{height:(14.142)*per, width:myWidth*0.117,borderLeft:0}}>업체명</Box>
                            <InputBox style={{height:(14.142)*per, width:myWidth*0.20}}></InputBox>
                            <Box style={{height:(14.142)*per, width:myWidth*0.12,borderLeft:0}}>당담자</Box>
                            <InputBox style={{height:(14.142)*per, width:myWidth*0.156}} value={companyStaffName}></InputBox>
                            <Box style={{height:(14.142)*per, width:myWidth*0.12,borderLeft:0}}>연락처</Box>
                            <InputBox style={{height:(14.142)*per, width:myWidth*0.15}}></InputBox>
                        </PrView>
                        <PrView>
                            <Box style={{height:(14.142)*per, width:myWidth*0.117,borderTop:0}}>소비자</Box>
                            <Box style={{height:(14.142)*per, width:myWidth*0.117,borderLeft:0,borderTop:0}}>성 명</Box>
                            <InputBox style={{height:(14.142)*per, width:myWidth*0.32,borderTop:0}} value = {customerName} onChange={(e)=>{setCustomerName(e.target.value)}}></InputBox>
                            <Box style={{height:(14.142)*per, width:myWidth*0.116,borderLeft:0,borderTop:0}}>연락처</Box>
                            <InputBox style={{height:(14.142)*per,width:myWidth*0.31,borderTop:0}} value = {customerContract} onChange={(e)=>{setCustomerContract(e.target.value)}}></InputBox>
                        </PrView>
                        <PrView>
                            <Box style={{height:(14.142)*per*8,fontSize:16,width:myWidth*0.119,borderTop:0}}>고 발 표</Box>
                            <div style={{width:myWidth*0.88}}>
                                <InView>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.117,borderLeft:0,borderTop:0}}>구입일</Box>
                                    <InputBox type={"date"} style={{height:(14.142)*2, width:myWidth*0.32,borderTop:0}}></InputBox>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.116,borderLeft:0,borderTop:0}}>사고발생일</Box>
                                    <InputBox type={"date"} style={{height:(14.142)*2, width:myWidth*0.31,borderTop:0}}></InputBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.117,borderLeft:0,borderTop:0}}>상품분류</Box>
                                    <InputBox style={{height:(14.142)*2, width:myWidth*0.88-myWidth*0.134,borderTop:0}}></InputBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.117,borderLeft:0,borderTop:0}}>브랜드명</Box>
                                    <InputBox style={{height:(14.142)*2, width:myWidth*0.32,borderTop:0}} value = {brandName} onChange={(e)=>{setBrandName(e.target.value)}}></InputBox>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.116,borderLeft:0,borderTop:0}}>모델ID</Box>
                                    <InputBox style={{height:(14.142)*2, width:myWidth*0.31,borderTop:0}} value = {modelStyle} onChange={(e)=>{setModelStyle(e.target.value)}}></InputBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.117,borderLeft:0,borderTop:0}}>색 상</Box>
                                    <InputBox style={{height:(14.142)*2, width:myWidth*0.32,borderTop:0}} value = {color} onChange={(e)=>{setColor(e.target.value)}}></InputBox>
                                    <Box style={{height:(14.142)*2, width:myWidth*0.116,borderLeft:0,borderTop:0}}>구입가격</Box>
                                    <InputBox style={{height:(14.142)*2, width:myWidth*0.31,borderTop:0}}></InputBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*per*5.9, width:myWidth*0.117,borderLeft:0,borderTop:0}}>소재 조성</Box>
                                    <InputText style={{height:(14.142)*per*5.9, width:myWidth*0.32,borderTop:0}}></InputText>
                                    <Box style={{height:(14.142)*per*5.9, width:myWidth*0.116,borderLeft:0,borderTop:0}}>취급표시</Box>
                                    <SimbolBox style={{height:(14.142)*per*5.9, width:myWidth*0.31,borderLeft:0,borderTop:0}}>
                                        <InView>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_1.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_2.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_3.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_4.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_5.png"/>
                                            </div>
                                        </InView>
                                        <InView><div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_6.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_7.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_8.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_9.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_10.png"/>
                                            </div>
                                        </InView>
                                        <InView><div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_11.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_12.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_13.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_14.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_15.png"/>
                                            </div>
                                        </InView>
                                        <InView><div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_16.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_17.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_18.png"/>
                                            </div>
                                            <div>
                                                <input type="checkbox"/>
                                                <Img src="/icons/symbol_19.png"/>
                                            </div>
                                        </InView>
                                    </SimbolBox>
                                </InView>
                                
                                
                            </div>
                        </PrView>
                        <PrView>
                            <Box style={{height:(14.142)*per*8,fontSize:16,width:myWidth*0.119,borderTop:0}}>사고경위</Box>
                            <div style={{width:myWidth*0.88}}>
                                <InView>
                                    <Box style={{height:(14.142)*per, width:myWidth*0.437,borderLeft:0,borderTop:0}}>세탁방법</Box>
                                    <Box style={{height:(14.142)*per, width:myWidth*0.426,borderLeft:0,borderTop:0}}>그림</Box>
                                </InView>
                                <InView>
                                    <div>
                                        <InView>
                                            <Box style={{height:(14.142)*per*1.5, width:myWidth*0.117,borderLeft:0,borderTop:0}}>세탁여부</Box>
                                            <InputBox style={{height:(14.142)*per*1.5, width:myWidth*0.32,borderTop:0}}></InputBox>
                                        </InView>
                                        <InView>
                                            <Box style={{height:(14.142)*per*1.5, width:myWidth*0.117,borderLeft:0,borderTop:0}}>세탁장소</Box>
                                            <InputBox style={{height:(14.142)*per*1.5, width:myWidth*0.32,borderTop:0}}></InputBox>
                                        </InView>
                                    </div>
                                    <SimbolBox style={{height:(14.142)*per*3, width:myWidth*0.426,borderTop:0,borderLeft:0}}></SimbolBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*per*1.33, width:myWidth*0.117,borderLeft:0,borderTop:0}}>소비자의견</Box>
                                    <InputBox style={{height:(14.142)*per*1.33, width:myWidth*0.746,borderTop:0}}></InputBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*per*1.33, width:myWidth*0.117,borderLeft:0,borderTop:0,display:"flex",flexDirection:"column"}}><div>제조 판매처</div><div>의견</div></Box>
                                    <InputBox style={{height:(14.142)*per*1.33, width:myWidth*0.746,borderTop:0}}></InputBox>
                                </InView>
                                <InView>
                                    <Box style={{height:(14.142)*per*1.34, width:myWidth*0.117,borderLeft:0,borderTop:0}}>심의의견</Box>
                                    <InputBox style={{height:(14.142)*per*1.34, width:myWidth*0.746,borderTop:0}}></InputBox>
                                </InView>
                                
                                
                            </div>
                        </PrView>
                    </RequestBox>
                </div>
            </div>
    )
 };

function RequestForm(){
    const componentRef = useRef(null);
    const router = useRouter()

    const [windowWidth,setWindowWidth] = useState()
    const [windowHeight,setWindowHeight] = useState()
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    let request;

    if(router.query.data){
        request = (
            <Request printRef={componentRef} queryData={router.query.data} userName={router.query.userName} headquarterId={router.query.headquarterId} windowWidth={windowWidth} windowHeight={windowHeight} />
        )
    }
    useEffect(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return(
        <div style={{backgroundColor: COLOR.GRAY,display:"flex",justifyContent:"center" ,width:windowWidth,height:windowHeight,overflow:"scroll"}}>
            <ReactToPrint trigger={() => <button style={{position:"absolute",right:30,top:10}}>프린트</button>} content={() => componentRef.current} />

            <form style={{marginTop:200}}>
                {
                    request
                }
            </form>
        </div>
    )
}
export default RequestForm
const RequestBox = styled.div`
    width : 98%;
    height : 98%;
`;
const CenterDiv= styled.div`
    justify-content :center;
    align-items : center;
    display:flex;
`;
const Box = styled.div`
    justify-content :center;
    align-items : center;
    display:flex;
    border:2px solid;
`;
const InputBox = styled.input`
    justify-content :center;
    align-items : center;
    padding:10px;
    border: 2px solid;
    border-left :0px;
    outline: none;
`;
const Img = styled.img`
    width : 45px;
    height : 45px;
`;
const InputText = styled.textarea`
    border: 2px solid;
    border-left :0px;
    resize: none;
    outline: none;
`;
const SimbolBox = styled.div`
    align-items : center;
    display: flex;
    flex-direction: column;
    justify-content :center;
    align-items : center;
    border:2px solid;
`;
const PrView = styled.div`
  display: flex;  
  align-items:center;
`;
const InView = styled.div`
  display: flex;  
`;