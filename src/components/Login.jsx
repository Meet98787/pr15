import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authh, auth, signInWithPopup, app } from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const database = getDatabase(app);
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/doctor/doctorprofail");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('Active-user', JSON.stringify(email))
      if (email == "admin@gmail.com") {
        navigate("/admin")
      } else {
        navigate("/doctor/doctorprofail")
      }

    } catch (error) {
      alert("Something Went Wrong Please Try Again")
      console.error(error);
    }
  };



  return (
    <>

      <section class="vh-100" >
        <div class="container py-5 h-100">
          <Link to="/">
            <i class="fa-solid fa-house bg-primary p-4 rounded text-white"></i></Link>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" >
                <div class="card-body p-5 text-center">
                  <h3 class="mb-5">Sign in</h3>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="typeEmailX-2">Email</label>
                    <input type="email" id="typeEmailX-2" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="typePasswordX-2">Password</label>
                    <input type="password" id="typePasswordX-2" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button class="btn btn-primary mt-3 btn-lg btn-block" type="submit" onClick={handleLogin}>Login</button><br />

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>

  );
}

export default Login;