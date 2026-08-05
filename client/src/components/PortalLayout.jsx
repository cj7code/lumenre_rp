/**
 * ==========================================================
 * components/PortalLayout.jsx
 * ----------------------------------------------------------
 * Shared application layout.
 *
 * Provides:
 * - Global background
 * - Vertical and horizontal centering
 * - Footer
 * - Consistent portal appearance
 * ==========================================================
 */


const PortalLayout = ({
  children
}) => {

  return (

    <div
      className="
      min-h-screen
      flex
      flex-col
      bg-gradient-to-br
      from-slate-900
      to-blue-950
      px-6
      py-10
      "
    >


      {/* ======================================================
          Page Content
      ====================================================== */}

      <main
        className="
        flex
        flex-1
        items-center
        justify-center
        "
      >

        {children}

      </main>



      {/* ======================================================
          Footer
      ====================================================== */}

      <footer
        className="
        mt-8
        text-center
        text-sm
        text-slate-300
        "
      >

        © 2026 Lumenre Results Portal

      </footer>


    </div>

  );

};


export default PortalLayout;