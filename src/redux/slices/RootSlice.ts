import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        prod_date: "Production Date",
        make: "Make",
        model: 'Model',
        color: 'Color',
    },
    reducers: {
        chooseProd_Date: (state, action) => { state.prod_date = action.payload},
        chooseMake: (state, action) => { state.make = action.payload},
        chooseModel: (state, action) => { state.model = action.payload},
        chooseColor: (state, action) => { state.color = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const { chooseProd_Date, chooseMake, chooseModel, chooseColor } = rootSlice.actions