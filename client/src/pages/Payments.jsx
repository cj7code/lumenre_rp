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


  const [payments,setPayments] = useState([]);

  const [students,setStudents] = useState([]);


  const [formData,setFormData] = useState({

    student:"",
    totalFees:"",
    amountPaid:""

  });



  useEffect(()=>{

    const loadData = async()=>{

      await loadStudents();

      await loadPayments();

    };


    loadData();


  },[]);





  const loadPayments = async()=>{

    try{

      const response = await API.get(

        "/payments",

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
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





  const loadStudents = async()=>{

    try{

      const response = await API.get(

        "/students/admin/all",

        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }

      );


      setStudents(
        response.data.data
      );


    }catch(error){

      console.error(error);

    }

  };





  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

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
            Authorization:`Bearer ${adminToken}`
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
      payment.student?._id || "",

      totalFees:
      payment.totalFees,

      amountPaid:
      payment.amountPaid

    });


  };





  return (

    <div className="w-full">


      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">

          Student Payments

        </h2>


        <p className="text-slate-500">

          Manage student fee payments and result access.

        </p>


      </div>





      {/* Payment Form */}


      <div className="mb-6 rounded-xl bg-white shadow">


        <div className="border-b px-6 py-4">


          <h5 className="font-semibold text-lg">

            Update Payment

          </h5>


        </div>



        <div className="p-6">


          <form

            onSubmit={savePayment}

            className="grid grid-cols-1 md:grid-cols-12 gap-4"

          >


            <div className="md:col-span-4">


              <select

                className="w-full rounded-lg border px-4 py-2"

                name="student"

                value={formData.student}

                onChange={handleChange}

                required

              >


                <option value="">

                  Select Student

                </option>



                {
                  students.map((student)=>(


                    <option

                      key={student._id}

                      value={student._id}

                    >

                      {student.fullName}

                      {" "}

                      ({student.studentId})


                    </option>


                  ))
                }


              </select>


            </div>





            <div className="md:col-span-3">


              <input

                className="w-full rounded-lg border px-4 py-2"

                placeholder="Total Fees"

                type="number"

                name="totalFees"

                value={formData.totalFees}

                onChange={handleChange}

                required

              />


            </div>





            <div className="md:col-span-3">


              <input

                className="w-full rounded-lg border px-4 py-2"

                placeholder="Amount Paid"

                type="number"

                name="amountPaid"

                value={formData.amountPaid}

                onChange={handleChange}

                required

              />


            </div>





            <div className="md:col-span-2">


              <button

                className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"

              >

                Save

              </button>


            </div>


          </form>


        </div>


      </div>





      {/* Payments Table */}


      <div className="overflow-x-auto rounded-xl bg-white shadow">


        <table className="w-full text-left">


          <thead className="border-b bg-slate-100">


            <tr>

              <th className="px-4 py-3">
                Student
              </th>

              <th className="px-4 py-3">
                ID
              </th>

              <th className="px-4 py-3">
                Total Fees
              </th>

              <th className="px-4 py-3">
                Paid
              </th>

              <th className="px-4 py-3">
                Balance
              </th>

              <th className="px-4 py-3">
                Status
              </th>

              <th className="px-4 py-3">
                Action
              </th>

            </tr>


          </thead>





          <tbody>


            {

              payments.map((payment)=>(


                <tr

                  key={payment._id}

                  className="border-b hover:bg-slate-50"

                >


                  <td className="px-4 py-3">

                    {payment.student?.fullName}

                  </td>



                  <td className="px-4 py-3">

                    {payment.student?.studentId}

                  </td>



                  <td className="px-4 py-3">

                    {payment.totalFees}

                  </td>



                  <td className="px-4 py-3">

                    {payment.amountPaid}

                  </td>



                  <td className="px-4 py-3">

                    {payment.balance}

                  </td>




                  <td className="px-4 py-3">


                    {

                      payment.fullyPaid


                      ?


                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                        Paid

                      </span>


                      :


                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">

                        Outstanding

                      </span>


                    }


                  </td>




                  <td className="px-4 py-3">


                    <button

                      className="rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"

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