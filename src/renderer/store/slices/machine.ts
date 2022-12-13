import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MachineState = {
	data: {},
	errCount: 0,
	downtime: 0,
	opCount: 0,
};

const slice = createSlice({
	name: 'machine',
	initialState,
	reducers: {
		updateMachineStatus(
			state: MachineState,
			action: PayloadAction<MachineState>
		) {
			state.data = action.payload.data;
			state.downtime = action.payload.downtime;
			state.opCount = action.payload.opCount;
			state.errCount = action.payload.errCount;
		},
	},
});

export const { reducer } = slice;
export const { updateMachineStatus } = slice.actions;

export default slice;
