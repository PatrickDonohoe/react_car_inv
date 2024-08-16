import { useEffect, useState } from 'react';
import Modal from "./Modal";
import ModalUpdate from './ModalUpdate';
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 90, hide: true },
  { field: 'prod_date', headerName: 'Date of Production', flex: 1 },
  { field: 'make', headerName: 'Make', flex: 1 },
  { field: 'model', headerName: 'Model', flex: 1 },
  { field: 'color', headerName: 'Color', flex: 1 }
]

function Datatable() {
  let [newOpen, setNewOpen] = useState(false);
  let [updateOpen, setUpdateOpen] = useState(false);
  const { carData, getData } = useGetData();
  
  const [selectionModel, setSelectionModel] = useState<string[]>([])

  const handleOpenNew = () => {
    setNewOpen(true)
  }

  const handleOpenUpdate = () => {
    console.log(`Selection model: ${selectionModel}`)
    setUpdateOpen(true)
  }

  const handleClose = () => {
    setNewOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectionModel[0])
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout(() => { window.location.reload() }, 500)
  }

  

  return (
    <>
      <Modal
        id={selectionModel}
        open={newOpen}
        onClose={handleClose}
      />
      <ModalUpdate
        id={selectionModel}
        open={updateOpen}
        onClose={handleClose}
      />
      <div className='fixed top-24 flex-row w-3/4'>
        <div className="flex flex-row mx-10">
          <div>
            <button
              className="p-3 bg-[#5F0F40] rounded m-3 text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white"
              onClick={() => handleOpenNew()}
            >
              New
            </button>
          </div>
          <button onClick={handleOpenUpdate} className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white">Update</button>
          <button onClick={deleteData} className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white">Delete</button>
        </div>
        <div className={open ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 400, width: '100%' }}
        >
          <h2 className="p-3 bg-[#5F0F40]  text-[#E36414] my-2 rounded">My Cars</h2>
          <DataGrid
            rows={carData}
            columns={columns}
            checkboxSelection={true}
            onSelectionModelChange={(item: any) => {
              setSelectionModel(item)
            }}
            componentsProps={{
              pagination: {
                rowsPerPageOptions: [5]
              }
            }}
          />
        </div>
      </div>

    </>
  )
}

export default Datatable
