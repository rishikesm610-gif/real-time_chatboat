

// import { createSlice } from "@reduxjs/toolkit";

// const messageslice = createSlice({
//   name: "message",

//   initialState: {
//     messages:[]
    
    
//   },

//   reducers: {
//     setmessages: (state, action) => {
//       state.messages = action.payload;
//     } 
//   } 
  

// });

// export const {  setmessages } = messageslice.actions;

// export default messageslice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const messageslice = createSlice({
    name: "message",

    initialState: {
        messages: []
    },

    reducers: {
        setmessages: (state, action) => {
            state.messages = action.payload;
        },

        addmessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
});

export const { setmessages, addmessage } = messageslice.actions;

export default messageslice.reducer;