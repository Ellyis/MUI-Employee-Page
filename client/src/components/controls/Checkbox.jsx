/* eslint-disable react/prop-types */
import { FormControl, FormControlLabel, Checkbox as MuiCheckBox } from "@material-ui/core";

const convertToDefaultEventParams = (name, value) => ({
    target: {
        name, value
    }
})

export default function Checkbox({ label, name, value, onChange }) {
    return (
        <FormControl>
            <FormControlLabel 
                control={<MuiCheckBox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventParams(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
