"use client"
import { getWithdraw, withdrawDone } from "@/redux/features/auth/authActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Page() {
  const [data, setData] = useState<any>()
  const dispatch: any = useDispatch()
  const route = useRouter()
  useEffect(() => {
    const res: any = dispatch(getWithdraw())
    res.then((x: any) => {
      if (x?.error) {
        route.replace("/")
      } else {
        console.log(x)
        setData(x?.payload?.data)
      }
    })
  }, [dispatch, route])
  console.log(data)
  return <div><div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            UPI Id
          </th>
          <th scope="col" className="px-6 py-3">
            Full Name
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((x: any, index: number) => (
          index % 2 === 0 ?
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {x?.email}
              </th>
              <td className="px-6 py-4">
                {x?.amount/100}
              </td>
              <td className="px-6 py-4">
                {x?.upiId}
              </td>
              <td className="px-6 py-4">
                {x?.fullName}
              </td>
              <td className="px-6 py-4">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>{
                  dispatch(withdrawDone(x?._id))
                  const array = data
                  const index = array.indexOf(x)
                  console.log(index)
                  array.splice(index,1)
                  setData([...array])
                }}>Done</button>
              </td>
            </tr> :
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {x?.email}
              </th>
              <td className="px-6 py-4">
              {x?.amount/100}
              </td>
              <td className="px-6 py-4">
              {x?.upiId}
              </td>
              <td className="px-6 py-4">
              {x?.fullName}
              </td>
              <td className="px-6 py-4">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>{
                  dispatch(withdrawDone(x?._id))
                  const array = data
                  const index = array.indexOf(x)
                  console.log(index)
                  array.splice(index,1)
                  setData([...array])
                }}>Done</button>
              </td>
            </tr>
        ))}

      </tbody>
    </table>
  </div>
  </div>;
}

export default Page;
