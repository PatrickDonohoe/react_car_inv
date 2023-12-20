import Input from "./Input";

import { useForm } from "react-hook-form";
import { server_calls } from "../api/server";
import { useDispatch, useStore } from "react-redux";
import { chooseProd_Date, chooseMake, chooseModel, chooseColor } from "../redux/slices/RootSlice";

interface CarRegFormProps {
	id?: string[]
}

const CarRegForm = ( props:CarRegFormProps ) => {
	const { register, handleSubmit } = useForm({})
	const dispatch = useDispatch();
	const store = useStore();

	const onSubmit = (data: any, event: any) => {
		console.log(`ID: ${typeof props.id}`);
		console.log(props.id)
		console.log(data)
		if (props.id && props.id.length > 0) {
			server_calls.update(props.id[0], data)
			console.log(`Updated: ${ data.prod_date } ${ props.id }`)
		} else {
			dispatch(chooseProd_Date(data.prod_date));
			dispatch(chooseMake(data.make));
			dispatch(chooseModel(data.model));
			dispatch(chooseColor(data.color));

			server_calls.create(store.getState())
		}
	}

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="prod_date">Date of Production</label>
					<Input {...register('prod_date')} name="prod_date" placeholder="Date of Production" />
				</div>
				<div>
					<label htmlFor="make">Make</label>
					<Input {...register('make')} name='make' placeholder="Make" />
				</div>
				<div>
					<label htmlFor="model">Model</label>
					<Input {...register('model')} name='model' placeholder='Model' />
				</div>
				<div>
					<label htmlFor="color">Color</label>
					<Input {...register('color')} name='color' placeholder='Color' />
				</div>
				<div className="flex p-1">
					<button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
					>
						Submit
					</button>
				</div>
			</form>
    </div>
  )
}

export default CarRegForm
