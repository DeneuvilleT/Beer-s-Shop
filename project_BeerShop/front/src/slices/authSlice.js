import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   infos: {},
   isLogged: false,
   role: '',
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      
      login(state, action) {
         state.isLogged = true;
         state.infos = action.payload;
         state.role = action.payload.status;
      },

      logout(state, action) {
         state.isLogged = false;
         state.role = '';
         localStorage.removeItem("token");
      },
   }
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;