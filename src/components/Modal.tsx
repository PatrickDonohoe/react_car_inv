// import { useState } from "react";

import CarRegForm from "./CarRegForm";

type Props = {
  id?: string;
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
}

const Modal = (props: Props) => {

  if (!props.open) return (<></>)
  return (
    <div
      onClick={props.onClose}
      className="fixed w-full h-full flex z-1 justify-center align-middle 
        bg-gray-300 bg-opacity-25"
    >
      <div
        className="max-w-600px w-2/5 fixed flex h-100 overflow-auto z-1 bg-white shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex">
            <button
              // type="button"
              onClick={props.onClose}
              className="p-3 bg-[#5F0F40] rounded m-3 
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white"
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center text-center mt-3 p-2">
            <CarRegForm
              id={props.id}
              onClose={props.onClose}
              refresh={props.refresh}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
