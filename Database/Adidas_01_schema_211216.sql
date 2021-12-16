-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: localhost    Database: Adidas_01
-- ------------------------------------------------------
-- Server version	5.7.36-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `analysis_type`
--

DROP TABLE IF EXISTS `analysis_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `analysis_type` (
  `analysis_id` int(11) NOT NULL AUTO_INCREMENT,
  `analysis_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '내용분석',
  `analysis_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`analysis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='하자 유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `brand_code` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `sms` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 수신 비동의 | 1: 수신 동의',
  `clause` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 약관 비동의 | 1: 약관 동의',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fault_type`
--

DROP TABLE IF EXISTS `fault_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fault_type` (
  `fault_id` int(11) NOT NULL AUTO_INCREMENT,
  `fault_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '과실구분',
  `fault_code` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '0' COMMENT '0: 본사 1: 수선처',
  PRIMARY KEY (`fault_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='하자 유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='제품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `pcategory_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '제품 구분',
  `brand_id` int(11) NOT NULL COMMENT '브랜드 | 0:수선 제외',
  `season_type` int(11) DEFAULT '0' COMMENT '0: 당시즌 | 1: 과시즌',
  `receiver_id` int(11) NOT NULL COMMENT '수선처',
  `receiver_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선처이름',
  PRIMARY KEY (`pcategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='수선유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_code` int(11) DEFAULT NULL COMMENT '수선증 바코드',
  `receipt_type` tinyint(4) DEFAULT NULL COMMENT '1:수선 | 2:교환 | 3:환불 | 4:심의',
  `step` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 미접수 | 1: 접수  ',
  `category` tinyint(4) DEFAULT NULL COMMENT '1:고객용 | 2:매장용 | 3:선처리',
  `store_id` int(11) NOT NULL,
  `store_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `staff_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '바코드/QR',
  `substitute` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:기존 | 1:대체',
  `mailbag` int(11) DEFAULT NULL COMMENT '행낭번호',
  `fault_id` int(11) DEFAULT '0' COMMENT '과실구분',
  `result_id` int(11) DEFAULT '0' COMMENT '판정결과',
  `analysis_id` int(11) DEFAULT '0' COMMENT '내용분석',
  `receiver_id` int(11) DEFAULT NULL COMMENT '최초수신처',
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '본사설명',
  `receipt_date` datetime DEFAULT NULL COMMENT '접수일',
  `register_date` date DEFAULT NULL COMMENT '본사접수일',
  `due_date` datetime DEFAULT NULL COMMENT '고객약속일',
  `return_date` date DEFAULT NULL COMMENT '하자반품일',
  `received_date` datetime DEFAULT NULL COMMENT '수선처/본사 인수일',
  `send_date` datetime DEFAULT NULL COMMENT '매장 발송일 (발송일 to S)',
  `complete_date` datetime DEFAULT NULL COMMENT '매장 인수일',
  `freecharge` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0:유상 | 1:무상',
  `charge` int(11) NOT NULL DEFAULT '0' COMMENT '비용',
  `cash` tinyint(4) DEFAULT NULL COMMENT '0:카드 | 1:현금',
  `cashreceipt_num` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '현금영수증번호',
  PRIMARY KEY (`receipt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='접수 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `receipt_detail`
--

DROP TABLE IF EXISTS `receipt_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receipt_detail` (
  `detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) NOT NULL,
  `receipt_code` int(11) NOT NULL COMMENT '수선증 바코드',
  `mailbag` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '바코드/QR',
  `substitute` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:기존 | 1:대체',
  `num` int(11) NOT NULL,
  `repair_id` tinyint(4) DEFAULT NULL COMMENT '수선유형 (삭제예정)',
  `pcategory_id` int(11) DEFAULT NULL COMMENT '제품 구분',
  `detect_id` tinyint(4) DEFAULT NULL COMMENT '하자유형',
  `step` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:미접수 | 1:접수  ',
  `sender` int(11) NOT NULL,
  `send_date` datetime DEFAULT NULL,
  `image` longtext COLLATE utf8_unicode_ci COMMENT '전체이미지',
  `image1` longtext COLLATE utf8_unicode_ci,
  `image2` longtext COLLATE utf8_unicode_ci,
  `image3` longtext COLLATE utf8_unicode_ci,
  `image4` longtext COLLATE utf8_unicode_ci,
  `message` longtext COLLATE utf8_unicode_ci,
  `receiver` int(11) NOT NULL,
  `received_date` datetime DEFAULT NULL COMMENT '인수일',
  `freecharge` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0:유상 | 1:무상',
  `charge` int(11) NOT NULL DEFAULT '0' COMMENT '비용',
  PRIMARY KEY (`detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `repair_type`
--

DROP TABLE IF EXISTS `repair_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repair_type` (
  `repair_id` int(11) NOT NULL AUTO_INCREMENT,
  `repair_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선유형',
  `receiver` int(11) NOT NULL COMMENT '수선처',
  `receiver_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '수선처이름',
  `priority` int(11) NOT NULL DEFAULT '0' COMMENT '매칭우선순위',
  PRIMARY KEY (`repair_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='수선유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `result_type`
--

DROP TABLE IF EXISTS `result_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `result_type` (
  `result_id` int(11) NOT NULL AUTO_INCREMENT,
  `result_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '판정결과',
  `result_code` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '0' COMMENT '0: 본사 1: 수선처',
  PRIMARY KEY (`result_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='하자 유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL COMMENT '소속',
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '카카오uid',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록시간',
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_log`
--

DROP TABLE IF EXISTS `staff_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0: singin | 1: login | 2: logout | 3: change ',
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `phone_uuid` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_type` tinyint(4) NOT NULL COMMENT '0:본사 | 1:매장 | 2:수선처 | 3:생산업체',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록시간',
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-16 20:05:10
