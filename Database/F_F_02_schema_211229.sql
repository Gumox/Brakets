-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 21-12-29 18:13
-- 서버 버전: 5.7.36-0ubuntu0.18.04.1
-- PHP 버전: 7.2.24-0ubuntu0.18.04.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `F&F_02`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `analysis_type`
--

CREATE TABLE `analysis_type` (
  `analysis_id` int(11) NOT NULL,
  `analysis_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '내용분석',
  `analysis_code` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='하자 유형';

-- --------------------------------------------------------

--
-- 테이블 구조 `brand`
--

CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `brand_code` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `sms` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 수신 비동의 | 1: 수신 동의',
  `clause` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 약관 비동의 | 1: 약관 동의',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `fault_type`
--

CREATE TABLE `fault_type` (
  `fault_id` int(11) NOT NULL,
  `fault_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '과실구분',
  `fault_code` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '0' COMMENT '0: 본사 1: 수선처'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='하자 유형';

-- --------------------------------------------------------

--
-- 테이블 구조 `mfr_detail`
--

CREATE TABLE `mfr_detail` (
  `mfr_detail_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL COMMENT '생산업체 id',
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '발송일 to M',
  `register_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '생산업체 접수일',
  `substitute` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 유지 | 1: 대체',
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '생산업체 설명',
  `redo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '재수선 0:N | 1:Y',
  `complete_date` datetime DEFAULT NULL COMMENT '생산업체 발송일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `barcode` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '바코드',
  `qrcode` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'QR',
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `season` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `style` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `degree` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `image` longtext COLLATE utf8_unicode_ci NOT NULL,
  `release_date` date DEFAULT NULL COMMENT '최초출고일',
  `brand_id` int(11) NOT NULL,
  `mfr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='제품';

-- --------------------------------------------------------

--
-- 테이블 구조 `product_category`
--

CREATE TABLE `product_category` (
  `pcategory_id` int(11) NOT NULL,
  `category_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '제품 구분',
  `brand_id` int(11) NOT NULL COMMENT '브랜드 | 0:수선 제외',
  `season_type` int(11) DEFAULT '0' COMMENT '0: 당시즌 | 1: 과시즌',
  `receiver_id` int(11) NOT NULL COMMENT '수선처',
  `receiver_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선처이름'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='수선유형';

-- --------------------------------------------------------

--
-- 테이블 구조 `receipt`
--

CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL,
  `receipt_code` int(11) DEFAULT NULL COMMENT '수선증 바코드',
  `step` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 미접수 | 1: 접수  ',
  `category` tinyint(4) DEFAULT NULL COMMENT '1:고객용 | 2:매장용 | 3:선처리',
  `receipt_type` tinyint(4) DEFAULT NULL COMMENT '1:수선 | 2:교환 | 3:환불 | 4:심의',
  `store_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `pcategory_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '바코드/QR',
  `substitute` tinyint(4) NOT NULL DEFAULT '0' COMMENT '기존: 0 | 대체: 1',
  `mfr_id` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '전체이미지',
  `store_message` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '매장 접수 내용',
  `receipt_date` datetime DEFAULT NULL COMMENT '매장접수일',
  `due_date` datetime DEFAULT NULL COMMENT '고객약속일',
  `register_date` datetime DEFAULT NULL COMMENT '본사접수일',
  `complete_date` datetime DEFAULT NULL COMMENT '발송일 to S, 처리완료일',
  `received_date` datetime DEFAULT NULL COMMENT '매장인수일',
  `fault_id` int(11) DEFAULT '0' COMMENT '과실구분',
  `result_id` int(11) DEFAULT '0' COMMENT '판정결과',
  `analysis_id` int(11) DEFAULT '0' COMMENT '내용분석',
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '본사설명',
  `repair1_detail_id` int(11) DEFAULT NULL,
  `repair2_detail_id` int(11) DEFAULT NULL,
  `repair3_detail_id` int(11) DEFAULT NULL,
  `mfr_detail_id` int(11) DEFAULT NULL,
  `freecharge` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:무상 | 1:유상',
  `charge` int(11) NOT NULL DEFAULT '0' COMMENT '비용',
  `cash` tinyint(4) DEFAULT NULL COMMENT '0:카드 | 1:현금',
  `cashreceipt_num` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '현금영수증번호',
  `signature` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '고객서명이미지',
  `receiver` int(11) DEFAULT NULL COMMENT '최초 수선처 or 본사'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='접수 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `receipt_detail`
--

CREATE TABLE `receipt_detail` (
  `detail_id` int(11) NOT NULL,
  `receipt_id` int(11) NOT NULL,
  `receipt_code` int(11) NOT NULL COMMENT '수선증 바코드',
  `num` int(11) NOT NULL,
  `mailbag` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '바코드/QR',
  `message` longtext COLLATE utf8_unicode_ci,
  `sender` int(11) NOT NULL,
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `receiver` int(11) NOT NULL,
  `receiver_type` int(11) NOT NULL COMMENT '0: 본사 | 1: 매장 | 2: 수선처 | 3: 생산업체',
  `received_date` datetime DEFAULT NULL COMMENT '인수일',
  `repair_detail_id` int(11) DEFAULT NULL,
  `mfr_detail_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `receipt_image`
--

CREATE TABLE `receipt_image` (
  `image_id` int(11) NOT NULL,
  `receipt_id` int(11) NOT NULL COMMENT '접수 id',
  `num` int(11) NOT NULL COMMENT '등록 순서',
  `type` int(11) NOT NULL COMMENT '0: 처음등록 | 1: 추가등록',
  `before_image` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선 전 이미지',
  `before_store_id` int(11) NOT NULL COMMENT '수선 전 이미지 등록한 store',
  `after_image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '수선 후 이미지',
  `after_store_id` int(11) DEFAULT NULL COMMENT '수선 후 이미지 등록한 store'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `repair_detail`
--

CREATE TABLE `repair_detail` (
  `repair_detail_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL COMMENT '수선처 id',
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '발송일 to R',
  `register_date` datetime DEFAULT NULL COMMENT '수선처 접수일',
  `delivery_type` tinyint(4) DEFAULT NULL COMMENT '운송형태 1:매장행낭 | 2:본사행낭 | 3:택배 | 4:퀵배송 | 5:기타',
  `fault_id` int(11) DEFAULT NULL COMMENT '과실구분',
  `result_id` int(11) DEFAULT NULL COMMENT '판정결과',
  `analysis_id` int(11) DEFAULT NULL COMMENT '내용분석',
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '수선처설명',
  `repair1_type_id` int(11) DEFAULT NULL COMMENT '수선1 내용 id',
  `repair1_count` int(11) NOT NULL DEFAULT '0' COMMENT '수선1 수량',
  `repair1_price` int(11) NOT NULL DEFAULT '0' COMMENT '수선1 비용',
  `repair1_redo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '재수선 0:N | 1:Y',
  `repair2_type_id` int(11) DEFAULT NULL,
  `repair2_count` int(11) NOT NULL DEFAULT '0',
  `repair2_price` int(11) NOT NULL DEFAULT '0',
  `repair2_redo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '재수선 0:N | 1:Y',
  `repair3_type_id` int(11) DEFAULT NULL,
  `repair3_count` int(11) NOT NULL DEFAULT '0',
  `repair3_price` int(11) NOT NULL DEFAULT '0',
  `repair3_redo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '재수선 0:N | 1:Y',
  `complete_date` datetime DEFAULT NULL COMMENT '수선처 발송일',
  `shipment_type` tinyint(4) DEFAULT NULL COMMENT '발송방법 1:퀵 | 2:택배 | 3:행낭 | 4:기타',
  `shipment_price` int(11) NOT NULL DEFAULT '0' COMMENT '발송비용'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `repair_type`
--

CREATE TABLE `repair_type` (
  `repair_id` int(11) NOT NULL,
  `repair_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선내용',
  `repair_price` int(11) NOT NULL COMMENT '수선비용'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='수선유형';

-- --------------------------------------------------------

--
-- 테이블 구조 `result_type`
--

CREATE TABLE `result_type` (
  `result_id` int(11) NOT NULL,
  `result_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '판정결과',
  `result_code` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '0' COMMENT '0: 본사 1: 수선처'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='하자 유형';

-- --------------------------------------------------------

--
-- 테이블 구조 `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL COMMENT '소속',
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '카카오uid',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록시간'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `staff_log`
--

CREATE TABLE `staff_log` (
  `log_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0: singin | 1: login | 2: logout | 3: change ',
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `phone_uuid` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `store`
--

CREATE TABLE `store` (
  `store_id` int(11) NOT NULL,
  `store_type` tinyint(4) NOT NULL COMMENT '0:본사 | 1:매장 | 2:수선처 | 3:생산업체',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록시간',
  `store_code` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `store_category` int(11) NOT NULL DEFAULT '0' COMMENT '0: 해당없음 | 1: 정상 | 2: 상설'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `analysis_type`
--
ALTER TABLE `analysis_type`
  ADD PRIMARY KEY (`analysis_id`);

--
-- 테이블의 인덱스 `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- 테이블의 인덱스 `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- 테이블의 인덱스 `fault_type`
--
ALTER TABLE `fault_type`
  ADD PRIMARY KEY (`fault_id`);

--
-- 테이블의 인덱스 `mfr_detail`
--
ALTER TABLE `mfr_detail`
  ADD PRIMARY KEY (`mfr_detail_id`);

--
-- 테이블의 인덱스 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- 테이블의 인덱스 `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`pcategory_id`);

--
-- 테이블의 인덱스 `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`receipt_id`);

--
-- 테이블의 인덱스 `receipt_detail`
--
ALTER TABLE `receipt_detail`
  ADD PRIMARY KEY (`detail_id`);

--
-- 테이블의 인덱스 `receipt_image`
--
ALTER TABLE `receipt_image`
  ADD PRIMARY KEY (`image_id`);

--
-- 테이블의 인덱스 `repair_detail`
--
ALTER TABLE `repair_detail`
  ADD PRIMARY KEY (`repair_detail_id`);

--
-- 테이블의 인덱스 `repair_type`
--
ALTER TABLE `repair_type`
  ADD PRIMARY KEY (`repair_id`);

--
-- 테이블의 인덱스 `result_type`
--
ALTER TABLE `result_type`
  ADD PRIMARY KEY (`result_id`);

--
-- 테이블의 인덱스 `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- 테이블의 인덱스 `staff_log`
--
ALTER TABLE `staff_log`
  ADD PRIMARY KEY (`log_id`);

--
-- 테이블의 인덱스 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `analysis_type`
--
ALTER TABLE `analysis_type`
  MODIFY `analysis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- 테이블의 AUTO_INCREMENT `brand`
--
ALTER TABLE `brand`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 테이블의 AUTO_INCREMENT `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 테이블의 AUTO_INCREMENT `fault_type`
--
ALTER TABLE `fault_type`
  MODIFY `fault_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 테이블의 AUTO_INCREMENT `mfr_detail`
--
ALTER TABLE `mfr_detail`
  MODIFY `mfr_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 테이블의 AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 테이블의 AUTO_INCREMENT `product_category`
--
ALTER TABLE `product_category`
  MODIFY `pcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- 테이블의 AUTO_INCREMENT `receipt`
--
ALTER TABLE `receipt`
  MODIFY `receipt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- 테이블의 AUTO_INCREMENT `receipt_detail`
--
ALTER TABLE `receipt_detail`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- 테이블의 AUTO_INCREMENT `receipt_image`
--
ALTER TABLE `receipt_image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 테이블의 AUTO_INCREMENT `repair_detail`
--
ALTER TABLE `repair_detail`
  MODIFY `repair_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 테이블의 AUTO_INCREMENT `repair_type`
--
ALTER TABLE `repair_type`
  MODIFY `repair_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 테이블의 AUTO_INCREMENT `result_type`
--
ALTER TABLE `result_type`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 테이블의 AUTO_INCREMENT `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- 테이블의 AUTO_INCREMENT `staff_log`
--
ALTER TABLE `staff_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- 테이블의 AUTO_INCREMENT `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
