/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, makeStyles } from "@material-ui/core"
import { useState } from "react";
import ActionButton from "../../components/controls/ActionButton";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    }
}))

export default function EmployeeTable({ headers, records, openInPopup, handleDelete, setConfirmDialog }) {
    const classes = useStyles();
    const rowsOptions = [5, 10, 25];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsOptions[0]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((element, index) => [element, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        })
        return stabilizedThis.map(element => element[0]);
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(records, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const handleSort = headerId => {
        const isAscending = orderBy === headerId && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(headerId);
    }

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    {headers.map(item => (
                        <TableCell key={item.id} sortDirection={orderBy === item.id ? order : false}>
                            <TableSortLabel
                                active={orderBy === item.id}
                                direction={orderBy === item.id ? order : 'asc'}
                                onClick={() => handleSort(item.id)}
                            >
                                {item.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>
                                <ActionButton color="primary">
                                    <EditOutlined 
                                        fontSize="small"
                                        onClick={() => openInPopup(item)}
                                    />
                                </ActionButton>
                                <ActionButton color="secondary">
                                    <DeleteOutlined
                                        fontSize="small"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure you want to delete this record?',
                                                subtitle: "You can't undo this operation",
                                                onConfirm: () => handleDelete(item.id)
                                            })
                                        }}
                                    />
                                </ActionButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination 
                component="div"
                page={page}
                rowsPerPageOptions={rowsOptions}
                rowsPerPage={rowsPerPage}
                count={records.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </>
    )
}
