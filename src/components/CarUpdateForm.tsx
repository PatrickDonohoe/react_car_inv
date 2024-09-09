import { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";

import { server_calls } from "../api/server";
import Input from "./Input";

interface CarUpdateFormProps {
	id: string;
	onClose: () => void;
	refresh: () => Promise<void>;
	resetCheckboxes: () => void;
	carId: string;
	carDate: string;
	carMake: string;
	carModel: string;
	carColor: string;
}


const CarUpdateForm = (props: CarUpdateFormProps) => {
	const { register, handleSubmit } = useForm({})

	// const [carId, setCarId] = useState(props.carId);
	const [carDate, setCarDate] = useState(props.carDate);
	const [carMake, setCarMake] = useState(props.carMake);
	const [carModel, setCarModel] = useState(props.carModel);
	const [carColor, setCarColor] = useState(props.carColor);

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
		props.refresh();
	}

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