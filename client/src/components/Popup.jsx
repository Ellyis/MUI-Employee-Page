/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, Typography, makeStyles } from "@material-ui/core";
import ActionButton from "./controls/ActionButton";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: 0
    }
}))

export default function Popup({ title, openPopup, setOpenPopup, children }) {
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <ActionButton 
                        color="secondary"
                        onClick={() => setOpenPopup(false)}
                    >
                        <Close />
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
