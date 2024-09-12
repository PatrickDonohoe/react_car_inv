import { useEffect, useState } from 'react';
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

  const hUpdateOpen = () => setUpdateOpen(true);
  const hUpdateClosed = () => setUpdateOpen(false);

  const { carData, getData } = useGetData();
  const [selectionModel, setSelectionModel] = useState<string>('');
  const [selectedCar, setSelectedCar] = useState<CarProps>();
  const [carId, setCarId] = useState('');
  const [carDate, setCarDate] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carColor, setCarColor] = useState('');

  console.log(`selected car ${selectedCar}`)

  console.log(carData, 'carData: ');
  console.log(selectionModel, 'selectionModel: ');

  const deleteData = () => {
    server_calls.delete(selectionModel)
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout(() => { window.location.reload() }, 500)
  }

  // if selectionModel changes and the selectionModel matches one of the car id's, 
  // set car attributes to match that record
  useEffect(() => {
    for (let car of carData) {
      console.log(`car_id ${typeof car.id}`)
      console.log(`selectionModel ${typeof selectionModel}`)
      if (car.id === selectionModel[0]) {
        console.log('inside conditional')
        setSelectedCar(car);
        console.log(car.make);
        setCarId(car.id);
        setCarDate(car.prod_date);
        setCarMake(car.make);
        setCarModel(car.model);
        setCarColor(car.color);
      };
    };
  }, [selectionModel]);

  return (
    <>

      <div className='static flex-row w-full bg-gray-100 pb-10'>
        <div className="flex flex-row mx-10">
          <button
            className="p-3 bg-[#5F0F40] rounded m-3 text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white"
            onClick={hNewOpen}
          >
            New
          </button>
          <button onClick={hUpdateOpen} className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white">
            Update
          </button>
          <button onClick={deleteData} className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white">
            Delete
          </button>
        </div>
        <Modal
          id={selectionModel}
          open={newOpen}
          onClose={hNewClosed}
        />
        {carData ?
          (
            <ModalUpdate
              id={selectionModel}
              open={updateOpen}
              onClose={hUpdateClosed}
              carId={carId}
              carDate={carDate}
              carMake={carMake}
              carModel={carModel}
              carColor={carColor}
            />
          ) : (<></>)
        }
        <div className={newOpen || updateOpen ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 400, width: '100%' }}
        >
          <h2 className="p-3 bg-[#5F0F40]  text-[#E36414] my-2 rounded">My Cars</h2>
          <DataGrid
            loading={!carData.length}
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
