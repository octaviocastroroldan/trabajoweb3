-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2025 a las 21:06:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arriendos`
--

CREATE TABLE `arriendos` (
  `id` int(11) NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `patente_vehiculo` varchar(6) DEFAULT NULL,
  `tipo_vehiculo` varchar(20) DEFAULT NULL,
  `rut_cliente` varchar(10) DEFAULT NULL,
  `nombre_cliente` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `arriendos`
--

INSERT INTO `arriendos` (`id`, `fecha_inicio`, `fecha_fin`, `patente_vehiculo`, `tipo_vehiculo`, `rut_cliente`, `nombre_cliente`) VALUES
(1, '2025-06-15 15:21:23', '2025-06-20 15:21:23', 'XRPL94', 'SUV', '12345678-9', 'Maria Gonzalez'),
(2, '2025-06-10 15:29:18', NULL, 'MQZN12', 'Camioneta', '87654321-K', 'Diego Herrera'),
(3, '2025-05-30 15:31:07', '2025-06-06 15:31:07', 'VLTX01', 'Sedan', '23456789-1', 'Laura Vazquez'),
(4, '2025-06-01 15:32:29', '2025-06-07 15:32:29', 'JHQT77', 'SUV', '34567890-2', 'Tomas Riquelme'),
(6, '2025-04-01 20:11:52', NULL, 'BRAR21', 'Sedan', '87654321-K', 'Luis Castro'),
(7, '2025-05-06 20:17:42', NULL, 'ABCD12', 'Camioneta', '19154521-1', 'Leonor Manzo'),
(8, '2024-09-01 20:11:52', '2025-01-01 22:19:16', 'BRAR21', 'Sedan', '87654321-K', 'Luis Castro'),
(12, '2025-06-29 05:21:39', '2025-07-05 22:55:37', 'XRPL94', 'SUV', '19154534-4', 'Luis Manzo'),
(13, '2025-07-05 22:57:43', NULL, 'ABDD98', 'Sedan', '12345678-4', 'Mariano Santos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(50) NOT NULL,
  `password` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `password`) VALUES
('ana@gmail.com', '$2b$10$LuVVFyV6ApKCqEWB4Dnu2usJCbUax7fuw6aGo.oTtkD.P7DR.jGqG'),
('email@gmail.com', '$2b$10$JobAhpU69FDd0gtEWs0kZ.rP97bzGz1jTHKHLiA/vSYkPWJgmVxku'),
('hello@hotmail.com', '$2b$10$MmmsvB/3Hx7J3UW/V1eSSua4tT4JNzKOcgmHtEKn2LOkeD8IqYbT2'),
('test@hotmail.com', '$2b$10$oVkiU6D6cm6x6P841nwGBOdidXuK5yRXb4XvNRrgS.mSx9NwYkgZ2'),
('test1@hotmail.com', '$2b$10$l728s92Q/0Q6zyYIdrFVJOgFt3oUvEC0fO6ysw6StPcvCb89/1Eoa');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `arriendos`
--
ALTER TABLE `arriendos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `arriendos`
--
ALTER TABLE `arriendos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
