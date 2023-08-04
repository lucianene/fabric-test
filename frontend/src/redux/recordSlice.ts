import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// ## RecordState Interface
export interface RecordState {
  records: RecordType[]
}

// ## Define the initial state of Record State 
const initialState: RecordState = {
  records: [],
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecords(state, action) {
      state.records = action.payload;
    },
  }
});
export const { setRecords } = recordSlice.actions;

export default recordSlice.reducer;