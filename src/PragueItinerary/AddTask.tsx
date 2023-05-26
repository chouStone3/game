import { useState } from "react"
import styled from "styled-components"

export default function AddTask({ taskList, setTL }: { taskList: any[], setTL: (s: any) => void }) {
    const [newTask, setNT] = useState('')
    const [nextId, setNI] = useState(1)
    return <label>
        <input value={newTask} onChange={(e) => setNT(e.target.value)}></input>
        <Button onClick={() => {
            setTL([...taskList, { id: nextId, text: newTask, done: false }])
            setNT('')
            setNI(nextId + 1)
        }} >添加</Button>
    </label>
}

const Button = styled.button`
    margin: 5px;
`
