// import { CarProps } from "../types/carProps";
import CarUpdateForm from "./CarUpdateForm"

type ModalUpdateProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  carId: string;
  carDate: string;
  carMake: string;
  carModel: string;
  carColor: string;
}



const ModalUpdate = (props: ModalUpdateProps) => {

  console.log(`car data ${props.carId} ${props.carDate} ${props.carMake} 
    ${props.carModel} ${props.carColor}`)

  if (!props.open) return (<></>)
  return (
    <div
      onClick={props.onClose}
      className="w-full flex z-1 pb-4 justify-center align-middle 
        bg-gray-100 bg-opacity-25 overflow-y-auto max-h-full"
    >
      <div
        className="max-w-600px w-2/5 relative flex overflow-auto z-1 bg-slate-50 
          shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="w-full h-full flex flex-col border-2 border-black rounded-md">
          <div className="flex">
            <button 
              className="flex justify-start m-2 bg-[#5F0F40] p-2 rounded text-xs
                text-[#E36414] hover:bg-slate-800 hover:text-white"
              onClick={props.onClose}
              type="button"
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center text-center p-2">
            <CarUpdateForm
              id={props.id}
              onClose={props.onClose}
              carId={props.carId}
              carDate={props.carDate}
              carMake={props.carMake}
              carModel={props.carModel}
              carColor={props.carColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdate
