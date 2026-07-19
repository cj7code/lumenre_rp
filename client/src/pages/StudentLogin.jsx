/**
 * ==========================================================
 * pages/StudentLogin.jsx
 * ----------------------------------------------------------
 * Student login page.
 * ==========================================================
 */


import {
  useState,
  useContext
} from "react";


import {
  useNavigate
} from "react-router-dom";


import API from "../api/axios";


import {
  AuthContext
} from "../context/AuthContext";



const StudentLogin = () => {

  const [formData,setFormData] = useState({

    fullName:"",
    studentId:""

  });

  const [error,setError] = useState("");

  const navigate = useNavigate();


  const { login } = useContext(AuthContext);

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async(e)=>{

    e.preventDefault();

    try {

      const response =
      await API.post(
        "/auth/student/login",
        formData
      );


      login(

        response.data.data.student,
        response.data.data.token

      );

      navigate(
        "/student/dashboard"
      );

    }
    catch(error){


      setError(

        error.response?.data?.message ||
        "Login failed"

      );

    }

  };



  return (

    <div>
      <h2>
        Student Login
      </h2>

      {error && (

        <p>
          {error}
        </p>

      )}

      <form onSubmit={handleSubmit}>


        <input

          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}

        />

        <input

          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}

        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

};


export default StudentLogin;