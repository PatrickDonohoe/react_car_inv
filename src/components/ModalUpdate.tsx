import { CarProps } from "../types/carProps";
import CarUpdateForm from "./CarUpdateForm"

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  carData: CarProps;
}



const ModalUpdate = (props: Props) => {
  const selectedCar = props.carData;
  console.log(`car data ${selectedCar}`)
  
  if (!props.open) return (<></>)
  return (
    <div
      onClick={props.onClose}
      className="fixed w-full h-full flex overflow-auto z-1 justify-center align-middle 
        bg-gray-300 bg-opacity-25"
    >
      <div
        className="max-w-600px w-2/5 fixed flex z-1 mt-20 bg-white shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row space-apart">
            <p className="flex justify-start m-3 bg-[#5F0F40] p-2 rounded text-[#E36414] hover:bg-slate-800 hover:text-white"
              onClick={props.onClose}>
              X
            </p>
            <div className="flex flex-col items-center text-center mt-3 p-2">
              <CarUpdateForm 
                id={props.id} 
                onClose={props.onClose} 
                carData={selectedCar}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ModalUpdate
