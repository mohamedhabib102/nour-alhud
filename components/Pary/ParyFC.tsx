"use client"

import { useEffect, useReducer, useState } from "react"
import { motion } from "framer-motion"

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "increment":
            return {count: state.count + 1}
        default:
            return state
    }
}

const Action = {
    increment: () => ({type: "increment"})
}

const ParyFC: React.FC = () => {
    const [count, dispatch] = useReducer(reducer, {count: 0});
    const [allNums, setAllNums] = useState<number>(0)

    const handelClick = () => {
        dispatch(Action.increment())
        localStorage.setItem("count", JSON.stringify(count.count))
        setAllNums(count.count)
    }
    
    useEffect(() => {
        const count = localStorage.getItem("count")
        if (count) {
            const parsedCount = JSON.parse(count)
            setAllNums(parsedCount)
        }
    }, [])
    return(
        <>
         <div className="flex items-center gap-3 select-none">
          <span className="text-lg font-semibold"> عدد جميع التسبيحات </span>
          <span className="text-lg font-semibold"> {allNums} </span>
         </div>
         <motion.div
         whileTap={{ scale: 0.9 }} 
         whileHover={{ scale: 1.1 }}
         onClick={handelClick} className="mt-20 mx-auto cursor-pointer w-96 h-96 rounded-full bg-white border-2 border-gray-400
         dark:bg-gray-800 dark:border-gray-600">
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-7xl font-bold select-none">{count.count}</p>
            </div>
         </motion.div>
        </>
    )
}
export default ParyFC