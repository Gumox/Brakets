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
-- Dumping data for table `analysis_type`
--

LOCK TABLES `analysis_type` WRITE;
/*!40000 ALTER TABLE `analysis_type` DISABLE KEYS */;
INSERT INTO `analysis_type` VALUES (1,'올풀림',1),(2,'봉제',3),(3,'원단',4),(4,'재단',5),(5,'탈색',6),(6,'이염',7),(7,'수축',8),(8,'늘어남',9),(9,'필링',10),(10,'스냅/단추',12),(11,'지퍼',13),(12,'부자재',14),(13,'스트링',15),(14,'자수',16),(15,'나염',17),(16,'접착',18),(17,'모자꼭지',19),(18,'모자챙',20),(19,'카라/시보리',21),(20,'원단손상',22),(21,'착용흔적',23),(22,'오염',24),(23,'사이즈수선',25),(24,'워싱',28),(25,'주름',29),(27,'세탁표기',30),(28,'털',31),(29,'구두굽',32),(30,'배송',33),(35,'협찬',34),(36,'지퍼슬라이더',35),(37,'지퍼풀(장식)',36),(38,'벨크로',37),(39,'충전재빠짐',38),(40,'충전재불량',39),(41,'후드털',40),(42,'기타',27);
/*!40000 ALTER TABLE `analysis_type` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Adidas','A'),(2,'Adidas Men','AM'),(3,'Adidas WOMEN','AW'),(4,'Adidas KID','AK');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'홍길동','010-1234-1234',1,1,'2021-10-07 19:03:53'),(2,'가나다','010-2323-3124',0,1,'2021-11-18 14:40:05'),(3,'고객테스트','010-2222-1111',1,0,'2021-11-29 07:53:03'),(4,'고객테스트2','010-1111-3333',1,1,'2021-11-29 08:15:40'),(5,'고객테스트1','010-2222-1111',1,0,'2021-12-16 08:56:49');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `fault_type`
--

LOCK TABLES `fault_type` WRITE;
/*!40000 ALTER TABLE `fault_type` DISABLE KEYS */;
INSERT INTO `fault_type` VALUES (1,'고객과실',1,1),(2,'고객요구',2,0),(3,'본사과실',3,0),(4,'업체과실',4,0),(5,'유통과실',5,0),(6,'제품특성',6,1),(7,'기타',7,0),(8,'부자재분실',8,0);
/*!40000 ALTER TABLE `fault_type` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'AAAA0001','QQQQRRR1','에어로 3S 쇼츠','22S','Black','S','DKBN40761','1','https://image.adidas.co.kr/upload/prod/basic/source/GM0643-01-05.jpg','2020-10-11'),(2,'AAAA0002','QQQQRRR2','디즈니X픽사 올림픽 후디','22F','Black','L','DKCP40741','1','https://image.adidas.co.kr/upload/prod/basic/source/HC6927-01-02.jpg','2020-11-11'),(3,'8809831730979','306F482BC850184005F5E10D90141200','(데모) 락업 트랙탑','21F','Black','M','DKCP41761','1','https://image.adidas.co.kr/upload/prod/basic/source/H41391-05-01.jpg','2020-12-12');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'의류',1,0,1,'아디다스코리아(본사)'),(2,'가방',1,0,1,'아디다스코리아(본사)'),(3,'신발',1,0,1,'아디다스코리아(본사)'),(4,'의류',1,1,1,'아디다스코리아(본사)'),(5,'가방',1,1,1,'아디다스코리아(본사)'),(6,'신발',1,1,1,'아디다스코리아(본사)'),(7,'의류',2,0,1,'아디다스코리아(본사)'),(8,'가방',2,0,1,'아디다스코리아(본사)'),(9,'신발',2,0,1,'아디다스코리아(본사)'),(10,'의류',2,1,1,'아디다스코리아(본사)'),(11,'가방',2,1,1,'아디다스코리아(본사)'),(12,'신발',2,1,1,'아디다스코리아(본사)'),(13,'의류',1,1,8,'금강'),(14,'가방',1,1,9,'일심사'),(15,'신발',1,1,9,'일심사'),(16,'의류',2,0,3,'맥가이버'),(17,'의류',2,1,3,'맥가이버'),(18,'의류',2,1,8,'금강'),(19,'가방',2,1,11,'한솥'),(20,'신발',2,1,12,'슈바치'),(21,'의류',0,0,1,'아디다스코리아(본사)'),(22,'가방',0,0,1,'아디다스코리아(본사)'),(23,'신발',0,0,1,'아디다스코리아(본사)');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (1,7099433,1,1,2,2,'아디다스 오리지널스 홍대 직영점',2,1,1,'AAAA0001',0,5678900,1,6,1,1,'설명','2021-10-11 00:00:00','2021-10-11','2021-10-25 00:00:00',NULL,NULL,'2021-12-11 00:00:00','2021-12-12 00:00:00',0,10000,1,'023254717'),(10,7099434,2,0,3,2,NULL,2,2,3,'306F482BC850184005F5E10D90141200',0,NULL,0,0,0,NULL,'',NULL,NULL,'2021-11-16 00:00:00',NULL,NULL,NULL,NULL,1,0,NULL,NULL),(11,7099435,3,0,1,2,NULL,2,1,3,'306F482BC850184005F5E10D90141200',0,NULL,0,0,0,NULL,'',NULL,NULL,'2021-11-24 00:00:00',NULL,NULL,NULL,NULL,1,0,NULL,NULL),(13,1313131313,1,1,1,2,NULL,2,1,3,'306F482BC850184005F5E10D90141200',0,11113333,4,4,20,3,'본사설명입니다','2021-11-17 00:00:00','2021-11-20','2021-11-29 00:00:00','2021-12-07',NULL,NULL,NULL,1,0,NULL,NULL),(14,123123123,1,1,1,2,NULL,2,2,3,'306F482BC850184005F5E10D90141200',0,1111,5,4,22,3,'본사설명!','2021-11-19 00:00:00','2021-11-25','2021-11-29 00:00:00','2021-12-02',NULL,NULL,NULL,1,0,NULL,NULL),(15,124124124,1,0,1,7,NULL,2,1,3,'306F482BC850184005F5E10D90141200',0,NULL,0,0,0,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL),(16,1313131314,1,1,1,7,NULL,2,2,3,'306F482BC850184005F5E10D90141200',0,11113334,1,3,20,3,'본사설명입니다','2021-11-05 00:00:00','2021-11-20','2021-11-29 00:00:00',NULL,NULL,'2021-12-05 00:00:00','2021-12-07 00:00:00',0,3000,1,'021134982'),(17,123123124,1,1,1,2,NULL,2,2,3,'306F482BC850184005F5E10D90141200',0,1114,2,3,22,3,'본사설명!','2021-11-19 00:00:00','2021-11-21','2021-11-29 00:00:00',NULL,NULL,'2021-11-30 00:00:00','2021-12-01 00:00:00',0,2000,1,'021135982'),(18,1313131315,1,1,1,7,NULL,2,1,3,'306F482BC850184005F5E10D90141200',0,11113334,1,3,20,3,'본사설명입니다','2021-11-23 00:00:00','2021-11-20','2021-11-29 00:00:00',NULL,NULL,'2021-12-06 00:00:00','2021-12-07 00:00:00',0,3000,1,'023241234'),(19,123123125,1,1,1,2,NULL,2,2,2,'QQQQRRR2',0,1114,2,3,22,3,'본사설명!','2021-11-02 00:00:00','2021-11-21','2021-11-29 00:00:00',NULL,NULL,'2021-11-30 00:00:00','2021-12-01 00:00:00',0,2000,1,'0312129887'),(20,NULL,NULL,0,1,2,NULL,2,1,3,'306F482BC850184005F5E10D90141200',0,NULL,0,0,0,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `receipt_detail`
--

LOCK TABLES `receipt_detail` WRITE;
/*!40000 ALTER TABLE `receipt_detail` DISABLE KEYS */;
INSERT INTO `receipt_detail` VALUES (1,1,7099433,9876000,1,'AAAA0001',0,1,1,1,NULL,1,1,'2021-10-11 00:00:00','receipt/1/1.jpg','receipt/1/1-1.jpg',NULL,NULL,NULL,'추가요청사항-수선1번 원단',3,NULL,0,2000),(2,1,7099433,9876000,1,'AAAA0001',0,2,1,1,NULL,1,1,'2021-10-11 00:00:00','receipt/1/2.jpg','receipt/1/2-1.jpg',NULL,NULL,NULL,'추가요청사항-수선2번 원단',3,NULL,0,3000),(3,1,7099433,3456000,1,'AAAA0001',0,3,3,3,NULL,1,1,'2021-10-11 00:00:00','receipt/1/3.jpg','receipt/1/3-1.jpg','receipt/1/3-2.jpg',NULL,NULL,'추가요청사항-수선3번 부자재',4,NULL,0,5000),(37,13,1313131313,11113333,3,'306F482BC850184005F5E10D90141200',0,1,NULL,2,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,'hello2',3,NULL,1,0),(38,14,123123123,1111,3,'306F482BC850184005F5E10D90141200',0,1,NULL,2,NULL,1,2,NULL,'http://13.125.232.214/storage/receipt/14-1-image.jpg','http://13.125.232.214/storage/receipt/14-1-image1.jpg',NULL,NULL,NULL,'hello0',3,NULL,1,0),(48,14,123123123,1111,3,'306F482BC850184005F5E10D90141200',0,2,NULL,2,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,'hello0',3,NULL,1,0),(49,14,123123123,1111,3,'306F482BC850184005F5E10D90141200',0,3,NULL,2,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,'hello2',3,NULL,1,0),(50,16,1313131314,11113334,3,'306F482BC850184005F5E10D90141200',0,1,NULL,2,NULL,1,2,'2021-12-06 00:00:00',NULL,NULL,NULL,NULL,NULL,'hello2',3,NULL,0,3000),(51,17,123123124,1114,3,'306F482BC850184005F5E10D90141200',0,1,NULL,2,NULL,1,2,'2021-11-28 00:00:00',NULL,NULL,NULL,NULL,NULL,'hello0',3,NULL,0,2000),(52,18,1313131315,11113334,3,'306F482BC850184005F5E10D90141200',0,1,NULL,2,NULL,1,2,'2021-12-06 00:00:00',NULL,NULL,NULL,NULL,NULL,'hello2',3,NULL,0,3000),(53,19,123123125,1114,2,'QQQQRRR2',0,1,NULL,2,NULL,1,2,'2021-11-28 00:00:00',NULL,NULL,NULL,NULL,NULL,'hello0',3,NULL,0,2000),(54,14,123123123,1111,3,'306F482BC850184005F5E10D90141200',0,4,NULL,2,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,'hello0',3,NULL,1,0),(55,14,123123123,1111,3,'306F482BC850184005F5E10D90141200',0,5,NULL,2,NULL,1,2,NULL,NULL,NULL,NULL,NULL,NULL,'hello2',3,NULL,1,0);
/*!40000 ALTER TABLE `receipt_detail` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `repair_type`
--

LOCK TABLES `repair_type` WRITE;
/*!40000 ALTER TABLE `repair_type` DISABLE KEYS */;
INSERT INTO `repair_type` VALUES (0,'본사',1,'아디다스코리아(본사)',0),(1,'원단',3,'맥가이버',0),(2,'봉제',3,'맥가이버',0),(3,'부자재',4,'동대문종합시장',0),(4,'아트워크',5,'아트워크 스튜디오',0),(5,'악세사리',6,'남대문악세사리상가',0),(6,'부자재',3,'맥가이버',1);
/*!40000 ALTER TABLE `repair_type` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `result_type`
--

LOCK TABLES `result_type` WRITE;
/*!40000 ALTER TABLE `result_type` DISABLE KEYS */;
INSERT INTO `result_type` VALUES (1,'본사수선',2,0),(2,'업체수선',3,0),(3,'외주수선',11,1),(4,'하자반품',5,0),(5,'업체교환',8,0),(6,'업체클레임',4,0),(7,'매장반송',6,1),(8,'본사반송',12,1),(9,'외부심의',NULL,0),(10,'심의반송',9,0),(11,'기타',7,0);
/*!40000 ALTER TABLE `result_type` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,1,'kakao-1234-1234','admin(본사)','010-0000-0000','2021-10-07 18:59:37','2021-10-07 18:59:37'),(2,2,'kakao-abce-1234','admin(홍대점)','010-0000-0001','2021-10-07 18:59:37','2021-10-07 18:59:37'),(3,3,'kakao-dddd-8989','admin(맥가이버)','010-0000-0003','2021-10-07 18:59:37','2021-10-07 18:59:37'),(4,4,'kakao-eeee-9999','admin(동대문종합시장)','010-0000-0004','2021-10-07 18:59:37','2021-10-07 18:59:37'),(5,2,'hello','test','010-0000-0001','2021-10-07 18:59:37','2021-10-07 18:59:37'),(6,5,'kakao-acac-5555','admin(아트워크 스튜디오)','010-0000-0005','2021-10-14 18:59:37','2021-10-14 18:59:37'),(7,6,'kakao-acac-6666','admin(남대문악세사리상가)','010-0000-0006','2021-10-14 18:59:37','2021-10-14 18:59:37'),(17,1,'kakao-1234','이름테스트','010-1212-3434','2021-10-21 15:45:20','2021-10-21 15:45:20'),(23,1,'1976581751','admin-dev','11111111111','2021-11-03 18:22:11','2021-11-03 18:22:11'),(25,1,'kakao-12aa34','이름테스트','uuid-1234','2021-11-06 10:36:37','2021-11-06 10:36:37'),(29,1,'1976116027','user2','11111111111','2021-12-01 08:27:04','2021-12-01 08:27:04'),(30,1,'2015002407','권순욱','01032810409','2021-12-01 08:34:27','2021-12-01 08:34:27'),(31,1,'2015103011','정지은','','2021-12-01 09:31:53','2021-12-01 09:31:53'),(32,1,'2016351920','김해근','','2021-12-02 06:45:29','2021-12-02 06:45:29'),(33,1,'1976572038','user2','11111111111','2021-12-04 13:45:12','2021-12-04 13:45:12'),(34,1,'2019966197','user-dev','010-1111-2222','2021-12-04 18:46:58','2021-12-04 18:46:58'),(35,1,'2024915965','서혜영','','2021-12-08 08:16:03','2021-12-08 08:16:03'),(37,1,'kakao-1111','테스트계정','uuid-1111','2021-12-16 08:31:55','2021-12-16 08:31:55');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `staff_log`
--

LOCK TABLES `staff_log` WRITE;
/*!40000 ALTER TABLE `staff_log` DISABLE KEYS */;
INSERT INTO `staff_log` VALUES (1,1,0,'010-0000-0000','abcd1234','2021-10-07 19:01:47'),(2,2,0,'010-0000-0001','aaaa2222','2021-10-07 19:01:47'),(3,3,0,'010-0000-0003','dddd8989','2021-10-07 19:39:27'),(4,4,0,'010-0000-0004','bbbb2002','2021-10-07 19:39:27'),(5,5,0,'010-0000-0001','uuuuhello','2021-10-14 11:00:33'),(6,6,0,'010-0000-0005','uuid5555','2021-10-14 11:01:03'),(7,7,0,'010-0000-0006','uuid6666','2021-10-14 11:01:03'),(23,17,0,'010-1212-3434','uuid-1234','2021-10-21 15:45:20'),(24,17,1,'010-1212-3434','uuid-1234','2021-10-21 15:45:45'),(25,17,2,'010-1212-3434','uuid-1234','2021-10-21 15:45:58'),(26,17,2,'010-1212-3434','uuid-1234','2021-10-21 15:50:22'),(28,17,1,'010-1212-3434','uuid-1234','2021-10-21 15:56:44'),(29,17,2,'010-1212-3434','uuid-1234','2021-10-21 15:56:57'),(30,17,1,'010-1212-3434','uuid-1234','2021-11-06 10:30:46'),(31,17,1,'010-1212-3434','uuid-1234','2021-11-06 10:31:49'),(32,17,1,'010-1212-3434','uuid-1234','2021-11-06 10:31:56'),(33,17,1,'010-1212-3434','uuid-1234','2021-11-06 10:32:08'),(34,17,1,'010-1212-3434','uuid-1234','2021-11-06 10:34:04'),(35,25,0,'010-1212-3434','uuid-1234','2021-11-06 10:36:37'),(36,25,1,'010-1212-3434','uuid-1234','2021-11-06 10:36:51'),(37,25,2,'010-1212-3434','uuid-1234','2021-11-06 10:36:56'),(38,25,1,'010-1212-3434','uuid-1234','2021-11-06 10:37:05'),(39,17,1,'010-1212-3434','uuid-1234','2021-11-06 10:41:53'),(40,17,1,'010-1212-3434','uuid-1234','2021-11-08 15:22:36'),(41,17,1,'010-1212-3434','uuid-1234','2021-11-08 15:25:34'),(42,17,2,'010-1212-3434','uuid-1234','2021-11-08 15:25:38'),(43,17,2,'010-1212-3434','uuid-1234','2021-11-08 15:28:00'),(44,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:01:07'),(45,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:07:10'),(46,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:07:16'),(47,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:07:34'),(48,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:21:17'),(49,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:22:01'),(50,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:22:04'),(51,17,1,'010-1212-3434','uuid-1234','2021-11-24 13:22:08'),(52,17,1,'010-1212-3434','uuid-1234','2021-12-16 06:50:41'),(53,36,0,'010-1111-2222','uuid-1111','2021-12-16 08:01:48'),(54,37,0,'010-1111-2222','uuid-1111','2021-12-16 08:31:55'),(55,37,1,'010-1111-2222','uuid-1111','2021-12-16 08:33:24'),(56,37,2,'010-1111-2222','uuid-1111','2021-12-16 08:51:44');
/*!40000 ALTER TABLE `staff_log` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,0,'아디다스코리아(본사)','1588-8241','서울특별시 서초구 서초대로 74길 4, 삼성생명 서초타워 23층','2021-10-07 18:54:09'),(2,1,'아디다스 오리지널스 홍대 직영점','02-338-6346','서울특별시 마포구 동교동 홍익로6길 27','2021-10-07 18:54:09'),(3,2,'맥가이버','1515-1515','서울 종로구 지봉로4길 30-3','2021-10-07 19:35:44'),(4,2,'동대문종합시장','1616-1616','서울특별시 종로5.6가동','2021-10-07 19:35:44'),(5,2,'아트워크 스튜디오','02-3144-2116','서울특별시 서대문구 연희동 188-79번지 3층','2021-10-14 19:35:44'),(6,2,'남대문악세사리상가','02-778-8932','서울특별시 중구 남대문시장4길 21 (남창동)','2021-10-14 19:35:44'),(7,1,'아디다스 현대신촌OFS점','02-3145-1518','서울 서대문구 신촌로 83 현대백화점','2021-11-23 15:24:55'),(8,2,'금강','02-1234-1234','서울특별시 금강','2021-11-29 15:00:00'),(9,2,'일심사','02-9999-9999','서울특별시 일심사','2021-11-29 15:00:00'),(10,2,'세영사','02-3333-3333','서울특별시 세영사','2021-11-29 15:00:00'),(11,2,'한솥','02-1111-1111','서울특별시 한솥','2021-11-29 15:00:00'),(12,2,'슈바치','02-5555-5555','서울특별시 슈바치','2021-11-29 15:00:00');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-16 20:07:22
