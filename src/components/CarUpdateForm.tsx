import { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";

import { server_calls } from "../api/server";
import Input from "./Input";
// import { CarProps } from "../types/carProps";

// import { useDispatch, useStore } from "react-redux";
// import { chooseProd_Date, chooseMake, chooseModel, chooseColor } from "../redux/slices/RootSlice";

interface CarUpdateFormProps {
	id: string;
	onClose: () => void;
  carId: string;
  carDate: string;
  carMake: string;
  carModel: string;
  carColor: string;
}

// interface CarDataProps {
// 	id: string;
// 	prod_date: string;
// 	make: string;
// 	model: string;
// 	color: string;
// }

// const initialValues: { id: string, prod_date: string, make: string, model: string, color: string } = {
	// id: 'Loading...',
	// prod_date: 'Loading...',
	// make: 'Loading...',
	// model: 'Loading...',
	// color: 'Loading...'
// }

// same as server_calls.getOne()
// should be same as singleCarData
const CarUpdateForm = (props: CarUpdateFormProps) => {
	const { register, handleSubmit } = useForm({})
	// const [isLoading, setIsLoading] = useState(true)

	// const [singleCarData, setSingleCarData] = useState<CarProps>(props.carData)

	const [carId, setCarId] = useState(props.carId);
	const [carDate, setCarDate] = useState(props.carDate);
	const [carMake, setCarMake] = useState(props.carMake);
	const [carModel, setCarModel] = useState(props.carModel);
	const [carColor, setCarColor] = useState(props.carColor);

	// const getSingleCarData = async () => {
	// 	const data = await server_calls.getOne(props.id);
	// 	setSingleCarData(data);
	// }
	// useEffect(() => {
	// 	getSingleCarData()
	// }, [])

	// TODO: figure out how to save all of the separate fields to singleCarData anytime it changes
	// const handleSingleCarDataChange: ChangeEventHandler<Element> = (event:any) => {
	// 	setSingleCarData({
	// 		id: event.target.value,
	// 		prod_date: event.target.value,
	// 		make: event.target.value,
	// 		model: event.target.value,
	// 		color: event.target.value
	// 	})
	// }

	const handleCarDateChange: ChangeEventHandler<Element> = (event: any) => {
		setCarDate(event.target.value)
	}
	const handleCarMakeChange: ChangeEventHandler<Element> = (event: any) => {
		setCarMake(event.target.value)
	}
	const handleCarModelChange: ChangeEventHandler<Element> = (event: any) => {
		setCarModel(event.target.value)
	}
	const handleCarColorChange: ChangeEventHandler<Element> = (event: any) => {
		setCarColor(event.target.value)
	}

	const onSubmit = (data: any, event: any) => {
		console.log(`ID: ${typeof props.id}`);
		console.log(props.id)
		console.log(data)
		server_calls.update(props.id, data)
		event.target.reset();

		props.onClose();
	}
	// if (isLoading) {
	// 	console.error('Loading application')
	// 	return <div>Loading...</div>
	// }
		
	// console.error('Done Loading')
	// debugger



	// Value prop is not editable. Consider ref.
	// Save singleCarData as ref. Set up current state of field with initial value of ref for value prop.
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="prod_date">Date of Production</label>
					<Input 
						{...register('prod_date')} 
						name="prod_date" 
						value={carDate} 
						onChange={(event) => handleCarDateChange(event)}
					/>
				</div>
				<div>
					<label htmlFor="make">Make</label>
					<Input 
						{...register('make')} 
						name='make' 
						value={carMake} 
						onChange={(event) => handleCarMakeChange(event)}
					/>
				</div>
				<div>
					<label htmlFor="model">Model</label>
					<Input 
						{...register('model')} 
						name='model' 
						value={carModel} 
						onChange={(event) => handleCarModelChange(event)}
					/>
				</div>
				<div>
					<label htmlFor="color">Color</label>
					<Input 
						{...register('color')} 
						name='color' 
						value={carColor} 
						onChange={(event) => handleCarColorChange(event)}
					/>
				</div>
				<div className="flex p-1">
					<button className="flex justify-start m-3 bg-[#5F0F40] text-[#E36414] 
					p-2 rounded border-red-900 border-2 hover:bg-slate-800 hover:text-white"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default CarUpdateForm;