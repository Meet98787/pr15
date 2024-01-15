import React, { useEffect, useState } from "react";
import { app, auth } from "../firebase";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { handleLogout } from '../firebase';
import { useNavigate } from "react-router";

function Admin() {
    const database = getDatabase(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [input, setInput] = useState();
    const [doctor, setDoctor] = useState([]);
    const [id, setId] = useState(null);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    const user = auth.currentUser;

    useEffect(() => {
        userlist();
    }, []);

    useEffect(() => {
        if (user && user.email !== "admin@gmail.com") {
            navigate("/doctor/doctorprofail");
        }
    }, [user, navigate]);

    const userlist = () => {
        const userRef = ref(database, "doctor");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setDoctor(list);
            } else {
                console.log("data not Found");
            }
        });
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail(input.email);
        setPassword(input.password);

        if (input.contectno && input.contectno.toString().length !== 10) {
            alert("Contact number must be 10 characters long");
            return;
        }
        if (!input.Specialization) {
            alert("Please select a Specialization");
            return;
        }

        if (edit && id) {
            try {
                await update(ref(database, `doctor/${id}`), input);
                setId(null);
                setInput();
                setEdit(false);
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {
            try {
                await auth.createUserWithEmailAndPassword(email, password);
                await push(ref(database, "doctor"), input);
                setInput();
                setPassword(null);
                setEmail(null);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };
    return (
        <div className="container-fuild admin">
        <div className="container">
            <h1 className="text-center mb-4">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control mb-2" name="name" value={input ? input.name : ""} onChange={handleChange} required />
                
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control mb-2" name="email" value={input ? input.email : ""} onChange={handleChange} required />
                
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control mb-2" name="password" value={input ? input.password : ""} onChange={handleChange} required />
                
                <label htmlFor="contectno" className="form-label">Contact Number</label>
                <input type="number" className="form-control mb-2" name="contectno" value={input ? input.contectno : ""} onChange={handleChange} required />
                
                <select className="form-select mb-3" id="Specialization" name="Specialization" onChange={handleChange}>
                    <option value="">Select Doctor Specialization</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="InternalMedicine">Internal Medicine</option>
                    <option value="ObstetricsandGynecology">Obstetrics and Gynecology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Radiology">Radiology</option>
                    <option value="GeneralSurgery">General Surgery</option>
                </select>
                
                <button className="btn btn-primary mt-2">{edit ? 'Update' : 'Add'}</button>
            </form>

            <table className="table table-hover mt-5">
                <thead>
                    <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Specialization</th>
                        {/* <th scope="col">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {doctor &&
                        doctor.map((item, index) => (
                            <tr key={item.id}>
                                <td scope="row">{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contectno}</td>
                                <td>{item.Specialization}</td>
                                {/* <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit</button>
                                </td> */}
                            </tr>
                        ))}
                </tbody>
            </table>
            <button className="btn btn-danger mb-3" onClick={handleLogout}>
                Sign out
            </button>
        </div>
        </div>
    );
}

export default Admin;
