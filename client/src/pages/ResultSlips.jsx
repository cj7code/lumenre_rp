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


  const {
    adminToken
  } = useContext(AdminAuthContext);

  const [slips,setSlips] = useState([]);


  useEffect(()=>{

    loadResultSlips();

  },[]);


  const loadResultSlips = async()=>{

    try{

      const response =
      await API.get(
        "/result-slips/admin/all",
        {
          headers:{
            Authorization:
            `Bearer ${adminToken}`
          }
        }
      );

      setSlips(
        response.data.data
      );

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
            Authorization:
            `Bearer ${adminToken}`
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

<div>

<h2>
Result Slips
</h2>


<p>
Total Uploaded:
{slips.length}
</p>



<DataTable

columns={[

{
key:"student",
label:"Student",

render:(slip)=>(

<>
{slip.student.fullName}
<br/>
{slip.student.studentId}
</>

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
key:"released",
label:"Status",

render:(slip)=>(

slip.released
?
"Released"
:
"Pending"

)

}

]}


data={slips}



actions={(slip)=>(

<button

className="btn btn-success btn-sm"

disabled={slip.released}

onClick={()=>releaseResult(slip._id)}

>

{slip.released
?
"Released"
:
"Release"
}

</button>

)}

/>

</div>

);

};


export default ResultSlips;