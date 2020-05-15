/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : cltest

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-05-15 21:00:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for api
-- ----------------------------
DROP TABLE IF EXISTS `api`;
CREATE TABLE `api` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `des` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `update` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api
-- ----------------------------
INSERT INTO `api` VALUES ('1', 'http://localhost:8080/adduser', '添加用户的api', null, '2020-05-15 17:18:35');
INSERT INTO `api` VALUES ('2', 'http://localhost:8080/deluser', '删除用户的api', '', '2020-05-15 17:18:35');
