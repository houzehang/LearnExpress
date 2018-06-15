CREATE DATABASE  IF NOT EXISTS `xuezike` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `xuezike`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: xuezike
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `cmid` int(10) NOT NULL AUTO_INCREMENT COMMENT '评论索引id',
  `uid` int(10) DEFAULT NULL COMMENT '用户id',
  `msgid` int(10) DEFAULT NULL COMMENT '评论消息id',
  `agreecount` int(10) DEFAULT NULL COMMENT '点赞量',
  `disagreecount` int(10) DEFAULT NULL COMMENT '点踩量',
  `goodsid` int(10) DEFAULT NULL COMMENT '商品id',
  `starlevel` int(10) DEFAULT NULL COMMENT '商品打分',
  `type` smallint(6) DEFAULT NULL COMMENT '评论类型',
  `subtype` smallint(6) DEFAULT NULL COMMENT '评论子类型',
  `tocmid` int(10) DEFAULT NULL COMMENT '回复评论id',
  `content` varchar(512) DEFAULT NULL COMMENT '评论类容',
  `createtime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`cmid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `goodsid` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `classid` int(10) DEFAULT NULL COMMENT '所属类目id',
  `name` varchar(64) DEFAULT NULL COMMENT '商品名称',
  `price` int(10) DEFAULT NULL COMMENT '商品价格',
  `desc` varchar(255) DEFAULT NULL COMMENT '商品描述',
  `imglist` varchar(512) DEFAULT NULL COMMENT '图片路径集合',
  `leftcount` int(10) DEFAULT NULL COMMENT '库存',
  `tradecount` int(10) DEFAULT NULL COMMENT '成交量',
  `show` smallint(6) DEFAULT NULL COMMENT '是否展示',
  `createtime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`goodsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `shopid` int(10) NOT NULL AUTO_INCREMENT COMMENT '店铺Id',
  `uid` int(10) DEFAULT NULL COMMENT '用户ID',
  `name` varchar(64) DEFAULT NULL COMMENT '商店名称',
  `logo` varchar(255) DEFAULT NULL COMMENT '商店图标',
  `kinds` varchar(30) DEFAULT NULL COMMENT '商店经营类目',
  `sid` int(10) DEFAULT NULL COMMENT '所在学校id',
  `open` smallint(6) DEFAULT NULL COMMENT '是否营业',
  `goodscount` varchar(255) DEFAULT NULL COMMENT '商品数量',
  `notice` varchar(255) DEFAULT NULL COMMENT '店铺公告',
  `scope` varchar(255) DEFAULT NULL COMMENT '派送范围',
  `carryprice` int(10) DEFAULT NULL COMMENT '起送价格',
  `people` varchar(20) DEFAULT NULL COMMENT '服务对象',
  `tradeway` varchar(20) DEFAULT NULL COMMENT '交易方式',
  `payway` varchar(20) DEFAULT NULL COMMENT '支付方式',
  `createtime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`shopid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '用户ID',
  `name` varchar(64) DEFAULT NULL COMMENT '姓名',
  `sex` smallint(6) DEFAULT NULL COMMENT '性别',
  `age` int(10) DEFAULT NULL,
  `sid` int(10) DEFAULT NULL,
  `tel` varchar(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `score` int(10) DEFAULT NULL,
  `createtime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_duplicate` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户唯一id，自动生成',
  `username` varchar(45) NOT NULL COMMENT '用户名',
  `phone` varchar(45) NOT NULL COMMENT '手机号',
  `email` varchar(45) NOT NULL COMMENT '邮箱',
  `createTime` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `password` varchar(45) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-14 23:39:04
