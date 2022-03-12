import { yupResolver } from '@hookform/resolvers/yup';
import { DateRangeOutlined, TextFields, AccessTimeOutlined } from '@mui/icons-material';
import { Box, Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import BottomBar from 'components/BottomBar';
import PropTypes, { InferProps } from "prop-types";
import { FieldErrors, FieldPath, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { useSession } from "next-auth/react";
import Unauthenticated from "components/Unauthenticated";

import { date as yup_date, object as yup_object, number as yup_number } from 'yup';

type SchedulingData = {
    menteeID: number;
    dateOfMeeting: Date;
    durationOfMeeting: number;
    link: string;
};

const FormTextInputTypes = {
    text: PropTypes.string.isRequired,
    propName: PropTypes.instanceOf<FieldPath<SchedulingData>>(Object()).isRequired,
    fReg: PropTypes.instanceOf<UseFormRegister<SchedulingData>>(Object()).isRequired,
    fErrs: PropTypes.instanceOf<FieldErrors>(Object()).isRequired,
    type: PropTypes.string,
    colSpan: PropTypes.string,
    icon: PropTypes.element,
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
        PropTypes.func,
        PropTypes.object
    ]),
};

function FormTextInput(_prop: InferProps<typeof FormTextInputTypes>) {
    const {
        text: text,
        propName: propertyName,
        fReg: register,
        fErrs: errors,
        colSpan: columnSpan = 'span 2',
        icon: innerIcon = <TextFields sx={{ mr: 1 }} />
    } = _prop;

    let inputType = _prop.type

    if (!inputType)
        inputType = 'text'

    const labelName = "input_" + propertyName;

    return (
        <FormControl sx={{ gridColumn: columnSpan, ..._prop.sx }}>
            <InputLabel htmlFor={labelName} variant='standard' required>{text}</InputLabel>
            <Input
                startAdornment={innerIcon}
                id={labelName}
                error={!!errors[propertyName]}
                {...register(propertyName)}
                type={inputType}
            />
            <FormHelperText>{errors[propertyName]?.message}</FormHelperText>
        </FormControl>
    );
}

export default function ScheduleMeeting() {
    const validationSchema = yup_object().shape({
        dateOfMeeting: yup_date()
            .transform((d) => new Date(d))
            .required('Date of meeting is Required')
            .min(new Date(), 'Date of meeting must be at least tomorrow'),
        durationOfMeeting: yup_number()
            .required('Duration of  is Required')
            .min(10, 'Meeting must be at least 10 minutes long')
            .max(120, 'Meeting cannot be longer than 120 minutes')
    });

    const { data: session } = useSession();
    if (!session) {
       return <Unauthenticated/>
    }
    const ID = session["id"] as number

    const schedule: SubmitHandler<SchedulingData> = async (data, event?) => {
        if (!event)
            return;

        event.preventDefault()

        const dataMeeting = {
            menteeID: ID,
            dateOfMeeting: data.dateOfMeeting, 
            durationOfMeeting: data.durationOfMeeting,    
            link: "link" + ID
        }

        const res = await fetch('/api/mentee/meeting', {
            body: JSON.stringify(dataMeeting),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })

        const result = await res.json()
        console.log(result)
        if (result.status) {
            window.location.pathname = "/"
        }
    }

    const { register, handleSubmit, formState } = useForm<SchedulingData>({ resolver: yupResolver(validationSchema) });
    const { errors } = formState;

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: "3vh" }}>
                <Typography variant="h4" component="div" gutterBottom>Schedule a meeting</Typography>

                <form onSubmit={handleSubmit(schedule)}>
                    <Box sx={{ display: 'grid', columnGap: 3, rowGap: 2, gridAutoColumns: '2fr' }}>

                        <FormTextInput fReg={register} fErrs={errors}
                            icon={<DateRangeOutlined sx={{ mr: 1 }} />}
                            text="Date of Meeting"
                            propName='dateOfMeeting'
                            type='datetime-local' />

                        <FormTextInput fReg={register} fErrs={errors}
                            icon={<AccessTimeOutlined sx={{ mr: 1 }} />}
                            text="Duration of meeting"
                            propName='durationOfMeeting'
                            type='number' />
                    </Box>

                    <br />

                    <Box sx={{ display: 'grid', rowGap: 2 }}>
                        <Button type="submit" disabled={formState.isSubmitting} variant="contained">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Schedule
                        </Button>
                        <Button variant="outlined" color="error" href="/mentee/dashboard">Go back</Button>
                    </Box>
                </form>
            </Container >
            <BottomBar position='fixed' />
        </>
    );
}