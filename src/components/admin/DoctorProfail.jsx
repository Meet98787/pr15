import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DoctorProfail = () => {
    const auth = getAuth();
    const user = auth.currentUser?.email;
    const [show, setShow] = useState(false);
    const database = getDatabase(app);
    const [input, setInput] = useState();
    const [id, setId] = useState(null);
    const [doctor, setDoctor] = useState([]);
    useEffect(() => {
        userlist();
    }, []);
    useEffect(() => {
        const activedoctor = doctor.map((item) => item.name);
        localStorage.setItem('Active-doctor', JSON.stringify(activedoctor));
    }, [doctor]);

    const userlist = () => {
        const userRef = ref(database, "doctor");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                const Activeuser = JSON.parse(localStorage.getItem('Active-user'))
                const NewList = list.filter((item) => item.email.toLocaleLowerCase().includes(Activeuser.toLocaleLowerCase()))
                setDoctor(NewList)
            } else {
                console.log("data not Found")
            }
        });
    };
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setInput(doctor.find((item) => item.id === id) || {});
        setId(id);
        setShow(true);
    }
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const handleUpdate = async (e) => {
        try {
            if (input.contectno && input.contectno.toString().length !== 10) {
                alert("Contact number must be 10 characters long");
                return;
            }
            await update(ref(database, `doctor/${id}`), input);
            setId(null);
            setInput();
            handleClose();
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    return (
        <div className='p-5 mt-5'>
            <h1 className='text-center mb-5'>Doctor Profile</h1>
            <div className="col-6 m-auto">
            <table className="table table-hover">
                <tbody>
                    {doctor && doctor.map((item, index) => (
                        <>
                        <tr key={item.id} >
                        <th scope="col" className='bg-primary'>Name :</th>
                        <td className='bg-primary'>{item.name}</td>
                        <th scope="col" className='bg-success'>Email :</th>
                        <td className='bg-success'>{item.email}</td>
                        </tr>
                        <tr>
                        <th scope="col" className='bg-info'>Contect Number :</th>
                        <td className='bg-info'> {item.contectno}</td>
                        <th scope="col" className='bg-warning Warning'>Specialization :</th>
                        <td className='bg-warning'>{item.Specialization}</td>
                        </tr>
                        <tr>
                            <td colspan="2" className='text-center'><button className='btn btn-secondary'  onClick={() => handleShow(item.id)}>Edit</button></td>
                            <td colspan="2" className='text-center'><Link to="/doctor/chengepassword"><button className='btn btn-info'>
                            Chenge Password</button></Link></td>
                        </tr>
                        </>
                    ))}
                </tbody>
            </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Take Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label htmlFor="name">Name</label>
                <input type="text" class="form-control" name="name" value={input ? input.name : ""} onChange={handleChange} />
                <label>Contect Number</label>
                <input type="number" class="form-control mb-2" name="contectno" value={input ? input.contectno : ""} onChange={handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className='btn btn-success' variant="secondary" onClick={handleUpdate}>
                        Save Chenges
                    </Button>
            </Modal.Footer>
        </Modal >
        </div>
    )
}

export default DoctorProfail