
import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",

  initialState: {
    userdata: null,
    otherusers:null
    
    
  },

  reducers: {
    setuserdata: (state, action) => {
      state.userdata = action.payload;
    },
      setotheruserdata: (state, action) => {
      state.otherusers = action.payload;
    }
  }
  

});

export const { setuserdata, setotheruserdata } = userslice.actions;

export default userslice.reducer;