import { InputAdornment, Paper, TextField, Toolbar, makeStyles } from "@material-ui/core";
import PageHeader from "../../components/PageHeader";
import EmployeeForm from "./EmployeeForm";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import EmployeeTable from "./EmployeeTable";
import { Add, Search } from "@material-ui/icons";
import { deleteEmployee, getEmployees, insertEmployee, updateEmployee } from "../../services/employeeService";
import { useState } from "react";
import Button from "../../components/controls/Button";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headers = [
    { id: 'fullName', label: 'Employee Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'department', label: 'Department' },
    { id: 'actions', label: 'Actions' }
]

export default function Employees() {
    const classes = useStyles();

    const [records, setRecords] = useState(getEmployees());
    const [filteredRecords, setFilteredRecords] = useState(getEmployees());
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' });

    const handleSearch = event => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredRecords = records.filter(x => x.fullName.toLowerCase().includes(searchTerm));
        setFilteredRecords(filteredRecords);
    }

    const handleAddOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            insertEmployee(employee);
        else
            updateEmployee(employee);

        resetForm();
        setOpenPopup(false);
        setRecords(getEmployees());
        setFilteredRecords(getEmployees());
        setNotify({
            isOpen: true,
            message: 'Submitted Sucessfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const handleDelete = employeeId => {
        deleteEmployee(employeeId);
        setRecords(getEmployees());
        setFilteredRecords(getEmployees());
        setNotify({
            isOpen: true,
            message: 'Deleted Sucessfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Employee Page"
                subtitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <TextField
                        className={classes.searchInput}
                        variant="outlined"
                        label="Search Employee"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                    <Button 
                        text="Add New" 
                        variant="outlined" 
                        startIcon={<Add />}
                        className={classes.newButton}
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null);}}
                    />
                </Toolbar>
                <EmployeeTable headers={headers} records={filteredRecords} openInPopup={openInPopup} handleDelete={handleDelete} setConfirmDialog={setConfirmDialog} />
            </Paper>

            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm handleAddOrEdit={handleAddOrEdit} recordForEdit={recordForEdit} handleDelete={handleDelete} />
            </Popup>

            <Notification 
                notify={notify}
                setNotify={setNotify}
            />

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
