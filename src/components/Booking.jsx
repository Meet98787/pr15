import React, { useEffect, useState } from 'react'
import { app } from './firebase';
import { getDatabase, onValue, push, ref } from "firebase/database";

const Booking = () => {
    const database = getDatabase(app);
    const [input, setInput] = useState({});
    const [doctor, setDoctor] = useState();
    const [Specialization, setSpecialization] = useState();
    useEffect(() => {
        userlist();
    }, []);

    const userlist = () => {
        const userRef = ref(database, "doctor");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setDoctor(list)
            } else {
                console.log("data not Found")
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.contect && input.contect.length !== 10) {
            alert("Contact number must be 10 characters long");
            return;
        }
        try {
            const selectedDate = new Date(input.date);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                const updatedInput = { ...input, "status": "Pending" };
                await push(ref(database, "booking"), updatedInput);
                alert("Booking Done");
                setInput();
            } else {
                alert("Appointment date must be greater than today's date");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if (e.target.name === "Specialization") {
            setSpecialization(e.target.value)
        }
    };

    return (
        <div className='container mt-5  text-center' id='booking'>
            <h1 className='text-center mb-5'>Book an appointment</h1>
                <form onSubmit={handleSubmit}>
            <div className="d-flex">
                <div className="col-6">
                    <input type="text" name='name' class="form-control mt-2"value={input ? input.name : ""} placeholder='Full name' onChange={handleChange} required />
                    <input type="number" name='contect' class="form-control mt-2" value={input ? input.contect : ""} placeholder='Enter Phone Number' onChange={handleChange} required />
                    <input type="time" name='time' value={input ? input.time : ""} id="appt" class="form-control mt-2" onChange={handleChange} required />
                    <select name='doctor' className="form-control mt-2" placeholder='Select Doctor' onChange={handleChange} required>
                    <option value="">Select</option>
                        {doctor && doctor
                            .filter((item) => item.Specialization === Specialization)
                            .map((item, index) => (
                                <>
                                <option key={index} value={item.name}>{item.name}</option>
                                </>
                            ))}
                    </select>
                    <input type="text"  name='message' value={input ? input.message : ""} class="form-control mt-2" placeholder='Additional Message' onChange={handleChange} required />
                </div>
                <div className="col-6">
                    <input type="email" name='email' value={input ? input.email : ""} class="form-control m-2" placeholder='Email Address' onChange={handleChange} required/>
                    <input type="date" name='date'value={input ? input.date : ""} class="form-control m-2" placeholder='' onChange={handleChange} required />
                    <select className="form-select m-2" id="Specialization" value={input ? input.Specialization : ""} name="Specialization" onChange={handleChange} required >
                        <option value="">Select</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="InternalMedicine">Internal Medicine</option>
                        <option value="ObstetricsandGynecology">Obstetrics and Gynecology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Radiology">Radiology</option>
                        <option value="General Surgery">General Surgery</option>
                    </select>
                </div>
            </div>
            <button className="btn btn-primary m-5" type='submit' >BOOK NOW</button>
                </form>

        </div>
    )
}

export default Booking