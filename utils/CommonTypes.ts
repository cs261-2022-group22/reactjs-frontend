import { AppointmentType } from "./proto/meeting";

export type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    businessArea: number;
};

export type NormalisedAppointment = {
    type: AppointmentType;
    date: string;
    time: string;
    duration: number;
    skill: string;
    link: string;
}

export type SkillResult = {
    id: number;
    name: string;
};

export type BAResult = {
    id: number;
    name: string;
};