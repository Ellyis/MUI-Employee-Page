/* eslint-disable react/prop-types */
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const convertToDefaultEventParams = (name, value) => ({
    target: {
        name, value
    }
})

export default function DatePicker({ label, name, value, onChange }) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant='inline' inputVariant='outlined' 
                label={label}
                formate='MMM/dd/yyyy'
                name={name}
                value={value}
                onChange={date => onChange(convertToDefaultEventParams(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}
