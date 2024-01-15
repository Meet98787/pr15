import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { app } from './firebase';

const ChackAppointment = () => {
    const [input, setInput] = useState('');
    const [user, setUser] = useState([]);
    const [table, setTable] = useState(false);
    const database = getDatabase(app);

    useEffect(() => {
    }, []);

    const userlist = () => {
        if (input.trim() === '') {
            alert(" please Enter Name Or Contect Number")
            return;
        }

        const userRef = ref(database, "booking");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data)
                    .map((id) => ({ id, ...data[id] }))
                    .filter(item => (
                        (item.name && item.name.toLowerCase().includes(input.toLowerCase())) ||
                        (item.contect && item.contect.includes(input))
                    ));
                setTable(true)
                setUser(list);
            } else {
                console.log("data not Found");
            }
        });
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };
    return (
        <div className='container' id='chack'>
            <h1 className='text-center'>Search by Appointment History by <br /> Name/Mobile No</h1>
            <div className="d-flex mt-5">
                <div className="col-8">
                    <input type="text" name='name' class="form-control" placeholder='Name/Mobile Number' onChange={handleChange} />
                </div>
                <div className="col-4 text-center">
                    <button className='btn btn-dark px-5' onClick={userlist}>check</button>
                </div>
            </div>
            {table &&
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contect Number</th>
                            <th scope="col">Specialization</th>
                            <th scope="col">Doctor</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.map((item, index) => (
                            <tr key={item.id}>
                                <td scope="row">{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contect}</td>
                                <td>{item.Specialization}</td>
                                <td>{item.doctor}</td>
                                <td>{item.date}</td>
                                <td>{item.status}</td>
                                <td>{item.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </div>
    )
}

export default ChackAppointment