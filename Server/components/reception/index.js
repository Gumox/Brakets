import React, { useState, useCallback, useEffect, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";

import Content from "../Content";
import Modal from "../Modal";
import BasicInfo from "./Basic";
import DetailInfo from "./Detail";
import FilterInfo from "./Filter";
import ProducInfo from "./Product";
import ReceiptInfo from "./Receipt";
import StoreInfo from "./Store";
import List from "./List";
import ResizableList from "./ResizableList";
import { PRODUCT, RECEIPT } from "../../constants/field";
import SelectImageModal from "./SelectImageModal";
import ImageModal from "../ImageModal";

import { symlink } from "fs";

const Reception = ({
  targetBrandId,
  setTargetBrandId,
  setInputData,
  inputData, // 조회 조건
  searchList, // 검색 결과 List
  targetData, // 선택한 Receipt 내용
  handleChangeInputData, // 조회 조건 수정
  handleChangeTargetData, // Receipt 내용 수정
  handleChangeTargetDataResultDetail,
  handleChangeRegisterDate,
  handleChangeTargetDataPrice,
  searchReceipts, // List 조회
  getTargetData, // Receipt 조회
  imageData,
  needImageData,
  overallImg,
  searchCode
}) => {
  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);
  const openProductImage = useCallback(
    () => {
      setIsProductImageModalOpen(true)
    }
    ,[]
  );
  const closeProductImage = useCallback(
    () => setIsProductImageModalOpen(false),
    []
  );
  const [isReceiptImageModalOpen, setIsReceiptImageModalOpen] = useState(false);
  const openReceiptImage = useCallback(
    () => setIsReceiptImageModalOpen(true),
    []
  );
  const closeReceiptImage = useCallback(
    () => setIsReceiptImageModalOpen(false),
    []
  );




  return (
    <Content>
      <InfoWrapper>
        <InfoSubWrapper>
          <BasicInfo {...{ targetBrandId, setTargetBrandId, getTargetData, handleChangeInputData, searchReceipts, searchCode }} />
          <FilterInfo
            {...{ targetBrandId, setInputData, inputData, searchList, handleChangeInputData, searchReceipts }}
          />
          <Section>
            <ProducInfo {...{ targetData, handleChangeTargetData, openProductImage }} />
            <StoreInfo
              {...{ targetData, handleChangeTargetData, openReceiptImage, imageData }}
            />
          </Section>
          <Section>
            <DetailInfo {...{ targetData, handleChangeTargetData }} />
            <ReceiptInfo {...{ targetData, handleChangeTargetData, handleChangeRegisterDate, handleChangeTargetDataResultDetail, handleChangeTargetDataPrice }} />
          </Section>
        </InfoSubWrapper>
      </InfoWrapper>

      <ResizableList {...{ searchList, getTargetData ,targetData}} />
      {isProductImageModalOpen && (
        <ImageModal handleCloseButtonClick={closeProductImage}>
          {
            <ProductImage
              src={targetData[PRODUCT.IMAGE]}
              alt={targetData[PRODUCT.STYLE]}
              layout="fill"
              objectFit="contain"
            />
          }
        </ImageModal>
      )}
      {/* TODO */}
      {isReceiptImageModalOpen && (
        <Modal handleCloseButtonClick={closeReceiptImage}>
          
          <SelectImageModal overallImg={overallImg} imageData={imageData} needImageData={needImageData}>
            
          </SelectImageModal>
          
        </Modal>
      )}
    </Content>
  );
};

const InfoWrapper = styled.nav`
  overflow: scroll;
  height: 65%;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;

const InfoSubWrapper = styled.div`
  min-width: 1650px;
`;

const Section = styled.div`
  display: flex;
`;

const ProductImage = styled.img`

`;





export default Reception;