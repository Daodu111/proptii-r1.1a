-- First drop dependent objects
DROP PROCEDURE IF EXISTS sp_SubmitForm;
DROP TRIGGER IF EXISTS TR_FormSubmissions_Audit;
DROP TABLE IF EXISTS FormDocuments;
DROP TABLE IF EXISTS FormSubmissionAudit;
DROP TABLE IF EXISTS FormSubmission;

-- Create main form submission table with correct name
CREATE TABLE FormSubmission (
    SubmissionId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId NVARCHAR(255) NOT NULL,
    FormType NVARCHAR(50) NOT NULL,
    SubmittedAt DATETIME2 NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending',
    LastUpdated DATETIME2 DEFAULT GETUTCDATE(),
    
    -- Identity Information
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Nationality NVARCHAR(100) NOT NULL,
    IdentityProofDocumentUrl NVARCHAR(MAX),
    
    -- Employment Information
    EmploymentStatus NVARCHAR(50),
    CompanyDetails NVARCHAR(255),
    LengthOfEmployment NVARCHAR(50),
    JobPosition NVARCHAR(100),
    ReferenceFullName NVARCHAR(200),
    ReferenceEmail NVARCHAR(255),
    ReferencePhone NVARCHAR(50),
    EmploymentProofType NVARCHAR(50),
    EmploymentProofDocumentUrl NVARCHAR(MAX),
    
    -- Residential Information
    CurrentAddress NVARCHAR(MAX),
    DurationAtCurrentAddress NVARCHAR(50),
    PreviousAddress NVARCHAR(MAX),
    DurationAtPreviousAddress NVARCHAR(50),
    ReasonForLeaving NVARCHAR(MAX),
    ResidentialProofType NVARCHAR(50),
    ResidentialProofDocumentUrl NVARCHAR(MAX),
    
    -- Financial Information
    MonthlyIncome DECIMAL(18,2),
    ProofOfIncomeType NVARCHAR(50),
    ProofOfIncomeDocumentUrl NVARCHAR(MAX),
    UseOpenBanking BIT DEFAULT 0,
    IsConnectedToOpenBanking BIT DEFAULT 0,
    
    -- Guarantor Information
    GuarantorFirstName NVARCHAR(100),
    GuarantorLastName NVARCHAR(100),
    GuarantorEmail NVARCHAR(255),
    GuarantorPhone NVARCHAR(50),
    GuarantorAddress NVARCHAR(MAX),
    
    -- Agent Details
    AgentFirstName NVARCHAR(100),
    AgentLastName NVARCHAR(100),
    AgentEmail NVARCHAR(255),
    AgentPhone NVARCHAR(50),
    HasAgreedToCheck BIT DEFAULT 0
);

-- Create index for common queries
CREATE INDEX IX_FormSubmission_UserId ON FormSubmission(UserId);
CREATE INDEX IX_FormSubmission_Status ON FormSubmission(Status);
CREATE INDEX IX_FormSubmission_SubmittedAt ON FormSubmission(SubmittedAt);

-- Create audit trail table
CREATE TABLE FormSubmissionAudit (
    AuditId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL,
    ChangedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ChangedBy NVARCHAR(255) NOT NULL,
    PreviousStatus NVARCHAR(50),
    NewStatus NVARCHAR(50),
    ChangeDescription NVARCHAR(MAX),
    FOREIGN KEY (SubmissionId) REFERENCES FormSubmission(SubmissionId)
);

-- Create document references table
CREATE TABLE FormDocuments (
    DocumentId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL,
    DocumentType NVARCHAR(50) NOT NULL,
    DocumentUrl NVARCHAR(MAX) NOT NULL,
    UploadedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    FOREIGN KEY (SubmissionId) REFERENCES FormSubmission(SubmissionId)
);

-- Create trigger for audit trail
CREATE TRIGGER TR_FormSubmission_Audit
ON FormSubmission
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO FormSubmissionAudit (
        SubmissionId,
        ChangedBy,
        PreviousStatus,
        NewStatus,
        ChangeDescription
    )
    SELECT 
        i.SubmissionId,
        SYSTEM_USER,
        d.Status,
        i.Status,
        'Status changed from ' + ISNULL(d.Status, 'NULL') + ' to ' + ISNULL(i.Status, 'NULL')
    FROM inserted i
    INNER JOIN deleted d ON i.SubmissionId = d.SubmissionId
    WHERE i.Status <> d.Status;
END;

-- Create stored procedure for form submission
CREATE PROCEDURE sp_SubmitForm
    @UserId NVARCHAR(255),
    @FormType NVARCHAR(50),
    @FormData NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @SubmissionId UNIQUEIDENTIFIER = NEWID();
    
    -- Parse the JSON form data and insert into FormSubmission
    INSERT INTO FormSubmission (
        SubmissionId,
        UserId,
        FormType,
        SubmittedAt,
        -- Add all other fields here mapping from @FormData JSON
        Status
    )
    SELECT
        @SubmissionId,
        @UserId,
        @FormType,
        GETUTCDATE(),
        'Submitted';
        
    -- Return the new submission ID
    SELECT @SubmissionId AS SubmissionId;
END; 