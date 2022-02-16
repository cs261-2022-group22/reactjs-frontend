import { SubmitHandler, useForm, UseFormRegister, FieldPath, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, InputLabel, Typography, FormControl, Input, FormHelperText, Box, Button, InputAdornment, FormLabel, FormControlLabel, Radio, RadioGroup, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { AccountCircle, DateRangeOutlined, EmailOutlined, PasswordOutlined, TextFields, Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import PropTypes, { InferProps } from "prop-types";
import React from 'react';

type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
};


function FormTextInput(_prop: InferProps<typeof FormTextInput.propTypes>) {
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

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    return (
        <FormControl sx={{ gridColumn: columnSpan, ..._prop.sx }}>
            <InputLabel htmlFor={labelName} variant='standard' required>{text}</InputLabel>
            <Input
                startAdornment={innerIcon}
                id={labelName}
                error={!!errors[propertyName]}
                {...register(propertyName)}
                type={values.showPassword ? 'text' : inputType}
                endAdornment={inputType === "password" &&
                    <InputAdornment position="end">
                        <Button
                            aria-label="toggle password visibility"
                            onClick={() => { setValues({ ...values, showPassword: !values.showPassword, }); }}
                            onMouseDown={(event) => event.preventDefault()}>
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                    </InputAdornment>
                }
            />
            <FormHelperText>{errors[propertyName]?.message}</FormHelperText>
        </FormControl>
    );
}

FormTextInput.propTypes = {
    text: PropTypes.string.isRequired,
    propName: PropTypes.instanceOf<FieldPath<RegistrationData>>(Object()).isRequired,
    fReg: PropTypes.instanceOf<UseFormRegister<RegistrationData>>(Object()).isRequired,
    fErrs: PropTypes.instanceOf<FieldErrors>(Object()).isRequired,
    type: PropTypes.string,
    colSpan: PropTypes.string,
    icon: PropTypes.element,
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
        ),
        PropTypes.func,
        PropTypes.object
    ]),
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Business Area A',
    'Business Area B',
    'Area C',
    'Area D',
    'Area 51',
    'CS126',
    'Logic and Verification',
];

function Register() {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        dateOfBirth: Yup.date()
            .transform((d) => new Date(d))
            .required('Date of Birth is Required')
            .max(new Date(), 'Date of Birth cannot be in the future')
    });

    const registerUser: SubmitHandler<RegistrationData> = async (data, event?) => {
        console.log(data)
        console.log(event)

        if (!event)
            return;

        event.preventDefault()

        const res = await fetch('/api/user/register', {
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })

        const result = await res.json()
        console.log(result)
    }


    // get functions to build form with useForm() hook 
    const { register, handleSubmit, formState } = useForm<RegistrationData>({ resolver: yupResolver(validationSchema) });
    const { errors } = formState;

    const [businessAreas, setBusinessAreas] = React.useState<Array<string>>([]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="div" gutterBottom>User Registration</Typography>

            <form onSubmit={handleSubmit(registerUser)}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 3,
                        rowGap: 2,
                        gridAutoColumns: '2fr',
                    }}
                >
                    <FormTextInput fReg={register} fErrs={errors}
                        icon={<AccountCircle sx={{ mr: 1 }} />}
                        text="First Name"
                        propName='firstName'
                        sx={{ gridRow: '1', gridColumn: '1 / 2' }} />

                    <FormTextInput fReg={register} fErrs={errors}
                        icon={<div />}
                        text="Last Name"
                        propName='lastName'
                        sx={{ gridRow: '1', gridColumn: '2 / 3' }} />

                    <FormTextInput fReg={register} fErrs={errors}
                        icon={<EmailOutlined sx={{ mr: 1 }} />}
                        text="Email Address"
                        propName='email'
                        type='email' />

                    <FormTextInput fReg={register} fErrs={errors}
                        icon={<PasswordOutlined sx={{ mr: 1 }} />}
                        text="Password"
                        propName='password'
                        type='password' />

                    <FormTextInput fReg={register} fErrs={errors}
                        icon={<DateRangeOutlined sx={{ mr: 1 }} />}
                        text="dateOfBirth"
                        propName='dateOfBirth'
                        type='date' />

                    <FormControl sx={{ gridColumn: 'span 2' }}>
                        <FormLabel id="gender_radiobutton">Gender</FormLabel>
                        <RadioGroup row aria-labelledby="gender_radiobutton">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ gridColumn: 'span 2' }}>
                        <InputLabel id="demo-multiple-chip-label">Business Areas</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={businessAreas}
                            onChange={(event: SelectChangeEvent<string[]>) => { setBusinessAreas(event.target.value as string[]); }}
                            input={<OutlinedInput id="select-multiple-chip" label="Business Areas" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (<Chip key={value} label={value} />))}
                                </Box>
                            )}
                        >
                            {names.map((name) => (<MenuItem key={name} value={name}>{name}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Box>

                <br />

                <Box sx={{ display: 'grid', rowGap: 2 }}>
                    <Button variant="outlined" color="error" href="/">Cancel</Button>
                    <Button type="submit" disabled={formState.isSubmitting} variant="contained">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </Button>
                </Box>
            </form>
        </Container >
    );
}

export default Register;