import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { DatabaseFormSubmission } from "../../src/types/database";
import { transformFormDataToDatabaseFormat } from "../../src/types/database";
import { getConnection, closeConnection } from "../config/database";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let pool;
    try {
        // Validate request
        if (!req.body || !req.body.formData || !req.body.userId) {
            context.res = {
                status: 400,
                body: { message: "Invalid request body" }
            };
            return;
        }

        // Transform form data to database format
        const dbSubmission = transformFormDataToDatabaseFormat(req.body.formData, req.body.userId);

        // Get database connection
        pool = await getConnection();

        // Insert into database
        const result = await pool.request()
            .input('SubmissionId', dbSubmission.SubmissionId)
            .input('UserId', dbSubmission.UserId)
            .input('FormType', dbSubmission.FormType)
            .input('SubmittedAt', dbSubmission.SubmittedAt)
            .input('Status', dbSubmission.Status)
            .input('LastUpdated', dbSubmission.LastUpdated)
            .input('FirstName', dbSubmission.FirstName)
            .input('LastName', dbSubmission.LastName)
            .input('Email', dbSubmission.Email)
            .input('PhoneNumber', dbSubmission.PhoneNumber)
            .input('DateOfBirth', dbSubmission.DateOfBirth)
            .input('Nationality', dbSubmission.Nationality)
            .input('IdentityProofDocumentUrl', dbSubmission.IdentityProofDocumentUrl)
            .input('EmploymentStatus', dbSubmission.EmploymentStatus)
            .input('CompanyDetails', dbSubmission.CompanyDetails)
            .input('LengthOfEmployment', dbSubmission.LengthOfEmployment)
            .input('JobPosition', dbSubmission.JobPosition)
            .input('ReferenceFullName', dbSubmission.ReferenceFullName)
            .input('ReferenceEmail', dbSubmission.ReferenceEmail)
            .input('ReferencePhone', dbSubmission.ReferencePhone)
            .input('EmploymentProofType', dbSubmission.EmploymentProofType)
            .input('EmploymentProofDocumentUrl', dbSubmission.EmploymentProofDocumentUrl)
            .input('CurrentAddress', dbSubmission.CurrentAddress)
            .input('DurationAtCurrentAddress', dbSubmission.DurationAtCurrentAddress)
            .input('PreviousAddress', dbSubmission.PreviousAddress)
            .input('DurationAtPreviousAddress', dbSubmission.DurationAtPreviousAddress)
            .input('ReasonForLeaving', dbSubmission.ReasonForLeaving)
            .input('ResidentialProofType', dbSubmission.ResidentialProofType)
            .input('ResidentialProofDocumentUrl', dbSubmission.ResidentialProofDocumentUrl)
            .input('MonthlyIncome', dbSubmission.MonthlyIncome)
            .input('ProofOfIncomeType', dbSubmission.ProofOfIncomeType)
            .input('ProofOfIncomeDocumentUrl', dbSubmission.ProofOfIncomeDocumentUrl)
            .input('UseOpenBanking', dbSubmission.UseOpenBanking)
            .input('IsConnectedToOpenBanking', dbSubmission.IsConnectedToOpenBanking)
            .input('GuarantorFirstName', dbSubmission.GuarantorFirstName)
            .input('GuarantorLastName', dbSubmission.GuarantorLastName)
            .input('GuarantorEmail', dbSubmission.GuarantorEmail)
            .input('GuarantorPhone', dbSubmission.GuarantorPhone)
            .input('GuarantorAddress', dbSubmission.GuarantorAddress)
            .input('AgentFirstName', dbSubmission.AgentFirstName)
            .input('AgentLastName', dbSubmission.AgentLastName)
            .input('AgentEmail', dbSubmission.AgentEmail)
            .input('AgentPhone', dbSubmission.AgentPhone)
            .input('HasAgreedToCheck', dbSubmission.HasAgreedToCheck)
            .query(`
                INSERT INTO FormSubmissions (
                    SubmissionId, UserId, FormType, SubmittedAt, Status, LastUpdated,
                    FirstName, LastName, Email, PhoneNumber, DateOfBirth, Nationality,
                    IdentityProofDocumentUrl, EmploymentStatus, CompanyDetails,
                    LengthOfEmployment, JobPosition, ReferenceFullName, ReferenceEmail,
                    ReferencePhone, EmploymentProofType, EmploymentProofDocumentUrl,
                    CurrentAddress, DurationAtCurrentAddress, PreviousAddress,
                    DurationAtPreviousAddress, ReasonForLeaving, ResidentialProofType,
                    ResidentialProofDocumentUrl, MonthlyIncome, ProofOfIncomeType,
                    ProofOfIncomeDocumentUrl, UseOpenBanking, IsConnectedToOpenBanking,
                    GuarantorFirstName, GuarantorLastName, GuarantorEmail,
                    GuarantorPhone, GuarantorAddress, AgentFirstName, AgentLastName,
                    AgentEmail, AgentPhone, HasAgreedToCheck
                ) VALUES (
                    @SubmissionId, @UserId, @FormType, @SubmittedAt, @Status, @LastUpdated,
                    @FirstName, @LastName, @Email, @PhoneNumber, @DateOfBirth, @Nationality,
                    @IdentityProofDocumentUrl, @EmploymentStatus, @CompanyDetails,
                    @LengthOfEmployment, @JobPosition, @ReferenceFullName, @ReferenceEmail,
                    @ReferencePhone, @EmploymentProofType, @EmploymentProofDocumentUrl,
                    @CurrentAddress, @DurationAtCurrentAddress, @PreviousAddress,
                    @DurationAtPreviousAddress, @ReasonForLeaving, @ResidentialProofType,
                    @ResidentialProofDocumentUrl, @MonthlyIncome, @ProofOfIncomeType,
                    @ProofOfIncomeDocumentUrl, @UseOpenBanking, @IsConnectedToOpenBanking,
                    @GuarantorFirstName, @GuarantorLastName, @GuarantorEmail,
                    @GuarantorPhone, @GuarantorAddress, @AgentFirstName, @AgentLastName,
                    @AgentEmail, @AgentPhone, @HasAgreedToCheck
                )
            `);

        context.res = {
            status: 200,
            body: {
                message: "Form submitted successfully",
                submissionId: dbSubmission.SubmissionId
            }
        };

    } catch (error) {
        console.error('Error submitting form:', error);
        context.res = {
            status: 500,
            body: {
                message: "Error submitting form",
                error: error.message
            }
        };
    } finally {
        if (pool) {
            await closeConnection();
        }
    }
};

export default httpTrigger; 