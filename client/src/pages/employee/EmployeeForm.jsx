/* eslint-disable react/prop-types */
import { Grid, TextField, makeStyles } from "@material-ui/core";
import useForm from "../../components/useForm";
import RadioButtons from "../../components/controls/RadioButtons";
import Dropdown from "../../components/controls/Dropdown";
import Checkbox from "../../components/controls/Checkbox";
import DatePicker from "../../components/controls/DatePicker";
import Button from "../../components/controls/Button";
import { getDepartments } from "../../services/employeeService";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

const genderItems = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
]

const initialValues = {
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    gender: "male",
    departmentId: "",
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm({ handleAddOrEdit, recordForEdit }) {
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 digits required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."

        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, validate);

    useEffect(() => {
        if (recordForEdit !== null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])
    

    const handleSubmit = e => {
        e.preventDefault();

        if (validate()) {
            handleAddOrEdit(values, resetForm);
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        variant="outlined"
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField 
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <TextField 
                        variant="outlined"
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField 
                        variant="outlined"
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RadioButtons 
                        label="Gender" 
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Dropdown 
                        label="Department"
                        name="departmentId"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={getDepartments()}
                        error={errors.departmentId}
                    />
                    <DatePicker 
                        label="Hire Date"
                        name="hireDate"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Checkbox 
                        label="Permanent Employee"
                        name="isPermanent"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Button
                            type="submit"
                            text="Submit"
                        />
                        <Button
                            color="default"
                            text="Reset"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}
