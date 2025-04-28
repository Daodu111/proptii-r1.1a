CREATE TABLE ReferencingForm (
    SubmissionId NVARCHAR(36) PRIMARY KEY,
    UserId NVARCHAR(36) NOT NULL,
    FormType NVARCHAR(50) NOT NULL,
    SubmittedAt DATETIME2 NOT NULL,
    Status NVARCHAR(20) NOT NULL,
    LastUpdated DATETIME2 NOT NULL,
    
    -- Identity Information
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Nationality NVARCHAR(100) NOT NULL,
    IdentityProofDocumentUrl NVARCHAR(MAX),
    
    -- Employment Information
    EmploymentStatus NVARCHAR(50),
    CompanyDetails NVARCHAR(255),
    LengthOfEmployment NVARCHAR(50),
    JobPosition NVARCHAR(100),
    ReferenceFullName NVARCHAR(100),
    ReferenceEmail NVARCHAR(255),
    ReferencePhone NVARCHAR(20),
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
    UseOpenBanking BIT,
    IsConnectedToOpenBanking BIT,
    
    -- Guarantor Information
    GuarantorFirstName NVARCHAR(100),
    GuarantorLastName NVARCHAR(100),
    GuarantorEmail NVARCHAR(255),
    GuarantorPhone NVARCHAR(20),
    GuarantorAddress NVARCHAR(MAX),
    
    -- Agent Details
    AgentFirstName NVARCHAR(100),
    AgentLastName NVARCHAR(100),
    AgentEmail NVARCHAR(255),
    AgentPhone NVARCHAR(20),
    HasAgreedToCheck BIT
); 