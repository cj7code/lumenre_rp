/**
 * ==========================================================
 * components/DataTable.jsx
 * ----------------------------------------------------------
 * Reusable table component for admin pages.
 * ==========================================================
 */

const DataTable = ({
  columns,
  data,
  actions
}) => {

  return (

    <table className="table table-bordered table-hover">

      <thead className="table-light">

        <tr>

          {columns.map((column) => (

            <th key={column.key}>
              {column.label}
            </th>

          ))}

          {actions && (

            <th>
              Actions
            </th>

          )}

        </tr>

      </thead>

      <tbody>

        {data.length === 0 ? (

          <tr>

            <td
              colSpan={
                columns.length + (actions ? 1 : 0)
              }
              className="text-center"
            >

              No records found

            </td>

          </tr>

        ) : (

          data.map((item) => (

            <tr key={item._id}>

              {columns.map((column) => (

                <td key={column.key}>

                  {column.render
                    ? column.render(item)
                    : item[column.key]
                  }

                </td>

              ))}


              {actions && (

                <td>

                  {actions(item)}

                </td>

              )}

            </tr>

          ))

        )}

      </tbody>

    </table>

  );

};


export default DataTable;