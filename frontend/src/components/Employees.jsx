import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Employees.css';  // Import the CSS file

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchDepartment, setSearchDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const res = await axios.get('http://localhost:5000/api/employees', {
                    headers: { 'x-auth-token': token },
                });
                setEmployees(res.data);
            } catch (err) {
                setError(err.response?.data?.msg || 'Error fetching employees');
            }
        };
        fetchEmployees();
    }, [navigate]);

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const res = await axios.post(
                'http://localhost:5000/api/employees',
                { name, position, department, salary },
                { headers: { 'x-auth-token': token } }
            );
            setEmployees([...employees, res.data]);
            setName('');
            setPosition('');
            setDepartment('');
            setSalary('');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error adding employee');
        }
    };

    const handleDeleteEmployee = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                headers: { 'x-auth-token': token },
            });
            setEmployees(employees.filter((employee) => employee._id !== id));
        } catch (err) {
            setError('Error deleting employee');
        }
    };

    const filteredEmployees = employees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(searchName.toLowerCase()) &&
            employee.department.toLowerCase().includes(searchDepartment.toLowerCase())
        );
    });

    const handleGoBack = () => {
        navigate('/'); // Navigate to home page
    };

    return (
        <div className="container">
            <h2>Employee Management</h2>
            {error && <p className="error">{error}</p>}
            
            {/* Add Employee Form */}
            <form className="form" onSubmit={handleAddEmployee}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input"
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="input"
                />
                <button type="submit" className="button">Add Employee</button>
            </form>

            {/* Search Bar */}
            <div className="search-bar">
                <h3>Search Employees</h3>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Search by Department"
                    value={searchDepartment}
                    onChange={(e) => setSearchDepartment(e.target.value)}
                    className="input"
                />
            </div>

            {/* Employee List */}
            <h3>Employee List</h3>
            <ul className="employee-list">
                {filteredEmployees.map((employee) => (
                    <li key={employee._id} className="employee-item">
                        {employee.name} - {employee.position} - {employee.department} - ${employee.salary}
                        <button
                            onClick={() => handleDeleteEmployee(employee._id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Go Back Button */}
            <button className="button go-back" onClick={handleGoBack}>
                Go Back to Home
            </button>
        </div>
    );
};

export default Employees;
