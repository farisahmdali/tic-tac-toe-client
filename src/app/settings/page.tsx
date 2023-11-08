"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { addCredittoACC, getOpponentsDetails, getUser, getfrndDetails, orderPayment, searchUser, updateName, withdrawAmount } from '@/redux/features/auth/authActions'
import Add from '@/Components/settings/Add'
import ToasterWithinput, { toastinput } from '@/Components/Toaster/ToasterWithInput'
import useRazorpay from 'react-razorpay'

function Page() {
  const { user } = useSelector((state: any) => state.auth)
  const [Razorpay] = useRazorpay()
  const [search, setSearch] = useState<any>("")
  const [value, setValue] = useState(user?.fullName)
  const [editName, setEditName] = useState(false)
  const [enableWithdraw, setEnableWithdraw] = useState(false)
  const [add, setAdd] = useState<any>()
  const [withdrawData, setWithDrawData] = useState({ amount: 0, upiId: "" })
  const [frnds, setFrnds] = useState<any>([])
  const [amount, setAmount] = useState(0)
  const route = useRouter()
  const dispatch: any = useDispatch()
  useEffect(() => {
    setFrnds(user?.frnd)
    setValue(user?.fullName)
  }, [user])

  useEffect(() => {
    setAdd(user?.frnds || [])
  }, [user])

  const paymentGateWay = (order: any, val: number) => {
    const options = {
      key: "rzp_test_SZISjiHbBlmqCl", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Tic-Tac-Toe",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response: any) {
        console.log(response)
        const res = dispatch(addCredittoACC({ id: response.razorpay_order_id, amount: val }))
        res.then(() => {
          dispatch(getUser())
        })
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }

  const withdraw = () => {
    setEnableWithdraw(!enableWithdraw)
  }




  const addCredits = () => {
    toastinput.showToast("Enter The Amount", "blue", async (val) => {
      console.log("wokring", val);
      const res = dispatch(orderPayment(parseInt(val) * 100))

      res.then((x: any) => {
        const order = x?.payload?.order
        console.log(order)
        paymentGateWay(order, val * 100)
      })
    }, "submit")
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    withdraw()
    const res = dispatch(withdrawAmount(withdrawData))
    res.then(() => {
      dispatch(getUser())
    })
  }

  return (
    <div className='pt-14 ps-20 flex'>
      <ToasterWithinput />
      {enableWithdraw ? 
      <div className='fixed top-0 left-0 h-screen w-screen bg-[#000000d0] flex justify-center items-center'>
        <button className='bg-red-600 hover:bg-red-500 px-3 py-2 rounded-2xl fixed left-3 top-3' onClick={withdraw}>Close</button>
        <div>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-400"
                  >
                    Amount
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      onChange={(e) => setWithDrawData({ ...withdrawData, amount: parseInt(e.target.value) * 100 })}
                      type="number"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-400"
                    >
                      Upi Id
                    </label>

                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="text"
                      onChange={(e) => setWithDrawData({ ...withdrawData, upiId: e.target.value })}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>:null}
      <div className='w-1/2  rounded h-[calc(100vh-5rem)] p-5'>
        <div className='flex w-full mt-10'>
          <div className='ms-8 w-full self-center'>
            {editName ? <><input className='text-black' type="text" value={value} onChange={(e) => setValue(e.target.value)} /> <button className='bg-indigo-600 px-3 rounded ' onClick={async () => {
              await dispatch(updateName(value))
              dispatch(getUser())
              setEditName(false)
            }}>Submit</button></> : <div className='flex w-full justify-between'><h1 className='text-3xl'>{user?.fullName}</h1><button className='bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded' onClick={() => setEditName(!editName)}>Edit Name</button></div>}

            <h2 className='mt-3'>{user?.email}</h2>
            <div className='flex w-full justify-between'>
              <h2 className='mt-3'>credits - {user?.credit / 100 || 0}</h2>
              <div>
                <button className='bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl text-sm' onClick={addCredits}>Add Credits</button>
                <button className='bg-red-500 ms-2 hover:bg-red-600 px-5 py-2 rounded-xl text-sm' onClick={withdraw}>Withdraw</button>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />
        <div className='mt-10'>
          <h6>Rank : {user?.rank || 0}</h6>
          <h6>Score : {user?.score || 0}</h6>
          <h6>Played : {user?.played || 0}</h6>
          <h6>Wins : {user?.wins || 0}</h6>
        </div>
        <button
          onClick={() => {
            Cookies.remove("token")
            route.replace("/")
          }}
          className=" justify-center m-2 rounded-full bg-red-600 px-5 float-right py-1.5 text-sm font-semibold hover:bg-red-700 leading-6 text-white shadow-sm"
        >
          Log Out
        </button>
        <div>

        </div>
      </div>
      <div className='w-1/2 overflow-auto rounded h-[calc(100vh-5rem)] p-5 -z-40'>
        <div className="relative w-72 outline-none">
          <div className="absolute inset-y-0 left-0 flex items-center outline-none pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={search}
            id="default-search"
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-12 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search"
          />
          <button
            onClick={() => {
              if (search) {

                const res = dispatch(searchUser(search))
                res.then((x: any) => {
                  console.log(x)
                  setAdd(x?.payload)
                })
              } else {
                const res = dispatch(getfrndDetails(frnds))
                res.then((x: any) => {
                  setAdd(x?.payload)
                })
              }
            }}
            className="text-white absolute text-[10px] right-2.5 bottom-[2.5px] bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-4 "
          >
            Search
          </button>
        </div>

        {add?.map((x: any) => (
          <Add email={x?.email} name={x?.fullName} rank={x?.rank} score={x?.score} key={x} id={x?._id} frnds={frnds} setAdd={() => {
            setSearch("")
            dispatch(getUser())
          }} />
        ))}

      </div>
    </div>
  )
}

export default Page