export const DEFAULT_OPTION = {
  value: "",
  text: "",
};

export const RECEIPT_CATEGORY_OPTIONS = [
  {
    value: "1",
    text: "고객용",
  },
  {
    value: "2",
    text: "매장용",
  },
  {
    value: "3",
    text: "선처리",
  },
];
export const RECEIPT_TYPE_OPTIONS = [
  {
    value: "1",
    text: "수선",
  },
  {
    value: "2",
    text: "교환",
  },
  {
    value: "3",
    text: "환불",
  },
  {
    value: "4",
    text: "심의",
  },
];

export const TRANSPORT_OPTIONS = [
  {
    value: "1",
    text: "매장행낭",
  },
  {
    value: "2",
    text: "본사행낭",
  },
  {
    value: "3",
    text: "택배",
  },
  {
    value: "4",
    text: "퀵배송",
  },
  {
    value: "5",
    text: "기타",
  },
];

export const SHIPPING_OPTIONS = [
  {
    value: "1",
    text: "행낭",
  },
  {
    value: "2",
    text: "택배",
  },
  {
    value: "3",
    text: "퀵",
  },
  {
    value: "4",
    text: "기타",
  },
];

/**
 * Filter 관련 Options
 */
export const DATE_SEARCH_TYPE_OPTIONS = [
  {
    value: "receipt_date",
    text: "매장접수일",
  },
  {
    value: "complete_date",
    text: "발송일 to S",
  },
  {
    value: "register_date",
    text: "본사접수일",
  },
  {
    value: "return_date",
    text: "하자반품일",
  },
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

export const MONTHLY_OPTIONS = [
  {
    value: "",
    text: "ALL",
  },
  {
    value: "1",
    text: "1",
  },
  {
    value: "2",
    text: "2",
  },
  {
    value: "3",
    text: "3",
  },
  {
    value: "4",
    text: "4",
  },
  {
    value: "5",
    text: "5",
  },
  {
    value: "6",
    text: "6",
  },
  {
    value: "7",
    text: "7",
  },
  {
    value: "8",
    text: "8",
  },
  {
    value: "9",
    text: "9",
  },
  {
    value: "10",
    text: "10",
  },
  {
    value: "11",
    text: "11",
  },
  {
    value: "12",
    text: "12",
  },
]

const createYearList = (back) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => ({
    value: year - i,
    text: year - i,
  }));
};
export const YEARLY_OPTIONS = [
  {
    value: "",
    text: "ALL",
  },
  ...createYearList(5),
]

/**
 * Temp 
 */
export const OPTIONS = [
  {
    value: 1,
    text: "First Option",
  },
  {
    value: 2,
    text: "Second Option",
  },
  {
    value: 3,
    text: "Third Option",
  },
];

export const SEASON_OPTIONS = [
  {
    value: "22N",
    text: "2022NS",
  },
  {
    value: "22F",
    text: "2022FW",
  },
  {
    value: "22S",
    text: "2022SS",
  },
  {
    value: "21N",
    text: "2021NS",
  },
  {
    value: "21F",
    text: "2021FW",
  },
  {
    value: "21S",
    text: "2021SS",
  },
];