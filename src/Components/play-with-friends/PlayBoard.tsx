import React, { useState, useEffect } from 'react'


function PlayBoard({room}:{room:string}) {
    const [time, setTime] = useState(0)

    useEffect(() => {
        if(time > 0) {
            const interval = setInterval(() => setTime(time - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [time])
    return (
        <div>
            <h1>Time : { }</h1>
            <div>
                <table>
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td></td><td></td><td></td></tr>
                    <tr><td></td><td></td><td></td></tr>
                </table>
            </div>
        </div>
    )
}

export default PlayBoard