import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Attributes {
    key:string;
    value:string;
}
export interface DataState {
    ip:string;
    machine:string;
    downTime:{
        value:number;
    };
    upTime:{
        value:number
    };
    attributes:Attributes[]

}

const initialState: DataState = {
    ip:'',
    machine:'',
    downTime :{
        value:0,
    },
    upTime :{
        value:0,
    },
    attributes:[
        {
            key:'',
            value:''
        },
        {
            key:'',
            value:''
        },
        {
            key:'',
            value:''
        },
        {
            key:'',
            value:''
        }
]
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateDataState: (state: DataState, action: PayloadAction<DataState>) => {
      state.ip=action.payload.ip
      state.machine=action.payload.machine;
      state.downTime.value =action.payload.downTime.value;
      state.upTime.value =action.payload.upTime.value;7
      state.attributes[0].key = action.payload.attributes[0].key;
      state.attributes[1].key = action.payload.attributes[1].key;
      state.attributes[2].key = action.payload.attributes[2].key;
      state.attributes[3].key = action.payload.attributes[3].key;
      state.attributes[0].value = action.payload.attributes[0].value;
      state.attributes[1].value = action.payload.attributes[1].value;
      state.attributes[2].value = action.payload.attributes[2].value;
      state.attributes[3].value = action.payload.attributes[3].value;

    },
  },
})

// Action creators are generated for each case reducer function
export const { updateDataState } = dataSlice.actions

export default dataSlice.reducer