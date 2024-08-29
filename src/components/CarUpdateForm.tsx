import { ChangeEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { server_calls } from "../api/server";
import Input from "./Input";

// import { useDispatch, useStore } from "react-redux";
// import { chooseProd_Date, chooseMake, chooseModel, chooseColor } from "../redux/slices/RootSlice";

interface CarUpdateFormProps {
	id: string;
	onClose: () => void;
}

interface CarDataProps {
	id: string;
	prod_date: string;
	make: string;
	model: string;
	color: string;
}

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

	const [singleCarData, setSingleCarData] = useState<CarDataProps>({
		id: 'Loading...',
		prod_date: 'Loading...',
		make: 'Loading...',
		model: 'Loading...',
		color: 'Loading...'
	})

	// console.log(server_calls.getOne)

	const getSingleCarData = async () => {
		const data = await server_calls.getOne(props.id);
		setSingleCarData(data);
		// setIsLoading(false);
	}
	useEffect(() => {
		getSingleCarData()
	}, [])

	// TODO: figure out how to save all of the separate fields to singleCarData anytime it changes
	const handleSingleCarDataChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
		setSingleCarData(event.target.value)
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
					<Input {...register('prod_date')} 
						name="prod_date" 
						value={singleCarData.prod_date} 
					/>
				</div>
				<div>
					<label htmlFor="make">Make</label>
					<Input {...register('make')} 
						name='make' 
						value={singleCarData.make} 
					/>
				</div>
				<div>
					<label htmlFor="model">Model</label>
					<Input {...register('model')} 
						name='model' 
						value={singleCarData.model} 
					/>
				</div>
				<div>
					<label htmlFor="color">Color</label>
					<Input {...register('color')} 
						name='color' 
						value={singleCarData.color} 
						onChange={handleSingleCarDataChange}
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