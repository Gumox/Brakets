import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { DATE_SEARCH_TYPE_OPTIONS } from "../../constants/select-option";

import Content from "../Content";
import Modal from "../Modal";
import Info from "./info";
import List from "./list";
import { PRODUCT } from "../../constants/field";

const Reception = ({ options, user }) => {
  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);
  const openProductImage = useCallback(
    () => setIsProductImageModalOpen(true),
    []
  );
  const closeProductImage = useCallback(
    () => setIsProductImageModalOpen(false),
    []
  );
  const [targetBrandId, setTargetBrandId] = useState(options.brandList[0].value);
  const [inputData, setInputData] = useState({
    brandId: options.brandList[0].value,
    storeName: options.storeList[0].value,
    season: options.seasonList[0].value,
    dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
    dateType: "all",
  });
  const [targetReceiptData, setTargetReceiptData] = useState({});
  const [targetMfrtData, setTargetMfrData] = useState({});
  const [targetRepairData, setTargetRepairData] = useState([]);

  const [searchList, setSearchList] = useState([]);
  const handleInputCheckboxChange = useCallback(
    (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [inputData]
  );
  const handleInputValueChange = useCallback(
    (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData]
  );
  const handleTargetCheckboxChange = useCallback(
    (e) => {
      console.log(e.target)
      setTargetReceiptData({ ...targetReceiptData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [targetReceiptData]
  );
  const handleTargetValueChange = useCallback(
    (e) => {
      setTargetReceiptData({ ...targetReceiptData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetReceiptData]
  );
  const handleSearchButtonClick = useCallback(() => {
    axios
      .get("/api/receipt", { params: inputData })
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback((receiptId) => {
    axios
      .get(`/api/receipt/${receiptId}`)
      .then((response) => setTargetReceiptData({...response.data.data}));
    axios
      .get(`/api/receipt/manufacturer/${receiptId}`)
      .then((response) => setTargetMfrData({...response.data.data}));
    axios
      .get(`/api/receipt/repair/${receiptId}`)
      .then((response) => setTargetRepairData(response.data.data));
  }, []);

  useEffect(() => console.log(targetReceiptData), [targetReceiptData]);
  return (
    <Content>
      <Info
        options={options}
        inputData={inputData}
        data={targetReceiptData}
        repairData={targetRepairData}
        mfrData={targetMfrtData}
        {...{
          handleInputCheckboxChange,
          handleInputValueChange,
          handleTargetValueChange,
          handleTargetCheckboxChange,
          handleSearchButtonClick,
        }}
        handleProductImageClick={openProductImage}
        handleCodeEnter={searchTargetData}
      />
      <List data={searchList} handleDataClick={searchTargetData} />
      {isProductImageModalOpen && (
        <Modal handleCloseButtonClick={closeProductImage}>
          {
            <Image
              src={targetReceiptData[PRODUCT.IMAGE]}
              alt={targetReceiptData[PRODUCT.STYLE]}
              layout="fill"
              objectFit="contain"
            />
          }
        </Modal>
      )}
    </Content>
  );
};

export default Reception;
