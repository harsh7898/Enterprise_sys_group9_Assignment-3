function addStudent() {
    const studentData = {
        student_id: parseInt(document.getElementById('student_id').value),
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        dob: document.getElementById('dob').value,
        amount_due: parseFloat(document.getElementById('amount_due').value),
    };

    $.ajax({
        type: 'POST',
        url: '/students',
        contentType: 'application/json',
        data: JSON.stringify(studentData),
        success: function (response) {
            document.getElementById('response').innerText = response.message;
        },
        error: function (xhr, status, error) {
            document.getElementById('response').innerText = 'Error: ' + xhr.responseText;
        },
    });
}

function getStudent() {
    const student_id = parseInt(document.getElementById('student_id').value);

    $.ajax({
        type: 'GET',
        url: `/students/${student_id}`,
        success: function (response) {
            if (response.message) {
                document.getElementById('response').innerText = response.message;
            } else {
                const studentDetails = `
                    <p>Student ID: ${response.student_id}</p>
                    <p>First Name: ${response.first_name}</p>
                    <p>Last Name: ${response.last_name}</p>
                    <p>Date of Birth: ${response.dob}</p>
                    <p>Amount Due: ${response.amount_due}</p>
                `;
                document.getElementById('response').innerHTML = studentDetails;
            }
        },
        error: function (xhr, status, error) {
            document.getElementById('response').innerText = 'Error: ' + xhr.responseText;
        },
    });
}

function updateStudent() {
    const studentData = {
        student_id: parseInt(document.getElementById('student_id').value),
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        dob: document.getElementById('dob').value,
        amount_due: parseFloat(document.getElementById('amount_due').value),
    };

    $.ajax({
        type: 'PUT',
        url: '/students/' + studentData.student_id,
        contentType: 'application/json',
        data: JSON.stringify(studentData),
        success: function (response) {
            document.getElementById('response').innerText = response.message;
        },
        error: function (xhr, status, error) {
            document.getElementById('response').innerText = 'Error: ' + xhr.responseText;
        },
    });
}

function deleteStudent() {
    const student_id = parseInt(document.getElementById('student_id').value);

    $.ajax({
        type: 'DELETE',
        url: '/students/' + student_id,
        success: function (response) {
            document.getElementById('response').innerText = response.message;
        },
        error: function (xhr, status, error) {
            document.getElementById('response').innerText = 'Error: ' + xhr.responseText;
        },
    });
}

function getallStudents() {
    $.ajax({
        type: 'GET',
        url: '/students',
        success: function (response) {
            let studentList = '';
            response.forEach(function (student) {
                studentList += `<p>Student ID: ${student.student_id}, Name: ${student.first_name} ${student.last_name}, DOB: ${student.dob}, Amount Due: ${student.amount_due}</p>`;
            });
            document.getElementById('response').innerHTML = studentList;
        },
        error: function (xhr, status, error) {
            document.getElementById('response').innerText = 'Error: ' + xhr.responseText;
        },
    });
}