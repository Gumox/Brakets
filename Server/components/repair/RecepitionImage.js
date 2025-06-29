
import React,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import Modal from "./Modal";
import 'reactjs-popup/dist/index.css';
import { debounce } from "lodash";

function RecepitionImage (props) {
  const el =props.item;

  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);
  const closeProductImage = useCallback(
    () => setIsProductImageModalOpen(false),
    []
  );
  
  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)

 
  useEffect( () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    window.addEventListener('resize',handleResize);
    return ()=>{
        window.removeEventListener('resize',handleResize);
    }
  },[]);
  return (
    <div>
      <ItemBox onClick={()=>{setIsProductImageModalOpen(true)}}>
          <ItemView style={{backgroundColor:props.color}}>{el.name}</ItemView>
          <DetailImg 
            src={el.image}
            width={((windowHeight)*0.9-20)/8}
            height={((windowHeight)*0.9-550)/2}
            alt={el.name}
          />
      </ItemBox>
      {isProductImageModalOpen && (
        <Modal handleCloseButtonClick={closeProductImage} width={windowHeight}>
          {
            <DetailImg
              src={el.image}
              alt={el.name}
              style={{marginTop:10}}
              width={windowHeight*0.22*3}
              height={windowHeight*0.22*4}
              objectFit="contain"
            />
          }
        </Modal>
      )}
    </div>
    
    
  );
  
};

export default RecepitionImage;

const DetailImg = styled.img`
`;

const ItemView = styled.div`
  font-size :12px;
  display: flex;  
  justify-content:center;
  `;
const ItemBox =styled.div`
  margin-left:10px;
  margin-right:10px;
  flex:1;
  cursor: pointer;
  height : 42px;
  
`;