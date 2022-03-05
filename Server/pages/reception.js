import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { UserContext, OptionContext } from "../store/Context";
import { getThisSeason, getCurrentSeasons } from "../utils/season";
import {
  SEASON_OPTIONS,
  DATE_SEARCH_TYPE_OPTIONS,
} from "../constants/select-option";

import { RECEIPT } from "../constants/field";
import Header from "../components/Header";
import Reception from "../components/reception";
import formatDate from "../functions/formatDate";

const ReceptionPage = ({ options, user }) => {
  const router = useRouter();
  const [selectOptions, setSelectOptions] = useState(options); // 전체 페이지에서 사용하는 select options
  const [targetBrandId, setTargetBrandId] = useState(options.brandList[0].value); // brandlist 중 첫번째 항목

  // Filter 입력 데이터
  const [inputData, setInputData] = useState({
    dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
    dateType: "all",
  });
  const [searchList, setSearchList] = useState([]); // 검색 결과 리스트
  const [targetData, setTargetData] = useState({}); // 리스트에서 선택한 데이터
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    console.log(user)
    const getOptions = async () => {
      const [stores, productCategories, seasons] = await Promise.all([
        axios
          .get(`${process.env.API_URL}/store/1`, {
            params: { brandId: targetBrandId },
          })
          .then(({ data }) => data), // 매장
        axios
          .get(`${process.env.API_URL}/type/product-category`, {
            params: { brandId: targetBrandId },
          })
          .then(({ data }) => data), // 제품구분
        axios
          .get(`${process.env.API_URL}/product/season`, {
            params: { brandId: targetBrandId },
          })
          .then(({ data }) => data), // 시즌
      ]);

      // 브랜드가 바뀌면 전체 페이지가 초기화
      setInputData({
        dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
        dateType: "all",
      });
      setSearchList([]);
      setTargetData({});
      setSelectOptions({
        ...selectOptions,
        storeList: stores ? stores.data : [],
        productCategoryList: productCategories ? productCategories.data : [],
        seasonList: seasons ? seasons.data : [],
      });
    };

    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetBrandId]);

  const handleChangeInputData = useCallback(
    (e) => {
      switch (e.target.type) {
        case "checkbox":
        case "radio":
          setInputData({ ...inputData, [e.target.name]: e.target.checked });
          break;
        default:
          setInputData({ ...inputData, [e.target.name]: e.target.value });
      }
    },
    [inputData]
  );
  const handleChangeTargetData = useCallback(
    (e) => {
      switch (e.target.type) {
        case "checkbox":
        case "date":
          setTargetData({ ...targetData, [e.target.name]: formatDate(new Date(e.target.value)) });
          break;
        case "radio":
          setTargetData({ ...targetData, [e.target.name]: e.target.checked });
          break;
        default:
          setTargetData({ ...targetData, [e.target.name]: e.target.value });
      }
    },
    [targetData]
  );
  const handleChangeTargetDataResultDetail = useCallback(
    (e) => {
      if(e.target.value ==targetData[e.target.name]){
        setTargetData({ ...targetData, [e.target.name]: 0 });
      }else{
        setTargetData({ ...targetData, [e.target.name]: e.target.value });
      }
    },
    [targetData]
  );
  const handleChangeTargetDataPrice = useCallback(
    (e,data) => {
      if(RECEIPT.CLAIM == e.target.name){
        setTargetData({ ...targetData, [RECEIPT.CLAIM_PRICE]: data });
      }
      else if(RECEIPT.DISCOUNT == e.target.name){
        setTargetData({ ...targetData, [RECEIPT.DISCOUNT_PRICE]: data });
      }
    },
    [targetData]
  );

  const searchReceipts = useCallback(async () => {
    const { data } = await axios.get("/api/receipt", {
      params: { ...inputData, brandId: targetBrandId },
    });
    setSearchList(data.data);
  }, [inputData, targetBrandId]);
  const getTargetData = useCallback(async (receiptCode) => {
    const { data } = await axios.get(`/api/receipt/${receiptCode}`);
    setImageData(data.imageList);
    setTargetData(data.data);
  }, []);
  
  console.log(targetData)
  return (
    <UserContext.Provider value={user}>
      <Header path={router.pathname} />
      <OptionContext.Provider value={selectOptions}>
        <Reception
          {...{ targetBrandId, inputData, searchList, targetData }}
          {...{
            setTargetBrandId,
            handleChangeInputData,
            handleChangeTargetData,
            handleChangeTargetDataResultDetail,
            handleChangeTargetDataPrice,
            searchReceipts,
            getTargetData,
            imageData
          }}
        />
      </OptionContext.Provider>
    </UserContext.Provider>
  );
};

export const getServerSideProps = async (ctx) => {
  const {
    data: { isAuthorized, user },
  } = await axios.get(
    `${process.env.API_URL}/auth`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie || {},
          },
        }
      : {}
  );
  if (!isAuthorized) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const { headquarter_id: headquarterId } = user;

  const [brands, repairShops, producers, faults, analysis, results, repairs] =
    await Promise.all([
      axios
        .get(`${process.env.API_URL}/brand`, { params: { headquarterId } })
        .then(({ data }) => data), // 브랜드
      axios
        .get(`${process.env.API_URL}/store/2`, {
          params: { brandId: headquarterId },
        })
        .then(({ data }) => data), // 수선처
      axios.get(`${process.env.API_URL}/store/3`).then(({ data }) => data), // 생산업체
      axios
        .get(`${process.env.API_URL}/faultDivision`, {
          params: {hq_id: "2"}
        })
        .then(({ data }) => data), // 과실구분
      axios
        .get(`${process.env.API_URL}/analysisType`, {
          params: {hq_id: "2"}
        })
        .then(
          ({ data }) => data), // 내용분석
      axios
        .get(`${process.env.API_URL}/judgmentResult`, {
          params: {hq_id: "2"}
        })
        .then(({ data }) => data), // 판정결과

        // TODO: 수선내용 api
      axios
        .get(`${process.env.API_URL}/type/repair`, {
          params: { headquarterId },
        })
        .then(({ data }) => data), // 수선내용
    ]);
  return {
    props: {
      user,
      options: {
        brandList: brands ? brands.data : [],
        storeList: [], // 브랜드에 따라서 달라짐
        productCategoryList: [], // 브랜드에 따라서 달라짐
        repairList: repairShops ? repairShops.data : [],
        producerList: producers ? producers.data : [],
        faultType: faults ? faults.body: [],
        analysisType: analysis ? analysis.body: [],
        resultType: results ? results.body: [],
        repairType: repairs ? repairs.data: [],
        seasonList: [],
      },
    },
  };
};

export default ReceptionPage;
