import { useState } from 'react';
import Modal from "./Modal";

function Datatable() {
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
        />
        <div className="flex flex-row">
            <button 
                className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
                onClick={() => handleOpen()}
            >
                Create New Contact
            </button>
            <button className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">Update</button>
            <button className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">Delete</button>
        </div>
        {/* Data Table Section */}
    </>
  )
}

export default Datatable
