/**
 * ==========================================================
 * pages/ResultSlips.jsx
 * ----------------------------------------------------------
 * Admin view and manage uploaded result slips.
 * ==========================================================
 */

import {
  useContext,
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import {
  AdminAuthContext
} from "../context/AdminAuthContext";

import DataTable from "../components/DataTable";


const ResultSlips = () => {

  const { adminToken } = useContext(AdminAuthContext);

  const [slips,setSlips] = useState([]);


  useEffect(()=>{

    loadResultSlips();

  },[]);


  const loadResultSlips = async()=>{

    try{

      const response = await API.get(
        "/result-slips/admin/all",
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );

      setSlips(response.data.data);

    }
    catch(error){

      console.error(error);

    }

  };


  const releaseResult = async(id)=>{

    try{

      await API.patch(
        `/result-slips/${id}/release`,
        {},
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );

      loadResultSlips();

    }
    catch(error){

      console.error(error);

    }

  };


  const deleteResult = async(id)=>{

    if(!window.confirm("Delete this result slip?")) return;

    try{

      await API.delete(
        `/result-slips/${id}`,
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      );

      loadResultSlips();

    }
    catch(error){

      console.error(error);

    }

  };


  return (

    <div className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Result Slips
        </h2>

        <p className="text-slate-600 mt-1">
          Total Uploaded:
          <span className="font-semibold ml-1">
            {slips.length}
          </span>
        </p>

      </div>


      <DataTable

        columns={[

          {
            key:"student",
            label:"Student",

            render:(slip)=>(

              <div>

                <p className="font-medium">
                  {slip.student.fullName}
                </p>

                <p className="text-sm text-slate-500">
                  {slip.student.studentId}
                </p>

              </div>

            )

          },


          {
            key:"academicYear",
            label:"Academic Year"
          },


          {
            key:"year",
            label:"Year"
          },


          {
            key:"semester",
            label:"Semester"
          },


          {
            key:"createdAt",
            label:"Uploaded",

            render:(slip)=>(

              new Date(
                slip.createdAt
              ).toLocaleDateString()

            )

          },


          {
            key:"released",
            label:"Status",

            render:(slip)=>(

              slip.released

              ?

              <span className="
                inline-flex
                rounded-full
                bg-green-100
                px-3
                py-1
                text-sm
                font-medium
                text-green-700
              ">
                Released
              </span>

              :

              <span className="
                inline-flex
                rounded-full
                bg-yellow-100
                px-3
                py-1
                text-sm
                font-medium
                text-yellow-700
              ">
                Locked
              </span>

            )

          }

        ]}


        data={slips}



        actions={(slip)=>(

          <div className="
            flex
            gap-2
          ">


            <a

              href={
                `${import.meta.env.VITE_SERVER_URL}/${slip.filePath.replace(/\\/g,"/")}`
              }

              target="_blank"

              className="
                rounded
                bg-blue-600
                px-3
                py-1
                text-sm
                text-white
                hover:bg-blue-700
              "

            >
              View
            </a>



            <button

              className="
                rounded
                bg-green-600
                px-3
                py-1
                text-sm
                text-white
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "

              disabled={slip.released}

              onClick={()=>releaseResult(slip._id)}

            >

              {
                slip.released
                ?
                "Released"
                :
                "Release"
              }

            </button>



            <button

              className="
                rounded
                bg-red-600
                px-3
                py-1
                text-sm
                text-white
                hover:bg-red-700
              "

              onClick={()=>deleteResult(slip._id)}

            >

              Delete

            </button>


          </div>

        )}

      />

    </div>

  );

};


export default ResultSlips;