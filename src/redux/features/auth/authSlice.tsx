import { createSlice } from "@reduxjs/toolkit"
import { getRoomId, getTournaments, getUser, hostTournament, login, otp, resetPassword, searchUser, signup } from "./authActions"
import io from "socket.io-client"

interface AuthState {
    user: any,
    loading: boolean,
    error: boolean,
    otpStatus: boolean,
    token: string | null,
    reset: boolean | number,
    searchUserRes: object[] | null[],
    tournaments: object[] | null[],
    socket: any
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: false,
    otpStatus: false,
    token: null,
    reset: false,
    searchUserRes: [],
    tournaments: [],
    socket: io(process.env.NEXT_PUBLIC_API_BASE_URL+"")
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {       
        errorFalse: (state) => {
            state.error = false
        },

        resetFalse: (state) => {
            state.reset = false
        },
        resetTournament:(state)=>{
            state.tournaments=[]
        },
        setTournament:(state,action)=>{
            state.tournaments=action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(otp.rejected, (state, action) => {
            state.error = true;
        })
        builder.addCase(otp.fulfilled, (state, action) => {
            state.otpStatus = true;
        })

        builder.addCase(signup.fulfilled, (state, action) => {
            state.token = action.payload
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        })
        builder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUser.rejected, (state) => {
            state.loading = false
            state.error = true
        })
        builder.addCase(login.rejected, (state) => {
            state.error = true
            state.loading = false
        })

        builder.addCase(login.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
        })

        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true
        })

        builder.addCase(resetPassword.rejected, (state) => {
            state.error = true
            state.loading = false
        })
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.loading = false
            state.reset = true
        })
        builder.addCase(searchUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.searchUserRes = action.payload
            state.loading = false
        })
        builder.addCase(searchUser.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(hostTournament.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(hostTournament.rejected, (state) => {
            state.loading = false
            state.error = true
        })
        builder.addCase(hostTournament.fulfilled, (state) => {
            state.loading = false
            state.reset = true
        })
        builder.addCase(getRoomId.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getRoomId.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getRoomId.fulfilled, (state, action) => {
            state.loading = false
            state.reset = action.payload
        })
        builder.addCase(getTournaments.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTournaments.fulfilled, (state, action) => {
            state.loading = false
            action.payload.map((x:never) => {
                state.tournaments.push(x)
            })
        })

        builder.addCase(getTournaments.rejected, (state) => {
            state.loading = false
        })

    },
})

export const { errorFalse, resetFalse,resetTournament,setTournament } = authSlice.actions