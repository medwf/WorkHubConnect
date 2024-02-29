-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: workhubconnect_db
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state_id` int NOT NULL,
  `name` varchar(128) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=405 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,6,'Aïn Harrouda','2024-02-13 19:35:17','2024-02-13 19:35:17'),(2,6,'Ben Yakhlef','2024-02-13 19:35:17','2024-02-13 19:35:17'),(3,6,'Bouskoura','2024-02-13 19:35:17','2024-02-13 19:35:17'),(4,6,'Casablanca','2024-02-13 19:35:17','2024-02-13 19:35:17'),(5,6,'Médiouna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(6,6,'Mohammadia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(7,6,'Tit Mellil','2024-02-13 19:35:17','2024-02-13 19:35:17'),(8,6,'Ben Yakhlef','2024-02-13 19:35:17','2024-02-13 19:35:17'),(9,5,'Bejaâd','2024-02-13 19:35:17','2024-02-13 19:35:17'),(10,6,'Ben Ahmed','2024-02-13 19:35:17','2024-02-13 19:35:17'),(11,6,'Benslimane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(12,6,'Berrechid','2024-02-13 19:35:17','2024-02-13 19:35:17'),(13,5,'Boujniba','2024-02-13 19:35:17','2024-02-13 19:35:17'),(14,5,'Boulanouare','2024-02-13 19:35:17','2024-02-13 19:35:17'),(15,6,'Bouznika','2024-02-13 19:35:17','2024-02-13 19:35:17'),(16,6,'Deroua','2024-02-13 19:35:17','2024-02-13 19:35:17'),(17,6,'El Borouj','2024-02-13 19:35:17','2024-02-13 19:35:17'),(18,6,'El Gara','2024-02-13 19:35:17','2024-02-13 19:35:17'),(19,6,'Guisser','2024-02-13 19:35:17','2024-02-13 19:35:17'),(20,5,'Hattane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(21,5,'Khouribga','2024-02-13 19:35:17','2024-02-13 19:35:17'),(22,6,'Loulad','2024-02-13 19:35:17','2024-02-13 19:35:17'),(23,5,'Oued Zem','2024-02-13 19:35:17','2024-02-13 19:35:17'),(24,6,'Oulad Abbou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(25,6,'Oulad H\'Riz Sahel','2024-02-13 19:35:17','2024-02-13 19:35:17'),(26,6,'Oulad M\'rah','2024-02-13 19:35:17','2024-02-13 19:35:17'),(27,6,'Oulad Saïd','2024-02-13 19:35:17','2024-02-13 19:35:17'),(28,6,'Oulad Sidi Ben Daoud','2024-02-13 19:35:17','2024-02-13 19:35:17'),(29,6,'Ras El Aïn','2024-02-13 19:35:17','2024-02-13 19:35:17'),(30,6,'Settat','2024-02-13 19:35:17','2024-02-13 19:35:17'),(31,6,'Sidi Rahhal Chataï','2024-02-13 19:35:17','2024-02-13 19:35:17'),(32,6,'Soualem','2024-02-13 19:35:17','2024-02-13 19:35:17'),(33,6,'Azemmour','2024-02-13 19:35:17','2024-02-13 19:35:17'),(34,6,'Bir Jdid','2024-02-13 19:35:17','2024-02-13 19:35:17'),(35,7,'Bouguedra','2024-02-13 19:35:17','2024-02-13 19:35:17'),(36,7,'Echemmaia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(37,6,'El Jadida','2024-02-13 19:35:17','2024-02-13 19:35:17'),(38,7,'Hrara','2024-02-13 19:35:17','2024-02-13 19:35:17'),(39,7,'Ighoud','2024-02-13 19:35:17','2024-02-13 19:35:17'),(40,7,'Jamâat Shaim','2024-02-13 19:35:17','2024-02-13 19:35:17'),(41,6,'Jorf Lasfar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(42,6,'Khemis Zemamra','2024-02-13 19:35:17','2024-02-13 19:35:17'),(43,6,'Laaounate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(44,6,'Moulay Abdallah','2024-02-13 19:35:17','2024-02-13 19:35:17'),(45,6,'Oualidia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(46,6,'Oulad Amrane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(47,6,'Oulad Frej','2024-02-13 19:35:17','2024-02-13 19:35:17'),(48,6,'Oulad Ghadbane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(49,7,'Safi','2024-02-13 19:35:17','2024-02-13 19:35:17'),(50,6,'Sebt El Maârif','2024-02-13 19:35:17','2024-02-13 19:35:17'),(51,7,'Sebt Gzoula','2024-02-13 19:35:17','2024-02-13 19:35:17'),(52,7,'Sidi Ahmed','2024-02-13 19:35:17','2024-02-13 19:35:17'),(53,6,'Sidi Ali Ban Hamdouche','2024-02-13 19:35:17','2024-02-13 19:35:17'),(54,6,'Sidi Bennour','2024-02-13 19:35:17','2024-02-13 19:35:17'),(55,6,'Sidi Bouzid','2024-02-13 19:35:17','2024-02-13 19:35:17'),(56,6,'Sidi Smaïl','2024-02-13 19:35:17','2024-02-13 19:35:17'),(57,7,'Youssoufia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(58,3,'Fès','2024-02-13 19:35:17','2024-02-13 19:35:17'),(59,3,'Aïn Cheggag','2024-02-13 19:35:17','2024-02-13 19:35:17'),(60,3,'Bhalil','2024-02-13 19:35:17','2024-02-13 19:35:17'),(61,3,'Boulemane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(62,3,'El Menzel','2024-02-13 19:35:17','2024-02-13 19:35:17'),(63,3,'Guigou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(64,3,'Imouzzer Kandar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(65,3,'Imouzzer Marmoucha','2024-02-13 19:35:17','2024-02-13 19:35:17'),(66,3,'Missour','2024-02-13 19:35:17','2024-02-13 19:35:17'),(67,3,'Moulay Yaâcoub','2024-02-13 19:35:17','2024-02-13 19:35:17'),(68,3,'Ouled Tayeb','2024-02-13 19:35:17','2024-02-13 19:35:17'),(69,3,'Outat El Haj','2024-02-13 19:35:17','2024-02-13 19:35:17'),(70,3,'Ribate El Kheir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(71,3,'Séfrou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(72,3,'Skhinate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(73,3,'Tafajight','2024-02-13 19:35:17','2024-02-13 19:35:17'),(74,4,'Arbaoua','2024-02-13 19:35:17','2024-02-13 19:35:17'),(75,1,'Aïn Dorij','2024-02-13 19:35:17','2024-02-13 19:35:17'),(76,4,'Dar Gueddari','2024-02-13 19:35:17','2024-02-13 19:35:17'),(77,4,'Had Kourt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(78,4,'Jorf El Melha','2024-02-13 19:35:17','2024-02-13 19:35:17'),(79,4,'Kénitra','2024-02-13 19:35:17','2024-02-13 19:35:17'),(80,4,'Khenichet','2024-02-13 19:35:17','2024-02-13 19:35:17'),(81,4,'Lalla Mimouna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(82,4,'Mechra Bel Ksiri','2024-02-13 19:35:17','2024-02-13 19:35:17'),(83,4,'Mehdia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(84,4,'Moulay Bousselham','2024-02-13 19:35:17','2024-02-13 19:35:17'),(85,4,'Sidi Allal Tazi','2024-02-13 19:35:17','2024-02-13 19:35:17'),(86,4,'Sidi Kacem','2024-02-13 19:35:17','2024-02-13 19:35:17'),(87,4,'Sidi Slimane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(88,4,'Sidi Taibi','2024-02-13 19:35:17','2024-02-13 19:35:17'),(89,4,'Sidi Yahya El Gharb','2024-02-13 19:35:17','2024-02-13 19:35:17'),(90,4,'Souk El Arbaa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(91,9,'Akka','2024-02-13 19:35:17','2024-02-13 19:35:17'),(92,10,'Assa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(93,10,'Bouizakarne','2024-02-13 19:35:17','2024-02-13 19:35:17'),(94,10,'El Ouatia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(95,11,'Es-Semara','2024-02-13 19:35:17','2024-02-13 19:35:17'),(96,9,'Fam El Hisn','2024-02-13 19:35:17','2024-02-13 19:35:17'),(97,9,'Foum Zguid','2024-02-13 19:35:17','2024-02-13 19:35:17'),(98,10,'Guelmim','2024-02-13 19:35:17','2024-02-13 19:35:17'),(99,10,'Taghjijt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(100,10,'Tan-Tan','2024-02-13 19:35:17','2024-02-13 19:35:17'),(101,9,'Tata','2024-02-13 19:35:17','2024-02-13 19:35:17'),(102,10,'Zag','2024-02-13 19:35:17','2024-02-13 19:35:17'),(103,7,'Marrakech','2024-02-13 19:35:17','2024-02-13 19:35:17'),(104,7,'Ait Daoud','2024-02-13 19:35:17','2024-02-13 19:35:17'),(115,7,'Amizmiz','2024-02-13 19:35:17','2024-02-13 19:35:17'),(116,7,'Assahrij','2024-02-13 19:35:17','2024-02-13 19:35:17'),(117,7,'Aït Ourir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(118,7,'Ben Guerir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(119,7,'Chichaoua','2024-02-13 19:35:17','2024-02-13 19:35:17'),(120,7,'El Hanchane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(121,7,'El Kelaâ des Sraghna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(122,7,'Essaouira','2024-02-13 19:35:17','2024-02-13 19:35:17'),(123,7,'Fraïta','2024-02-13 19:35:17','2024-02-13 19:35:17'),(124,7,'Ghmate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(125,8,'Ighounane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(126,7,'Imintanoute','2024-02-13 19:35:17','2024-02-13 19:35:17'),(127,7,'Kattara','2024-02-13 19:35:17','2024-02-13 19:35:17'),(128,7,'Lalla Takerkoust','2024-02-13 19:35:17','2024-02-13 19:35:17'),(129,7,'Loudaya','2024-02-13 19:35:17','2024-02-13 19:35:17'),(130,7,'Lâattaouia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(131,7,'Moulay Brahim','2024-02-13 19:35:17','2024-02-13 19:35:17'),(132,7,'Mzouda','2024-02-13 19:35:17','2024-02-13 19:35:17'),(133,7,'Ounagha','2024-02-13 19:35:17','2024-02-13 19:35:17'),(134,7,'Sid L\'Mokhtar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(135,7,'Sid Zouin','2024-02-13 19:35:17','2024-02-13 19:35:17'),(136,7,'Sidi Abdallah Ghiat','2024-02-13 19:35:17','2024-02-13 19:35:17'),(137,7,'Sidi Bou Othmane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(138,7,'Sidi Rahhal','2024-02-13 19:35:17','2024-02-13 19:35:17'),(139,7,'Skhour Rehamna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(140,7,'Smimou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(141,7,'Tafetachte','2024-02-13 19:35:17','2024-02-13 19:35:17'),(142,7,'Tahannaout','2024-02-13 19:35:17','2024-02-13 19:35:17'),(143,7,'Talmest','2024-02-13 19:35:17','2024-02-13 19:35:17'),(144,7,'Tamallalt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(145,7,'Tamanar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(146,7,'Tamansourt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(147,7,'Tameslouht','2024-02-13 19:35:17','2024-02-13 19:35:17'),(148,9,'Tanalt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(149,7,'Zeubelemok','2024-02-13 19:35:17','2024-02-13 19:35:17'),(150,3,'Meknès‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(151,5,'Khénifra','2024-02-13 19:35:17','2024-02-13 19:35:17'),(152,3,'Agourai','2024-02-13 19:35:17','2024-02-13 19:35:17'),(153,3,'Ain Taoujdate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(154,8,'MyAliCherif','2024-02-13 19:35:17','2024-02-13 19:35:17'),(155,8,'Rissani','2024-02-13 19:35:17','2024-02-13 19:35:17'),(156,5,'Amalou Ighriben','2024-02-13 19:35:17','2024-02-13 19:35:17'),(157,8,'Aoufous','2024-02-13 19:35:17','2024-02-13 19:35:17'),(158,8,'Arfoud','2024-02-13 19:35:17','2024-02-13 19:35:17'),(159,3,'Azrou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(160,3,'Aïn Jemaa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(161,3,'Aïn Karma','2024-02-13 19:35:17','2024-02-13 19:35:17'),(162,3,'Aïn Leuh','2024-02-13 19:35:17','2024-02-13 19:35:17'),(163,3,'Aït Boubidmane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(164,5,'Aït Ishaq','2024-02-13 19:35:17','2024-02-13 19:35:17'),(165,8,'Boudnib','2024-02-13 19:35:17','2024-02-13 19:35:17'),(166,3,'Boufakrane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(167,8,'Boumia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(168,3,'El Hajeb','2024-02-13 19:35:17','2024-02-13 19:35:17'),(169,5,'Elkbab','2024-02-13 19:35:17','2024-02-13 19:35:17'),(170,5,'Er-Rich','2024-02-13 19:35:17','2024-02-13 19:35:17'),(171,8,'Errachidia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(172,8,'Gardmit','2024-02-13 19:35:17','2024-02-13 19:35:17'),(173,8,'Goulmima','2024-02-13 19:35:17','2024-02-13 19:35:17'),(174,8,'Gourrama','2024-02-13 19:35:17','2024-02-13 19:35:17'),(175,5,'Had Bouhssoussen','2024-02-13 19:35:17','2024-02-13 19:35:17'),(176,3,'Haj Kaddour','2024-02-13 19:35:17','2024-02-13 19:35:17'),(177,3,'Ifrane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(178,8,'Itzer','2024-02-13 19:35:17','2024-02-13 19:35:17'),(179,8,'Jorf','2024-02-13 19:35:17','2024-02-13 19:35:17'),(180,5,'Kehf Nsour','2024-02-13 19:35:17','2024-02-13 19:35:17'),(181,5,'Kerrouchen','2024-02-13 19:35:17','2024-02-13 19:35:17'),(182,3,'M\'haya','2024-02-13 19:35:17','2024-02-13 19:35:17'),(183,5,'M\'rirt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(184,8,'Midelt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(185,8,'Moulay Ali Cherif','2024-02-13 19:35:17','2024-02-13 19:35:17'),(186,5,'Moulay Bouazza','2024-02-13 19:35:17','2024-02-13 19:35:17'),(187,3,'Moulay Idriss Zerhoun','2024-02-13 19:35:17','2024-02-13 19:35:17'),(188,3,'Moussaoua','2024-02-13 19:35:17','2024-02-13 19:35:17'),(189,3,'N\'Zalat Bni Amar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(190,5,'Ouaoumana','2024-02-13 19:35:17','2024-02-13 19:35:17'),(191,3,'Oued Ifrane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(192,3,'Sabaa Aiyoun','2024-02-13 19:35:17','2024-02-13 19:35:17'),(193,3,'Sebt Jahjouh','2024-02-13 19:35:17','2024-02-13 19:35:17'),(194,3,'Sidi Addi','2024-02-13 19:35:17','2024-02-13 19:35:17'),(195,8,'Tichoute','2024-02-13 19:35:17','2024-02-13 19:35:17'),(196,5,'Tighassaline','2024-02-13 19:35:17','2024-02-13 19:35:17'),(197,5,'Tighza','2024-02-13 19:35:17','2024-02-13 19:35:17'),(198,3,'Timahdite','2024-02-13 19:35:17','2024-02-13 19:35:17'),(199,8,'Tinejdad','2024-02-13 19:35:17','2024-02-13 19:35:17'),(200,3,'Tizguite','2024-02-13 19:35:17','2024-02-13 19:35:17'),(201,3,'Toulal','2024-02-13 19:35:17','2024-02-13 19:35:17'),(202,8,'Tounfite','2024-02-13 19:35:17','2024-02-13 19:35:17'),(203,3,'Zaouia d\'Ifrane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(204,8,'Zaïda','2024-02-13 19:35:17','2024-02-13 19:35:17'),(205,2,'Ahfir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(206,2,'Aklim','2024-02-13 19:35:17','2024-02-13 19:35:17'),(207,2,'Al Aroui','2024-02-13 19:35:17','2024-02-13 19:35:17'),(208,2,'Aïn Bni Mathar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(209,2,'Aïn Erreggada','2024-02-13 19:35:17','2024-02-13 19:35:17'),(210,2,'Ben Taïeb','2024-02-13 19:35:17','2024-02-13 19:35:17'),(211,2,'Berkane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(212,2,'Bni Ansar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(213,2,'Bni Chiker','2024-02-13 19:35:17','2024-02-13 19:35:17'),(214,2,'Bni Drar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(215,2,'Bni Tadjite','2024-02-13 19:35:17','2024-02-13 19:35:17'),(216,2,'Bouanane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(217,2,'Bouarfa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(218,2,'Bouhdila','2024-02-13 19:35:17','2024-02-13 19:35:17'),(219,2,'Dar El Kebdani','2024-02-13 19:35:17','2024-02-13 19:35:17'),(220,2,'Debdou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(221,2,'Douar Kannine','2024-02-13 19:35:17','2024-02-13 19:35:17'),(222,2,'Driouch','2024-02-13 19:35:17','2024-02-13 19:35:17'),(223,2,'El Aïoun Sidi Mellouk','2024-02-13 19:35:17','2024-02-13 19:35:17'),(224,2,'Farkhana','2024-02-13 19:35:17','2024-02-13 19:35:17'),(225,2,'Figuig','2024-02-13 19:35:17','2024-02-13 19:35:17'),(226,2,'Ihddaden','2024-02-13 19:35:17','2024-02-13 19:35:17'),(227,2,'Jaâdar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(228,2,'Jerada','2024-02-13 19:35:17','2024-02-13 19:35:17'),(229,2,'Kariat Arekmane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(230,2,'Kassita','2024-02-13 19:35:17','2024-02-13 19:35:17'),(231,2,'Kerouna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(232,2,'Laâtamna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(233,2,'Madagh','2024-02-13 19:35:17','2024-02-13 19:35:17'),(234,2,'Midar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(235,2,'Nador','2024-02-13 19:35:17','2024-02-13 19:35:17'),(236,2,'Naima','2024-02-13 19:35:17','2024-02-13 19:35:17'),(237,2,'Oued Heimer','2024-02-13 19:35:17','2024-02-13 19:35:17'),(238,2,'Oujda','2024-02-13 19:35:17','2024-02-13 19:35:17'),(239,2,'Ras El Ma','2024-02-13 19:35:17','2024-02-13 19:35:17'),(240,2,'Saïdia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(241,2,'Selouane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(242,2,'Sidi Boubker','2024-02-13 19:35:17','2024-02-13 19:35:17'),(243,2,'Sidi Slimane Echcharaa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(244,2,'Talsint','2024-02-13 19:35:17','2024-02-13 19:35:17'),(245,2,'Taourirt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(246,2,'Tendrara','2024-02-13 19:35:17','2024-02-13 19:35:17'),(247,2,'Tiztoutine','2024-02-13 19:35:17','2024-02-13 19:35:17'),(248,2,'Touima','2024-02-13 19:35:17','2024-02-13 19:35:17'),(249,2,'Touissit','2024-02-13 19:35:17','2024-02-13 19:35:17'),(250,2,'Zaïo','2024-02-13 19:35:17','2024-02-13 19:35:17'),(251,2,'Zeghanghane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(252,4,'Rabat','2024-02-13 19:35:17','2024-02-13 19:35:17'),(253,4,'Salé','2024-02-13 19:35:17','2024-02-13 19:35:17'),(254,4,'Ain El Aouda','2024-02-13 19:35:17','2024-02-13 19:35:17'),(255,4,'Harhoura','2024-02-13 19:35:17','2024-02-13 19:35:17'),(256,4,'Khémisset','2024-02-13 19:35:17','2024-02-13 19:35:17'),(257,4,'Oulmès','2024-02-13 19:35:17','2024-02-13 19:35:17'),(258,4,'Rommani','2024-02-13 19:35:17','2024-02-13 19:35:17'),(259,4,'Sidi Allal El Bahraoui','2024-02-13 19:35:17','2024-02-13 19:35:17'),(260,4,'Sidi Bouknadel','2024-02-13 19:35:17','2024-02-13 19:35:17'),(261,4,'Skhirate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(262,4,'Tamesna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(263,4,'Témara','2024-02-13 19:35:17','2024-02-13 19:35:17'),(264,4,'Tiddas','2024-02-13 19:35:17','2024-02-13 19:35:17'),(265,4,'Tiflet','2024-02-13 19:35:17','2024-02-13 19:35:17'),(266,4,'Touarga','2024-02-13 19:35:17','2024-02-13 19:35:17'),(267,9,'Agadir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(268,8,'Agdz','2024-02-13 19:35:17','2024-02-13 19:35:17'),(269,9,'Agni Izimmer','2024-02-13 19:35:17','2024-02-13 19:35:17'),(270,9,'Aït Melloul','2024-02-13 19:35:17','2024-02-13 19:35:17'),(271,8,'Alnif','2024-02-13 19:35:17','2024-02-13 19:35:17'),(272,9,'Anzi','2024-02-13 19:35:17','2024-02-13 19:35:17'),(273,9,'Aoulouz','2024-02-13 19:35:17','2024-02-13 19:35:17'),(274,9,'Aourir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(275,9,'Arazane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(276,9,'Aït Baha','2024-02-13 19:35:17','2024-02-13 19:35:17'),(277,9,'Aït Iaâza','2024-02-13 19:35:17','2024-02-13 19:35:17'),(278,8,'Aït Yalla','2024-02-13 19:35:17','2024-02-13 19:35:17'),(279,9,'Ben Sergao','2024-02-13 19:35:17','2024-02-13 19:35:17'),(280,9,'Biougra','2024-02-13 19:35:17','2024-02-13 19:35:17'),(281,8,'Boumalne-Dadès','2024-02-13 19:35:17','2024-02-13 19:35:17'),(282,9,'Dcheira El Jihadia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(283,9,'Drargua','2024-02-13 19:35:17','2024-02-13 19:35:17'),(284,9,'El Guerdane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(285,8,'Harte Lyamine','2024-02-13 19:35:17','2024-02-13 19:35:17'),(286,9,'Ida Ougnidif','2024-02-13 19:35:17','2024-02-13 19:35:17'),(287,8,'Ifri','2024-02-13 19:35:17','2024-02-13 19:35:17'),(288,9,'Igdamen','2024-02-13 19:35:17','2024-02-13 19:35:17'),(289,8,'Ighil n\'Oumgoun','2024-02-13 19:35:17','2024-02-13 19:35:17'),(290,8,'Imassine','2024-02-13 19:35:17','2024-02-13 19:35:17'),(291,9,'Inezgane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(292,9,'Irherm','2024-02-13 19:35:17','2024-02-13 19:35:17'),(293,8,'Kelaat-M\'Gouna','2024-02-13 19:35:17','2024-02-13 19:35:17'),(294,9,'Lakhsas','2024-02-13 19:35:17','2024-02-13 19:35:17'),(295,9,'Lakhsass','2024-02-13 19:35:17','2024-02-13 19:35:17'),(296,9,'Lqliâa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(297,8,'M\'semrir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(298,9,'Massa (Maroc)','2024-02-13 19:35:17','2024-02-13 19:35:17'),(299,9,'Megousse','2024-02-13 19:35:17','2024-02-13 19:35:17'),(300,8,'Ouarzazate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(301,9,'Oulad Berhil','2024-02-13 19:35:17','2024-02-13 19:35:17'),(302,9,'Oulad Teïma','2024-02-13 19:35:17','2024-02-13 19:35:17'),(303,8,'Sarghine','2024-02-13 19:35:17','2024-02-13 19:35:17'),(304,10,'Sidi Ifni','2024-02-13 19:35:17','2024-02-13 19:35:17'),(305,8,'Skoura','2024-02-13 19:35:17','2024-02-13 19:35:17'),(306,8,'Tabounte','2024-02-13 19:35:17','2024-02-13 19:35:17'),(307,9,'Tafraout','2024-02-13 19:35:17','2024-02-13 19:35:17'),(308,1,'Taghzout','2024-02-13 19:35:17','2024-02-13 19:35:17'),(309,9,'Tagzen','2024-02-13 19:35:17','2024-02-13 19:35:17'),(310,9,'Taliouine','2024-02-13 19:35:17','2024-02-13 19:35:17'),(311,8,'Tamegroute','2024-02-13 19:35:17','2024-02-13 19:35:17'),(312,9,'Tamraght','2024-02-13 19:35:17','2024-02-13 19:35:17'),(313,8,'Tanoumrite Nkob Zagora','2024-02-13 19:35:17','2024-02-13 19:35:17'),(314,8,'Taourirt ait zaghar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(315,9,'Taroudannt','2024-02-13 19:35:17','2024-02-13 19:35:17'),(316,9,'Temsia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(317,9,'Tifnit','2024-02-13 19:35:17','2024-02-13 19:35:17'),(318,9,'Tisgdal','2024-02-13 19:35:17','2024-02-13 19:35:17'),(319,9,'Tiznit','2024-02-13 19:35:17','2024-02-13 19:35:17'),(320,8,'Toundoute','2024-02-13 19:35:17','2024-02-13 19:35:17'),(321,8,'Zagora','2024-02-13 19:35:17','2024-02-13 19:35:17'),(322,5,'Afourar','2024-02-13 19:35:17','2024-02-13 19:35:17'),(323,5,'Aghbala','2024-02-13 19:35:17','2024-02-13 19:35:17'),(324,5,'Azilal','2024-02-13 19:35:17','2024-02-13 19:35:17'),(325,5,'Aït Majden','2024-02-13 19:35:17','2024-02-13 19:35:17'),(326,5,'Beni Ayat','2024-02-13 19:35:17','2024-02-13 19:35:17'),(327,5,'Béni Mellal','2024-02-13 19:35:17','2024-02-13 19:35:17'),(328,5,'Bin elouidane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(329,5,'Bradia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(330,5,'Bzou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(331,5,'Dar Oulad Zidouh','2024-02-13 19:35:17','2024-02-13 19:35:17'),(332,5,'Demnate','2024-02-13 19:35:17','2024-02-13 19:35:17'),(333,8,'Dra\'a','2024-02-13 19:35:17','2024-02-13 19:35:17'),(334,5,'El Ksiba','2024-02-13 19:35:17','2024-02-13 19:35:17'),(335,5,'Foum Jamaa','2024-02-13 19:35:17','2024-02-13 19:35:17'),(336,5,'Fquih Ben Salah','2024-02-13 19:35:17','2024-02-13 19:35:17'),(337,5,'Kasba Tadla','2024-02-13 19:35:17','2024-02-13 19:35:17'),(338,5,'Ouaouizeght','2024-02-13 19:35:17','2024-02-13 19:35:17'),(339,5,'Oulad Ayad','2024-02-13 19:35:17','2024-02-13 19:35:17'),(340,5,'Oulad M\'Barek','2024-02-13 19:35:17','2024-02-13 19:35:17'),(341,5,'Oulad Yaich','2024-02-13 19:35:17','2024-02-13 19:35:17'),(342,5,'Sidi Jaber','2024-02-13 19:35:17','2024-02-13 19:35:17'),(343,5,'Souk Sebt Oulad Nemma','2024-02-13 19:35:17','2024-02-13 19:35:17'),(344,5,'Zaouïat Cheikh','2024-02-13 19:35:17','2024-02-13 19:35:17'),(345,1,'Tanger‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(346,1,'Tétouan‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(347,1,'Akchour','2024-02-13 19:35:17','2024-02-13 19:35:17'),(348,1,'Assilah','2024-02-13 19:35:17','2024-02-13 19:35:17'),(349,1,'Bab Berred','2024-02-13 19:35:17','2024-02-13 19:35:17'),(350,1,'Bab Taza','2024-02-13 19:35:17','2024-02-13 19:35:17'),(351,1,'Brikcha','2024-02-13 19:35:17','2024-02-13 19:35:17'),(352,1,'Chefchaouen','2024-02-13 19:35:17','2024-02-13 19:35:17'),(353,1,'Dar Bni Karrich','2024-02-13 19:35:17','2024-02-13 19:35:17'),(354,1,'Dar Chaoui','2024-02-13 19:35:17','2024-02-13 19:35:17'),(355,1,'Fnideq','2024-02-13 19:35:17','2024-02-13 19:35:17'),(356,1,'Gueznaia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(357,1,'Jebha','2024-02-13 19:35:17','2024-02-13 19:35:17'),(358,3,'Karia','2024-02-13 19:35:17','2024-02-13 19:35:17'),(359,1,'Khémis Sahel','2024-02-13 19:35:17','2024-02-13 19:35:17'),(360,1,'Ksar El Kébir','2024-02-13 19:35:17','2024-02-13 19:35:17'),(361,1,'Larache','2024-02-13 19:35:17','2024-02-13 19:35:17'),(362,1,'M\'diq','2024-02-13 19:35:17','2024-02-13 19:35:17'),(363,1,'Martil','2024-02-13 19:35:17','2024-02-13 19:35:17'),(364,1,'Moqrisset','2024-02-13 19:35:17','2024-02-13 19:35:17'),(365,1,'Oued Laou','2024-02-13 19:35:17','2024-02-13 19:35:17'),(366,1,'Oued Rmel','2024-02-13 19:35:17','2024-02-13 19:35:17'),(367,1,'Ouazzane','2024-02-13 19:35:17','2024-02-13 19:35:17'),(368,1,'Point Cires','2024-02-13 19:35:17','2024-02-13 19:35:17'),(369,1,'Sidi Lyamani','2024-02-13 19:35:17','2024-02-13 19:35:17'),(370,1,'Sidi Mohamed ben Abdallah el-Raisuni','2024-02-13 19:35:17','2024-02-13 19:35:17'),(371,1,'Zinat','2024-02-13 19:35:17','2024-02-13 19:35:17'),(372,1,'Ajdir‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(373,3,'Aknoul‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(374,1,'Al Hoceïma‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(375,1,'Aït Hichem‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(376,1,'Bni Bouayach‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(377,1,'Bni Hadifa‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(378,3,'Ghafsai‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(379,2,'Guercif‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(380,1,'Imzouren‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(381,1,'Inahnahen‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(382,1,'Issaguen (Ketama)‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(383,6,'Karia (El Jadida)‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(384,3,'Karia Ba Mohamed‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(385,3,'Oued Amlil‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(386,3,'Oulad Zbair‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(387,3,'Tahla‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(388,1,'Tala Tazegwaght‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(389,1,'Tamassint‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(390,3,'Taounate‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(391,1,'Targuist‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(392,3,'Taza‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(393,3,'Taïnaste‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(394,3,'Thar Es-Souk‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(395,3,'Tissa‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(396,3,'Tizi Ouasli‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(397,11,'Laayoune‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(398,11,'El Marsa‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(399,11,'Tarfaya‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(400,11,'Boujdour‎','2024-02-13 19:35:17','2024-02-13 19:35:17'),(401,12,'Awsard','2024-02-13 19:35:17','2024-02-13 19:35:17'),(402,12,'Oued-Eddahab','2024-02-13 19:35:17','2024-02-13 19:35:17'),(403,1,'Stehat','2024-02-13 19:35:17','2024-02-13 19:35:17'),(404,5,'Aït Attab','2024-02-13 19:35:17','2024-02-13 19:35:17');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(100) DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (2,'/images/img1 1.png',1,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(3,'/images/img1 2.png',1,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(4,'/images/img1 3.png',1,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(5,'/images/img2 1.png',2,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(6,'/images/img3 1.png',3,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(7,'/images/img4 1.png',4,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(8,'/images/img4 2.png',4,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(9,'/images/img5 1.png',5,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(10,'/images/img5 2.png',5,'2024-02-13 20:30:44','2024-02-13 20:30:44'),(11,'/images/img6 1.png',5,'2024-02-13 20:30:44','2024-02-13 20:30:44');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `worker_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `worker_id` (`worker_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,1,'2024-02-13 20:26:11','2024-02-13 20:26:11','project villa Casa','had project nadi'),(2,1,'2024-02-13 20:26:11','2024-02-13 20:26:11','project riad rabat','had project mzyan'),(3,1,'2024-02-13 20:26:11','2024-02-13 20:26:11','project doaur 9etta henna','had project ns ns'),(4,2,'2024-02-13 20:26:11','2024-02-13 20:26:11','project gueliz','had project mabihch'),(5,2,'2024-02-13 20:26:11','2024-02-13 20:26:11','project douar lhna','had project informatique'),(6,2,'2024-02-13 20:26:11','2024-02-13 20:26:11','project douar koko','had project 5/5'),(9,1,'2024-02-13 20:30:44','2024-02-13 20:30:44','project villa Casa','had project nadi'),(10,1,'2024-02-13 20:30:44','2024-02-13 20:30:44','project riad rabat','had project mzyan'),(11,1,'2024-02-13 20:30:44','2024-02-13 20:30:44','project doaur 9etta henna','had project ns ns'),(12,2,'2024-02-13 20:30:44','2024-02-13 20:30:44','project gueliz','had project mabihch'),(13,2,'2024-02-13 20:30:44','2024-02-13 20:30:44','project douar lhna','had project informatique'),(14,2,'2024-02-13 20:30:44','2024-02-13 20:30:44','project douar koko','had project 5/5');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `worker_id` int NOT NULL,
  `user_id` int NOT NULL,
  `text` varchar(1024) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `worker_id` (`worker_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,2,'ly3tik sehha mohamed project mzn khdma n9iya','2024-02-13 20:30:44','2024-02-13 20:30:44'),(2,1,4,'ly3tik sehha mohamed project mzn khdma mzyana ana essalhi','2024-02-13 20:30:44','2024-02-13 20:30:44'),(3,2,1,'ly3tik sehha aboubakr project mzn khdma mzyana ana mohamed','2024-02-13 20:30:44','2024-02-13 20:30:44'),(4,2,3,'ly3tik sehha aboubakr project mzn khdma mzyana ana lahcen','2024-02-13 20:30:44','2024-02-13 20:30:44');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `en_name` varchar(128) NOT NULL,
  `ar_name` varchar(128) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `en_name` (`en_name`),
  UNIQUE KEY `ar_name` (`ar_name`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Electricity','trissyan','rani tanssayb ay haja dyal do','2024-02-13 19:56:17','2024-02-13 19:56:17'),(2,'informaticien','m3lomati','rani tanssayb ay haja dyal piciyat','2024-02-13 19:56:17','2024-02-13 19:56:17'),(3,'plombier','plombiii','rani tanssayb ay haja dyal lma','2024-02-13 19:56:17','2024-02-13 19:56:17'),(4,'jlayji','mol zlij','rani tanssayb ay haja dyal zlij','2024-02-13 19:56:17','2024-02-13 19:56:17'),(5,'economie','eccnomie','rani economist','2024-02-13 19:56:17','2024-02-13 19:56:17');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Tanger-Tétouan-Al Hoceïma','2024-02-13 19:26:17','2024-02-13 19:26:17'),(2,'l\'Oriental','2024-02-13 19:26:17','2024-02-13 19:26:17'),(3,'Fès-Meknès','2024-02-13 19:26:17','2024-02-13 19:26:17'),(4,'Rabat-Salé-Kénitra','2024-02-13 19:26:17','2024-02-13 19:26:17'),(5,'Béni Mellal-Khénifra','2024-02-13 19:26:17','2024-02-13 19:26:17'),(6,'Casablanca-Settat','2024-02-13 19:26:17','2024-02-13 19:26:17'),(7,'Marrakech-Safi','2024-02-13 19:26:17','2024-02-13 19:26:17'),(8,'Drâa-Tafilalet','2024-02-13 19:26:17','2024-02-13 19:26:17'),(9,'Souss-Massa','2024-02-13 19:26:17','2024-02-13 19:26:17'),(10,'Guelmim-Oued Noun','2024-02-13 19:26:17','2024-02-13 19:26:17'),(11,'Laâyoune-Sakia El Hamra','2024-02-13 19:26:17','2024-02-13 19:26:17'),(12,'Dakhla-Oued Ed Dahab','2024-02-13 19:26:17','2024-02-13 19:26:17');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `city_id` int NOT NULL,
  `profile_img` varchar(128) DEFAULT NULL,
  `phone_number` varchar(16) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'med@gmail.com','202cb962ac59075b964b07152d234b70',NULL,NULL,4,NULL,NULL,1,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(2,'aboubakr@gmail.com','caf1a3dfb505ffed0d024130f58c5cfa',NULL,NULL,103,NULL,NULL,1,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(3,'lahcen@gmail.com','caf1a3dfb505ffed0d024130f58c5cfa',NULL,NULL,103,NULL,NULL,1,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(4,'mustapha@gmail.com','202cb962ac59075b964b07152d234b70',NULL,NULL,4,NULL,NULL,1,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(5,'ali@gmail.com','202cb962ac59075b964b07152d234b70',NULL,NULL,4,NULL,NULL,1,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(6,'adil@gmail.com','202cb962ac59075b964b07152d234b70',NULL,NULL,4,NULL,NULL,1,'2024-02-13 19:56:17','2024-02-13 19:56:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workers`
--

DROP TABLE IF EXISTS `workers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `city_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `diplome` varchar(100) DEFAULT NULL,
  `certifications` varchar(255) DEFAULT NULL,
  `fb_url` varchar(100) DEFAULT NULL,
  `insta_url` varchar(100) DEFAULT NULL,
  `tiktok_url` varchar(100) DEFAULT NULL,
  `linkedin_url` varchar(100) DEFAULT NULL,
  `website_url` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `service_id` (`service_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `workers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `workers_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `workers_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workers`
--

LOCK TABLES `workers` WRITE;
/*!40000 ALTER TABLE `workers` DISABLE KEYS */;
INSERT INTO `workers` VALUES (1,1,1,4,'mohamed trissyan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(2,2,2,103,'aboubakr info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(3,3,5,103,'lahcen economie',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(4,4,2,4,'essalhi info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(5,5,1,4,'ali trissyan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 19:56:17','2024-02-13 19:56:17'),(6,6,1,4,'adil trissyan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 19:56:17','2024-02-13 19:56:17');
/*!40000 ALTER TABLE `workers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 21:46:31
