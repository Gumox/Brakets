-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 21-12-29 18:12
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

--
-- 테이블의 덤프 데이터 `analysis_type`
--

INSERT INTO `analysis_type` (`analysis_id`, `analysis_name`, `analysis_code`) VALUES
(1, '올풀림', 1),
(2, '봉제', 3),
(3, '원단', 4),
(4, '재단', 5),
(5, '탈색', 6),
(6, '이염', 7),
(7, '수축', 8),
(8, '늘어남', 9),
(9, '필링', 10),
(10, '스냅/단추', 12),
(11, '지퍼', 13),
(12, '부자재', 14),
(13, '스트링', 15),
(14, '자수', 16),
(15, '나염', 17),
(16, '접착', 18),
(17, '모자꼭지', 19),
(18, '모자챙', 20),
(19, '카라/시보리', 21),
(20, '원단손상', 22),
(21, '착용흔적', 23),
(22, '오염', 24),
(23, '사이즈수선', 25),
(24, '워싱', 28),
(25, '주름', 29),
(27, '세탁표기', 30),
(28, '털', 31),
(29, '구두굽', 32),
(30, '배송', 33),
(35, '협찬', 34),
(36, '지퍼슬라이더', 35),
(37, '지퍼풀(장식)', 36),
(38, '벨크로', 37),
(39, '충전재빠짐', 38),
(40, '충전재불량', 39),
(41, '후드털', 40),
(42, '기타', 27);

-- --------------------------------------------------------

--
-- 테이블 구조 `brand`
--

CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `brand_code` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 테이블의 덤프 데이터 `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_name`, `brand_code`) VALUES
(1, 'MLB', 'B'),
(2, 'Banila B', 'N'),
(3, 'RENOMA', 'R'),
(4, 'MLB Kids', 'I');

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

--
-- 테이블의 덤프 데이터 `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `phone`, `sms`, `clause`, `timestamp`) VALUES
(1, '홍길동', '010-1234-1234', 1, 1, '2021-10-07 19:03:53'),
(2, '가나다', '010-2323-3124', 0, 1, '2021-11-18 14:40:05'),
(3, '고객1', '010-2222-1111', 1, 0, '2021-11-29 07:53:03'),
(4, '고객2', '010-1111-3333', 1, 1, '2021-11-29 08:15:40'),
(5, '고객3', '010-2222-1111', 1, 0, '2021-12-16 08:56:49'),
(6, '새로운', '123-1223-1234', 1, 1, '2021-12-24 05:37:59'),
(7, '이름이름', '111-1223-1234', 1, 1, '2021-12-24 06:51:18'),
(8, '테스트8', '123-777-1238', 1, 1, '2021-12-24 06:56:53');

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

--
-- 테이블의 덤프 데이터 `fault_type`
--

INSERT INTO `fault_type` (`fault_id`, `fault_name`, `fault_code`, `level`) VALUES
(1, '고객과실', 1, 1),
(2, '고객요구', 2, 0),
(3, '본사과실', 3, 0),
(4, '업체과실', 4, 0),
(5, '유통과실', 5, 0),
(6, '제품특성', 6, 1),
(7, '기타', 7, 0),
(8, '부자재분실', 8, 0);

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

--
-- 테이블의 덤프 데이터 `mfr_detail`
--

INSERT INTO `mfr_detail` (`mfr_detail_id`, `store_id`, `send_date`, `register_date`, `substitute`, `message`, `redo`, `complete_date`) VALUES
(1, 15, '2021-11-21 00:05:32', '2021-11-22 00:00:00', 0, '수선 완료', 1, '2021-11-24 00:00:00');

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

--
-- 테이블의 덤프 데이터 `product`
--

INSERT INTO `product` (`product_id`, `barcode`, `qrcode`, `name`, `season`, `color`, `size`, `style`, `degree`, `image`, `release_date`, `brand_id`, `mfr_id`) VALUES
(1, 'AAAA0001', 'QQQQRRR1', '쉐도우 숏비니 뉴욕양키스', '21S', 'GRS', 'F', '3ABNS0216', '1', 'https://image.adidas.co.kr/upload/prod/basic/source/GM0643-01-05.jpg', '2020-10-11', 1, 15),
(2, 'AAAA0002', 'QQQQRRR2', '[바닐라비]크롭 스트레이트 트임 기모 D톤 데님팬츠', '18F', 'Dark', '25', 'HLMWDDS563P', '1', 'https://image.adidas.co.kr/upload/prod/basic/source/HC6927-01-02.jpg', '2020-11-11', 2, 15),
(3, '8809831730979', '306F482BC850184005F5E10D90141200', '(데모) 락업 트랙탑', '21F', 'Black', 'M', 'DKCP41761', '1', 'https://image.adidas.co.kr/upload/prod/basic/source/H41391-05-01.jpg', '2020-12-12', 4, 15),
(4, 'AAAA0003', 'QQQQRRR3', '신슐레이트 차이나 코트', '21F', 'Black', '95', 'RJKMBH04A', '1', 'https://image.adidas.co.kr/upload/prod/basic/source/HC6927-01-02.jpg', '2020-11-11', 3, 15),
(5, 'AAAA0004', 'QQQQRRR4', '[KIDS]빅볼청키 베이비 (BIGBALL CHUNKY BABY) 뉴욕양키스', '21F', 'WHS', '150', '7ASHCB02N', '1', 'https://image.adidas.co.kr/upload/prod/basic/source/HC6927-01-02.jpg', '2020-11-11', 4, 15);

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

--
-- 테이블의 덤프 데이터 `product_category`
--

INSERT INTO `product_category` (`pcategory_id`, `category_name`, `brand_id`, `season_type`, `receiver_id`, `receiver_name`) VALUES
(24, '의류', 1, 0, 3, '맥가이버'),
(25, '가방', 1, 0, 12, '슈바치'),
(26, '신발', 1, 0, 4, '동대문종합시장'),
(27, '의류', 1, 1, 5, '아트워크 스튜디오'),
(28, '가방', 1, 1, 6, '남대문악세사리상가'),
(29, '신발', 1, 1, 8, '금강'),
(30, '의류', 2, 0, 3, '맥가이버'),
(31, '가방', 2, 0, 3, '맥가이버'),
(32, '신발', 2, 0, 4, '동대문종합시장'),
(33, '의류', 2, 1, 5, '아트워크 스튜디오'),
(34, '가방', 2, 1, 6, '남대문악세사리상가'),
(35, '신발', 2, 1, 8, '금강'),
(36, '의류', 3, 0, 3, '맥가이버'),
(37, '가방', 3, 0, 9, '일심사'),
(38, '신발', 3, 0, 4, '동대문종합시장'),
(39, '의류', 3, 1, 5, '아트워크 스튜디오'),
(40, '가방', 3, 1, 10, '세영사'),
(41, '신발', 3, 1, 8, '금강'),
(42, '의류', 4, 0, 3, '맥가이버'),
(43, '가방', 4, 0, 3, '맥가이버'),
(44, '신발', 4, 0, 11, '한솥'),
(45, '의류', 4, 1, 5, '아트워크 스튜디오'),
(46, '가방', 4, 1, 6, '남대문악세사리상가'),
(47, '신발', 4, 1, 8, '금강');

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

--
-- 테이블의 덤프 데이터 `receipt`
--

INSERT INTO `receipt` (`receipt_id`, `receipt_code`, `step`, `category`, `receipt_type`, `store_id`, `staff_id`, `customer_id`, `pcategory_id`, `product_id`, `product_code`, `substitute`, `mfr_id`, `image`, `store_message`, `receipt_date`, `due_date`, `register_date`, `complete_date`, `received_date`, `fault_id`, `result_id`, `analysis_id`, `message`, `repair1_detail_id`, `repair2_detail_id`, `repair3_detail_id`, `mfr_detail_id`, `freecharge`, `charge`, `cash`, `cashreceipt_num`, `signature`, `receiver`) VALUES
(1, 7099433, 1, 2, 1, 2, 2, 1, 24, 1, 'AAAA0001', 0, 15, '/storage/receipt/31_0.jpeg', '확인 필요', '2021-12-11 00:00:00', '2021-12-21 00:00:00', '2021-12-11 00:00:00', '2021-12-17 00:00:00', '2021-12-17 15:00:00', 1, 6, 1, '맥가이버에서 유상수선 완료', 1, NULL, NULL, NULL, 1, 10000, 1, '023254717', '/storage/signature/1_31.png', NULL),
(10, 7099434, 1, 3, 2, 13, 2, 2, 33, 2, 'AAAA0002', 0, 15, '/storage/receipt/31_0.jpeg', '확인 필요', '2021-12-08 00:00:00', '2021-12-15 00:00:00', '2021-12-08 13:00:00', NULL, NULL, 2, 6, 2, '추가 수선 필요', 2, 3, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/1_31.png', NULL),
(11, 7099435, 1, 1, 3, 2, 2, 3, 36, 4, 'QQQQRRR3', 0, 15, '/storage/receipt/31_0.jpeg', '확인 필요', '2021-12-08 00:00:00', '2021-12-15 00:00:00', NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/1_31.png', NULL),
(13, 1313131313, 1, 2, 1, 14, 2, 1, 44, 5, 'AAAA0004', 0, 15, '/storage/receipt/31_0.jpeg', '확인 필요', '2021-11-17 00:00:00', '2021-11-29 00:00:00', '2021-11-20 00:00:00', NULL, NULL, 4, 4, 20, '본사설명입니다', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, '/storage/signature/1_31.png', NULL),
(20, NULL, 0, 1, NULL, 2, 2, 1, 0, 3, '306F482BC850184005F5E10D90141200', 0, 15, '', '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/1_31.png', NULL),
(21, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/1_31.png', NULL),
(31, 10928423, 1, 1, 1, 2, 2, 1, 42, 3, '306F482BC850184005F5E10D90141200', 0, 15, '/storage/receipt/31_0.jpeg', '수선해주세요.', '2021-12-28 00:00:00', '2022-01-03 00:00:00', NULL, NULL, NULL, 0, 0, 0, '', 4, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/1_31.png', 4),
(34, 10928424, 1, 1, 1, 2, 2, 7, 42, 3, '306F482BC850184005F5E10D90141200', 0, 15, '/storage/receipt/34_0.jpeg', '수선해주세요.', '2021-12-28 00:00:00', '2022-01-03 00:00:00', NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_34.png', 1),
(35, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_35.png', NULL),
(36, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(37, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(38, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(39, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(40, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(41, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(42, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(43, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_43.png', NULL),
(44, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(45, NULL, 0, 1, NULL, 2, 2, 1, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(46, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_46.png', NULL),
(47, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_47.jpg', NULL),
(48, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_48.jpg', NULL),
(49, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_49.jpg', NULL),
(50, NULL, 0, 1, NULL, 2, 2, 7, NULL, 3, '306F482BC850184005F5E10D90141200', 0, 15, NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '/storage/signature/7_50.jpg', NULL);

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

--
-- 테이블의 덤프 데이터 `receipt_detail`
--

INSERT INTO `receipt_detail` (`detail_id`, `receipt_id`, `receipt_code`, `num`, `mailbag`, `product_id`, `product_code`, `message`, `sender`, `send_date`, `receiver`, `receiver_type`, `received_date`, `repair_detail_id`, `mfr_detail_id`) VALUES
(1, 1, 7099433, 1, 9876000, 1, 'AAAA0001', '매장 -> 본사', 2, '2021-12-11 00:00:00', 1, 0, '2021-12-11 00:00:00', NULL, NULL),
(2, 1, 7099433, 2, 9876001, 1, 'AAAA0001', '본사 -> 수선처', 1, '2021-12-12 00:00:00', 3, 2, '2021-12-13 00:00:00', 1, NULL),
(3, 1, 7099433, 3, 3456000, 1, 'AAAA0001', '수선처 -> 본사', 3, '2021-12-16 00:00:00', 1, 0, '2021-12-16 15:00:00', NULL, NULL),
(37, 1, 7099433, 4, 11113333, 1, 'AAAA0001', '본사 -> 매장', 1, '2021-12-17 00:00:00', 2, 1, '2021-12-17 15:00:00', NULL, NULL),
(56, 10, 7099434, 1, 11113334, 2, 'AAAA0002', '매장 -> 본사', 13, '2021-12-08 00:00:00', 1, 0, '2021-12-08 13:00:00', NULL, NULL),
(57, 11, 7099435, 1, 9876007, 4, 'QQQQRRR3', '매장 -> 수선처', 2, '2021-12-08 00:00:00', 3, 2, NULL, NULL, NULL),
(58, 13, 1313131313, 1, 1234567, 5, 'AAAA0004', '매장 -> 본사', 14, '2021-11-17 00:00:00', 1, 0, '2021-11-20 00:00:00', NULL, NULL),
(59, 13, 1313131313, 2, 1234569, 5, 'AAAA0004', '본사 -> 생산업체', 1, '2021-11-21 00:00:00', 15, 3, '2021-11-22 00:00:00', NULL, 1),
(60, 13, 1313131313, 3, 1234562, 5, 'AAAA0004', '생산업체 -> 본사', 15, '2021-11-24 00:00:00', 1, 0, '2021-11-24 15:00:00', NULL, NULL),
(62, 10, 7099434, 2, 9876123, 2, 'AAAA0002', '본사 -> 수선처', 1, '2021-12-09 00:00:00', 3, 2, '2021-12-09 14:00:00', 2, NULL),
(63, 10, 7099434, 3, 3456011, 2, 'AAAA0002', '수선처 -> 본사', 3, '2021-12-13 00:00:00', 1, 0, '2021-12-13 15:00:00', NULL, NULL),
(64, 10, 7099434, 4, 9876123, 2, 'AAAA0002', '본사 -> 수선처', 1, '2021-12-14 00:00:00', 8, 2, '2021-12-14 14:00:00', 3, NULL),
(65, 10, 7099434, 5, 3456011, 2, 'AAAA0002', '수선처 -> 본사', 8, '2021-12-16 00:00:00', 1, 0, '2021-12-16 15:00:00', NULL, NULL),
(66, 31, 10928423, 1, 1232435234, 3, '306F482BC850184005F5E10D90141200', NULL, 2, '2021-12-28 00:00:00', 1, 0, NULL, NULL, NULL),
(67, 34, 10928423, 1, 1232435234, 3, '306F482BC850184005F5E10D90141200', NULL, 2, '2021-12-28 00:00:00', 1, 0, NULL, NULL, NULL),
(68, 31, 10928423, 1, 1232435234, 3, '306F482BC850184005F5E10D90141200', NULL, 2, '2021-12-28 00:00:00', 1, 0, NULL, NULL, NULL),
(69, 31, 10928423, 1, 1232435234, 3, '306F482BC850184005F5E10D90141200', NULL, 2, '2021-12-28 00:00:00', 1, 0, NULL, NULL, NULL),
(70, 31, 10928423, 1, 1232435234, 3, '306F482BC850184005F5E10D90141200', NULL, 2, '2021-12-28 00:00:00', 4, 2, NULL, NULL, NULL);

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

--
-- 테이블의 덤프 데이터 `receipt_image`
--

INSERT INTO `receipt_image` (`image_id`, `receipt_id`, `num`, `type`, `before_image`, `before_store_id`, `after_image`, `after_store_id`) VALUES
(1, 1, 1, 0, '/image/7099433_1_1.jpeg', 2, NULL, NULL),
(2, 10, 1, 0, '/image/7099433_1_1.jpeg', 13, NULL, NULL),
(3, 11, 1, 0, '/image/7099433_1_1.jpeg', 2, NULL, NULL),
(4, 13, 1, 0, '/image/7099433_1_1.jpeg', 14, NULL, NULL),
(5, 31, 1, 0, '/storage/receipt/31_1.jpeg', 2, NULL, NULL),
(6, 31, 2, 0, '/storage/receipt/31_2.jpeg', 2, NULL, NULL),
(7, 34, 1, 0, '/storage/receipt/34_1.jpeg', 2, NULL, NULL),
(8, 34, 2, 0, '/storage/receipt/34_2.jpeg', 2, NULL, NULL);

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

--
-- 테이블의 덤프 데이터 `repair_detail`
--

INSERT INTO `repair_detail` (`repair_detail_id`, `store_id`, `send_date`, `register_date`, `delivery_type`, `fault_id`, `result_id`, `analysis_id`, `message`, `repair1_type_id`, `repair1_count`, `repair1_price`, `repair1_redo`, `repair2_type_id`, `repair2_count`, `repair2_price`, `repair2_redo`, `repair3_type_id`, `repair3_count`, `repair3_price`, `repair3_redo`, `complete_date`, `shipment_type`, `shipment_price`) VALUES
(1, 3, '2021-12-29 00:06:32', '2021-12-13 00:00:00', 2, 1, 3, 1, '수선 완료 입니다.', 1, 2, 1000, 1, 2, 1, 1000, 0, NULL, 0, 0, 0, '2021-12-16 00:00:00', 3, 0),
(2, 3, '2021-12-29 00:06:32', '2021-12-09 14:00:00', 2, 1, 3, 1, '추가 수선이 필요합니다.', 1, 2, 1000, 0, 2, 1, 1000, 0, NULL, 0, 0, 0, '2021-12-13 00:00:00', 3, 0),
(3, 8, '2021-12-29 00:06:32', '2021-12-14 14:00:00', 2, 1, 3, 1, '수선 완료.', 1, 2, 1000, 0, NULL, 0, 0, 0, NULL, 0, 0, 0, '2021-12-16 00:00:00', 2, 1000),
(4, 4, '2021-12-28 00:00:00', NULL, NULL, NULL, NULL, NULL, '', NULL, 0, 0, 0, NULL, 0, 0, 0, NULL, 0, 0, 0, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `repair_type`
--

CREATE TABLE `repair_type` (
  `repair_id` int(11) NOT NULL,
  `repair_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선내용',
  `repair_price` int(11) NOT NULL COMMENT '수선비용'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='수선유형';

--
-- 테이블의 덤프 데이터 `repair_type`
--

INSERT INTO `repair_type` (`repair_id`, `repair_name`, `repair_price`) VALUES
(1, '소매', 500),
(2, '지퍼', 1000),
(3, '단추', 100),
(4, '밑단', 1000);

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

--
-- 테이블의 덤프 데이터 `result_type`
--

INSERT INTO `result_type` (`result_id`, `result_name`, `result_code`, `level`) VALUES
(1, '본사수선', 2, 0),
(2, '업체수선', 3, 0),
(3, '외주수선', 11, 1),
(4, '하자반품', 5, 0),
(5, '업체교환', 8, 0),
(6, '업체클레임', 4, 0),
(7, '매장반송', 6, 1),
(8, '본사반송', 12, 1),
(9, '외부심의', NULL, 0),
(10, '심의반송', 9, 0),
(11, '기타', 7, 0);

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

--
-- 테이블의 덤프 데이터 `staff`
--

INSERT INTO `staff` (`staff_id`, `store_id`, `id`, `name`, `phone`, `lastupdate`, `timestamp`) VALUES
(1, 1, 'kakao-1234-1234', 'admin(본사)', '010-0000-0000', '2021-10-07 18:59:37', '2021-10-07 18:59:37'),
(2, 2, 'kakao-abce-1234', 'admin(홍대점)', '010-0000-0001', '2021-10-07 18:59:37', '2021-10-07 18:59:37'),
(3, 3, 'kakao-dddd-8989', 'admin(맥가이버)', '010-0000-0003', '2021-10-07 18:59:37', '2021-10-07 18:59:37'),
(4, 4, 'kakao-eeee-9999', 'admin(동대문종합시장)', '010-0000-0004', '2021-10-07 18:59:37', '2021-10-07 18:59:37'),
(5, 2, 'hello', 'test', '010-0000-0001', '2021-10-07 18:59:37', '2021-10-07 18:59:37'),
(6, 5, 'kakao-acac-5555', 'admin(아트워크 스튜디오)', '010-0000-0005', '2021-10-14 18:59:37', '2021-10-14 18:59:37'),
(7, 6, 'kakao-acac-6666', 'admin(남대문악세사리상가)', '010-0000-0006', '2021-10-14 18:59:37', '2021-10-14 18:59:37'),
(17, 1, 'kakao-1234', '이름테스트', '010-1212-3434', '2021-10-21 15:45:20', '2021-10-21 15:45:20'),
(23, 1, '1976581751', 'admin-dev', '11111111111', '2021-11-03 18:22:11', '2021-11-03 18:22:11'),
(25, 1, 'kakao-12aa34', '이름테스트', 'uuid-1234', '2021-11-06 10:36:37', '2021-11-06 10:36:37'),
(29, 1, '1976116027', 'user2', '11111111111', '2021-12-01 08:27:04', '2021-12-01 08:27:04'),
(30, 1, '2015002407', '권순욱', '01032810409', '2021-12-01 08:34:27', '2021-12-01 08:34:27'),
(31, 1, '2015103011', '정지은', '', '2021-12-01 09:31:53', '2021-12-01 09:31:53'),
(32, 1, '2016351920', '김해근', '', '2021-12-02 06:45:29', '2021-12-02 06:45:29'),
(33, 1, '1976572038', 'user2', '11111111111', '2021-12-04 13:45:12', '2021-12-04 13:45:12'),
(34, 1, '2019966197', 'user-dev', '010-1111-2222', '2021-12-04 18:46:58', '2021-12-04 18:46:58'),
(35, 1, '2024915965', '서혜영', '', '2021-12-08 08:16:03', '2021-12-08 08:16:03'),
(37, 1, 'kakao-1111', '테스트계정', 'uuid-1111', '2021-12-16 08:31:55', '2021-12-16 08:31:55'),
(38, 1, 'kakao-123489', '이름테스트22', 'uuid-123490', '2021-12-24 06:18:14', '2021-12-24 06:18:14'),
(39, 1, 'kakao-12341', '이름테스트22', 'uuid-12341', '2021-12-24 06:50:01', '2021-12-24 06:50:01');

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

--
-- 테이블의 덤프 데이터 `staff_log`
--

INSERT INTO `staff_log` (`log_id`, `staff_id`, `status`, `phone`, `phone_uuid`, `timestamp`) VALUES
(1, 1, 0, '010-0000-0000', 'abcd1234', '2021-10-07 19:01:47'),
(2, 2, 0, '010-0000-0001', 'aaaa2222', '2021-10-07 19:01:47'),
(3, 3, 0, '010-0000-0003', 'dddd8989', '2021-10-07 19:39:27'),
(4, 4, 0, '010-0000-0004', 'bbbb2002', '2021-10-07 19:39:27'),
(5, 5, 0, '010-0000-0001', 'uuuuhello', '2021-10-14 11:00:33'),
(6, 6, 0, '010-0000-0005', 'uuid5555', '2021-10-14 11:01:03'),
(7, 7, 0, '010-0000-0006', 'uuid6666', '2021-10-14 11:01:03'),
(23, 17, 0, '010-1212-3434', 'uuid-1234', '2021-10-21 15:45:20'),
(24, 17, 1, '010-1212-3434', 'uuid-1234', '2021-10-21 15:45:45'),
(25, 17, 2, '010-1212-3434', 'uuid-1234', '2021-10-21 15:45:58'),
(26, 17, 2, '010-1212-3434', 'uuid-1234', '2021-10-21 15:50:22'),
(28, 17, 1, '010-1212-3434', 'uuid-1234', '2021-10-21 15:56:44'),
(29, 17, 2, '010-1212-3434', 'uuid-1234', '2021-10-21 15:56:57'),
(30, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:30:46'),
(31, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:31:49'),
(32, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:31:56'),
(33, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:32:08'),
(34, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:34:04'),
(35, 25, 0, '010-1212-3434', 'uuid-1234', '2021-11-06 10:36:37'),
(36, 25, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:36:51'),
(37, 25, 2, '010-1212-3434', 'uuid-1234', '2021-11-06 10:36:56'),
(38, 25, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:37:05'),
(39, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-06 10:41:53'),
(40, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-08 15:22:36'),
(41, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-08 15:25:34'),
(42, 17, 2, '010-1212-3434', 'uuid-1234', '2021-11-08 15:25:38'),
(43, 17, 2, '010-1212-3434', 'uuid-1234', '2021-11-08 15:28:00'),
(44, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:01:07'),
(45, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:07:10'),
(46, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:07:16'),
(47, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:07:34'),
(48, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:21:17'),
(49, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:22:01'),
(50, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:22:04'),
(51, 17, 1, '010-1212-3434', 'uuid-1234', '2021-11-24 13:22:08'),
(52, 17, 1, '010-1212-3434', 'uuid-1234', '2021-12-16 06:50:41'),
(53, 36, 0, '010-1111-2222', 'uuid-1111', '2021-12-16 08:01:48'),
(54, 37, 0, '010-1111-2222', 'uuid-1111', '2021-12-16 08:31:55'),
(55, 37, 1, '010-1111-2222', 'uuid-1111', '2021-12-16 08:33:24'),
(56, 37, 2, '010-1111-2222', 'uuid-1111', '2021-12-16 08:51:44'),
(57, 38, 0, '010-1212-3444', 'uuid-123490', '2021-12-24 06:18:14'),
(58, 17, 1, '010-1212-3434', 'uuid-1234', '2021-12-24 06:20:48'),
(59, 17, 2, '010-1212-3434', 'uuid-1234', '2021-12-24 06:21:25'),
(60, 39, 0, '010-1212-3444', 'uuid-12341', '2021-12-24 06:50:01'),
(61, 17, 1, '010-1212-3434', 'uuid-1234', '2021-12-24 06:50:38'),
(62, 17, 2, '010-1212-3434', 'uuid-1234', '2021-12-24 06:50:45'),
(63, 17, 2, '010-1212-3434', 'uuid-1234', '2021-12-24 06:57:46'),
(64, 17, 1, '010-1212-3434', 'uuid-1234', '2021-12-24 06:58:03');

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
-- 테이블의 덤프 데이터 `store`
--

INSERT INTO `store` (`store_id`, `store_type`, `name`, `contact`, `address`, `timestamp`, `store_code`, `brand_id`, `store_category`) VALUES
(1, 0, '본사', '02-520-0984', '역삼동 662-9번지 10호 F LB DESIGN 강남구 서울특별시 KR', '2021-10-07 18:54:09', '99999', NULL, 0),
(2, 1, 'AK 분당', '1661-1114', '경기도 성남시 분당구 황새울로360번길 42', '2021-10-07 18:54:09', '10006', 1, 1),
(3, 2, '맥가이버', '1515-1515', '서울 종로구 지봉로4길 30-3', '2021-10-07 19:35:44', NULL, NULL, 0),
(4, 2, '동대문종합시장', '1616-1616', '서울특별시 종로5.6가동', '2021-10-07 19:35:44', NULL, NULL, 0),
(5, 2, '아트워크 스튜디오', '02-3144-2116', '서울특별시 서대문구 연희동 188-79번지 3층', '2021-10-14 19:35:44', NULL, NULL, 0),
(6, 2, '남대문악세사리상가', '02-778-8932', '서울특별시 중구 남대문시장4길 21 (남창동)', '2021-10-14 19:35:44', NULL, NULL, 0),
(7, 1, 'NC 강남', '02-530-5000', '서울특별시 서초구 잠원로 51 뉴코아 아울렛 강남점', '2021-11-23 15:24:55', '10095', 4, 1),
(8, 2, '금강', '02-1234-1234', '서울특별시 금강', '2021-11-29 15:00:00', NULL, NULL, 0),
(9, 2, '일심사', '02-9999-9999', '서울특별시 일심사', '2021-11-29 15:00:00', NULL, NULL, 0),
(10, 2, '세영사', '02-3333-3333', '서울특별시 세영사', '2021-11-29 15:00:00', NULL, NULL, 0),
(11, 2, '한솥', '02-1111-1111', '서울특별시 한솥', '2021-11-29 15:00:00', NULL, NULL, 0),
(12, 2, '슈바치', '02-5555-5555', '서울특별시 슈바치', '2021-11-29 15:00:00', NULL, NULL, 0),
(13, 1, '롯데강남', '1577-0001\n', '서울특별시 강남구 도곡로 401 롯데백화점', '2021-10-07 18:54:09', '10052', 1, 2),
(14, 1, '갤러리아대전', '042-480-5000\n', '대전광역시 서구 대덕대로 211 갤러리아 타임월드', '2021-11-23 15:24:55', '10023', 4, 2),
(15, 3, 'Factory', '042-480-5000\r\n', '생산업체 예시', '2021-11-23 15:24:55', 'M0027', NULL, 0);

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
