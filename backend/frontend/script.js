const API_URL = "http://13.60.244.137:8081/api/employees";

const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");

async function loadEmployees() {
    try {
        const response = await fetch(API_URL);

        const employees = await response.json();

        employeeTableBody.innerHTML = "";

        employees.forEach(employee => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>
                    <button onclick="deleteEmployee(${employee.id})">
                        Delete
                    </button>
                </td>
            `;

            employeeTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading employees:", error);
    }
}


employeeForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const employee = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value,

        position: document.getElementById("position").value

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

        if (response.ok) {

            employeeForm.reset();

            loadEmployees();

        } else {

            alert("Failed to add employee.");

        }

    } catch (error) {

        console.error("Error adding employee:", error);

    }

});


async function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            loadEmployees();

        } else {

            alert("Failed to delete employee.");

        }

    } catch (error) {

        console.error("Error deleting employee:", error);

    }
}


loadEmployees();