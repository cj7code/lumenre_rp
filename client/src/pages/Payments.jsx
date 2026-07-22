/**
 * ==========================================================
 * File: pages/Payments.jsx
 * ----------------------------------------------------------
 * Admin payment management page.
 * ==========================================================
 */

import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AdminAuthContext } from "../context/AdminAuthContext";


const Payments = () => {

  const { adminToken } = useContext(AdminAuthContext);
  const [payments, setPayments] = useState([]);


  const [formData, setFormData] = useState({

    student:"",
    totalFees:"",
    amountPaid:""

  });



  useEffect(()=>{

    loadPayments();

  },[]);



  const loadPayments = async()=>{

    try{

      const response =
      await API.get(

        "/payments",

        {
          headers:{
            Authorization:
            `Bearer ${adminToken}`
          }
        }

      );


      setPayments(
        response.data.data
      );


    }catch(error){

      console.error(error);

    }

  };



  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };



  const savePayment = async(e)=>{
    e.preventDefault();

    try{


      await API.post(
        "/payments",
        formData,

        {
          headers:{
            Authorization:
            `Bearer ${adminToken}`
          }
        }

      );


      setFormData({

        student:"",
        totalFees:"",
        amountPaid:""

      });


      loadPayments();

    }catch(error){

      console.error(error);

    }


  };



  const editPayment=(payment)=>{


    setFormData({

      student:
      payment.student._id,

      totalFees:
      payment.totalFees,

      amountPaid:
      payment.amountPaid

    });


  };



  return (

    <div className="container-fluid">

      <h2>
        Student Payments
      </h2>

      <p className="text-muted">
        Manage student fee payments and result access.
      </p>


      <div className="card shadow-sm mb-4">

        <div className="card-header">

          Update Payment

        </div>

        <div className="card-body">

          <form
            onSubmit={savePayment}
            className="row g-3"
          >

            <div className="col-md-4">

              <input

                className="form-control"
                placeholder="Student ID"
                name="student"
                value={formData.student}
                onChange={handleChange}
                required

              />

            </div>


            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Total Fees"
                type="number"
                name="totalFees"
                value={formData.totalFees}
                onChange={handleChange}
                required
              />

            </div>


            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Amount Paid"
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                required
              />

            </div>


            <div className="col-md-2">

              <button
                className="btn btn-primary w-100"
              >
                Save
              </button>

            </div>

          </form>


        </div>


      </div>


      <div className="table-responsive">

        <table className="table table-striped">

          <thead>
            <tr>
              <th>Student</th>
              <th>ID</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

          {

            payments.map((payment)=>(


              <tr
                key={payment._id}
              >

                <td>
                  {payment.student?.fullName}
                </td>

                <td>
                  {payment.student?.studentId}
                </td>

                <td>
                  {payment.totalFees}
                </td>

                <td>
                  {payment.amountPaid}
                </td>

                <td>
                  {payment.balance}
                </td>

                <td>

                  {

                    payment.fullyPaid

                    ?

                    <span className="badge bg-success">
                      Paid
                    </span>
                    :
                    <span className="badge bg-danger">
                      Outstanding
                    </span>

                  }


                </td>


                <td>

                  <button
                    className="btn btn-sm btn-warning"
                    onClick={()=>editPayment(payment)}
                  >
                    Edit
                  </button>

                </td>

              </tr>

            ))

          }

          </tbody>

        </table>

      </div>

    </div>

  );

};


export default Payments;