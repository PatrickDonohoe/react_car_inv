import { useState } from 'react';
import Modal from "./Modal";
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90, hide: true},
    { field: 'prod_date', headerName: 'Date of Production', flex: 1},
    { field: 'make', headerName: 'Make', flex: 1},
    { field: 'model', headerName: 'Model', flex: 1},
    { field: 'color', headerName: 'Color', flex: 1}
]

function Datatable() {
    const [ open, setOpen ] = useState(false);
    const { carData, getData } = useGetData();
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => {window.location.reload() }, 500)
    }

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
        />
        <div className="flex flex-row">
            <div>
                <button
                    className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
                    onClick={() => handleOpen()}
                >
                    Create New Car Record
                </button>
            </div>
            <button onClick={handleOpen} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">Update</button>
            <button onClick={deleteData} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">Delete</button>
        </div>
        <div className= { open ? "hidden" : "container mx-10 my-5 flex flex-col"} 
            style={{ height: 400, width: '100%'}}
        >
            <h2 className="p-3 bg-slate-300 my-2 rounded">My Cars</h2>
            <DataGrid 
                rows={carData} 
                columns={columns}
                checkboxSelection={true}
                    onSelectionModelChange={ (item:any) => {
                        setSelectionModel(item)
                    }}
                componentsProps={{
                    pagination: {
                        rowsPerPageOptions: [5]
                    }
                }}
            />
        </div>
    </>
  )
}

export default Datatable
