import React, { useEffect, useState } from "react";
import firebase from "../firebase";

const Changepassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
  
    useEffect(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        setCurrentUserEmail(user.email);
      }
    }, []);
    const handleChangePassword = async () => {
      try {
        if (newPassword !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }
  
        const user = firebase.auth().currentUser;
        await user.updatePassword(newPassword);
  
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
        alert("Password changed successfully!");
      } catch (error) {
        setError(error.message);
      }
    };
  return (
    <div className="container m-auto mt-5">
      <h1 className="text-center">Change Password</h1>
      {currentUserEmail && (
        <>
        <label>New Password:</label>
        <input
        class="form-control mb-2"
          type="text"
          value={currentUserEmail}
          onChange={(e) => setNewPassword(e.target.value)} readOnly
        />
        </>
      )}
      <label>New Password:</label>
      <input
      class="form-control mb-2"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label>Confirm Password:</label>
      <input
      class="form-control mb-2"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleChangePassword}>Change Password</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default Changepassword