
import React,{useEffect,useState} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import formatDate from "../../functions/formatDate";
import image from 'next/image';
import { debounce } from "lodash";

function RecepitionImage (props) {
  const el =props.item;
  const imageList = props.images;
  const [windowWidth,setWindowWidth] = useState()
  const [windowHeight,setWindowHeight] = useState()
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)

  let images= [];
  imageList.forEach((obj) => {
    if(obj.receipt_id === el.receipt_id){
      images.push(obj)
    }
  });

  let date = formatDate(new Date(el.receipt_date))
 
  useEffect( () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    window.addEventListener('resize',handleResize);
    return ()=>{
        window.removeEventListener('resize',handleResize);
    }
  },[]);
  return (
    <div suppressHydrationWarning={true}>
       {process.browser &&
    <Popup  
      trigger={
        <div>
            <ItemView>{el}</ItemView>
            <ItemView>{date}</ItemView>
        </div>
      }  
      modal
      contentStyle={{ 
        width: windowWidth*0.9,
        height:windowHeight*0.5,
        backgroundColor:"#32FF32"}}>
      
        
    </Popup>
    }
    </div>
    
  );
  
};

export default RecepitionImage;

const DetailImg = styled.img`
  width:270px;
  height:480px;
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center
  `;