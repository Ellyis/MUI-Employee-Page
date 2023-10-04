/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, makeStyles } from "@material-ui/core";
import Button from "./controls/Button";
import { NotListedLocation } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center',
    },
    dialogContent: {
        textAlign: 'center',
    },
    dialogAction: {
        justifyContent: 'center',
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    }
}))

export default function ConfirmDialog({ confirmDialog, setConfirmDialog }) {
    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton className={classes.titleIcon}>
                    <NotListedLocation />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button 
                    text="No" 
                    color="default"
                    onClick={() => setConfirmDialog({
                        ...confirmDialog,
                        isOpen: false
                    })} 
                />
                <Button 
                    text="Yes" 
                    color="secondary"
                    onClick={() => {
                        confirmDialog.onConfirm(); 
                        setConfirmDialog({
                            ...confirmDialog,
                            isOpen: false
                        })
                    }}
                />
            </DialogActions>
        </Dialog>
    )
}
