import { yupResolver } from '@hookform/resolvers/yup';
import { AccountCircle, DateRangeOutlined, EmailOutlined, PasswordOutlined, TextFields, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, FormHelperText, Input, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import BottomBar from 'components/BottomBar';
import PropTypes, { InferProps } from "prop-types";
import { useEffect, useState } from 'react';
import { FieldErrors, FieldPath, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { RegistrationData } from "utils/CommonTypes";
import { BusinessArea } from 'utils/proto/account';
import { number as yup_number, date as yup_date, object as yup_object, string as yup_string } from 'yup';

const FormTextInputTypes = {
    text: PropTypes.string.isRequired,
    propName: PropTypes.instanceOf<FieldPath<RegistrationData>>(Object()).isRequired,
    fReg: PropTypes.instanceOf<UseFormRegister<RegistrationData>>(Object()).isRequired,
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

    const [values, setValues] = useState({
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

export default function Register() {
    const validationSchema = yup_object().shape({
        firstName: yup_string()
            .required('First Name is required'),
        lastName: yup_string()
            .required('Last Name is required'),
        email: yup_string()
            .email()
            .required('Email is required'),
        password: yup_string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        dateOfBirth: yup_date()
            .transform((d) => new Date(d))
            .required('Date of Birth is Required')
            .max(new Date(), 'Date of Birth cannot be in the future'),
        businessArea: yup_number()
            .required('You have to choose a business area')
    });

    const registerUser: SubmitHandler<RegistrationData> = async (data, event?) => {
        if (!event)
            return;

        event.preventDefault()

        const res = await fetch('/api/user/register', {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })

        const result = await res.json()
        console.log(result)
    }

    const { register, handleSubmit, formState } = useForm<RegistrationData>({ resolver: yupResolver(validationSchema) });
    const { errors } = formState;

    const [businessAreas, setBusinessAreas] = useState<BusinessArea[]>([]);
    useEffect(() => {
        async function getBusinessAreas() {
            const result = await fetch('/api/businessArea/list', { method: 'GET' })
            const res: { businessAreas: BusinessArea[] } = await result.json()
            setBusinessAreas(res.businessAreas);
        }
        getBusinessAreas();
    }, [])

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: "3vh" }}>
                <Typography variant="h4" component="div" gutterBottom>User Registration</Typography>

                <form onSubmit={handleSubmit(registerUser)}>
                    <Box sx={{ display: 'grid', columnGap: 3, rowGap: 2, gridAutoColumns: '2fr' }}>
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
                            text="Date of Birth"
                            propName='dateOfBirth'
                            type='date' />


                        <FormControl sx={{ gridColumn: 'span 2' }}>
                            <InputLabel id="input-businessarea-label">Business Area</InputLabel>
                            <Select
                                labelId="input-businessarea-label"
                                id="input-businessarea"
                                label="Business Area"
                                error={!!errors['businessArea']}
                                {...register('businessArea')}
                            >
                                {businessAreas.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
                            </Select>
                            <FormHelperText>{errors['businessArea']?.message}</FormHelperText>
                        </FormControl>
                    </Box>

                    <br />

                    <Box sx={{ display: 'grid', rowGap: 2 }}>
                        <Button type="submit" disabled={formState.isSubmitting} variant="contained">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </Button>
                        <Button variant="outlined" color="error" href="/">Cancel</Button>
                    </Box>
                </form>
            </Container >
            <BottomBar position='fixed' />
        </>
    );
}
