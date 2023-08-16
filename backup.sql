-- MySQL dump 10.13  Distrib 5.7.43, for Win64 (x86_64)
--
-- Host: localhost    Database: CMMS
-- ------------------------------------------------------
-- Server version	5.7.43-log

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
-- Table structure for table `hardware_assets`
--

DROP TABLE IF EXISTS `hardware_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hardware_assets` (
  `HwId` int(11) NOT NULL AUTO_INCREMENT,
  `hwName` varchar(255) NOT NULL,
  `hwDesc` text,
  `purchaseDesc` text,
  `purchaseDate` date DEFAULT NULL,
  `distributor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`HwId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hardware_assets`
--

LOCK TABLES `hardware_assets` WRITE;
/*!40000 ALTER TABLE `hardware_assets` DISABLE KEYS */;
INSERT INTO `hardware_assets` VALUES (1,'Laptop','Dell Inspiron 15','Office equipment','2023-08-01','Tech Supplies Inc.'),(2,'Server','HP ProLiant DL380','Data center server','2023-07-15','Server Superstore'),(3,'Monitor','LG UltraWide 34\"','Computer monitor','2023-08-05','Tech Gear Outlet'),(4,'Printer','Canon PIXMA MX922','All-in-one printer','2023-07-20','Office Solutions Co.'),(5,'Router','Linksys AC2200','Wireless router','2023-08-02','Network Devices Ltd.'),(6,'Scanner','Epson Perfection V600','Flatbed scanner','2023-07-25','Office Equipment Emporium'),(11,'Printer','High graphic Printer','Online purchase','2023-08-11','Bayo Electronics'),(12,'Scanner','High graphic Scanner','Retail purchase','2023-08-24','Zeta Electronics');
/*!40000 ALTER TABLE `hardware_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software_assets`
--

DROP TABLE IF EXISTS `software_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software_assets` (
  `SwId` int(11) NOT NULL AUTO_INCREMENT,
  `HwId` int(11) DEFAULT NULL,
  `Id` int(11) DEFAULT NULL,
  `swName` varchar(255) NOT NULL,
  `swDesc` text,
  `purchaseDesc` text,
  `purchaseDate` date DEFAULT NULL,
  `distributor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SwId`),
  KEY `HwId` (`HwId`),
  KEY `Id` (`Id`),
  CONSTRAINT `software_assets_ibfk_1` FOREIGN KEY (`HwId`) REFERENCES `hardware_assets` (`HwId`),
  CONSTRAINT `software_assets_ibfk_2` FOREIGN KEY (`Id`) REFERENCES `users_credentials` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software_assets`
--

LOCK TABLES `software_assets` WRITE;
/*!40000 ALTER TABLE `software_assets` DISABLE KEYS */;
INSERT INTO `software_assets` VALUES (1,1,1,'Mysql','Database Management','Mysql database management','2023-08-01','Tech Supplies Inc.'),(2,2,2,'Node.js','Web development','Dev application','2023-07-25','Server Superstore'),(3,3,3,'Whatsapp','This is an instant messaging app!','Instant Messsager','2023-08-09','Meta Inc'),(4,4,4,'Andriod','Mobile Phone Operating system','It is used to develope Mobile phone enviroment','2023-08-10','Samsung inc.'),(5,5,5,'Apple','Mobile Phone Operating system','It is used to develope Mobile phone enviroment','2023-08-10','Apple inc.'),(6,3,2,'Docker','This is a developement environment','It deploys a virtual environment for coding ','2023-11-11','docker Inc'),(7,4,7,'X','Social Media Platform','Social application','2023-08-13','Twitter Inc');
/*!40000 ALTER TABLE `software_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_credentials`
--

DROP TABLE IF EXISTS `users_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_credentials` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `First_name` varchar(50) NOT NULL,
  `Last_name` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone_number` varchar(20) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_credentials`
--

LOCK TABLES `users_credentials` WRITE;
/*!40000 ALTER TABLE `users_credentials` DISABLE KEYS */;
INSERT INTO `users_credentials` VALUES (1,'John','Doe','johndoe','mysecretpassword','johndoe@example.com','123-456-7890','New York'),(2,'Joel','Paul','joelpaul','mysecretpass','joelpaul@gmail.com','0703-589-7528','Lagos'),(3,'Grey','Max','Grey_max','Grey12345','Tayoanuoluwapo@yahoo.com','101-204-4459','Abuja'),(4,'Tom','Sands','Tommy','Tomrocks5','Tommysands@hotmail.com','101-555-1247','Kigali'),(5,'Tom','Cruise','Tommy','Adele34','Tommy4life@hotmail.com','100-000-1111','New-york'),(6,'Som','Crust','Tommy','Tomxyton','summer@hotmail.com','100-254-1111','Montreal'),(7,'Joel','Zubair','Zubair16','Zueggxy','Joel234@gmail.com','0802-771-8478','London');
/*!40000 ALTER TABLE `users_credentials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-15 23:20:09
