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
        throw Error()
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
        return res.data
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const getRoomId = createAsyncThunk("/auth/getRoomId", async()=>{
    try{
        const res =await instance.get("/get-room-id")
        return res.data.roomId
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const getTournaments = createAsyncThunk("/auth/getTournaments",async(limit:number)=>{
    try{
        const res =await instance.get("/get-tournaments",{params:{limit}})
        return res.data.tournaments
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const getOpponentsDetails = createAsyncThunk("/auth/getOpponentsDetails",async(email:string)=>{
    try{
        const res =await instance.get("/get-opponent-details",{params:{email}})
        console.log(res.data)
        return res.data.user
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const getMyTournaments = createAsyncThunk("/auth/getMyTournaments",async()=>{
    try{
        const res =await instance.get("/get-my-tournaments")
        console.log(res.data)
        return res.data
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const saveTournaments = createAsyncThunk("/auth/saveTournaments",async(tournamentId:string)=>{
    try{
        const res =await instance.post("/save-tournaments",{tournamentId})
        return res.data
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const getTournamentsDetails=createAsyncThunk("/auth/getTournamentsDetails",async(tournamentId:string)=>{
    try{
        const res =await instance.get("/get-tournament-details",{params:{tournamentId}})
        return res.data
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const searchTournament=createAsyncThunk("/auth/getTournaments",async(elem:string)=>{
    try{
        const res =await instance.get("/searchTournament",{params:{elem}})
        return [res.data]
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const addfrnd=createAsyncThunk("/auth/addfrnd",async(id:string)=>{
    try{
        const res = await instance.post("/addfrnd",{id})
    }catch(err){
        console.log(err);
        throw Error()
        
    }
})

export const removefrnd=createAsyncThunk("/auth/removefrnd",async(id:string)=>{
    try{
        const res = await instance.post("/removefrnd",{id})
    }catch(err){
        console.log(err);
        throw Error()
        
    }
})

export const getfrndDetails=createAsyncThunk("/auth/getfrndDetails",async(ids:string[])=>{
    try{
        const res = await instance.get("/getfrnds-details",{params:{ids}})
        return res.data
    }catch(err){
        console.log(err);
        throw Error()
        
    }
})
export const getUsersByRank=createAsyncThunk("/auth/getUserByRank",async()=>{
    try{
        const res = await instance.get("/rank-sorted")
        console.log(res)
        return res.data
    }catch(err){
        console.log(err);
        throw Error()
    }
})

export const updateName=createAsyncThunk("/auth/updateName",async(name:string)=>{
    try{
        instance.post("updateName",{name})

    }catch(err){
        console.log(err);
        throw Error()
    }
})

export const orderPayment = createAsyncThunk("/auth/orderPayment",async(amount:number)=>{
    try{
       const res = await instance.get("/orderPayment",{params:{amount}})

       return res.data
    }catch(err){
        console.log(err);
        throw Error()
    }
})

export const addCredittoACC = createAsyncThunk("/auth/addCredits",async(order:{id:string,amount:number})=>{
    try{
        instance.post("/addCredits",{order})
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const  withdrawAmount = createAsyncThunk("/auth/withdrawAmount",({amount,upiId}:{amount:number,upiId:string})=>{
    try{
        instance.post("/withdraw",{amount,upiId})
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const withdrawLogin = createAsyncThunk("/auth/withdrawLogin",async({username,password}:{username:string,password:string})=>{
    try{
       const res = await instance.get("/withdrawLogin",{params:{username,password}})
       Cookies.set("tokenWith",res.data.token)
       return res.data.token
    }catch(err){
        console.log(err)
        throw Error()
    }
})

export const getWithdraw = createAsyncThunk("/auth/getWithdraw",async()=>{
    try{
        const token = await Cookies.get("tokenWith")
        const res = await instance.get("/get-withdraw-data",{params:{token}})
        return res.data
     }catch(err){
         console.log(err)
         throw Error()
     }
})

export const withdrawDone = createAsyncThunk("/auth/withdrawDone",async(id:string)=>{
    try{
        instance.post("/withdraw-done",{id,token:await Cookies.get("tokenWith")})
    }catch(err){
        console.log(err)
         throw Error()
    }
})