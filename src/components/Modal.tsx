// import { useState } from "react";

import CarRegForm from "./CarRegForm";

type Props = {
  id?: string;
  open: boolean;
  onClose: () => void;
}

const Modal = (props: Props) => {

  if (!props.open) return (<></>)
  return (
    <div
      onClick={props.onClose}
      className="w-full flex z-1 pb-4 justify-center align-middle 
        bg-gray-100 bg-opacity-0 overflow-y-auto max-h-full"
    >
      <div
        className="max-w-600px w-2/5 relative flex overflow-auto z-1 bg-slate-50 
          shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="w-full h-full flex flex-col bg-opacity-0 border-2 border-black rounded-md ">
          <div className="flex">
            <button
              // type="button"
              onClick={props.onClose}
              className="p-2 bg-[#5F0F40] rounded m-2 text-xs
                text-[#E36414] border-red-900 border-2 hover:bg-slate-800 hover:text-white"
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center text-center p-2">
            <CarRegForm
              id={props.id}
              onClose={props.onClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
