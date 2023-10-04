/* eslint-disable react/prop-types */
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";

// eslint-disable-next-line react/prop-types
export default function RadioButtons({ label, name, value, onChange, items }) {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup row
                name={name}
                value={value}
                onChange={onChange}
            >
                {items.map(item => (
                    <FormControlLabel
                        key={item.value}
                        control={<Radio />}
                        label={item.label}
                        value={item.value}
                    />
                ))}                
            </RadioGroup>
        </FormControl>
    )
}
