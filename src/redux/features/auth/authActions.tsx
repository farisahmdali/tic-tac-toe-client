import instance from "@/configs/axios"
import {createAsyncThunk} from "@reduxjs/toolkit"
import Cookies from "js-cookie"

export const otp = createAsyncThunk("/auth/otp",async(email:string,{rejectWithValue, dispatch, getState})=>{
    try{
        await instance.post("/otp",{email})
    }catch(err){
        throw Error()
    }
   
})

interface SignupData{
    fullName:string,
    email:string,
    password:string,
    otp:number

}

export const signup = createAsyncThunk("/auth/signup",async(data:SignupData,{rejectWithValue, dispatch, getState})=>{
    try{
      let res = await instance.post("/signup",data)
      console.log(res.data)
      Cookies.set("token",res.data.token)
      return res.data.token
    }catch(err){
        throw Error()
    }
})

export const getUser = createAsyncThunk("/auth/getUser",async(token,{rejectWithValue, dispatch, getState})=>{
    try{
        let res = await instance.get("/getuser")
        return res.data.user
    }catch(err){
        console.log(err)
        Cookies.remove("token")
    }
})

export const login = createAsyncThunk("/auth/login",async({email,password}:{email:string,password:string},{rejectWithValue, dispatch, getState})=>{
    try{
        const res = await instance.get("/login",{params:{email,password}})
        Cookies.set("token",res.data.token)
        return res.data.token
    }catch(err){
        console.log(err);
        throw Error()   
    }
})

export const resetPasswordOtp =  createAsyncThunk("/auth/resetPasswordOtp",async(email:string,{rejectWithValue, dispatch, getState})=>{
    const res =await instance.post("/resetPasswordOtp",{email})
})

export const resetPassword =  createAsyncThunk("/auth/resetPassword",async({email,password,otp}:{email:string;password:string;otp:number},{rejectWithValue, dispatch, getState})=>{
    try{
        const res =await instance.post("/resetPassword",{email,password,otp})
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const searchUser = createAsyncThunk("/auth/searchUser",async(word:string)=>{
    try{
        const res =await instance.get("/searchUser",{params:{word}})
        return res.data.user
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const hostTournament = createAsyncThunk("/auth/hostTournament",async(data:any)=>{
    try{
        const res =await instance.post("/host-tournament",data)
        return res
    }catch(err){
        console.log(err)
        throw Error()
    }
})