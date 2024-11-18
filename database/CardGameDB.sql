--Database Table Creation

--Check for pre-existing table, build if none exist
BEGIN TRY
	BEGIN
	CREATE TABLE User_Table(
		userID int primary key not null,
		username varchar(64) not null unique,
		passHash varchar(64) not null unique,
		email varchar(128) unique,
		creationDate datetime default getdate() not null,
		lastLogin datetime default getdate() not null
	);
	END
	PRINT 'User Table Building'
END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2714
		BEGIN
		PRINT 'User Table Loaded'
		END
	ELSE
		SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;



--Check for pre-existing table, build if none exist
BEGIN TRY
	BEGIN
	CREATE TABLE Balance_Table(
		balanceID int not null primary key,
		--should delete all records from a given user if userID is deleted
		userID int not null foreign key references User_Table(userID) on delete cascade, 
		currentBalance int not null,
		reason varchar(128)
	);
	--should make retrieving data by userID faster
	CREATE INDEX BalanceIndexByUserID ON Balance_Table(userID);
	PRINT 'Balance Table Building'

	END
END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2714
		BEGIN
			PRINT 'Balance Table Loaded'
		END
	ELSE
		SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;


--Check for pre-existing table, build if none exist
BEGIN TRY
	BEGIN
	CREATE TABLE Result_Table(
		gameID int primary key not null,
		outcome int not null, --0 for loss, 1 for win, -1 for tie
		userID int not null foreign key references User_Table(userID),
		resultTime datetime default getdate() not null
	);
	PRINT 'Result Table Building'
	END
END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2714
		BEGIN
			PRINT 'Result Table Loaded'
		END
	ELSE
		SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;



	--Check for pre-existing table, build if none exist
BEGIN TRY
	BEGIN
	CREATE TABLE Bet_Table(
		userID int not null foreign key references User_Table(userID),
		gameID int not null foreign key references Result_Table(gameID),
		betAmount int not null,
		betOutcome int not null
	);
	CREATE INDEX betIndexByUserID ON Bet_Table(userID);
	PRINT 'Bet Table Building'
	END
END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2714
		BEGIN
			PRINT 'Bet Table Loaded'
		END
	ELSE
		SELECT
		ERROR_NUMBER() AS ErrorNumber,
		ERROR_STATE() AS ErrorState,
		ERROR_SEVERITY() AS ErrorSeverity,
		ERROR_PROCEDURE() AS ErrorProcedure,
		ERROR_LINE() AS ErrorLine,
		ERROR_MESSAGE() AS ErrorMessage;
END CATCH;