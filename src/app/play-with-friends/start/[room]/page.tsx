"use client"
import ToasterWithAction, { toastAction } from '@/Components/Toaster/ToasterWithAction'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Page({ params }: { params: { room: string } }) {
    const [time, setTime] = useState(10)
    const [play, setPlay] = useState<string[]>([])
    const [waiting, setWaiting] = useState(false)
    const [stopTime, setStopTime] = useState(false)
    const [type, setType] = useState<string>("")
    const [round, setRounde] = useState(1)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [score, setScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const { socket, user } = useSelector((state: any) => state.auth)
    const [opponent, setOpponent] = useState("")
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]

    

    const switchPlayer = () => {
        if (currentPlayer === "O") {
            setCurrentPlayer("X")
        } else {
            setCurrentPlayer("O")
        }
        socket.emit("switch-player-local")
    }
const winning = () => {
        for (let i = 0; i < wins.length; i++) {
            const [a, b, c] = wins[i]
            if (play[a] === type && play[b] === play[a] && play[c] === play[a]) {
                toastAction.showToast(`You Won This Round!`, `green`, () => {
                    socket.emit("next-round-local")
                    setRounde(round + 1)
                    setStopTime(false)
                    setPlay([""])
                }, `next round`)
                setStopTime(true)
                console.log("working me")
                setScore(score + 1)
                socket.emit("i-won-local-match")
            }
        }
    }
    const handleClick = (index: number) => {
        let arr = play
        if (!arr[index] && currentPlayer === type) {
            arr[index] = type
            setPlay(arr)
            setTime(10)
            socket.emit("start-playing-local", { index, player: type })
            if (currentPlayer === "X") {
                setCurrentPlayer("O")
            } else {
                setCurrentPlayer("X")
            }
            winning()
        }
    }

    useEffect(() => {
        if (time >= 0 && waiting && !stopTime) {
            const interval = setInterval(() => setTime(time - 1), 1000)
            return () => clearInterval(interval)
        } else if (waiting && !stopTime) {
            switchPlayer()
            setTime(10)
        } else {
            setTime(10)
        }
    }, [stopTime, time, waiting])

    useEffect(() => {
        socket.emit("start-local-game", user?.fullName)
    }, [])

    useEffect(() => {
        socket.on("start-local-game", (data: string) => {
            setType("X")
            setOpponent(data)
            setWaiting(true)
            socket.emit("play-local-game", user?.fullName)
        })
        socket.on("play-local-game", (data: string) => {
            setType("O")
            setOpponent(data)
            setWaiting(true)
            // socket.emit("play-local-game")
        })
        socket.on("start-playing-local", (data: { gamePlay: string[], current: string }) => {
            setCurrentPlayer(data.current)
            setPlay(data.gamePlay)
            setTime(10)
        })
        socket.on("i-won-local-match", (data: string[]) => {
            console.log("working opponent",opponentScore)
            setOpponentScore(opponentScore+1)
            console.log("working opponent",opponentScore)
            setPlay(data)
            toastAction.showToast(`You loose This Round!`, `red`, () => {
                socket.emit("next-round-local")
                setPlay([""])
                setStopTime(false)
                setRounde(round + 1)
            }, `next round`)
            setStopTime(true)
        })
        socket.on("next-round-local", (data:number) => {
            setRounde(data)
            toastAction.close()
            toastAction.close()
            setStopTime(false)
            setPlay([""])
        })

        return () => {
            socket.off("next-round-local", (data: { round: number, current: string }) => {
                setRounde(data.round)
                setCurrentPlayer(data.current)
                toastAction.close()
                setStopTime(false)
                setPlay([""])
            })
            socket.off("start-local-game", () => {
                setType("X")
                setWaiting(true)
                socket.emit("play-local-game")
            })
            socket.off("play-local-game", (data: string) => {
                setType("O")
                setOpponent(data)
                setWaiting(true)
                // socket.emit("play-local-game")
            })
            socket.off("i-won-local-match", (data: string[]) => {
                setOpponentScore(opponentScore + 1)
            console.log("working opponent")
            setPlay(data)
            toastAction.showToast(`You loose This Round!`, `red`, () => {
                socket.emit("next-round-local")
                setPlay([""])
                setStopTime(false)
                if (currentPlayer === "O") {
                    setCurrentPlayer("X")
                } else {
                    setCurrentPlayer("O")
                }
                setRounde(round + 1)
            }, `next round`)
            setStopTime(true)
            })
        }
    }, [currentPlayer, opponentScore, round, socket, user?.fullName])

    return (
        <div className='h-screen w-screen'>
            <ToasterWithAction />
            {!waiting ? <h1 className='self-center'>waiting for the opponent</h1> :
                <>
                    <div className="fixed top-3 left-3 rounded-xl bg-none flex flex-col border-[#2D2F39] border justify-between h-[calc(100vh-5rem)] w-32 ">
                        <div className="w-full h-10 rounded-[0.75rem_0.75rem_0px_0px] bg-slate-500 text-center pt-2">Time : {time}</div>
                        <h1 className='self-center'>Round - {round}</h1>
                        <div className='w-[90%] h-52 border self-center'>
                            <h1 className={currentPlayer === type ? 'text-center text-indigo-600 transition' : 'text-center'}>You - {type}</h1>
                            <h1 className='text-center'>{score}</h1>
                            <hr className='w-full bg-white text-stone-100 fill-white mt-[50%]' />
                            <h1 className={currentPlayer !== type ? 'text-center text-indigo-600 transition' : 'text-center'}>{opponent || "user"} - {type === "X" ? "O" : "X"}</h1>
                            <h1 className='text-center'>{opponentScore}</h1>
                        </div>
                        <div className="w-full h-10 self-end rounded-[0px_0px_0.75rem_0.75rem] bg-slate-500 "></div>
                    </div>
                    <table className='w-[300px] self-center h-[300px] ms-44 text-center text-[50px] cursor-pointer'>
                        <tr className='border-b'><td className='border-r w-[100px] h-[100px]' onClick={() => handleClick(0)}>{play[0]}</td><td className='border-r  w-[100px] h-[100px]' onClick={() => handleClick(1)}>{play[1]}</td><td className='w-[100px] h-[100px]' onClick={() => handleClick(2)}>{play[2]}</td></tr>
                        <tr className='border-b'><td className='border-r w-[100px] h-[100px]' onClick={() => handleClick(3)}>{play[3]}</td><td className='border-r  w-[100px] h-[100px]' onClick={() => handleClick(4)}>{play[4]}</td><td className='w-[100px] h-[100px]' onClick={() => handleClick(5)}>{play[5]}</td></tr>
                        <tr><td className='border-r w-[100px] h-[100px]' onClick={() => handleClick(6)}>{play[6]}</td><td className='border-r  w-[100px] h-[100px]' onClick={() => handleClick(7)}>{play[7]}</td><td className='w-[100px] h-[100px]' onClick={() => handleClick(8)}>{play[8]}</td></tr>
                    </table>
                </>
            }
        </div>
    )
}

export default Page