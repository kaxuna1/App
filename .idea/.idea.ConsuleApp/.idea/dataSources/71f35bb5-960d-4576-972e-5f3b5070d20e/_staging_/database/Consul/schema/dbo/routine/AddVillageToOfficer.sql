-- =============================================
-- Author:		Kakha Gelashvili
-- Create date: 19.9.2017
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[AddVillageToOfficer] @VillageId int,@UserId int,@OfficerId int,@ValidFrom DATETIME,@Komli int
AS
BEGIN

	INSERT INTO dbo.OfficerVillages
	(
	    officerId,
	    villageId,
	    komli,
	    createDate,
	    validFrom,
	    accepted,
	    declined,
	    lastModifyBy,
	    lastModifyDate,
	    active,
	    createdBy
	)
	VALUES
	(    @OfficerId,         -- officerId - int
	    @VillageId,         -- villageId - int
	    @Komli,         -- komli - int
	    GETDATE(), -- createDate - datetime
	    @ValidFrom, -- validFrom - datetime
	    0,         -- accepted - int
	    0,         -- declined - int
	    @UserId,         -- lastModifyBy - int
	    GETDATE(), -- lastModifyDate - datetime
	    1,           -- active - int
	    @UserId         -- createdBy - int
	)
END
GO
