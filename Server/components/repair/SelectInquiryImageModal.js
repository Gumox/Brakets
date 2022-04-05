import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import store from '../../store/store'
import COLOR from "../../constants/color";

function SelectInquiryImageModal({overallImg,imageData,needImageData}){
    console.log(overallImg)
    const [mainImage, setMainImage] = useState()

    const [shop,setShop] = useState(store.getState().shop)
    
    
    const [windowWidth,setWindowWidth] =  useState()
    const [windowHeight ,setWindowHeight] =  useState()

    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth*0.9);
        setWindowHeight(window.innerHeight*0.9);
    },1000)

    
  

   
    let toDoRepairImage = []
        let registedNeedImage = []

        imageData.map((item)=>{
        
            if(item.after_image && item.after_store_id == shop){
                toDoRepairImage.push(item)
            }else if(item.after_image === null){
                toDoRepairImage.push(item)
            }
        })

        needImageData.map((item)=>{
            if(item.store_id == shop){
                registedNeedImage.push(item)
    
            }
        })

    useEffect(()=>{
        setShop(localStorage.getItem('SHOP'))

        
        setWindowWidth(window.innerWidth*0.9);
        setWindowHeight(window.innerHeight*0.8*0.9);
        
        
        window.addEventListener('resize',handleResize);
        if(overallImg){
            setMainImage(`http://34.64.182.76${overallImg}`)
        }
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
            <RightSideView style={{paddingTop:40}}>
                <ImgCardDiv>
                    <ImgCardView>
                        
                        <RepairImgView  onClick={()=>{setMainImage(`http://34.64.182.76${overallImg}`)}}>
                            <img
                            src={`http://34.64.182.76${overallImg}`}
                            alt={""}
                            layout="fixed"
                            width="150px"
                            height="200px"

                            />
                        </RepairImgView>
                        <ImgViewSubTitle>
                        전체이미지
                        </ImgViewSubTitle>


                        </ImgCardView>
                </ImgCardDiv>
            <RepairImgWrapper>
            {
                toDoRepairImage.map((v, i) =>{
                    return(
                        <div>
                            
                            
                        <ImgCardDiv key={i}>
                            <ImgCardView>
                            
                                <RepairImgView  onClick={()=>{setMainImage(`http://34.64.182.76${v.before_image}`)}}>
                                    <img
                                    src={`http://34.64.182.76${v.before_image}`}
                                    alt={""}
                                    layout="fixed"
                                    width="120px"
                                    height="160px"
    
                                    />
                                </RepairImgView>
                                <ImgViewSubTitle>
                                수선 전 {i+1}
                                </ImgViewSubTitle>
    
    
                            </ImgCardView>
    
                            
    
                            {v.after_image&&(<ImgCardView>
                                <RepairImgView  onClick={()=>{setMainImage(`http://34.64.182.76${v.after_image}`)}}>
                                    <img
                                    src={`http://34.64.182.76${v.after_image}`}
                                    alt={""}
                                    layout="fixed"
                                    width="120px"
                                    height="160px"
    
                                    />
                                </RepairImgView>
                                <ImgViewSubTitle>
                                    수선 후 {i+1}
                                </ImgViewSubTitle> 
                            </ImgCardView>)}
                        </ImgCardDiv>
                        </div>
    
                        
                    )
                })}
            </RepairImgWrapper>

            {registedNeedImage.length>0
                &&(<RepairImgWrapper>
                        <ImgViewSubTitle style={{marginTop:15}}>
                                추가 수선 필요 부위
                        </ImgViewSubTitle>
                    {
                    needImageData.map((v, i) =>{
                        return(
                            (
                                <div>
                                    
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

export default SelectInquiryImageModal

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
    background-color:${COLOR.WHITE};

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
  background-color:${COLOR.WHITE};

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
