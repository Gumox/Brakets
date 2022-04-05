import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import COLOR from "../../constants/color";

function SelectImageModal({overallImg,imageData,needImageData}){
    const [mainImage, setMainImage] = useState(`http://34.64.182.76${overallImg}`)

    
    let repairStoreName = '수선 전'
    let repairStoreNameCheck =true

    let registNeedStoreName = ''
    let registNeedStoreNameCheck =true
    
    
    const [windowWidth,setWindowWidth] =  useState()
    const [windowHeight ,setWindowHeight] =  useState()

    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    },1000)

    const checkRepairStoreName=(v)=>{
        if(repairStoreName === '수선 전'){
            if(v.repair_store_name){
                repairStoreName = v.repair_store_name
                repairStoreNameCheck = true
            }else{
                
            repairStoreNameCheck = false
            }
        }else if(repairStoreName === v.repair_store_name ){
            repairStoreNameCheck = false
            repairStoreName = '수선 전'
        }

    }

    const checkNeedRepairStoreName=(v)=>{
        if(registNeedStoreName === ''){
            registNeedStoreName=v.store_name
            registNeedStoreNameCheck = true
        }else if(registNeedStoreName === v.store_name ){
            registNeedStoreNameCheck = false
            registNeedStoreName = ''
        }

    }

    useEffect(()=>{
        setWindowWidth(window.innerWidth*0.9);
        setWindowHeight(window.innerHeight*0.8);
        
        
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return(
        <MainView>
            <LeftSideView>
            <img
                    key={overallImg}
                    src={mainImage}
                    alt={""}
                    layout="fixed"
                    width={`${(windowHeight*0.9/4)*3}px`}
                    height={`${windowHeight*0.9}px`}
                />
            </LeftSideView>            
            <RightSideView >
                <ImgViewTitle>
                전체이미지
                </ImgViewTitle>
                <OverallImgWrapper>
                    <OverallImgView onClick={()=>{setMainImage(`http://34.64.182.76${overallImg}`)}}>
                        <img
                            key={overallImg}
                            src={`http://34.64.182.76${overallImg}`}
                            alt={""}
                            layout="fixed"
                            width="150px"
                            height="200px"
                        />
                    </OverallImgView>
                </OverallImgWrapper>

            <RepairImgWrapper>
                {
                imageData.map((v, i) =>{
                    checkRepairStoreName(v)
                    return(
                        <div>
                            
                            {
                                repairStoreNameCheck ?
                                <ImgViewSubTitle style={{marginTop:15}}>
                                수선처 : {repairStoreName}
                                </ImgViewSubTitle>
                                :(
                                    i==0
                                    ? 
                                    <ImgViewSubTitle style={{marginTop:15}}>
                                        수선처 : {repairStoreName}
                                    </ImgViewSubTitle>
                                    :null
                                 )
                            }
                        <ImgCardDiv>
                            <ImgCardView>
                            
                                <RepairImgView  onClick={()=>{setMainImage(`http://34.64.182.76${v.before_image}`)}}>
                                    <img
                                    key={i}
                                    src={`http://34.64.182.76${v.before_image}`}
                                    alt={""}
                                    layout="fixed"
                                    width="120px"
                                    height="160px"
    
                                    />
                                </RepairImgView>
                                <ImgViewSubTitle>
                                수선 전 
                                </ImgViewSubTitle>
    
    
                            </ImgCardView>
    
                            
    
                            {v.after_image&&(<ImgCardView>
                                <RepairImgView  onClick={()=>{setMainImage(`http://34.64.182.76${v.after_image}`)}}>
                                    <img
                                    key={i}
                                    src={`http://34.64.182.76${v.after_image}`}
                                    alt={""}
                                    layout="fixed"
                                    width="120px"
                                    height="160px"
    
                                    />
                                </RepairImgView>
                                <ImgViewSubTitle>
                                    수선 후
                                </ImgViewSubTitle> 
                            </ImgCardView>)}
                        </ImgCardDiv>
                        </div>
    
                        
                    )
                })}
            </RepairImgWrapper>

            {needImageData[0]
                &&(<RepairImgWrapper>
                        <ImgViewSubTitle style={{marginTop:15}}>
                                추가 수선 필요 부위
                        </ImgViewSubTitle>
                    {
                    needImageData.map((v, i) =>{
                        checkNeedRepairStoreName(v)
                        return(
                            (
                                <div>
                                    
                                    {registNeedStoreNameCheck&&(
                                        <ImgViewSubTitle style={{marginTop:15}}>
                                            등록 수선처 : {v.store_name}
                                        </ImgViewSubTitle>
                                    )}
                                    <ImgCardDiv>
                                        <ImgCardView>
                                        
                                        <RepairImgView  onClick={()=>{setMainImage(`http://34.64.182.76${v.need_point_image}`)}}>
                                                <img
                                                key={i}
                                                src={`http://34.64.182.76${v.need_point_image}`}
                                                alt={""}
                                                layout="fixed"
                                                width="120px"
                                                height="160px"
                
                                                />
                                            </RepairImgView>
                                            <ImgViewSubTitle>
                                            </ImgViewSubTitle>
                
                
                                        </ImgCardView>
                
                                    </ImgCardDiv>
                                </div>
            
                                
                            )
                        )
                    })}
                </RepairImgWrapper>)
            }
             

            </RightSideView>
        </MainView>
    )
}

export default SelectImageModal

const MainView = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    justify-content:space-between;
    flex-direction:row;
`;
const LeftSideView =  styled.div`

    display: flex;
    justify-content:center;
    align-items:center;
    width: 70%;
`;
const RightSideView =  styled.div`

    display: flex;
    flex-direction:column;
    overflow: auto;
    width: 30%;
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
const ImgCardDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`

const ImgCardView = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    border-radius: 10px;
    margin:5px;

    &:hover {
    background-color: rgba(123,123,123,0.5)};
    }
`
const ImgViewTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin: 25px;
`;

const ImgViewSubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 5px;
`;





const OverallImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverallImgView = styled.div`
  border: 2px solid;
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: rgba(123,123,123,0.5)};
  }
`;


const RepairImgView = styled.div`
  padding: 10px;
  width: fit-content;

`

const RepairImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
