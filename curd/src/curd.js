import React, { useEffect, useState } from 'react'

function Curd() {
    let url = "http://127.0.0.1:5000/student_details"
    // let students = []
    const [students, setStudents] = useState([]);
    const [count, setCount] = useState(0)
    const [student, setStudent] = useState(null)
    const [currentForm, setCurrentForm] = useState('add')
    // let student1 = {
    //     "name": "sumalatha",
    //     "email": "sumalatha@gmail.com",
    //     "phone": "8907654321",
    //     "active": "1"
    // }
    // let student2 = {
    //     "name": "kepha",`
    //     "email": "kepha@gmail.com",
    //     "phone": "9907654330",
    //     "active": "0"
    // }
    // students.push(student1);
    // students.push(student2);

    useEffect(() => {
        // for(let i=0; i<students.length; i++){
        //     console.log(students['name'][i]+" "+students['email'][i]+" "+ students['phone'][i]+" "+ students['active'][i])
        // }
        // console.log(students);
        // students.map((student, index) =>{
        //     console.log(student['name']+" "+ student['email']+" "+ student['phone']+" "+ student['active'])
        // })

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = this.responseText;
                data = JSON.parse(data)
                setStudents(data)
                console.log(data)
            }
        }
        xhttp.send();

    }, [count])

    const add_student = (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let is_active = document.getElementById('is_active').checked;
        let is_deactive = document.getElementById('is_deactive').checked;
        let active = 0;
        if (is_active) {
            active = 1;
        }
        if (is_deactive) {
            active = 0;
        }
        let student = {
            "name": name,
            "email": email,
            "phone": phone,
            "active": active
        }
        console.log(student);

        if (currentForm === 'add') {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let data = this.responseText;
                    data = JSON.parse(data);
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("is_active").checked = false;
                    document.getElementById("is_deactive").checked = false;
                    setCount(count+1)
                }
            }
            xhttp.send(JSON.stringify(student));
        }
        else {
            let student_id = document.getElementById("student_id").value
            let url2 = url + "/" + student_id
            var xhttp = new XMLHttpRequest();
            xhttp.open("PATCH", url2, true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let data = this.responseText;
                    data = JSON.parse(data);
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("is_active").checked = false;
                    document.getElementById("is_deactive").checked = false;
                    setCurrentForm('add')
                    setCount(count+1)
                }
            }
            xhttp.send(JSON.stringify(student));
        }
    }

    const deleteStudent = (student_id) => {
        let url2 = url + "/" + student_id
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", url2, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = this.responseText;
                data = JSON.parse(data);
                setCount(count + 1)
            }
        }
        xhttp.send();
    }

    const updateStudent = (student_id) => {
        let url2 = url + "/" + student_id
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url2, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = this.responseText;
                data = JSON.parse(data)
                let student = data;
                document.getElementById("student_id").value = student['student_id'];
                document.getElementById("name").value = student['name'];
                document.getElementById("email").value = student['email'];
                document.getElementById("phone").value = student['phone'];
                if (student['active'] === '1') {
                    document.getElementById('is_active').checked = true;
                    document.getElementById('is_deactive').checked = false;
                    console.log('latha')
                } else {
                    document.getElementById('is_active').checked = false;
                    document.getElementById('is_deactive').checked = true;
                    console.log("suma")
                }
                setCurrentForm('update')
            }
        }
        xhttp.send();

    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card mt-5 p-3'>
                        <form onSubmit={add_student}>
                            {currentForm === 'add' ? <div>
                                <div className='text-center mt-2 h4'>Add Student</div>
                            </div> : <div>
                                <div className='text-center mt-2 h4'>Update Student</div>
                            </div>}
                            <input type='hidden' id='student_id'></input>
                            <div className='mt-1'>
                                <label htmlFor='name' className='form-label'>Name</label>
                                <input type='text' name='name' id='name' required placeholder='Enter Name' className='form-control'></input>
                            </div>
                            <div className='mt-1'>
                                <label htmlFor='email' className='form-label'>Email</label>
                                <input type='email' name='email' id='email' required placeholder='Enter Email' className='form-control'></input>
                            </div>
                            <div className='mt-1'>
                                <label htmlFor='phone' className='form-label'>Phone Number</label>
                                <input type='number' name='phone' id='phone' required placeholder='Enter phone' className='form-control'></input>
                            </div>
                            <div className='mt-2'>
                                <label className='control-label'>Is Active</label> &nbsp;
                                <input type='radio' name='active' id='is_active' value='1' />&nbsp;<label htmlFor='is_active'>Yes</label>&nbsp;
                                <input type='radio' name='active' id='is_deactive' value='0' />&nbsp;<label htmlFor='is_deactive'>No</label>&nbsp;
                            </div>
                            <div className='mt-3'>
                                {currentForm === 'add' ? <div>
                                    <input type='submit' value='Add Student' className='btn btn-primary w-100'></input>
                                </div> : <div>
                                    <input type='submit' value='Update Student' className='btn btn-success w-100'></input>
                                </div>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-md-8 mt-4'>
                    <h5 className='text-center'>View Students</h5>
                    <table className='table table-bordered primary text-center'>
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Active</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) =>
                                <tr key={index} className=''>
                                    <td>{student['student_id']}</td>
                                    <td>{student['name']}</td>
                                    <td>{student['email']}</td>
                                    <td>{student['phone']}</td>
                                    <td>{'' + student['active']}</td>
                                    <td><button onClick={() => updateStudent(student['student_id'])} className='btn btn-success w-100'>Update</button></td>
                                    <td><button onClick={() => deleteStudent(student['student_id'])} className='btn btn-danger w-100'>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >

        </div >
    )
};

export default Curd;

