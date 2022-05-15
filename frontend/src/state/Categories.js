import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {value: []},
    reducers: {
        addAllCategories: (state,action) => {
            state.value = [...action.payload];
        }
    }
});

export const { addAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;