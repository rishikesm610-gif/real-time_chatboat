
import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",

  initialState: {
    userdata: null,
    otherusers:null,
    selecteduser:null,
    socket:null,
    onlineuser:null    
  },

  reducers: {
    setuserdata: (state, action) => {
      state.userdata = action.payload;
    },
      setotheruserdata: (state, action) => {
      state.otherusers = action.payload;
    },
      setselecteduser: (state, action) => {
      state.selecteduser  = action.payload;
    },
      setsocketuser: (state, action) => {
      state.socket  = action.payload;
    },
      setonlineuser: (state, action) => {
      state.onlineuser  = action.payload;
    }
  } 
  

});

export const { setuserdata, setotheruserdata, setselecteduser,setsocketuser,setonlineuser   } = userslice.actions;

export default userslice.reducer;