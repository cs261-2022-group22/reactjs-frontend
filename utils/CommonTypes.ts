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
};

export type SkillResult = {
    id: number;
    name: string;
};

export type BAResult = {
    id: number;
    name: string;
};

export type SchedulingData = {
    menteeID: number;
    dateOfMeeting: Date;
    durationOfMeeting: number;
    link: string;
};

export type CreatingData = {
    dateOfWorkshop: Date;
    durationOfWorkshop: number;
    link: string;
    skill: string;
};

export type MentorReturn = {
    status: boolean;
    mentorUserId: number;
    mentorName: string;
};
export type MenteeReturn = {
    userid: number;
    name: string;
};
