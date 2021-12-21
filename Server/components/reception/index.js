import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { DATE_SEARCH_TYPE_OPTIONS } from "../../constants/select-option";

import Content from "../Content";
import Modal from "../Modal";
import Info from "./info";
import List from "./list";
import { PRODUCT, RECEIPT } from "../../constants/field";

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
  const [inputData, setInputData] = useState({
    brandId: options.brandList[0].value,
    storeName: options.storeList[0].value,
    season: options.seasonList[0].value,
    dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
    dateType: "all",
  });
  const [targetData, setTargetData] = useState({});
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
      setTargetData({ ...targetData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [targetData]
  );
  const handleTargetValueChange = useCallback(
    (e) => {
      setTargetData({ ...targetData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetData]
  );
  const handleSearchButtonClick = useCallback(() => {
    axios
      .get("/api/receipt", { params: inputData })
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback((receiptCode) => {
    axios
      .get(`/api/receipt/${receiptCode}`)
      .then((response) => setTargetData({...response.data.data}));
  }, []);

  useEffect(() => console.log(targetData), [targetData]);
  return (
    <Content>
      <Info
        options={options}
        inputData={inputData}
        data={targetData}
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
              src={targetData[PRODUCT.IMAGE]}
              alt={targetData[PRODUCT.STYLE]}
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
