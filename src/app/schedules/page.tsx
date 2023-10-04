"use client";
import React, { useState, useEffect } from "react";

function Page() {
    const [date, setDate] = useState(new Date());
    const [calender, setCalendar] = useState<any>({
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
    });
    const monthsArray = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

//callender
    useEffect(() => {
        let set = { ...calender };
        const monthsDate = [31, date.getFullYear() % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let a = 1;
        if (date.getDay() < date.getDate()) {
            set.row1[date.getDay() - date.getDate() + 7] = a;
            for (let i = date.getDay() - date.getDate() + 8; i < 35; i++) {
                a++;
                if(a > monthsDate[date.getMonth()]){
                    break;
                }
                if (i > 27) {
                    set.row5[i - 28] = a;
                } else if (i > 20) {
                    set.row4[i - 21] = a;
                } else if (i > 13) {
                    set.row3[i - 14] = a;
                } else if (i > 6) {
                    set.row2[i - 7] = a;
                } else {
                    set.row1[i] = a;
                }
            }

            if (set.row5[6] !== monthsDate[date.getMonth()] || set.row5[6] !== null && a<monthsDate[date.getMonth()] ) {
                for (let i = 0; i < monthsDate[date.getMonth()] - set.row5[6]; i++) {
                    a++;
                    set.row1[i] = a
                }
            }
        }else{
            
            for (let i = date.getDay() - date.getDate() ; i <= 35; i++) {
                if(a > monthsDate[date.getMonth()]){
                    break;
                }
                if (i > 27) {
                    set.row5[i - 28] = a;
                } else if (i > 20) {
                    set.row4[i - 21] = a;
                } else if (i > 13) {
                    set.row3[i - 14] = a;
                } else if (i > 6) {
                    set.row2[i - 7] = a;
                } else {
                    set.row1[i] = a;
                }
                a++;
            }
        }
        setCalendar({ ...set });
    }, [date]);



    return (
        <div className="pt-14 ps-20">
            <div className="w-[400px] p-5 rounded-xl border flex flex-col float-left ">
                <div className="flex justify-between items-center">
                    <h1>{monthsArray[date.getMonth()]} {date.getFullYear()}</h1>
                    <div>
                        <button onClick={() => {
                            let val = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
                            if(date.getMonth()<=0){
                                val = `12/${date.getDate()}/${date.getFullYear()-1}`
                            }
                            setCalendar({
                                row1: [],
                                row2: [],
                                row3: [],
                                row4: [],
                                row5: [],
                            })
                            setDate(new Date(val))
                        }}>
                            <svg
                                width="46"
                                height="46"
                                viewBox="0 0 46 46"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M25.0016 16.7181C25.3754 16.3269 26 16.3269 26.3738 16.7181C26.7242 17.0849 26.7242 17.6623 26.3738 18.029L21.6246 23L26.3738 27.971C26.7242 28.3377 26.7242 28.9152 26.3738 29.2819C26 29.6731 25.3754 29.6731 25.0016 29.2819L19 23L25.0016 16.7181Z"
                                    fill="#F2F3F7"
                                />
                            </svg>
                        </button>
                        <button onClick={() => {
                            let val = `${date.getMonth() + 2}/${date.getDate()}/${date.getFullYear()}`
                            if(date.getMonth()>10){
                                val = `1/${date.getDate()}/${date.getFullYear()+1}`
                            }
                            setCalendar({
                                row1: [],
                                row2: [],
                                row3: [],
                                row4: [],
                                row5: [],
                            })
                            setDate(new Date(val))

                        }}>
                            <svg
                                width="46"
                                height="46"
                                viewBox="0 0 46 46"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M20.9984 16.7181C20.6246 16.3269 20 16.3269 19.6262 16.7181C19.2758 17.0849 19.2758 17.6623 19.6262 18.029L24.3754 23L19.6262 27.971C19.2758 28.3377 19.2758 28.9152 19.6262 29.2819C20 29.6731 20.6246 29.6731 20.9984 29.2819L27 23L20.9984 16.7181Z"
                                    fill="#9CA3AF"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <table className="w-full text-center mt-8">
                    <tr>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                        <th>Su</th>
                    </tr>
                    <tr>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[0]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[1]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[2]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[3]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[4]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[5]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row1[6]}
                        </td>
                    </tr>
                    <tr>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[0]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[1]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[2]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[3]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[4]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[5]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row2[6]}
                        </td>
                    </tr>
                    <tr>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[0]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[1]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[2]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[3]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[4]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[5]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row3[6]}
                        </td>
                    </tr>
                    <tr>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[0]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[1]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[2]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[3]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[4]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[5]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row4[6]}
                        </td>
                    </tr>
                    <tr>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[0]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[1]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[2]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[3]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[4]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[5]}
                        </td>
                        <td className="border w-10 h-10 hover:bg-slate-400 hover:text-indigo-950 transition cursor-pointer">
                            {calender.row5[6]}
                        </td>
                    </tr>
                </table>
            </div>

            <div className="border h-[calc(100vh-4.5rem)] w-[calc(100%-450px)] me-4 float-right"></div>
        </div>
    );
}

export default Page;
