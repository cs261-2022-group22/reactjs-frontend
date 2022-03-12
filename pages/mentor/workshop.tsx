import {
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    Alert, 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormHelperText, 
    Input, 
    InputLabel, 
    Typography
} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { DateRangeOutlined, TextFields, AccessTimeOutlined } from '@mui/icons-material';
import BottomBar from 'components/BottomBar';
import PropTypes, { InferProps } from "prop-types";
import { FieldErrors, FieldPath, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { useSession } from "next-auth/react";
import Unauthenticated from "components/Unauthenticated";
import { useState } from "react";
import { Skill } from "utils/CommonTypes";
import { CreatingData } from "utils/CommonTypes"
import { AccountClient } from "utils/rpcClients";
import { date as yup_date, object as yup_object, number as yup_number } from 'yup';

const FormTextInputTypes = {
    text: PropTypes.string.isRequired,
    propName: PropTypes.instanceOf<FieldPath<CreatingData>>(Object()).isRequired,
    fReg: PropTypes.instanceOf<UseFormRegister<CreatingData>>(Object()).isRequired,
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

export default function CreateWorkshop(props: { skills: Skill[] }) {
    const validationSchema = yup_object().shape({
        dateOfWorkshop: yup_date()
            .transform((d) => new Date(d))
            .required('Date of workshop is Required')
            .min(new Date(), 'Date of workshop must be at least tomorrow'),
        durationOfWorkshop: yup_number()
            .required('Duration of  is Required')
            .min(10, 'Workshop must be at least 10 minutes long')
            .max(120, 'Workshop cannot be longer than 120 minutes')
    });

    const { data: session } = useSession();
    if (!session) {
       return <Unauthenticated/>
    }

    const skills: string[] = [];
    props.skills.forEach((skill) => {
        skills.push(skill.name);
    });
    
    const [skillState, setskillState] = useState<string>("");
    const [alert, setAlert] = useState(false);
    
    const handleChange = (event: SelectChangeEvent<typeof skillState>) => {
        const {
            target: { value },
            } = event;
        setskillState(value);
        setAlert(false);
    };

    const create: SubmitHandler<CreatingData> = async (data, event?) => {
        if (!event)
            return;

        event.preventDefault()

        const dataWorkshop = {
            dateOfWorkshop: data.dateOfWorkshop, 
            durationOfWorkshop: data.durationOfWorkshop,    
            link: "link" + skillState,
            skill: skillState
        }

        if (dataWorkshop.skill == "") {
            setAlert(true)
        } else {
            const res = await fetch('/api/mentor/workshop', {
                body: JSON.stringify(dataWorkshop),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
    
            const result = await res.json()
            console.log(result)
            if (result.status) {
                window.location.pathname = "/"
            }
        }
       
    }
    
    const { register, handleSubmit, formState } = useForm<CreatingData>({ resolver: yupResolver(validationSchema) });
    const { errors } = formState;

    return (
        <>  
        {alert ? (
            <Alert severity="error">Choose at least one skill</Alert>
        ) : (
            <></>
        )}
            <Container maxWidth="sm" sx={{ mt: "3vh" }}>
                <Typography variant="h4" component="div" gutterBottom>Create a workshop</Typography>

                <form onSubmit={handleSubmit(create)}>
                    <Box sx={{ display: 'grid', columnGap: 3, rowGap: 2, gridAutoColumns: '2fr' }}>

                        <FormTextInput fReg={register} fErrs={errors}
                            icon={<DateRangeOutlined sx={{ mr: 1 }} />}
                            text="Date of Workshop"
                            propName='dateOfWorkshop'
                            type='datetime-local' />

                        <FormTextInput fReg={register} fErrs={errors}
                            icon={<AccessTimeOutlined sx={{ mr: 1 }} />}
                            text="Duration of workshop"
                            propName='durationOfWorkshop'
                            type='number' />
                    </Box>
                    <Stack direction="column">
                        <InputLabel>Skill</InputLabel>
                            <Select
                                value={skillState}
                                onChange={handleChange}
                                input={<OutlinedInput label="Skill" />}
                                sx={{
                                    minHeight: "8vh",
                                }}
                                
                            >
                                {skills.map((skill) => (
                                    <MenuItem key={skill} value={skill}>
                                        {skill}
                                    </MenuItem>
                                ))}
                            </Select>
                    </Stack>
                    
                    <br />
                    
                    <Box sx={{ display: 'grid', rowGap: 2 }}>
                        <Button type="submit" disabled={formState.isSubmitting} variant="contained">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Create
                        </Button>
                        <Button variant="outlined" color="error" href="/mentor/dashboard">Go back</Button>
                    </Box>
                </form>
            </Container >
            <BottomBar position='fixed' />
        </>
    );
}

export async function getServerSideProps() {
    const accountClient = new AccountClient();
    const skillsResult = await accountClient.listSkillsAsync({});
    console.log("sa", skillsResult);
    return {
        props: {
            skills: skillsResult.skills,
        },
    };
}