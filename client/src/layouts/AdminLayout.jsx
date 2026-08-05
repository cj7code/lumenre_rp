/**
 * ==========================================================
 * File: layouts/AdminLayout.jsx
 * ----------------------------------------------------------
 * Shared administrator layout
 *
 * Features:
 * - Fixed sidebar
 * - Sticky header
 * - Independent content scrolling
 * - Logout fixed at bottom
 * - Responsive mobile menu
 *
 * ==========================================================
 */


import {
  useState,
  useContext
} from "react";


import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom";


import {
  FiMenu,
  FiX
} from "react-icons/fi";


import {
  AdminAuthContext
} from "../context/AdminAuthContext";



const links = [

{
name:"Dashboard",
path:"/admin/dashboard"
},

{
name:"Upload Results",
path:"/admin/upload"
},

{
name:"Result Slips",
path:"/admin/results"
},

{
name:"Students",
path:"/admin/students"
},

{
name:"Payments",
path:"/admin/payments"
},

{
name:"Audit Logs",
path:"/admin/audit"
},

{
name:"Student Activity",
path:"/admin/student-activity"
}

];





const AdminLayout = () => {


const navigate = useNavigate();

const location = useLocation();


const {
logoutAdmin

} = useContext(AdminAuthContext);



const [menuOpen,setMenuOpen] =
useState(false);





const handleLogout = ()=>{

logoutAdmin();

navigate("/");

};





return (

<div className="
h-screen
overflow-hidden
bg-slate-100
">


{/* HEADER */}

<header

className="
fixed
top-0
left-0
right-0
z-50
flex
h-16
items-center
justify-between
bg-slate-900
px-6
text-white
shadow
"

>


<h1 className="
text-xl
font-bold
">

Lumenre Results Portal

</h1>



<button

className="
text-2xl
md:hidden
"

onClick={()=>setMenuOpen(!menuOpen)}

>

{
menuOpen
?
<FiX/>
:
<FiMenu/>
}

</button>



</header>







{/* BODY */}

<div

className="
flex
pt-16
h-full
"

>






{/* SIDEBAR */}

<aside

className={`
fixed
top-16
bottom-0
left-0
z-40
w-60
bg-white
shadow-lg
transition-transform
duration-300
flex
flex-col

${menuOpen
?
"translate-x-0"
:
"-translate-x-full"
}

md:translate-x-0
`}

>



{/* MENU */}

<nav

className="
flex-1
overflow-y-auto
p-4
space-y-2
"

>


{
links.map(link=>(


<Link

key={link.path}

to={link.path}

onClick={()=>setMenuOpen(false)}

className={`
block
rounded-lg
px-4
py-3
font-medium
transition

${
location.pathname === link.path

?
"bg-blue-600 text-white"

:

"text-slate-700 hover:bg-slate-100"

}

`}

>


{link.name}


</Link>


))

}


</nav>






{/* LOGOUT AREA */}

<div

className="
border-t
p-4
"

>


<button

onClick={handleLogout}

className="
w-full
rounded-lg
bg-red-600
py-3
font-semibold
text-white
transition
hover:bg-red-700
"

>

Logout

</button>


</div>




</aside>







{/* PAGE CONTENT */}

<main

className="
ml-0
flex-1
overflow-y-auto
p-4
md:ml-60
md:p-6
"

>


<Outlet/>


</main>






</div>


</div>


);


};



export default AdminLayout;