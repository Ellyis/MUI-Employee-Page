/* eslint-disable react/prop-types */
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button({ text, size, color, variant, onClick, ...other}) {
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || 'contained'}
            size={size || 'large'}
            color={color || 'primary'}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}
        >
            {text}
        </MuiButton>
    )
}
