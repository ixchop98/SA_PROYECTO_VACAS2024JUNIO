CREATE TABLE USER (
	username nvarchar(50) primary key,
    firstname nvarchar(50),
    lastname nvarchar(50),
    description nvarchar(200),
    photo nvarchar(200),
    email nvarchar(100),
    age int,
    birthday date,
    country nvarchar(50),
    password nvarchar(200),
    isadmin bit
);

CREATE TABLE ECOLOGICALACTIVITIES(
	idecologicalactivities int primary key,
    title nvarchar(50),
    description nvarchar(200)
);

CREATE TABLE USER_ECOLOGICALACTIVITIES(
	ID INT AUTO_INCREMENT PRIMARY KEY,
	username nvarchar(50),
    idecologicalactivities int,
    status bit,
    constraint fk1 foreign key (username) references USER(username),
    constraint fk2 foreign key (idecologicalactivities) references ECOLOGICALACTIVITIES(idecologicalactivities)
);

CREATE TABLE LOG_SEARCH(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    datecreated date,
    username nvarchar(50),
    latitud decimal(9,6),
    longitude decimal(9,6),
    num_aqi int
    
)