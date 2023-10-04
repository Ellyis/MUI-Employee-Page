import { useState } from "react";

export default function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        validate({
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

