USE [70-461]
GO

/****** Object:  Table [dbo].[tblEmployee]    Script Date: 12/2/2021 11:57:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblEmployee](
	[EmloyeeNumber] [int] NOT NULL,
	[EmployeeFirstName] [varchar](50) NOT NULL,
	[EmployeeMiddleName] [varchar](50) NULL,
	[EmployeeLastName] [varchar](50) NOT NULL,
	[EmployeeGovermentID] [char](10) NULL,
	[DateOfBirth] [date] NOT NULL,
	[Department] [nchar](20) NOT NULL
) ON [PRIMARY]
GO


