-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2020 at 05:59 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngo`
--

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `d_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `d_type` varchar(255) NOT NULL,
  `amount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ngodata`
--

CREATE TABLE `ngodata` (
  `n_id` int(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `mo_no` int(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ngodata`
--

INSERT INTO `ngodata` (`n_id`, `name`, `category`, `mo_no`, `email`, `address`, `city`, `username`, `password`) VALUES
(2, 'haresh', '', 989899898, '', 'millat nagar', 'Anand', '', 'haresh@123');

-- --------------------------------------------------------

--
-- Table structure for table `requestdata`
--

CREATE TABLE `requestdata` (
  `r_id` int(200) NOT NULL,
  `problem` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `mo_no` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `u_id` int(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mo_no` int(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`u_id`, `name`, `mo_no`, `email`, `username`, `password`) VALUES
(1, 'addy', 123, 'asd', 'asd', 'ads'),
(2, 'Bftb', 568, 'Fvfvfb', 'Rvrvtbtb', 'Thtbth'),
(3, '', 0, '', '', ''),
(4, 'Qwet', 6689, 'Fnrntn', 'Tntjtn', 'Ykymgmgm'),
(5, 'Gbgbg', 58055, 'Bftbgb', 'Bfg g ', 'Yng g '),
(6, 'Fhj', 599, 'Cgj', ' Chj', 'cghj'),
(7, 'Lol', 45, 'Ad', 'Ad', 'ad'),
(8, '', 0, '', '', ''),
(9, 'Ybgb', 39395, 'G g g ', 'F f f ', 'f f f '),
(10, 'Ss', 45, 'Ad', 'Sf', 'xcg'),
(11, 'Aami', 4545, 'Sdgh', 'Sdhk', '35ui'),
(12, 'Mona', 9898, 'Addy', 'Addy0', 'Addy'),
(13, 'Afridi', 989818, 'Afru@', 'Aga', 'afaf'),
(14, '', 0, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `ngodata`
--
ALTER TABLE `ngodata`
  ADD PRIMARY KEY (`n_id`),
  ADD UNIQUE KEY `mo_no` (`mo_no`);

--
-- Indexes for table `requestdata`
--
ALTER TABLE `requestdata`
  ADD PRIMARY KEY (`r_id`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donation`
--
ALTER TABLE `donation`
  MODIFY `d_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ngodata`
--
ALTER TABLE `ngodata`
  MODIFY `n_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `requestdata`
--
ALTER TABLE `requestdata`
  MODIFY `r_id` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userdata`
--
ALTER TABLE `userdata`
  MODIFY `u_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
