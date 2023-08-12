-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sunshinebbdd
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `idUsuario` int NOT NULL,
  `idProducto` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (13,2,2);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int DEFAULT NULL,
  `montoTotal` decimal(10,2) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` tinyint(1) DEFAULT '0',
  `fechaEnvio` timestamp NULL DEFAULT ((now() + interval 7 day)),
  PRIMARY KEY (`idCompra`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,13,21000.00,'2023-08-08 18:59:45',0,'2023-08-15 21:59:45'),(2,13,36000.00,'2023-08-08 19:00:58',0,'2023-08-15 22:00:58'),(3,13,15000.00,'2023-08-08 19:01:23',0,'2023-08-15 22:01:23'),(4,13,36000.00,'2023-08-08 19:01:53',0,'2023-08-15 22:01:53'),(5,13,26000.00,'2023-08-08 19:02:56',0,'2023-08-15 22:02:56'),(6,13,15000.00,'2023-08-08 19:05:20',0,'2023-08-15 22:05:20'),(7,13,9000.00,'2023-08-08 19:26:20',0,'2023-08-15 22:26:20'),(8,13,9000.00,'2023-08-08 19:26:42',0,'2023-08-15 22:26:42'),(9,13,9000.00,'2023-08-08 19:28:32',0,'2023-08-15 22:28:32'),(10,13,9000.00,'2023-08-08 19:32:26',0,'2023-08-15 22:32:26'),(11,13,30000.00,'2023-08-08 19:33:12',0,'2023-08-15 22:33:12'),(12,13,30000.00,'2023-08-08 19:36:21',0,'2023-08-15 22:36:21'),(13,13,21000.00,'2023-08-08 19:37:22',0,'2023-08-15 22:37:22'),(14,13,21000.00,'2023-08-08 19:39:10',0,'2023-08-15 22:39:10'),(15,13,105000.00,'2023-08-08 19:51:37',0,'2023-08-15 22:51:37'),(16,13,21000.00,'2023-08-08 19:53:02',0,'2023-08-15 22:53:02'),(17,13,21000.00,'2023-08-08 19:54:28',0,'2023-08-15 22:54:28'),(18,13,21000.00,'2023-08-08 19:58:41',0,'2023-08-15 22:58:41'),(19,13,21000.00,'2023-08-08 20:04:17',0,'2023-08-15 23:04:17'),(20,13,105000.00,'2023-08-08 20:04:52',0,'2023-08-15 23:04:52'),(21,13,105000.00,'2023-08-08 20:06:50',0,'2023-08-15 23:06:50'),(22,13,210000.00,'2023-08-08 20:11:06',0,'2023-08-15 23:11:06'),(23,13,210000.00,'2023-08-08 20:11:19',0,'2023-08-15 23:11:19'),(24,13,210000.00,'2023-08-08 20:13:46',0,'2023-08-15 23:13:46'),(25,13,63000.00,'2023-08-08 20:18:50',0,'2023-08-15 23:18:50'),(26,13,63000.00,'2023-08-08 20:19:01',0,'2023-08-15 23:19:01'),(27,13,21000.00,'2023-08-08 20:21:22',0,'2023-08-15 23:21:22'),(28,13,20000.00,'2023-08-08 20:23:49',0,'2023-08-15 23:23:49'),(29,13,9000.00,'2023-08-08 21:45:47',0,'2023-08-16 00:45:47'),(30,17,22000.00,'2023-08-09 11:48:26',0,'2023-08-16 14:48:26'),(31,13,6000.00,'2023-08-09 15:11:04',0,'2023-08-16 18:11:04'),(32,13,6000.00,'2023-08-09 21:00:10',0,'2023-08-17 00:00:10'),(33,13,6000.00,'2023-08-09 21:42:25',0,'2023-08-17 00:42:25'),(34,13,6000.00,'2023-08-09 21:46:07',0,'2023-08-17 00:46:07');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallecompra`
--

DROP TABLE IF EXISTS `detallecompra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallecompra` (
  `iddetalleCompra` int NOT NULL AUTO_INCREMENT,
  `idCompra` int DEFAULT NULL,
  `idProducto` int DEFAULT NULL,
  `precioTotal` decimal(10,0) DEFAULT NULL,
  `SubTotal` decimal(10,0) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`iddetalleCompra`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallecompra`
--

LOCK TABLES `detallecompra` WRITE;
/*!40000 ALTER TABLE `detallecompra` DISABLE KEYS */;
INSERT INTO `detallecompra` VALUES (1,1,5,10000,10000,1,'2023-08-08 18:59:45'),(2,1,4,11000,11000,1,'2023-08-08 18:59:45'),(3,2,1,6000,6000,1,'2023-08-08 19:00:58'),(4,2,2,9000,9000,1,'2023-08-08 19:00:58'),(5,2,4,11000,11000,1,'2023-08-08 19:00:58'),(6,2,5,10000,10000,1,'2023-08-08 19:00:58'),(7,3,1,6000,6000,1,'2023-08-08 19:01:23'),(8,3,2,9000,9000,1,'2023-08-08 19:01:23'),(9,4,5,10000,10000,1,'2023-08-08 19:01:53'),(10,4,4,11000,11000,1,'2023-08-08 19:01:53'),(11,4,2,9000,9000,1,'2023-08-08 19:01:53'),(12,4,1,6000,6000,1,'2023-08-08 19:01:53'),(13,5,1,6000,6000,1,'2023-08-08 19:02:56'),(14,5,2,9000,9000,1,'2023-08-08 19:02:56'),(15,5,4,11000,11000,1,'2023-08-08 19:02:56'),(16,6,1,6000,6000,1,'2023-08-08 19:05:20'),(17,6,2,9000,9000,1,'2023-08-08 19:05:20'),(18,7,2,9000,9000,1,'2023-08-08 19:26:20'),(19,8,2,9000,9000,1,'2023-08-08 19:26:42'),(20,9,2,9000,9000,1,'2023-08-08 19:28:32'),(21,10,2,9000,9000,1,'2023-08-08 19:32:26'),(22,11,2,9000,9000,1,'2023-08-08 19:33:12'),(23,11,4,11000,11000,1,'2023-08-08 19:33:12'),(24,11,5,10000,10000,1,'2023-08-08 19:33:12'),(25,12,2,9000,9000,1,'2023-08-08 19:36:21'),(26,12,4,11000,11000,1,'2023-08-08 19:36:21'),(27,12,5,10000,10000,1,'2023-08-08 19:36:21'),(28,13,4,11000,11000,1,'2023-08-08 19:37:22'),(29,13,5,10000,10000,1,'2023-08-08 19:37:22'),(30,14,4,11000,11000,1,'2023-08-08 19:39:10'),(31,14,5,10000,10000,1,'2023-08-08 19:39:10'),(32,15,4,55000,11000,5,'2023-08-08 19:51:37'),(33,15,5,50000,10000,5,'2023-08-08 19:51:37'),(34,16,5,10000,10000,1,'2023-08-08 19:53:02'),(35,16,4,11000,11000,1,'2023-08-08 19:53:02'),(36,17,5,10000,10000,1,'2023-08-08 19:54:28'),(37,17,4,11000,11000,1,'2023-08-08 19:54:28'),(38,18,5,10000,10000,1,'2023-08-08 19:58:41'),(39,18,4,11000,11000,1,'2023-08-08 19:58:41'),(40,19,4,11000,11000,1,'2023-08-08 20:04:17'),(41,19,5,10000,10000,1,'2023-08-08 20:04:17'),(42,20,4,55000,11000,5,'2023-08-08 20:04:52'),(43,20,5,50000,10000,5,'2023-08-08 20:04:52'),(44,21,4,55000,11000,5,'2023-08-08 20:06:50'),(45,21,5,50000,10000,5,'2023-08-08 20:06:50'),(46,22,4,110000,11000,10,'2023-08-08 20:11:06'),(47,22,5,100000,10000,10,'2023-08-08 20:11:06'),(48,23,4,110000,11000,10,'2023-08-08 20:11:19'),(49,23,5,100000,10000,10,'2023-08-08 20:11:19'),(50,24,4,110000,11000,10,'2023-08-08 20:13:46'),(51,24,5,100000,10000,10,'2023-08-08 20:13:46'),(52,25,4,33000,11000,3,'2023-08-08 20:18:50'),(53,25,5,30000,10000,3,'2023-08-08 20:18:50'),(54,26,4,33000,11000,3,'2023-08-08 20:19:01'),(55,26,5,30000,10000,3,'2023-08-08 20:19:01'),(56,27,4,11000,11000,1,'2023-08-08 20:21:22'),(57,27,5,10000,10000,1,'2023-08-08 20:21:22'),(58,28,5,20000,10000,2,'2023-08-08 20:23:49'),(59,29,2,9000,9000,1,'2023-08-08 21:45:47'),(60,30,4,22000,11000,2,'2023-08-09 11:48:26'),(61,31,1,6000,6000,1,'2023-08-09 15:11:04'),(62,32,1,6000,6000,1,'2023-08-09 21:00:10'),(63,33,1,6000,6000,1,'2023-08-09 21:42:25'),(64,34,1,6000,6000,1,'2023-08-09 21:46:07');
/*!40000 ALTER TABLE `detallecompra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `idPermiso` int NOT NULL AUTO_INCREMENT,
  `Nombre_Permiso` varchar(45) DEFAULT NULL,
  `Descripcion_Permiso` varchar(45) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,'Administrador','Acceso completo al sistema','2023-07-28 20:59:54'),(2,'Administrador','Acceso completo al sistema','2023-07-28 20:59:58'),(3,'Ventas','Acceso completo al area de Ventas','2023-07-28 21:00:17'),(4,'Cliente','Acceso limitado unicamente a comprar','2023-07-28 21:01:16');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `codigo_Producto` int DEFAULT NULL,
  `nombre_Producto` varchar(45) DEFAULT NULL,
  `descripcion_Producto` varchar(220) DEFAULT NULL,
  `categoria_Producto` varchar(45) DEFAULT NULL,
  `precioCompra_Producto` decimal(10,2) DEFAULT NULL,
  `precioVenta_Producto` decimal(10,2) DEFAULT NULL,
  `StockProducto` int DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,79,'Bikini flores','Bikini con culotte estilo primaveral. Estampado con flores coloridas. Variedad de talles, consultar','Vintage',3000.00,6000.00,16,'1691114992782.jpg','2023-08-03 23:09:52'),(2,5,'Bikini flynn','Bikini con tiras entrlazadas, varios colores. Consultar talles','Trikinis',1000.00,9000.00,14,'1691115143889.jpg','2023-08-03 23:12:23'),(4,9,'Enteriza marylyn','Enteriza negra con volados. Consultar talles.','Bikinis',5000.00,11000.00,1,'1691434394613.jpg','2023-08-07 15:53:14'),(5,6,'Bikini negra con detalles y avios plateados.','Bikinis','Enterizas',6000.00,10000.00,0,'1691434631254.jpg','2023-08-07 15:57:11');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `Nombre_Usuario` varchar(45) DEFAULT NULL,
  `Apellido_Usuario` varchar(45) DEFAULT NULL,
  `Email_Usuario` varchar(75) DEFAULT NULL,
  `numContacto_Usuario` varchar(45) DEFAULT NULL,
  `Contrasena_Usuario` varchar(45) DEFAULT NULL,
  `Domicilio_Usuario` varchar(100) DEFAULT NULL,
  `Permiso_Usuario` int DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  KEY `fk_permiso_Usuario_idx` (`Permiso_Usuario`),
  CONSTRAINT `fk_permiso_Usuario` FOREIGN KEY (`Permiso_Usuario`) REFERENCES `permiso` (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Guada','Almada','guada@almada.com','11123123','zoelteamo','casa administrador 120',1,'2023-07-28 20:46:29'),(2,'Salem','gato','salem@gato.com','666666666','salemgato','casa',3,'2023-08-07 15:33:55'),(12,'Juan','Pérez','juan@example.com','123456789','contrasena123','Calle 123',1,'2023-08-08 17:46:13'),(13,'Zoel','Villar','z@v.com','123456789','prueba123','Casa 120',4,'2023-08-08 17:46:35'),(14,'María','López','maria@example.com','987654321','password456','Avenida 456',3,'2023-08-08 17:46:46'),(15,'Carlos','González','carlos@example.com','555555555','secret123','Plaza 789',4,'2023-08-08 17:46:54'),(16,'asd','asd','asd@asd.com','123','asd','asd',4,'2023-08-09 11:46:52'),(17,'mariana','ales','mariana@ales.com','1156573640','ales12','San martin 257',4,'2023-08-09 11:47:41');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-11 22:06:29
