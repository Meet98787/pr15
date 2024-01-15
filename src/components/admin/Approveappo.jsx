import { getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';

const Approveappo = () => {
    const database = getDatabase(app);
    const [user, setUser] = useState([]);
    const ActiveDoctor = JSON.parse(localStorage.getItem('Active-doctor'))
    useEffect(() => {
        userlist();
    }, []);

    const userlist = () => {
        const userRef = ref(database, "booking");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data)
                    .map((id) => ({ id, ...data[id] }))
                    .filter(item => (
                        item.doctor && item.doctor.includes(ActiveDoctor[0]) &&
                        item.status && item.status.includes("Approve")
                    ));
                setUser(list)
            } else {
                console.log("data not Found")
            }
        });
    };

    const handleDone = async(id) => {
        await update(ref(database, `booking/${id}`), { status: "Done" });
        userlist();
    }
    return (
        <div className='p-2'>
            <h1 className='text-center'>Approve appointment</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contect Number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((item, index) => (
                        <tr key={item.id}>
                            <td scope="row">{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contect}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.status}</td>
                            <td>{item.message}</td>
                            <td><button className='btn btn-success mx-2' onClick={()=>handleDone(item.id)}>Done</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Approveappo