/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function Dropdown({ label, name, value, onChange, options, error = null }) {
    return (
        <div>
            <FormControl variant="outlined" {...(error && { error: true })}>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    <MenuItem value="">None</MenuItem>
                    {options.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.title}
                        </MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </div>
    )
}
