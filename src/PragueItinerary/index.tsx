import { useState } from "react"
import TaskList from "./TaskList"
import AddTask from "./AddTask"

export default function Prague() {
    const initList = [{ id: 0, text: '参观卡夫卡博物馆', done: true }]
    const [taskList, setTL] = useState(initList)

    return <>
        <h1>布拉格行程(state)</h1>
        <AddTask taskList={taskList} setTL={setTL} />
        <TaskList taskList={taskList} setTL={setTL}/>
    </>
}