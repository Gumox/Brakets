import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";

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
import store from "../store/store";


const ReceptionPage = ({ options, user }) => {
  const router = useRouter();
  const [receptionPageoptions,setReceptionPageoptions] = useState(options)
  
  
  const [selectOptions, setSelectOptions] = useState(options); // 전체 페이지에서 사용하는 select options
  const [targetBrandId, setTargetBrandId] = useState(); // brandlist 중 첫번째 항목
  // Filter 입력 데이터
  const first = moment().format("YYYY-MM-01")
  const [inputData, setInputData] = useState({
    dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
    dateType: "all",
    startDate: first
  });
  const [searchList, setSearchList] = useState([]); // 검색 결과 리스트
  const [targetData, setTargetData] = useState({}); // 리스트에서 선택한 데이터
  const [overallImg, setOverallImg] = useState('');
  const [imageData, setImageData] = useState({});
  const [needImageData, setNeedImageData] = useState({});

  console.log(inputData)

  useEffect(()=>{
    if(user.level === 5 ){
      let adminOptions = JSON.parse(sessionStorage.getItem("ADMIN_OPTIONS")).options
      setReceptionPageoptions(adminOptions)
      
      setSelectOptions(adminOptions)
      setTargetBrandId(adminOptions.brandList[0].value)
    }else{
      setSelectOptions(receptionPageoptions)
      setTargetBrandId(receptionPageoptions.brandList[0].value)
    }
  },[])
  useEffect(() => {
    
    const getOptions = async () => {
      console.log(targetBrandId)
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
      
      const first = moment().format("YYYY-MM-01")
      console.log("startDate: ",imageData["startDate"])
      setInputData({
        dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
        dateType: "all",
        startDate: first
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
  const handleChangeRegisterDate = useCallback(
    (name,value) => {
      setTargetData({ ...targetData, [name]: value });
    },
    [targetData]
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
        setTargetData({ ...targetData, claim: e.target.value,claim_price: data });
      }
      else if(RECEIPT.DISCOUNT == e.target.name){
        setTargetData({ ...targetData, [RECEIPT.DISCOUNT_PRICE]: data });
        setTargetData({ ...targetData, discount: e.target.value, discount_price: data });
      }

      
    },
    [targetData]
  );

  const searchReceipts = useCallback(async () => {
    console.log(inputData)
    const { data } = await axios.get("/api/receipt", {
      params: { ...inputData, brandId: targetBrandId },
    });
    setSearchList(data.data);
  }, [inputData, targetBrandId]);

  const searchCode = useCallback(async (serviceCardId) => {
    const { data } = await axios.get("/api/receipt", {
      params: { brandId: targetBrandId, serviceCardId: serviceCardId },
    });
    setSearchList(data.data);
  }, []);


  const getTargetData = useCallback(async (receiptCode) => {
    const { data } = await axios.get(`/api/receipt/${receiptCode}`);
    if(data == ""){
      alert("정확한 서비스 카드 번호를 입력하세요.")
    }
    setOverallImg(data.data.image)
    setImageData(data.imageList);
    setNeedImageData(data.needImageList)
    setTargetData(data.data);
  }, []);

 

  return (
    <UserContext.Provider value={user}>
      <Header path={router.pathname} />
      <OptionContext.Provider value={selectOptions}>
        <Reception
          {...{ targetBrandId, inputData, searchList, targetData, searchCode }}
          {...{
            setTargetBrandId,
            setInputData,
            handleChangeInputData,
            handleChangeTargetData,
            handleChangeTargetDataResultDetail,
            handleChangeRegisterDate,
            handleChangeTargetDataPrice,
            searchReceipts,
            getTargetData,
            imageData,
            needImageData,
            overallImg
          }}
        />
      </OptionContext.Provider>
    </UserContext.Provider>
  );
};

export const getServerSideProps = async (ctx) => {
  console.log("ctx")
  console.log("/reception")
  console.log("ctx")
  console.log(ctx.req.headers)
  console.log("ctx")
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
  if(user.level<2){
    const [brands, repairShops, producers, faults, analysis, results, repairs] =
      await Promise.all([
        axios
          .get(`${process.env.API_URL}/brand`, { params: { headquarterId:headquarterId } })
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
  }else if(user.level === 5){
    return {
      props: {
        user,
        options: {
          brandList:[],
          storeList: [], // 브랜드에 따라서 달라짐
          productCategoryList: [], // 브랜드에 따라서 달라짐
          repairList:  [],
          producerList: [],
          faultType:  [],
          analysisType: [],
          resultType: [],
          repairType: [],
          seasonList: [],
        },
      }
    }
  }else{
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default ReceptionPage;
