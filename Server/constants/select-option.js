export const DEFAULT_OPTION = {
  value: "",
  text: "",
};

export const OPTIONS = [
  {
    key: 1,
    value: 1,
    text: "First Option",
  },
  {
    key: 2,
    value: 2,
    text: "Second Option",
  },
  {
    key: 3,
    value: 3,
    text: "Third Option",
  },
];

export const RECEIPT_CATEGORY_OPTIONS = [
  {
    key: "1",
    value: "1",
    text: "고객용",
  },
  {
    key: "2",
    value: "2",
    text: "매장용",
  },
  {
    key: "3",
    value: "3",
    text: "선처리",
  },
];
export const RECEIPT_TYPE_OPTIONS = [
  {
    key: "1",
    value: "1",
    text: "수선",
  },
  {
    key: "2",
    value: "2",
    text: "교환",
  },
  {
    key: "3",
    value: "3",
    text: "환불",
  },
  {
    key: "4",
    value: "4",
    text: "심의",
  },
];
export const REPAIR_OPTIONS = [
  {
    key: "1",
    value: "1",
    text: "원단",
  },
  {
    key: "2",
    value: "2",
    text: "봉제",
  },
];
export const REPAIR_PLACE_OPTIONS = [
  {
    key: "3",
    value: "3",
    text: "맥가이버",
  },
  {
    key: "4",
    value: "4",
    text: "동대문종합시장",
  },
];
export const SHIPPING_OPTIONS = [
  {
    key: "1",
    value: "1",
    text: "택배",
  },
];

export const DATE_SEARCH_TYPE_OPTIONS = [
  {
    value: "receipt_date",
    text: "매장등록일",
  },
  {
    value: "send_date",
    text: "매장발송일",
  },
  {
    value: "register_date",
    text: "본사접수일",
  },
  // TODO: DB 에 column 추가 먼저
  // {
  //   value: "return_date",
  //   text: "하자반품일",
  // },
  {
    value: "due_date",
    text: "고객약속일",
  },
];

export const REGISTER_STEP_OPTIONS = [
  {
    value: "",
    text: "접수여부 ALL",
  },
  {
    value: "true",
    text: "접수",
  },
  {
    value: "false",
    text: "미접수",
  },
];

export const SEND_OPTIONS = [
  {
    value: "",
    text: "발송여부 ALL",
  },
  {
    value: "true",
    text: "발송",
  },
  {
    value: "false",
    text: "미발송",
  },
];

export const ANALYSIS_TYPE_OPTIONS = [
  {
    value: "",
    text: "내용분석 ALL",
  },
];

export const RESULT_TYPE_OPTIONS = [
  {
    value: "",
    text: "판정결과 ALL",
  },
];
