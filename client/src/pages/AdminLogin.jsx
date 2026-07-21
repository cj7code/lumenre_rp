/**
 * ==========================================================
 * pages/AdminLogin.jsx
 * ----------------------------------------------------------
 * Administrator login page.
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


const AdminLogin = () => {

  const [formData,setFormData] = useState({

    email:"",
    password:""

  });

  const [error,setError] = useState("");

  const navigate = useNavigate();


  const {
    login
  } = useContext(AuthContext);


  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{
      const response =
      await API.post(
        "/auth/admin/login",
        formData
      );

      login(
        response.data.data.admin,
        response.data.data.token
      );

      navigate("/admin/dashboard");

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
Admin Login
</h2>


{error &&

<p>
{error}
</p>

}



<form onSubmit={handleSubmit}>


<input

type="email"

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

/>



<input

type="password"

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

/>



<button>

Login

</button>



</form>


</div>

);


};


export default AdminLogin;