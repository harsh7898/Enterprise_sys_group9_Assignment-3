import sqlite3
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)


conn = sqlite3.connect('students.db', check_same_thread=False)
cursor = conn.cursor()


cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        student_id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        dob TEXT,
        amount_due REAL
    )
''')
conn.commit()

@app.route('/students', methods=['POST'])
def create_student():
    data = request.get_json()
    student_id = data.get('student_id')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    dob = data.get('dob')
    amount_due = data.get('amount_due')

    # Insert the student record into the database
    cursor.execute('''
        INSERT INTO students (student_id, first_name, last_name, dob, amount_due)
        VALUES (?, ?, ?, ?, ?)
    ''', (student_id, first_name, last_name, dob, amount_due))
    conn.commit()

    return jsonify({'message': 'Student record created successfully'})

@app.route('/students', methods=['GET'])
def get_all_students():
    # Retrieve all student records from the database
    cursor.execute('SELECT * FROM students')
    students = cursor.fetchall()
    student_list = []
    for student in students:
        student_dict = {
            'student_id': student[0],
            'first_name': student[1],
            'last_name': student[2],
            'dob': student[3],
            'amount_due': student[4]
        }
        student_list.append(student_dict)

    return jsonify(student_list)

@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    # Retrieve a specific student record from the database based on student_id
    cursor.execute('SELECT * FROM students WHERE student_id = ?', (student_id,))
    student = cursor.fetchone()
    if student:
        student_dict = {
            'student_id': student[0],
            'first_name': student[1],
            'last_name': student[2],
            'dob': student[3],
            'amount_due': student[4]
        }
        return jsonify(student_dict)
    else:
        return jsonify({'message': 'Student not found'})

@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    dob = data.get('dob')
    amount_due = data.get('amount_due')

    # Update the student record in the database
    cursor.execute('''
        UPDATE students
        SET first_name = ?, last_name = ?, dob = ?, amount_due = ?
        WHERE student_id = ?
    ''', (first_name, last_name, dob, amount_due, student_id))
    conn.commit()

    return jsonify({'message': 'Student record updated successfully'})

@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    # Delete the student record from the database based on student_id
    cursor.execute('DELETE FROM students WHERE student_id = ?', (student_id,))
    conn.commit()

    return jsonify({'message': 'Student record deleted successfully'})

@app.route('/')
def index():
    return render_template('index.html')

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
