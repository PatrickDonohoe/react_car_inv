import { useState } from "react";

import CarRegForm from "./CarRegForm";

type Props = {
  id?: string;
  open: boolean;
  onClose: () => void;
}

const Modal = (props: Props) => {
  let [newOpen, setNewOpen] = useState(true);
  
  const hNewClosed = () => setNewOpen(false);

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
            <button 
              onClick={hNewClosed} 
              className="flex justify-start m-3 bg-[#5F0F40] p-2 rounded text-[#E36414] hover:bg-slate-800 hover:text-white"
              type="button"
              >
              X
            </button>
            
          </div>
          <div className="flex flex-col items-center text-center mt-3 p-2">
              <CarRegForm 
                id={props.id} 
                onClose={function (): void {
                  throw new Error("Function not implemented.");
                } } 
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
