import { Card, Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff',
    },
    pageHeader: {
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1'
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    }
}))

// eslint-disable-next-line react/prop-types
export default function PageHeader({ title, subtitle, icon }) {
    const classes = useStyles();

    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography component="div" variant="h6">{title}</Typography>
                    <Typography component="div" variant="subtitle2">{subtitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
