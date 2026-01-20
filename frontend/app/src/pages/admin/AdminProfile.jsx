import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import Avatar from "../../assets/teacher.png";
// Toastify is used for providing non-intrusive user feedback (notifications)
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  /* INITIALIZING STATE:
     Instead of multiple strings, we use a single object to manage all form fields.
     This makes the state more organized and easier to scale.
  */
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "9876543210",
    designation: "Teacher",
    password: "",
  });

  /* DYNAMIC HANDLER: handleChange
     This is a highly efficient way to handle multiple inputs.
     1. [...admin]: Uses the spread operator to copy existing state (Immutability).
     2. [e.target.name]: Uses "computed property names" to update the specific 
        key that matches the input's 'name' attribute.
  */
  const handleChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  /* FORM SUBMISSION:
     e.preventDefault() is crucial to stop the browser from refreshing the page.
     In a real app, this is where an API 'PUT' or 'PATCH' request would occur.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", admin);
    toast.success("Profile Updated Successfully!");
  };

  return (
    <div className="container-fluid p-0">
      {/* HEADER: Clean navigation bar with branding */}
      <header className="d-flex align-items-center p-3 border-bottom bg-white shadow-sm">
        <img src={Logo} alt="Logo" width={45} className="me-3" />
        <h4 className="mb-0 fw-bold">Admin Profile</h4>
      </header>

      <div className="container mt-5 d-flex justify-content-center">
        {/* PROFILE CARD: Centered layout using Bootstrap's flex utilities */}
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "700px", backgroundColor: "#f8f9fa" }}>
          
          {/* AVATAR SECTION: 
              Shows a visual representation of the user and reflects state (admin.name/designation) 
              in real-time as the user types in the form.
          */}
          <div className="text-center mb-4">
            <img
              src={Avatar}
              alt="Admin"
              className="rounded-circle shadow-sm"
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: "4px solid white",
              }}
            />
            <h5 className="mt-3 fw-bold">{admin.name}</h5>
            <span className="badge bg-primary">{admin.designation}</span>
          </div>

          {/* FORM: 
              Each input is a "Controlled Component" because its 'value' is 
              driven by the React state ('admin.field').
          */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Name</label>
                <input
                  type="text"
                  name="name" // Matches the key in the state object
                  className="form-control"
                  value={admin.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={admin.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={admin.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={admin.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">New Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Leave blank to keep current"
                  value={admin.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill fw-bold">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ToastContainer: Required to actually render the toast notifications on screen */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminProfile;