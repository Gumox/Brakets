-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 21-12-29 18:16
-- 서버 버전: 5.7.36-0ubuntu0.18.04.1
-- PHP 버전: 7.2.24-0ubuntu0.18.04.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `Headquarters`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `headquarters`
--

CREATE TABLE `headquarters` (
  `hq_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '본사이름',
  `name_kr` varchar(20) NOT NULL COMMENT '한글이름',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록시간'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `headquarters`
--
ALTER TABLE `headquarters`
  ADD PRIMARY KEY (`hq_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `headquarters`
--
ALTER TABLE `headquarters`
  MODIFY `hq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
