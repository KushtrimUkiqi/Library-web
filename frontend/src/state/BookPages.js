import { createSlice } from "@reduxjs/toolkit";

export const bookPagesSlice = createSlice({
    name: "bookPages",
    initialState: {
        pageSize: 12,
        currentPage: 0,
        previousPage: -1,
        nextPage: -1,
        totalPages: 0
    },
    reducers: {
        setBookPages: (state,action) => {
            state = action.payload
        },
        setCurrentPage: (state,action) => {
            state.currentPage = action.payload
        },
        setPreviousPage: (state,action) => {
            state.previousPage = action.payload
        },
        setNextPage: (state,action) => {
            state.nextPage = action.payload
        },
        setPageSize: (state,action) => {
            state.pageSize = action.payload
        },
        setTotalPages: (state,action) => {
            state.totalPages = action.payload
        }
    }
});

export const { setBookPages } = bookPagesSlice.actions;
export const { setCurrentPage } = bookPagesSlice.actions;
export const { setPreviousPage } = bookPagesSlice.actions;
export const { setNextPage } = bookPagesSlice.actions;
export const { setPageSize } = bookPagesSlice.actions;
export const { setTotalPages } = bookPagesSlice.actions;
export default bookPagesSlice.reducer;