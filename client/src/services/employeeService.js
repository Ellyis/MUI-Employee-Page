export const getDepartments = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId',
}

export function getEmployees() {
    if (localStorage.getItem(KEYS.employees) === null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    let employees = JSON.parse(localStorage.getItem(KEYS.employees))
    let departments = getDepartments();

    return employees.map(x => ({
        ...x,
        department: departments.find(item => item.id === x.departmentId).title
    }))
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) === null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId));
    localStorage.setItem(KEYS.employeeId, (++id).toString());

    return id
}

export function insertEmployee(employee) {
    let employees = getEmployees();
    employee['id'] = generateEmployeeId();
    employees.push(employee);

    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function updateEmployee(employee) {
    let employees = getEmployees();
    let recordIndex = employees.findIndex(x => x.id === employee.id);
    employees[recordIndex] = { ...employee };

    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(employeeId) {
    let employees = getEmployees();
    employees = employees.filter(x => x.id !== employeeId);

    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}