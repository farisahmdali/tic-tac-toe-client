import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";

interface Verification {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  reset: () => void

}

function Verification({ handleSubmit, handleChange,reset }: Verification) {
  const [coutdown, setCountDown] = useState(100)
  useEffect(() => {
    if (coutdown > 0) {
      const interval = setInterval(() => setCountDown(coutdown - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [coutdown])
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="px-6 py-8 rounded  shadow-md text-black" onSubmit={handleSubmit}>
        <h1 className="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
          Sign up
        </h1>
        <input
          type="number"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          placeholder="Enter the OTP"
          name="otp"
          onChange={handleChange}
        />
        {coutdown > 0 ?
          <p className="text-indigo-600">{coutdown} Sec</p> :
          <p className="text-indigo-600 cursor-pointer hover:text-indigo-400" onClick={()=>{
            setCountDown(100);
            reset()
          }}>Resend OTP</p>
        }
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Verification;
