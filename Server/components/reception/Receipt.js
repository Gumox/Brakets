import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import moment from "moment";
import {
  OptionContext,
  ReceiptContext,
  RepairContext,
  ManufacturerContext,
  UserContext,
} from "../../store/Context";
import COLOR from "../../constants/color";
import { OPTIONS, DEFAULT_OPTION } from "../../constants/select-option";
import { RECEIPT, REPAIR, MANUFACTURER, PRODUCT } from "../../constants/field";
import { Row, Field, Section, SectionRow } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";
import Link from 'next/link';
import axios from "axios";
import { getRepairShop } from "../../functions/getInfos";
import { getClaim ,getDiscount} from "../../functions/getClaim";
import ClaimModal from "./claimModal";
const ReceiptInfo = ({
  targetData = {},
  handleChangeTargetData = () => {},
  handleChangeRegisterDate = () =>{},
  handleChangeTargetDataResultDetail =() =>{},
  handleChangeTargetDataPrice=()=>{},
}) => {
  const { resultType, faultType, analysisType, repairList } =
    useContext(OptionContext);
  const {name,headquarter_id} = useContext(UserContext)

  const [isRepair, setIsRepiar] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [repairShop, setRepairShop] = useState([]);
  const resultTypeMap = useMemo(
    () =>
      resultType.reduce(
        (prev, cur) => ({ ...prev, [cur.value]: cur.text }),
        {}
      ),
    [resultType]
  );
  
  const inputSave = async(targetData,inputFlie)=>{
    const formData = new FormData();
    formData.append('deliberation', inputFlie[0]);
    formData.append('receiptId', targetData["receipt_id"]);
    formData.append('customerId', targetData["customer_id"]);
    
    const [data] = await Promise.all([
        axios
        .put(`${process.env.API_URL}/receipt/inputSave`, { body: targetData  })
        .then(({ data }) => data),
      ])
    
    const [inputPDF] = await Promise.all([
      axios
      .post(`${process.env.API_URL}/receipt/inputDeliberationResult`, formData)
      .then(({ data }) => data),
    ])
    window.location.reload();
      
  }
  const [discount, setDiscount] = useState();
  const [discountPrice, setDiscountPrice] = useState(targetData[RECEIPT.DISCOUNT_PRICE]);
  const [discountPriceDisable, setDiscountPriceDisable] = useState(true);
  
  const [claimPrice, setClaimPrice] = useState(targetData[RECEIPT.CLAIM_PRICE]);
  const [claimPriceDisable, setClaimPriceDisable] = useState(true);

  
  const [registerDate, setRegisterDate] = useState();
  const [minCompleteDate,setMinCompleteDate] = useState()
  const [completeDateChanged, setCompleteDateChanged] = useState(true);


  const getDiscountPrice =(value,e)=>{
    discouuntList.map((el)=>{
      if(value == el.value){
        if(el.text =='감가반품'){
          setDiscountPriceDisable(false)
        }else{
          setDiscountPriceDisable(true)
          setDiscountPrice(el.discount_value*(targetData[PRODUCT.TAG_PRICE]))
          handleChangeTargetDataPrice(e,el.discount_value*(targetData[PRODUCT.TAG_PRICE]))
        }
      }
    })
  }
  const getClaimPrice =(value,e)=>{
    claimList.map((el)=>{
      if(value == el.value){
        setClaimPriceDisable(true)
        if(el.claim_type=='택가'){
          setClaimPrice(el.claim_value*(targetData[PRODUCT.TAG_PRICE]))
          handleChangeTargetDataPrice(e,el.claim_value*(targetData[PRODUCT.TAG_PRICE]))
        }else if(el.claim_type=='원가'){
          setClaimPrice(el.claim_value*(targetData[PRODUCT.ORG_PRICE]))
          handleChangeTargetDataPrice(e,el.claim_value*(targetData[PRODUCT.ORG_PRICE]))
        }else{
          setClaimPriceDisable(false)
        }
      }
    })
    
  }
  const [inputFlieName,setInputFlieName]  = useState('');
  const [inputFlie,setInputFlie]  = useState([]);
  const [PDFfliePath,setPDFFliePath]  = useState([]);
  const [discouuntList,setDiscouuntList] = useState([]) 
  const [claimList,setClaimList] = useState([])
  

  const  setFile=(e)=> {
    // Get the details of the files
    ///console.log(e.target.files[0].name)
      console.log(e.target.files)
    if(e.target.files[0]){
      console.log(e.target.files[0].name)
      setInputFlieName(e.target.files[0].name)
      setInputFlie(e.target.files)
    }else{
      setInputFlieName('')
      setInputFlie()
    }
    
  }


  
  useEffect(() => {
    const fetch = async()=>{
      let list = await getRepairShop({repairShop:null})
      let claimList = await getClaim(headquarter_id)
      let discouuntList = await getDiscount(headquarter_id)

      setRepairShop(list)
      setClaimList(claimList)
      setDiscouuntList(discouuntList)
    }
    fetch();
    if(targetData[RECEIPT.DELIBERATION_RESULT]){
      let words = String(targetData[RECEIPT.DELIBERATION_RESULT]).split("/")
      
      setInputFlieName(words[words.length-1])
      setPDFFliePath(targetData[RECEIPT.DELIBERATION_RESULT])
    }else{
      
      setInputFlieName([])
      setPDFFliePath([])
      
    }
    if (!resultTypeMap[targetData[RECEIPT.RESULT_ID]]) return;
    if (resultTypeMap[targetData[RECEIPT.RESULT_ID]].includes("수선"))
      setIsRepiar(true);
    else setIsRepiar(false);

    if (resultTypeMap[targetData[RECEIPT.RESULT_ID]].includes("심의"))
      setIsReview(true);
    else setIsReview(false);

    if(!targetData[RECEIPT.REGISTER_DATE] == null){
      const receiptDate =new Date()
      const receiptDateToString =receiptDate.getFullYear()+"-"+(receiptDate.getMonth()+1)+"-"+receiptDate.getDate()
      setRegisterDate(receiptDateToString)
      handleChangeRegisterDate(RECEIPT.REGISTER_DATE,receiptDateToString )
    }else{
      const receiptDate =new Date(targetData[RECEIPT.REGISTER_DATE])
      const receiptDateToString =receiptDate.getFullYear()+"-"+(receiptDate.getMonth()+1)+"-"+receiptDate.getDate()
      setRegisterDate(receiptDateToString)
    }
    if(completeDateChanged && targetData[RECEIPT.COMPLETE_DATE]){
      let tos =moment(targetData[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD")
      setMinCompleteDate(tos)
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetData[RECEIPT.RESULT_ID]]);
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="10px" width="28%">
          <Row>
            <Field>
              <Input
                type="date"
                title="본사접수일"
                name={RECEIPT.REGISTER_DATE}
                value={
                  targetData[RECEIPT.REGISTER_DATE]
                    ? moment(registerDate).format(
                        "YYYY-MM-DD"
                      )
                    : moment().format("YYYY-MM-DD")
                }
                disabled={true}
                onChange={handleChangeTargetData}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="1.과실구분:"
                name={RECEIPT.FAULT_ID}
                options={[DEFAULT_OPTION, ...faultType]}
                value={targetData[RECEIPT.FAULT_ID]}
                onChange={handleChangeTargetData}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="2.내용분석:"
                name={RECEIPT.ANALYSIS_ID}
                options={[DEFAULT_OPTION, ...analysisType]}
                value={targetData[RECEIPT.ANALYSIS_ID]}
                onChange={handleChangeTargetData}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="3.판정결과:"
                name={RECEIPT.RESULT_ID}
                options={[DEFAULT_OPTION, ...resultType]}
                value={targetData[RECEIPT.RESULT_ID]}
                onChange={(e)=>{
                  handleChangeTargetData(e);
                  console.log(targetData)
                }}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          {!isReview && (
            <Row>
              {!isRepair && (
                <>
                  <Field>
                    <Checkbox
                      title="폐기"
                      onChange={handleChangeTargetDataResultDetail}
                      value={1}
                      name={RECEIPT.RESULT_DETAIL_ID}
                      checked={targetData[RECEIPT.RESULT_DETAIL_ID] == 1? targetData[RECEIPT.RESULT_DETAIL_ID] : (targetData[RECEIPT.RESULT_DETAIL_ID]) === 1 }
                      styleOptions={{ color: COLOR.PURPLE }}
                    />
                  </Field>
                  <Field>
                    <Checkbox
                      title="심의"
                      onChange={handleChangeTargetDataResultDetail}
                      value={2}
                      name={RECEIPT.RESULT_DETAIL_ID}
                      checked={targetData[RECEIPT.RESULT_DETAIL_ID] == 2? targetData[RECEIPT.RESULT_DETAIL_ID] : (targetData[RECEIPT.RESULT_DETAIL_ID]) === 2 }
                      styleOptions={{ color: COLOR.PURPLE }}
                    />
                  </Field>
                </>
              )}
              <Field>
                <Checkbox
                  title="수선미입고"
                  onChange={handleChangeTargetDataResultDetail}
                  value={3}
                  name={RECEIPT.RESULT_DETAIL_ID}
                  checked={targetData[RECEIPT.RESULT_DETAIL_ID] == 3? targetData[RECEIPT.RESULT_DETAIL_ID] : (targetData[RECEIPT.RESULT_DETAIL_ID]) === 3 }
                  styleOptions={{ color: COLOR.PURPLE }}
                />
              </Field>
            </Row>
          )}

          <TextArea
            title="본사설명:"
            name={RECEIPT.MESSAGE}
            value={targetData[RECEIPT.MESSAGE] || ""}
            onChange={handleChangeTargetData}
            styleOptions={{ width: "100%" }}
          />
        </Section>
        <Section width="72%">
          {!isReview && (
            <>
              {RECEIPT.REPAIR_DETAILS.map((REPAIR, index) => (
                <Row key={REPAIR.ID}>
                  <Field marginRight="10px">
                    <SelectOption
                      title={`수선처지정${index + 1}`}
                      name={REPAIR.PLACE_ID}
                      options={[DEFAULT_OPTION, ...repairShop]}
                      value={targetData[REPAIR.PLACE_ID]}
                      styleOptions={{ maxWidth: "160px", width: "160px" }}
                      onChange={handleChangeTargetData}
                    />
                  </Field>
                  <Field>
                    <Input
                      type="date"
                      title={`발송일 to R${index + 1}`}
                      name={REPAIR.SEND_DATE}
                      value={
                        targetData[REPAIR.SEND_DATE]
                          ? moment(targetData[REPAIR.SEND_DATE]).format(
                              "YYYY-MM-DD"
                            )
                          : undefined
                      }
                      onChange={handleChangeTargetData}
                    />
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      title={`총 비용${index + 1}`}
                      name={REPAIR.TOTAL_PRICE}
                      value={(Number(targetData[`repair${index + 1}_total`]))}
                      styleOptions={{ width: "100px" }}
                      onChange={handleChangeTargetData}
                    />
                  </Field>
                </Row>
              ))}
              <Row>
                <Field marginRight="10px">
                  <Input
                    title="생산업체"
                    name={RECEIPT.MANUFACTURER_CODE}
                    value={targetData[RECEIPT.MANUFACTURER_CODE] || ""}
                    disabled={true}
                    styleOptions={{ width: "80px" }}
                  />
                  <Input
                    name={RECEIPT.MANUFACTURER_NAME}
                    value={targetData[RECEIPT.MANUFACTURER_NAME] || ""}
                    styleOptions={{ width: "150px" }}
                    disabled={true}
                  />
                </Field>
                <Field marginRight="10px">
                  <Input
                    type="date"
                    title="발송일 to M"
                    name={RECEIPT.MANUFACTURER_DETAIL.SEND_DATE}
                    value={
                      targetData[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
                        ? moment(
                            targetData[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
                          ).format("YYYY-MM-DD")
                        : undefined
                    }
                    onChange={handleChangeTargetData}
                  />
                </Field>
                {/*<Field marginRight="0px">
                  <Input
                    title="수선대체상품"
                    styleOptions={{ width: "20px" }}
                    value={targetData[RECEIPT.MANUFACTURER_DETAIL.SUBSTITUTE]}
                    disabled={true}
                  />
                </Field> */}
              </Row>
              <Row>
                <Field marginRight="10px">
                  <Checkbox
                    name={RECEIPT.PAID}
                    checked={typeof targetData[RECEIPT.PAID] === "boolean"? targetData[RECEIPT.PAID] : parseInt(targetData[RECEIPT.PAID]) === 1 }
                    onChange={handleChangeTargetData}
                  />
                  <Input
                    title="유상수선비"
                    name={RECEIPT.FEE}
                    value={targetData[RECEIPT.FEE]}
                    onChange={handleChangeTargetData}
                    styleOptions={{ width: "100px" }}
                    disabled={!(typeof targetData[RECEIPT.PAID] === "boolean"? targetData[RECEIPT.PAID] : parseInt(targetData[RECEIPT.PAID]) === 1 )}
                  />
                </Field>
                <Field>
                  <Input
                    title="현금영수증번호"
                    name={RECEIPT.CASHRECEIPT_NUM}
                    value={targetData[RECEIPT.CASHRECEIPT_NUM] || ""}
                    onChange={handleChangeTargetData}
                    disabled={!(typeof targetData[RECEIPT.PAID] === "boolean"? targetData[RECEIPT.PAID] : parseInt(targetData[RECEIPT.PAID]) === 1 )}
                  />
                </Field>
              </Row>
              {!isRepair && (
                <Row>
                  {/* <Field marginRight="10px">
                <Input
                  title="고객구매금액"
                  onChange={handleChangeTargetData}
                  styleOptions={{ width: "100px", color: COLOR.PURPLE }}
                />
              </Field> */}
                  <Field marginRight="10px">
                    <Input
                      title="Tag가"
                      name={PRODUCT.TAG_PRICE}
                      onChange={handleChangeTargetData}
                      value={targetData[PRODUCT.TAG_PRICE]}
                      styleOptions={{ width: "100px" }}
                    />
                  </Field>
                  <Field marginRight="10px">
                    <SelectOption
                      title="할인율"
                      name={RECEIPT.DISCOUNT}
                      options={[DEFAULT_OPTION, ...discouuntList]}
                      value={targetData[RECEIPT.DISCOUNT]}
                      onChange={(e)=>{
                        getDiscountPrice(e.target.value,e);
                        handleChangeTargetData(e);
                      }}
                      styleOptions={{ maxWidth: "80px", color: COLOR.PURPLE }}
                    />
                  </Field>
                  <Field marginRight="0px">
                    <Input
                      title="실판매가"
                      disabled={discountPriceDisable}
                      name={RECEIPT.DISCOUNT_PRICE}
                      value={discountPrice}
                      onChange={(e)=>{
                        setDiscountPrice(e.target.value);
                        handleChangeTargetData(e);
                      }}
                      styleOptions={{ width: "100px", color: COLOR.PURPLE }}
                    />
                  </Field>
                </Row>
              )}

              <Row>
                {!isRepair && (
                  <Field>
                    <ClaimModal
                      title="클레임가"
                      name={RECEIPT.CLAIM}
                      options={[DEFAULT_OPTION, ...claimList]}
                      onChange={(e)=>{
                        getClaimPrice(e.target.value,e);
                        handleChangeTargetData(e);
                      }}
                      value={targetData[RECEIPT.CLAIM]}
                      styleOptions={{ maxWidth: "100px", color: COLOR.PURPLE }}
                    />
                    <Input
                      name={RECEIPT.CLAIM_PRICE}
                      disabled={claimPriceDisable}
                      value={claimPrice}
                      onChange={(e)=>{
                        getClaimPrice(e.target.value);
                        setClaimPrice(e.target.value);
                        handleChangeTargetData(e);
                      }}
                      styleOptions={{ width: "100px", color: COLOR.PURPLE }}
                    />
                  </Field>
                )}
                {/* {isRepair && <Field marginRight="400px" />}
            <Field marginRight="0px">
                <Input
                  type="date"
                  title="발송일 to S"
                  name={RECEIPT.STORE_SEND_DATE}
                  value={
                    targetData[RECEIPT.STORE_SEND_DATE]
                      ? moment(targetData[RECEIPT.STORE_SEND_DATE]).format(
                          "YYYY-MM-DD"
                        )
                      : undefined
                  }
                  onChange={handleValueChange}
                />
              </Field> */}
              </Row>
            </>
          )}
          {isReview && (
            <>
              <Row>
                <Field>
                  <div>분쟁조정의뢰서</div>
                  <Link href={{
                          pathname: "/requestForm",
                          query: {  data: JSON.stringify(targetData) ,userName:name,headquarterId:headquarter_id},
                  }}
                  ><a target="_blank"><ReportButton width="68px">출력</ReportButton></a></Link>
                </Field>
                <Field>
                  <Input
                    type="date"
                    title="심의의뢰일"
                    name={RECEIPT.DELIBERATION_REQUEST_DATE}
                    value={
                      targetData[RECEIPT.DELIBERATION_REQUEST_DATE]
                        ? moment(
                          targetData[RECEIPT.DELIBERATION_REQUEST_DATE]
                          ).format("YYYY-MM-DD")
                        : undefined
                    }
                    onChange={handleChangeTargetData}
                  />
                </Field>
              </Row>
              <Row>
                <Field>
                  <div>심의결과서</div>
                  
                  <Filebox>
                      <input className="upload-name" value={inputFlieName} onChange={()=>{}}/>
                      <label className="label" htmlFor="file">파일</label> 
                      <input className="filebox_input" type="file" accept=".pdf" id="file" onChange={setFile.bind(this)}/>
                      <Link href={PDFfliePath}  target="_blank" download ><PDFDownloadButton style={{marginLeft:15}} width="68px">다운로드</PDFDownloadButton></Link> 
                  </Filebox>
                </Field>
                {/* <Field>
                <Input
                  type="date"
                  title="발송일 to S"
                  name={RECEIPT.STORE_SEND_DATE}
                  value={
                    targetData[RECEIPT.STORE_SEND_DATE]
                      ? moment(targetData[RECEIPT.STORE_SEND_DATE]).format(
                          "YYYY-MM-DD"
                        )
                      : undefined
                  }
                  onChange={handleValueChange}
                />
              </Field> */}
              </Row>
            </>
          )}
          <CustomRow>
            <Field marginRight="20px">
              <Input
                type="date"
                title="발송일 to S"
                name={RECEIPT.COMPLETE_DATE}
                min = {minCompleteDate}
                value={
                  targetData[RECEIPT.COMPLETE_DATE]
                    ? moment(targetData[RECEIPT.COMPLETE_DATE]).format(
                        "YYYY-MM-DD"
                      )
                    : undefined
                }
                onChange={(e)=>{
                  handleChangeTargetData(e)
                  setCompleteDateChanged(false)
                }}
                styleOptions={{ labelFontSize: "18px", color: COLOR.RED }}
              />
            </Field>
            <SaveButton
              onClick={()=>{
                if(!targetData[RECEIPT.ID]){
                  alert("잘못된 입력입니다. \n서비스카드 번호를 확인해주세요")
                }else if(!targetData[RECEIPT.COMPLETE_DATE]){
                  alert("발송일 to S 를 입력해주세요")
                }else{
                  
                  //console.log(targetData)
                  inputSave(targetData,inputFlie)
                  confirm("저장이 완료되었습니다.")
                }
              }}
            >저장</SaveButton>
          </CustomRow>
        </Section>
      </SectionRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 65%;
  min-width: 950px;
  position: relative;
  margin: 0px 15px 5px 5px;
  padding: 5px 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
  align-self: start;
`;

const CustomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
`;

const ReportButton = styled.button`
  min-height: max-content;
  width: ${({ width = "100px" }) => width};
  background-color: ${COLOR.FILTER_MAIN};
  color: ${COLOR.WHITE};
  padding: 2px 20px;
  border-radius: 5px;
  border: none;
  word-break: keep-all;
`;

const Filebox = styled.div`
  display:flex;
  .upload-name {
    display: inline-block;
    height: 25px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 50%;
    color: #999999;
  }
  .label {
    display:flex;
    justify-content:center;
    align-items:center;
    min-height: max-content;
    width: 60px;
    background-color: ${COLOR.FILTER_MAIN};
    color: ${COLOR.WHITE};
    border-radius: 5px;
    border: none;
    word-break: keep-all;
    margin-left: 10px;
  }
  .filebox_input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
const PDFDownloadButton = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 90px;
  background-color: ${COLOR.FILTER_MAIN};
  color: ${COLOR.WHITE};
  border-radius: 5px;
  border: none;
  word-break: keep-all;
`;
const SaveButton = styled.button`
  min-height: max-content;
  width: 150px;
  height: 35px;
  font-size: 17px;
  font-weight: bold;
  background-color: ${COLOR.BORDER_MAIN};
  color: ${COLOR.WHITE};
  padding: 5px;
  border-radius: 15px;
  border: 2px solid ${COLOR.BORDER_MAIN};
`;

export default ReceiptInfo;
