/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : cltest

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-05-18 16:54:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for api
-- ----------------------------
DROP TABLE IF EXISTS `api`;
CREATE TABLE `api` (
  `id` int(11) NOT NULL,
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
INSERT INTO `api` VALUES ('1', 'http://tools.jcpl.org/user/add', '添加一个用户信息', '{\"req\":[[\"username\",\"String\",\"用户名 唯一 必填\"],[\"password\",\"String\",\"密码\"],[\"active\",\"int\",\"是否是活跃用户\"]],\"res\":[[\"status\",\"String\",\"200成功 非200失败\"]]}', null, 'http://tools.jcpl.org/user/add?username=cheng', '200');
INSERT INTO `api` VALUES ('2', 'http://tools.jcpl.org/user/get', '取得一个用户信息', '{\"req\":[],\"res\":[]}', null, 'null', 'null');
INSERT INTO `api` VALUES ('3', 'http://tools.jcpl.org/user/del', '删除一个用户信息', '{\"req\":[],\"res\":[]}', null, 'null', 'null');
