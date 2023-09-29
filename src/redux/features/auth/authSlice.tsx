import {createSlice} from "@reduxjs/toolkit"
import { getUser, hostTournament, login, otp, resetPassword, searchUser, signup } from "./authActions"

interface AuthState{
    user:any,
    loading:boolean,
    error:boolean,
    otpStatus:boolean,
token:string | null,
reset:boolean,
searchUserRes:object[] | null[],
}

const initialState:AuthState = {
     user: null,
     loading:false,
     error:false,
     otpStatus:false,
     token:null,
     reset:false,
     searchUserRes:[]
}

export const authSlice =  createSlice({
    name:"auth",
    initialState,
    reducers:{
        errorFalse:(state)=>{
            state.error = false
        },

        resetFalse:(state)=>{
            state.reset = false
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(otp.rejected, (state, action)=>{
            state.error=true;
        })
        builder.addCase(otp.fulfilled, (state, action)=>{
            state.otpStatus=true;
        })

        builder.addCase(signup.fulfilled,(state,action)=>{
            state.token = action.payload
        })
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.user = action.payload
            state.loading = false
        })
        builder.addCase(getUser.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(login.rejected,(state)=>{
            state.error = true
            state.loading = false
        })

        builder.addCase(login.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading = false
            state.token = action.payload
        })

        builder.addCase(resetPassword.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(resetPassword.rejected,(state)=>{
            state.error = true
            state.loading = false
        })
        builder.addCase(resetPassword.fulfilled,(state)=>{
            state.loading=false
            state.reset=true
        })
        builder.addCase(searchUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(searchUser.fulfilled,(state,action)=>{
            state.searchUserRes=action.payload
            state.loading = false
        })
        builder.addCase(hostTournament.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(hostTournament.rejected,(state)=>{
            state.loading = false
            state.error = true
        })
        builder.addCase(hostTournament.fulfilled,(state)=>{
            state.loading = false
            state.reset = true
        })
       
    },
})

export const {errorFalse,resetFalse} = authSlice.actions