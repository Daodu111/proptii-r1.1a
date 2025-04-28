import { FormData } from './referencing';

export interface DatabaseFormSubmission {
    SubmissionId: string;
    UserId: string;
    FormType: string;
    SubmittedAt: Date;
    Status: string;
    LastUpdated: Date;

    // Identity Information
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    DateOfBirth: Date;
    Nationality: string;
    IdentityProofDocumentUrl?: string;

    // Employment Information
    EmploymentStatus?: string;
    CompanyDetails?: string;
    LengthOfEmployment?: string;
    JobPosition?: string;
    ReferenceFullName?: string;
    ReferenceEmail?: string;
    ReferencePhone?: string;
    EmploymentProofType?: string;
    EmploymentProofDocumentUrl?: string;

    // Residential Information
    CurrentAddress?: string;
    DurationAtCurrentAddress?: string;
    PreviousAddress?: string;
    DurationAtPreviousAddress?: string;
    ReasonForLeaving?: string;
    ResidentialProofType?: string;
    ResidentialProofDocumentUrl?: string;

    // Financial Information
    MonthlyIncome?: number;
    ProofOfIncomeType?: string;
    ProofOfIncomeDocumentUrl?: string;
    UseOpenBanking?: boolean;
    IsConnectedToOpenBanking?: boolean;

    // Guarantor Information
    GuarantorFirstName?: string;
    GuarantorLastName?: string;
    GuarantorEmail?: string;
    GuarantorPhone?: string;
    GuarantorAddress?: string;

    // Agent Details
    AgentFirstName?: string;
    AgentLastName?: string;
    AgentEmail?: string;
    AgentPhone?: string;
    HasAgreedToCheck?: boolean;
}

export function transformFormDataToDatabaseFormat(formData: FormData, userId: string): DatabaseFormSubmission {
    return {
        SubmissionId: crypto.randomUUID(),
        UserId: userId,
        FormType: 'referencing',
        SubmittedAt: new Date(),
        Status: 'Submitted',
        LastUpdated: new Date(),

        // Identity Information
        FirstName: formData.identity.firstName,
        LastName: formData.identity.lastName,
        Email: formData.identity.email,
        PhoneNumber: formData.identity.phoneNumber,
        DateOfBirth: new Date(formData.identity.dateOfBirth),
        Nationality: formData.identity.nationality,
        IdentityProofDocumentUrl: formData.identity.identityProof ? 'pending-upload' : undefined,

        // Employment Information
        EmploymentStatus: formData.employment.employmentStatus,
        CompanyDetails: formData.employment.companyDetails,
        LengthOfEmployment: formData.employment.lengthOfEmployment,
        JobPosition: formData.employment.jobPosition,
        ReferenceFullName: formData.employment.referenceFullName,
        ReferenceEmail: formData.employment.referenceEmail,
        ReferencePhone: formData.employment.referencePhone,
        EmploymentProofType: formData.employment.proofType,
        EmploymentProofDocumentUrl: formData.employment.proofDocument ? 'pending-upload' : undefined,

        // Residential Information
        CurrentAddress: formData.residential.currentAddress,
        DurationAtCurrentAddress: formData.residential.durationAtCurrentAddress,
        PreviousAddress: formData.residential.previousAddress,
        DurationAtPreviousAddress: formData.residential.durationAtPreviousAddress,
        ReasonForLeaving: formData.residential.reasonForLeaving,
        ResidentialProofType: formData.residential.proofType,
        ResidentialProofDocumentUrl: formData.residential.proofDocument ? 'pending-upload' : undefined,

        // Financial Information
        MonthlyIncome: formData.financial.monthlyIncome ? parseFloat(formData.financial.monthlyIncome) : undefined,
        ProofOfIncomeType: formData.financial.proofOfIncomeType,
        ProofOfIncomeDocumentUrl: formData.financial.proofOfIncomeDocument ? 'pending-upload' : undefined,
        UseOpenBanking: formData.financial.useOpenBanking,
        IsConnectedToOpenBanking: formData.financial.isConnectedToOpenBanking,

        // Guarantor Information
        GuarantorFirstName: formData.guarantor.firstName,
        GuarantorLastName: formData.guarantor.lastName,
        GuarantorEmail: formData.guarantor.email,
        GuarantorPhone: formData.guarantor.phoneNumber,
        GuarantorAddress: formData.guarantor.address,

        // Agent Details
        AgentFirstName: formData.agentDetails.firstName,
        AgentLastName: formData.agentDetails.lastName,
        AgentEmail: formData.agentDetails.email,
        AgentPhone: formData.agentDetails.phoneNumber,
        HasAgreedToCheck: formData.agentDetails.hasAgreedToCheck
    };
} 