/**
 * ==========================================================
 * pages/Home.jsx
 * ----------------------------------------------------------
 * Public landing page for Lumenre Results Portal.
 *
 * Student-focused entry page.
 * Administrator login is intentionally hidden.
 * ==========================================================
 */

import { Link } from "react-router-dom";
import PortalLayout from "../components/PortalLayout";

const Home = () => {

  return (

    <PortalLayout>

      <div className="flex flex-1 items-center justify-center">

        <div className="grid w-full max-w-6xl gap-12 md:grid-cols-2">

          {/* ======================================================
              Branding
          ====================================================== */}

          <div className="flex flex-col justify-center text-white">

            <h1 className="text-5xl font-bold leading-tight">

              Lumenre
              <br />
              Results Portal

            </h1>

            <div className="mt-10">

              <FeatureCard
                icon="🔒"
                title="Secure Access"
                text="Access your results securely."
              />

            </div>

          </div>



          {/* ======================================================
              Student Login
          ====================================================== */}

          <div className="flex items-center justify-center">

            <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

              <div className="mb-6 text-center text-6xl">

                🎓

              </div>

              <h2 className="text-center text-3xl font-bold text-slate-800">

                Student Portal

              </h2>

              <p className="mt-3 text-center text-slate-500">

                Sign in using your student details.

              </p>

              <Link
                to="/student/login"
                className="mt-8 block rounded-xl bg-blue-700 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
              >

                Student Login

              </Link>

            </div>

          </div>

        </div>

      </div>

    </PortalLayout>

  );

};



// ==========================================================
// Feature Card
// ==========================================================

const FeatureCard = ({
  icon,
  title,
  text
}) => (

  <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">

    <div className="text-3xl">

      {icon}

    </div>

    <div>

      <h3 className="font-semibold text-white">

        {title}

      </h3>

      <p className="text-sm text-slate-300">

        {text}

      </p>

    </div>

  </div>

);

export default Home;