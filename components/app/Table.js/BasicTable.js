import moment from "moment";
import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
} from "react-table";
const BasicTable = ({
  columns,
  paginated = false,
  data,
  header = null,
  globalComponent = null,
  setSelectedRows,
  setShowSideNav,
  setClickedRow,
  isLoading,
  changePage,
  lastPage,
  title,
  showIcon,
}) => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const autoResetGlobalFilter = false;
  const instance = useTable(
    {
      columns,
      data,
      autoResetGlobalFilter,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!,
    useSortBy,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
    toggleAllRowsSelected,
  } = instance;

  const handleChangePage = (event, value) => {
    setPage(value);
    changePage(value);
    setSelectedRows([]);
    toggleAllRowsSelected(false);
  };

  //   React.useEffect(() => {
  //     setSelectedRows(selectedFlatRows);
  //   }, [selectedFlatRows]);
 
  return (
    <div className="bg-[#152238] w-full p-[35px] overflow-x-auto">
      <div className="w-full flex justify-between">
        <span className="text-white text-[20px]">{title}</span>
        {showIcon ? (
          <img src="/assets/up-arrow.png" className="object-contain" />
        ) : null}
      </div>

      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="text-[#667085] font-medium p-4 flex-grow">
                  {" "}
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i class="las la-long-arrow-alt-up la-md"></i>
                      ) : (
                        <i class="las la-long-arrow-alt-down la-md"></i>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()} className="text-center">
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-white px-4 py-5 flex-grow flex-shrink-0"
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
