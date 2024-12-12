--Adding Sample Data to CardGameDB
--Sample User_Table Data, some with known unhashed passwords if thats needed for whatever reason :)
BEGIN TRY
	IF EXISTS (SELECT 1 FROM User_Table WHERE username = 'bloadwick0')	
		THROW 99999, 'Sample User Data Already Loaded',1;
	ELSE

	insert into User_Table (userID, username, passHash, email, creationDate, lastLogin) values (1, 'bloadwick0', '3B629924B5C68ADD70A6D5A79DAA6AA88E9352AA1615D5721A96F28AD32263D3', 'wscammonden0@yellowpages.com', '2/8/2024', '12/4/2023');
	insert into User_Table (userID, username, passHash, email, creationDate, lastLogin) values (2, 'myeatman1', 'D47FF64938610A732038872BD045D109561ADD19BA3DC24A2E81AA4F20CE48F1', 'gfortnum1@stanford.edu', '8/22/2024', '12/8/2023');
	insert into User_Table (userID, username, passHash, email, creationDate, lastLogin) values (3, 'meyre2', 'BAE1A95E674B5628D0E7D75C49F55E9638C2C418EE45FDE904D3CB9C31F0B874', 'tlefebre2@dell.com', '5/28/2024', '11/28/2023');
	--Passhash SHA256 of "johnson1998"
	insert into User_Table (userID, username, passHash, email, creationDate, lastLogin) values (4, 'Johnson', 'C935870C8EDF5A78EDC07334B2EA6C7D225DBD01719207E92A4DFA722D7A8034', 'john.son@outlook.com', '', '');
	--Passhash SHA256 of "CAFEBEEF"
	insert into User_Table (userID, username, passHash, email, creationDate, lastLogin) values (5, 'Eliza12', 'C3A0EAA38C0A0E2B93DA4B92586D84911C9704C7FC49628D69D3A769A198A6B2', 'elizabeth.liz@outlook.com', '', '');
	--Passhash SHA256 of "AllInOnBlack"
	insert into User_Table (userID, username, passHash, email, creationDate, lastLogin) values (6, 'MasterGambler', 'AF440BD75B15D54A3CEADBE7C91247C83126C533573E87CDE42D9CC069BC59BE', 'blackjackMaster@gmail.com', '', '');
	PRINT 'Sample User_Table Data Inserted'
END TRY
BEGIN CATCH
	SELECT
	ERROR_NUMBER() AS ErrorNumber,
	ERROR_STATE() AS ErrorState,
	ERROR_SEVERITY() AS ErrorSeverity,
	ERROR_PROCEDURE() AS ErrorProcedure,
	ERROR_LINE() AS ErrorLine,
	ERROR_MESSAGE() AS ErrorMessage;
END CATCH;


--Sample Balance_Table Data
BEGIN TRY
	IF EXISTS (SELECT 1 FROM Balance_Table WHERE balanceID = 1)	
		THROW 99999, 'Sample Balance Data Already Loaded', 1;
	ELSE
		--Initial Deposits
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (1,  1, '500', 'Deposit');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (2,  2, '650', 'Deposit');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (3,  3, '1200', 'Deposit');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (4,  4, '1600', 'Deposit');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (5,  5, '400', 'Deposit');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (6,  6, '2000', 'Deposit');
		--Game 1
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (7,  1, '300', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (8,  2, '500', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (9,  6, '2500', 'Won Bet');
		--Game 2
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (10, 5, '750', 'Won Bet');
		--Game 3
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (11, 1, '150', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (12, 3, '1500', 'Won Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (13, 4, '1200', 'Lost bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (14, 6, '2500', 'Won Bet');
		--Game 4
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (15, 1, '100', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (16, 2, '400', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (17, 5, '500', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (18, 6, '3000', 'Won Bet');
		--Game 5
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (19, 2, '800', 'Won Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (20, 3, '1200', 'Lost bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (21, 4, '1000', 'Lost Bet');
		--Game 6
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (22, 4, '800', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (23, 6, '3500', 'Won Bet');
		--Game 7
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (24, 2, '1100', 'Won Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (25, 5, '400', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (26, 6, '3000', 'Lost Bet');
		--Game 8
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (27, 1, '200', 'Won Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (28, 4, '600', 'Lost Bet');
		--Game 9
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (29, 2, '600', 'Lost Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (30, 4, '800', 'Won Bet');
		insert into Balance_Table (balanceID, userID, currentBalance, reason) values (31, 6, '3500', 'Won Bet');

		PRINT 'Sample Balance_Table Data Inserted'
END TRY
BEGIN CATCH
	SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;


--Sample Results_Table Data
BEGIN TRY
	IF EXISTS (SELECT 1 FROM Result_Table WHERE gameID = '1')	
		THROW 99999, 'Sample Result Data Already Loaded', 1;
	ELSE
		--Game 1
		insert into Result_Table (gameID, userID, outcome, resultTime) values (1, 1, 0, '2/1/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (1, 2, 0, '2/1/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (1, 6, 1, '2/1/2024');
		--Game 2
		insert into Result_Table (gameID, userID, outcome, resultTime) values (2, 4, -1, '3/4/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (2, 5, 1, '3/4/2024');
		--Game 3
		insert into Result_Table (gameID, userID, outcome, resultTime) values (3, 1, 0, '3/12/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (3, 3, 1, '3/12/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (3, 4, 0, '3/12/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (3, 6, 1, '3/12/2024');
		--Game 4
		insert into Result_Table (gameID, userID, outcome, resultTime) values (4, 1, 0, '4/1/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (4, 2, 0, '4/1/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (4, 5, 0, '4/1/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (4, 6, 1, '4/1/2024');
		--Game 5
		insert into Result_Table (gameID, userID, outcome, resultTime) values (5, 2, 1, '5/7/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (5, 3, 0, '5/7/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (5, 4, 0, '5/7/2024');
		--Game 6
		insert into Result_Table (gameID, userID, outcome, resultTime) values (6, 3, -1, '7/17/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (6, 4, 0, '7/17/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (6, 5, -1, '7/17/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (6, 6, 1, '7/17/2024');
		--Game 7
		insert into Result_Table (gameID, userID, outcome, resultTime) values (7, 2, 1, '10/30/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (7, 5, 0, '10/30/2024');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (7, 6, 0, '10/30/2024');
		--Game 8
		insert into Result_Table (gameID, userID, outcome, resultTime) values (8, 1, 1, '4/4/2025');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (8, 4, 0, '4/4/2025');
		--Game 9
		insert into Result_Table (gameID, userID, outcome, resultTime) values (9, 2, 0, '5/7/2025');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (9, 4, 1, '5/7/2025');
		insert into Result_Table (gameID, userID, outcome, resultTime) values (9, 6, 0, '5/7/2025');

		PRINT 'Sample Result_Table Data Inserted'
END TRY
BEGIN CATCH
	SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;


--Sample Bet_Table Data
BEGIN TRY
	IF EXISTS (SELECT 1 FROM Bet_Table WHERE betID = '1')	
		THROW 99999, 'Sample Bet Data Already Loaded', 1;
	ELSE
		--Game 1
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1,  1, 200, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2,  1, 150, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3,  1, 500, 1);
		--Game 2
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (4,  2, 500, -1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (5,  2, 350, 1);
		--Game 3
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (6,  3, 150, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1,  3, 300, 1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2,  3, 400, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3,  3, 500, 1);
		--Game 4
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1, 4, 50, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2, 4, 100, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3, 4, 250, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (4, 4, 500, 1);
		--Game 5
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1, 5, 400, 1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2, 5, 300, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3, 5, 200, 0);
		--Game 6
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1, 6, 200, -1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2, 6, 200, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3, 6, 150, -1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (4, 6, 500, 1);
		--Game 7
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (5, 7, 300, 1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (6, 7, 100, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1, 7, 500, 0);
		--Game 8
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2, 8, 100, 1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3, 8, 200, 0);
		--Game 9
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (1, 9, 500, 0);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (2, 9, 200, 1);
		insert into Bet_Table (userID, gameID, betAmount, betOutcome) values (3, 9, 500, 0);
		
		PRINT 'Sample Bet_Table Data Inserted'
END TRY
BEGIN CATCH
	SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;
