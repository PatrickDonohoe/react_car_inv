import { ChangeEventHandler, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import Modal from "./Modal";
import ModalUpdate from './ModalUpdate';
import { server_calls } from '../api/server';
import { useGetData } from '../custom-hooks/FetchData';
import { CarProps } from '../types/carProps';

const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 90, hide: true },
  { field: 'prod_date', headerName: 'Date of Production', flex: 1 },
  { field: 'make', headerName: 'Make', flex: 1 },
  { field: 'model', headerName: 'Model', flex: 1 },
  { field: 'color', headerName: 'Color', flex: 1 }
]

function Datatable() {
  // let [open, setOpen] = useState(false);
  let [newOpen, setNewOpen] = useState(false);
  let [updateOpen, setUpdateOpen] = useState(false);

  const hNewOpen = () => setNewOpen(true);
  const hNewClosed = () => setNewOpen(false);

  const hUpdateOpen = () => {setUpdateOpen(true)};
  const hUpdateClosed = () => setUpdateOpen(false);

  const { carData, getData } = useGetData();
  const [selectionModel, setSelectionModel] = useState<string>('');
  const [selectedCar, setSelectedCar] = useState<CarProps>([]);
  const [make] = selectedCar
  console.log(`selected car ${selectedCar}`)

  // if table is still loading records, display loading symbol
  const [tableLoading, setTableLoading] = useState(true);

  console.log(carData, 'carData: ');
  console.log(selectionModel, 'selectionModel: ');

  // if carData changes state, stop loading
  useEffect(() => {
    setTableLoading(false)
  }, [carData])

  const deleteData = () => {
    server_calls.delete(selectionModel)
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout(() => { window.location.reload() }, 500)
  }

  // if selectionModel changes and the selectionModel matches one of the car id's, 
  // set selectedCar to that record
  useEffect(() => {
    for (let car of carData) {
      console.log(`car_id ${typeof car.id}`)
      console.log(`selectionModel ${typeof selectionModel}`)
      if (car.id === selectionModel[0]) {
        console.log('inside conditional')
        setSelectedCar(car)
        console.log(selectedCar)
      }
    }
  }, [selectionModel]);
  
  

  // TODO: add loading text while datatable records are loading

  return (
    <>
      <Modal
        id={selectionModel}
        open={newOpen}
        onClose={hNewClosed}
      />
      carData ? (
        <ModalUpdate
          id={selectionModel}
          open={updateOpen}
          onClose={hUpdateClosed}
          carData={make}
        />
      ) : (<></>)
      <div className='fixed top-24 flex-row w-3/4'>
        <div className="flex flex-row mx-10">
          <div>
            <button
              className="p-3 bg-[#5F0F40] rounded m-3 text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white"
              onClick={hNewOpen}
            >
              New
            </button>
          </div>
          <button onClick={hUpdateOpen} className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white">
            Update
          </button>
          <button onClick={deleteData} className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white">
            Delete
          </button>
        </div>
        <div className={newOpen || updateOpen ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 400, width: '100%' }}
        >
          <h2 className="p-3 bg-[#5F0F40]  text-[#E36414] my-2 rounded">My Cars</h2>
          <DataGrid
            loading={tableLoading}
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
