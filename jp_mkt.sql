-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jp_multiservices
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','$2a$12$D.umdSsndpp/fhz0JvF7kessy7SJ7w5r9o.KMIGpsOT1BZl2bzoCC','2026-04-22 20:25:05');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing`
--

DROP TABLE IF EXISTS `pricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `cost_estimate` varchar(100) DEFAULT NULL,
  `details` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricing`
--

LOCK TABLES `pricing` WRITE;
/*!40000 ALTER TABLE `pricing` DISABLE KEYS */;
INSERT INTO `pricing` VALUES (2,'Aluminum Partition','₹300 - ₹800/sq ft','Includes aluminum frame and glass panels. Price depends on glass thickness, partition height, and design. Custom designs available.','2026-04-22 20:25:05'),(3,'Curtain Wall','₹800 - ₹2000/sq ft','Professional grade curtain wall systems for commercial buildings. Price includes structural analysis, materials, and installation.','2026-04-22 20:25:05'),(4,'Urocon Partition','₹150 - ₹350/sq ft','Lightweight and durable partition solution. Pricing includes panels, framework, and finishing. Bulk discounts available.','2026-04-22 20:25:05'),(5,'Fall Ceiling','₹60 - ₹200/sq ft','Includes material, design, and installation. Premium designs with lighting integration available at higher tiers.','2026-04-22 20:25:05'),(6,'PVC Ceiling','₹40 - ₹120/sq ft','Waterproof and maintenance-free. Includes panels, frame, and installation. Wide range of colors and patterns.','2026-04-22 20:25:05'),(7,'POP Ceiling','₹70 - ₹250/sq ft','Custom POP designs with cornices and molding. Simple to intricate designs. Includes material and labor.','2026-04-22 20:25:05'),(8,'PVC Mat','₹30 - ₹150/sq ft','Wide range of designs from basic to premium wood-look finishes. Includes subfloor preparation and installation.','2026-04-22 20:25:05'),(9,'PVC Curtains','₹200 - ₹500/running ft','Strip and solid curtain options. Price depends on thickness, transparency, and installation height.','2026-04-22 20:25:05'),(10,'Rolling Curtain','₹400 - ₹1200/sq ft','Manual and motorized options available. Price includes track, curtain fabric, and installation.','2026-04-22 20:25:05'),(11,'12mm Glass Work','₹500 - ₹1500/sq ft','Toughened safety glass for partitions, doors, and enclosures. Price includes glass, fittings, and professional installation.','2026-04-22 20:25:05');
/*!40000 ALTER TABLE `pricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Aluminum Windows','Premium quality aluminum windows with sleek modern designs. Custom-fit solutions for residential and commercial spaces with excellent thermal insulation and weather resistance.','/uploads/services/aluminum-windows.jpg',1,'2026-04-22 20:25:05'),(2,'Aluminum Partition','Elegant aluminum partition systems for offices and homes. Create flexible spaces with modern glass and aluminum combinations that maximize light and style.','/uploads/services/aluminum-partition.jpg',1,'2026-04-22 20:25:05'),(3,'Curtain Wall','Professional curtain wall installation for commercial buildings. Non-structural facade systems that provide stunning exterior aesthetics with superior performance.','/uploads/services/curtain-wall.jpg',1,'2026-04-22 20:25:05'),(4,'Urocon Partition','Durable Urocon partition panels for interior space division. Lightweight, fire-resistant, and sound-insulating solutions perfect for modern office environments.','/uploads/services/urocon-partition.jpg',1,'2026-04-22 20:25:05'),(5,'Fall Ceiling','Beautiful false ceiling designs using the latest materials and techniques. Transform any room with artistic ceiling patterns that enhance ambiance and hide utilities.','/uploads/services/fall-ceiling.jpg',1,'2026-04-22 20:25:05'),(6,'PVC Ceiling','Waterproof and low-maintenance PVC ceiling panels. Ideal for kitchens, bathrooms, and commercial spaces where durability meets aesthetic excellence.','/uploads/services/pvc-ceiling.jpg',1,'2026-04-22 20:25:05'),(7,'POP Ceiling','Custom Plaster of Paris ceiling designs with intricate molding and artistic patterns. From simple elegance to elaborate designs for luxurious interiors.','/uploads/services/pop-ceiling.jpg',1,'2026-04-22 20:25:05'),(8,'PVC Mat','High-quality PVC mat flooring solutions for residential and commercial spaces. Anti-slip, waterproof, and available in a wide range of designs and textures.','/uploads/services/pvc-mat.jpg',1,'2026-04-22 20:25:05'),(9,'PVC Curtains','Versatile PVC strip curtains for industrial, commercial, and residential use. Effective temperature control, dust prevention, and noise reduction solutions.','/uploads/services/pvc-curtains.jpg',1,'2026-04-22 20:25:05'),(10,'Rolling Curtain','Motorized and manual rolling curtain systems for windows and shop fronts. Space-saving, secure, and available in various materials and finishes.','/uploads/services/rolling-curtain.jpg',1,'2026-04-22 20:25:05'),(11,'12mm Glass Work','Premium 12mm toughened glass installations for partitions, doors, railings, and shower enclosures. Crystal-clear views with maximum strength and safety.','/uploads/services/glass-work.jpg',1,'2026-04-22 20:25:05');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visited_sites`
--

DROP TABLE IF EXISTS `visited_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visited_sites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visited_sites`
--

LOCK TABLES `visited_sites` WRITE;
/*!40000 ALTER TABLE `visited_sites` DISABLE KEYS */;
INSERT INTO `visited_sites` VALUES (1,'Rajesh Kumar Residence','Aurangabad, Maharashtra','Complete interior renovation including aluminum windows, PVC ceiling, and glass partition work for a 3BHK luxury apartment.','/uploads/sites/site1.jpg','2025-11-15','2026-04-22 20:25:05'),(2,'Sunrise Corporate Office','Gangapur, Maharashtra','Full office interior setup with aluminum partitions, curtain walls, and POP false ceiling with integrated lighting.','/uploads/sites/site2.jpg','2025-09-20','2026-04-22 20:25:05'),(3,'Hotel Grand Palace','Nashik, Maharashtra','Luxury hotel lobby renovation featuring 12mm glass work, designer fall ceilings, and rolling curtain installations across 50+ rooms.','/uploads/sites/site3.jpg','2026-01-10','2026-04-22 20:25:05'),(4,'Patel Family Home','Shendurwada, Maharashtra','Residential project with PVC ceilings in bathrooms and kitchen, aluminum windows throughout, and PVC mat flooring in all bedrooms.','/uploads/sites/site4.jpg','2025-12-05','2026-04-22 20:25:05'),(5,'TechVista IT Park','Pune, Maharashtra','Modern IT workspace with Urocon partitions, glass cabin enclosures, PVC curtains for server rooms, and designer POP ceilings.','/uploads/sites/site5.jpg','2026-02-28','2026-04-22 20:25:05');
/*!40000 ALTER TABLE `visited_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_requests`
--

DROP TABLE IF EXISTS `work_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `address` varchar(500) NOT NULL,
  `map_link` varchar(500) DEFAULT NULL,
  `the_work` text NOT NULL,
  `status` enum('Pending','Contacted','Completed') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_requests`
--

LOCK TABLES `work_requests` WRITE;
/*!40000 ALTER TABLE `work_requests` DISABLE KEYS */;
INSERT INTO `work_requests` VALUES (1,'Amit Sharma','amit.sharma@gmail.com','9876543210','45, MG Road, Aurangabad, Maharashtra','https://maps.google.com/?q=19.8762,75.3433','Need aluminum windows for my new 2BHK flat. Total 8 windows of standard size. Also interested in PVC ceiling for 2 bathrooms.','Pending','2026-04-22 20:25:05'),(2,'Priya Deshmukh','priya.d@yahoo.com','8765432109','12, Cidco Colony, Gangapur, Maharashtra','','Looking for complete false ceiling work for my living room and dining area. Approximately 500 sq ft total area. Prefer POP with modern design.','Contacted','2026-04-22 20:25:05'),(3,'Vikram Industries','info@vikramindustries.com','7654321098','Plot 78, Industrial Area, Waluj, Aurangabad','https://maps.google.com/?q=19.8354,75.2803','Require PVC strip curtains for warehouse cold storage section. Approx 6 openings, each 8ft wide and 10ft high. Also need Urocon partitions for new office section.','Completed','2026-04-22 20:25:05'),(4,'Sumit Joshi','dfg@gmail.com','8768743687','Beed By-Pass ,Chh Sambajinagar','','kdjshfhskjhekj','Pending','2026-04-23 17:58:02');
/*!40000 ALTER TABLE `work_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-04 15:30:43
