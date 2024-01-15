import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';

const Appoinment = () => {
    const database = getDatabase(app);
    const [originalUser, setOriginalUser] = useState([]);
    const [user, setUser] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const ActiveDoctor = JSON.parse(localStorage.getItem('Active-doctor'));

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
                        item.doctor && item.doctor.includes(ActiveDoctor[0])
                    ));
                setOriginalUser(list);
                setUser(list);
            } else {
                console.log("data not Found");
            }
        });
    };

    const handleSearch = (e) => {
        const name = e.target.value;
        const newList = originalUser.filter((item) =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );
        setUser(newList);
    };
    const handleApply =()=>{
        
        const filteredByDate = originalUser.filter((item) =>
            (!startDate || item.date >= startDate) &&
            (!endDate || item.date <= endDate)
        );

        setUser(filteredByDate);
    }
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className='p-2'>
            <h1 className='text-center m-5'>All Appointment</h1>
            <hr/>
            <div className="filter d-flex justify-content-between align-items-center">
                <div className="col-2">
            <input type="text" id="" className='form-control m-2' placeholder='Search by Name...' onChange={handleSearch} /></div>
            <div className="col-4">
            <span>Select Date Range : </span>
            <input className='' type="date" onChange={handleStartDateChange} /> to <input type="date" onChange={handleEndDateChange} />
            <button className='btn btn-info ms-1' onClick={handleApply}>Apply</button>
            </div>
            </div>
            <hr/>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default Appoinment;
