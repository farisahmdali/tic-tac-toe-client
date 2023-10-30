"use client"
import ToasterWithAction, { toastAction } from '@/Components/Toaster/ToasterWithAction'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Page({ params }: { params: { id: string } }) {
    const route = useRouter()
    const [time, setTime] = useState(10)
    const [play, setPlay] = useState<string[]>([])
    const [waiting, setWaiting] = useState(false)
    const [stopTime, setStopTime] = useState(false)
    const [type, setType] = useState<string>("")
    const [timeLimit, setTimeLimit] = useState(10)
    const [round, setRounde] = useState(1)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [score, setScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const { socket, user } = useSelector((state: any) => state.auth)
    const [opponent, setOpponent] = useState<any>()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]

    const getRandomIntWithExclusions = (min: number, max: number) => {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (play[randomNum]);
        return randomNum;
    }

    useEffect(() => {
        socket.emit("start-game", {}, (data: string) => {
            setType(data)
        })
    }, [socket])

    const winning =() => {
        for (let i = 0; i < wins.length; i++) {
            const [a, b, c] = wins[i]
            if (play[a] === type && play[b] === play[a] && play[c] === play[a]) {

                toastAction.showToast(`You Won This Round!`, `green`, () => {
                    socket.emit("next-round")
                    setRounde(round + 1)
                    setStopTime(false)
                    setPlay([""])
                }, `next round`)
                setStopTime(true)
                console.log("working me")
                setScore(score + 1)
                socket.emit("i-won", "Round" + round)
            }
        }

        if (play[0] && play[1] && play[2] && play[3] && play[4] && play[5] && play[6] && play[7] && play[8] && !stopTime) {
            socket.emit("draw")
            toastAction.showToast(`This Round draw`, `#fc7303`, () => {
                socket.emit("next-round")
                setRounde(round + 1)
                setStopTime(false)
                setPlay([""])
            }, `next round`)
            setStopTime(true)
        }
    }

    const switchPlayer = () => {
        if (currentPlayer === "O") {
            setCurrentPlayer("X")
        } else {
            setCurrentPlayer("O")
        }
        const random = getRandomIntWithExclusions(0, 8)
        play[random] = type
        winning()
        socket.emit("playing", { index: random, player: type })
    }
   
    
    
    const handleClick = (index: number) => {
        let arr = play
        if (!arr[index] && currentPlayer === type) {
            arr[index] = type
            setPlay(arr)
            setTime(timeLimit)
            socket.emit("playing", { index, player: type })
            if (currentPlayer === "X") {
                setCurrentPlayer("O")
            } else {
                setCurrentPlayer("X")
            }
            winning()
        }
    }

    const playing = useCallback((data: { gamePlay: string[], current: string }) => {
        console.log(data)
        setCurrentPlayer(data.current)
        setPlay(data.gamePlay)
        setTime(timeLimit)
    }, [timeLimit])

    const Won = useCallback((data: { gamePlay: string[], current: string }) => {
        console.log(data)
        setCurrentPlayer(data.current)
        setPlay(data.gamePlay)
        setOpponentScore(opponentScore + 1)

        toastAction.showToast(`You loose This Round!`, `red`, () => {
            socket.emit("next-round")
            setPlay([""])
            setStopTime(false)
            setRounde(round + 1)
        }, `next round`)
        setStopTime(true)
    }, [opponentScore, round, socket])

    const nextRound = useCallback(() => {
        setRounde(round + 1)
        setPlay([])
        setStopTime(false)
        toastAction.close();
    }, [round])
    const roundFinished = useCallback(() => {
        setRounde(round + 1)
        setPlay([])
        let data
        if (opponentScore > score) {
            data=opponent?.email
            toastAction.showToast("You Loose this Match", "red", () => {
                setStopTime(false)
                socket.emit("leave-tournament-group")
                setWaiting(false)
                route.replace("/tournament/play/"+params.id)
                console.log("i won")
            }, "Next Match")
        } else if (score > opponentScore) {
            data = user?.email
            toastAction.showToast("You Win this Match", "green", () => {
            setStopTime(false)
            socket.emit("leave-tournament-group")
            setWaiting(false)
            route.replace("/tournament/play/"+params.id)
            console.log("i won")
        }, "Next Match")
        } else {
            data=false
            setTimeLimit(5)
            toastAction.showToast("Its Golden Time", "#825717", () => {
                socket.emit("golden-game-done")
                setStopTime(false)
                console.log("i won")
            }, "Next Match")
        }
        socket.emit("round-finished",{email:data})
        setStopTime(true)
        
    }, [opponent?.email, opponentScore, params.id, round, route, score, socket, user?.email])

    const goldenGame = useCallback(() => {
        setStopTime(true)
        setTimeLimit(5)
        toastAction.showToast("Its Golden Time", "#825717", () => {
            socket.emit("golden-game-done")
            setStopTime(false)
            console.log("i won")
        }, "Next round")
    }, [])

    const draw = useCallback(() => {
        toastAction.showToast(`This Round draw`, `#fc7303`, () => {
            socket.emit("next-round")
            setRounde(round + 1)
            setStopTime(false)
            setPlay([""])
        }, `next round`)
        setStopTime(true)
    }, [round, socket])
    const gameFinished = useCallback(() => {
        let data
        setStopTime(true)
        if (opponentScore > score) {
            toastAction.showToast("You Loose this Match", "red", () => {
                setStopTime(false)
                setWaiting(false)
                socket.emit("leave-tournament-group")
                route.replace("/tournament/play/"+params.id)
                console.log("i won")
            }, "Next Match")
        } else if (score > opponentScore) {
            toastAction.showToast("You Win this Match", "green", () => {
            setStopTime(false)
            setWaiting(false)
            socket.emit("leave-tournament-group")
            route.replace("/tournament/play/"+params.id)
            console.log("i won")
        }, "Next Match")
        } else {
            setTimeLimit(5)
            toastAction.showToast("Its Golden Time", "#825717", () => {
                socket.emit("golden-game-done")
                setStopTime(false)
                console.log("i won")
            }, "Next Match")
        }
    }, [opponentScore, params.id, route, score, socket])

    useEffect(() => {
        socket.on("playing", playing)
        socket.on("i-won", Won)
        socket.on("next-round", nextRound)
        socket.on('start-game', (opponent: any) => {
            setWaiting(true)
            setOpponent(opponent)
            socket.emit("start-game-2")
        })
        socket.on("round-finished", roundFinished)
        socket.on("gameFinished",gameFinished)
        socket.on("golden-game", goldenGame)
        socket.on("golden-game-done",()=>{
            setStopTime(false)
            toastAction.close()
        })
        socket.on("start-game-2", (opponent: any) => {
            setOpponent(opponent)
            setWaiting(true)
        })
        socket.on("draw", draw)
        return () => {
            socket.off("playing", playing)
            socket.off("i-won", Won)
            socket.off("next-round", nextRound)
            socket.off("golden-game",()=>{
                setStopTime(true)
                toastAction.close()
            })
            socket.off('start-game', () => {
                setWaiting(true)
                socket.emit("start-game-2")
            })
            socket.off("start-game-2", () => setWaiting(true))
            socket.off("round-finished", roundFinished)
            socket.off("golden-game", goldenGame)
            socket.off("draw", draw)
        }
    }, [Won, draw, gameFinished, goldenGame, nextRound, playing, roundFinished, socket])

    useEffect(() => {
        if (time >= 0 && !stopTime && waiting) {
            const interval = setInterval(() => setTime(time - 1), 1000)
            return () => clearInterval(interval)
        } else if (!stopTime && currentPlayer === type && waiting) {
            switchPlayer()
            setTime(timeLimit)
        } else {
            setTime(timeLimit)
        }
    }, [currentPlayer, stopTime, time, timeLimit, type, waiting])





    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <ToasterWithAction />
            {!waiting ? <h1>waiting for opponent</h1> :
                <>
                    <div className="fixed top-3 left-3 rounded-xl bg-none flex flex-col border-[#2D2F39] border justify-between h-[calc(100vh-5rem)] w-32 ">
                        <div className="w-full h-10 rounded-[0.75rem_0.75rem_0px_0px] bg-slate-500 text-center pt-2">Time : {time}</div>
                        <h1 className='self-center'>Round - {round}</h1>
                        <div className='w-[90%] h-52 border self-center'>
                            <h1 className={currentPlayer === type ? 'text-center text-indigo-600 transition' : 'text-center'}>You - {type}</h1>
                            <h1 className='text-center'>{score}</h1>
                            <hr className='w-full bg-white text-stone-100 fill-white mt-[50%]' />
                            <h1 className={currentPlayer !== type ? 'text-center text-indigo-600 transition' : 'text-center'}>{opponent.fullName || "user"} - {type === "X" ? "O" : "X"}</h1>
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