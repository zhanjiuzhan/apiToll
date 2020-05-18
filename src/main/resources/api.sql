/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : cltest

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-05-18 19:53:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for api
-- ----------------------------
DROP TABLE IF EXISTS `api`;
CREATE TABLE `api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1024) NOT NULL,
  `des` text,
  `content` text,
  `update` datetime DEFAULT NULL,
  `demo1` text,
  `demo2` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api
-- ----------------------------
