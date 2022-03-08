export type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    businessArea: number;
};

export type NormalisedAppointment = {
	type: number;
	date: string;
	time: string;
	duration: number;
	skill: string;
	link: string;
}