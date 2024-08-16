import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { server_calls } from "../api/server";
// import { useDispatch, useStore } from "react-redux";
// import { chooseProd_Date, chooseMake, chooseModel, chooseColor } from "../redux/slices/RootSlice";

interface CarRegFormProps {
	id: string;
}

interface CarDataProps {
	id: string;
	prod_date: string;
	make: string;
	model: string;
	color: string;
}

const CarUpdateForm = ( props:CarRegFormProps ) => {
	const { register, handleSubmit } = useForm({})
	// const dispatch = useDispatch();
	// const store = useStore();
	const [singleCarData, setSingleCarData] = useState<CarDataProps[]>([])

    console.log(server_calls.getOne)

	const getSingleCarData = async () => {
		const data = await server_calls.getOne(props.id)
		setSingleCarData(data)
	  }
	  useEffect(() => {
		getSingleCarData()
	  }, [])

	const onSubmit = (data: any, event: any) => {
		console.log(`ID: ${typeof props.id}`);
		console.log(props.id)
		console.log(data)
		server_calls.update(props.id[0], data)
		event.target.reset()
		// if (props.id && props.id.length > 0) {
		// 	server_calls.update(props.id[0], data)
		// 	console.log(`Updated: ${ data.prod_date } ${ props.id }`)
		// 	setTimeout(() => {window.location.reload()}, 500)
		// 	event.target.reset()
		// } else {
		// 	dispatch(chooseProd_Date(data.prod_date));
		// 	dispatch(chooseMake(data.make));
		// 	dispatch(chooseModel(data.model));
		// 	dispatch(chooseColor(data.color));

		// 	server_calls.create(store.getState())
		// 	setTimeout(() => {window.location.reload()}, 500);
		// 	event.target.reset()
		// }
	}

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="prod_date">Date of Production</label>
				<input {...register('prod_date')} name="prod_date" defaultValue={singleCarData[0].prod_date} />
			</div>
			<div>
				<label htmlFor="make">Make</label>
				<input {...register('make')} name='make' defaultValue={singleCarData[0].make} />
			</div>
			<div>
				<label htmlFor="model">Model</label>
				<input {...register('model')} name='model' defaultValue={singleCarData[0].model} />
			</div>
			<div>
				<label htmlFor="color">Color</label>
				<input {...register('color')} name='color' defaultValue={singleCarData[0].color} />
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