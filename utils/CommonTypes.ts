export type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    businessArea: number;
};
export type MentorReturn = {
    status: boolean;
    mentorUserId: number;
    mentorName: string;
 
};