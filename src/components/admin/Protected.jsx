import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { Comp } = props;
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const Activeuser = JSON.parse(localStorage.getItem('Active-user'));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userEvent) => {
            if (!userEvent) {
                navigate("/login");
            }else{
                if (Activeuser === "admin@gmail.com") {
                    navigate("/admin");
                } else {
                    setUser(userEvent);
                }
            }
        });

        return () => unsubscribe();
    }, [auth, Activeuser, navigate]);

    return <Comp />;
};

export default Protected;
