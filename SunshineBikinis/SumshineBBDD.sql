-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sunshinebbdd
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
  PRIMARY KEY (`idCompra`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (1,NULL,NULL,'2023-08-03 23:41:54');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallecompra`
--

LOCK TABLES `detallecompra` WRITE;
/*!40000 ALTER TABLE `detallecompra` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallecompra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilio` (
  `idDomicilio` int NOT NULL AUTO_INCREMENT,
  `Pais_domicilio` varchar(45) DEFAULT NULL,
  `Ciudad_domicilio` varchar(45) DEFAULT NULL,
  `CalleNombre_domicilio` varchar(45) DEFAULT NULL,
  `CodigoPostal_domicilio` varchar(45) DEFAULT NULL,
  `CalleNumero_domicilio` varchar(45) DEFAULT NULL,
  `DptoNumero_domicilio` varchar(45) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idDomicilio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilio`
--

LOCK TABLES `domicilio` WRITE;
/*!40000 ALTER TABLE `domicilio` DISABLE KEYS */;
/*!40000 ALTER TABLE `domicilio` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'Hermosa Bikini','Bikinis','Bikini',2000.00,3000.00,20,'1691114992782.jpg','2023-08-03 23:09:52'),(2,2,'Bikini lo ultimo en la moda','Bikinis','Bikini Moda',8000.00,9000.00,15,'1691115143889.jpg','2023-08-03 23:12:23'),(3,3,'Super trikini','Trikinis','Trikini hermosa ',4500.00,6000.00,40,'1691115186950.jpg','2023-08-03 23:13:06');
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
  `Email_Usuario` varchar(45) DEFAULT NULL,
  `numContacto_Usuario` varchar(45) DEFAULT NULL,
  `Contrasena_Usuario` varchar(45) DEFAULT NULL,
  `Domicilio_Usuario` varchar(45) DEFAULT NULL,
  `Permiso_Usuario` varchar(45) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Guada','Almada','guada@almada.com','11123123','zoelteamo','1','1','2023-07-28 20:46:29');
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

-- Dump completed on 2023-08-03 23:49:29
