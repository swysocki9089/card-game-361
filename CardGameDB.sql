--

--Check for pre-existing table, build if none exist
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User_Table')
	BEGIN
	PRINT 'User Table Loaded'
	END
ELSE
	BEGIN
    PRINT 'User Table Building'
	CREATE TABLE User_Table(
		userID int primary key not null,
		username varchar(64) not null unique,
		passHash varchar(64) not null unique,
		email varchar(128) unique,
		creationDate datetime default getdate() not null,
		lastLogin datetime default getdate() not null);
	END


--Check for pre-existing table, build if none exist
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Balance_Table')
	BEGIN
	PRINT 'Balance Table Loaded'
	END
ELSE
    BEGIN
	PRINT 'Balance Table Building'
	CREATE TABLE Balance_Table(
		bidID int not null primary key,

		--should delete all records from a given user if userID is deleted
		userID int not null foreign key references User_Table(userID) on delete cascade, 
		reason varchar(128));

	--should make retrieving data by userID faster
	CREATE INDEX IDX_Balance_UserID ON Balance_Table(userID);
	END


--Check for pre-existing table, build if none exist
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Result_Table')
	BEGIN
	PRINT 'Result Table Loaded'
	END
ELSE
	BEGIN
	PRINT 'Result Table Building'
	CREATE TABLE Result_Table(
		resultID smallint primary key not null,
		outcome smallint not null, --0 for loss, 1 for win, -1 for tie
		userID int not null foreign key references User_Table(userID));
	END