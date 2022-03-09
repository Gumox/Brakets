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

const Reception = ({
  targetBrandId,
  setTargetBrandId,
  inputData, // 조회 조건
  searchList, // 검색 결과 List
  targetData, // 선택한 Receipt 내용
  handleChangeInputData, // 조회 조건 수정
  handleChangeTargetData, // Receipt 내용 수정
  handleChangeTargetDataResultDetail,
  handleChangeTargetDataPrice,
  searchReceipts, // List 조회
  getTargetData, // Receipt 조회
  imageData
}) => {
  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);
  const openProductImage = useCallback(
    () => setIsProductImageModalOpen(true),
    []
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
          <BasicInfo {...{ targetBrandId, setTargetBrandId, getTargetData }} />
          <FilterInfo
            {...{ inputData,searchList, handleChangeInputData, searchReceipts }}
          />
          <Section>
            <ProducInfo {...{ targetData, handleChangeTargetData, openProductImage }} />
            <StoreInfo
              {...{ targetData, handleChangeTargetData, openReceiptImage, imageData }}
            />
          </Section>
          <Section>
            <DetailInfo {...{ targetData, handleChangeTargetData }} />
            <ReceiptInfo {...{ targetData, handleChangeTargetData ,handleChangeTargetDataResultDetail,handleChangeTargetDataPrice}} />
          </Section>
        </InfoSubWrapper>
      </InfoWrapper>

      <ResizableList {...{ searchList, getTargetData }} />
      {/* <List {...{ searchList, getTargetData }} /> */}
      {isProductImageModalOpen && (
        <Modal handleCloseButtonClick={closeProductImage}>
          {
            <Image
              src={targetData[PRODUCT.IMAGE]}
              alt={targetData[PRODUCT.STYLE]}
              layout="fill"
              objectFit="contain"
            />
          }
        </Modal>
      )}

      {/* --------------------------------------------- */}
      {isReceiptImageModalOpen && (
        <Modal handleCloseButtonClick={closeReceiptImage}>
          <div>
            <text> 수선 전 이미지 </text>
            <Image
              src={`http://34.64.182.76:8080${imageData[0].before_image}`}
              alt={""}
              layout="fixed"
              objectFit="contain"
              width="300px"
              height="300px"
            />
          </div>
          {(
            imageData[0].after_image !== null
            ) ? (
            <div>
              <text> 수선 후 이미지 </text>
              <Image 
                src={`http://34.64.182.76:8080${imageData[0].after_image}`}
                alt={""}
                layout="fixed"
                objectFit="contain"
                width="300px"
                height="300px"
              />
            </div>
              ) : (
              <>
              </>
            )}
          
        </Modal>
      )}
      {/* --------------------------------------------- */}
    </Content>
  );
};

const InfoWrapper = styled.div`
  height: 65%;
  overflow: scroll;
`;

const InfoSubWrapper = styled.div`
  min-width: 1590px;
`;

const Section = styled.div`
  display: flex;
`;

export default Reception;
