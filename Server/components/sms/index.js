import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";
import List from './list'
import Send from './sendingMessage'


const Sms = ({}) => {


  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);
  const openProductImage = useCallback(
    () => setIsProductImageModalOpen(true),
    []
  );
  const closeProductImage = useCallback(
    () => setIsProductImageModalOpen(false),
    []
  );
  const [inputData, setInputData] = useState({});
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
      .get("/api/receipt", { 
        params: {
          ...inputData,
          dateType: inputData["isMonthly"]? "month": "all",
          dateOption: 'return_date',
          resultId: 4
        } 
      })
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback((receiptCode) => {
    axios
      .get(`/api/receipt/${receiptCode}`)
      .then((response) => setTargetData(response.data.data));
  }, []);

  useEffect(() => 
  // console.log(targetData)
  [targetData]);

  return (
    <Wrapper>
      <List data={searchList}/>
      <Send/>
    </Wrapper>    
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 10px;
  /* padding: 10px; */
  border: 2px solid;

  
`;

export default Sms;
