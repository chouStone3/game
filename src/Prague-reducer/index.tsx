import { useState } from "react"
import styled from "styled-components";

export default function PragueReducer() {
    const initList = [{ id: 0, text: '参观卡夫卡博物馆', done: true },
    { id: 1, text: '看木偶戏', done: false },
    { id: 2, text: '打卡列侬墙', done: false },]
    const [taskList, setTL] = useState(initList)

    const handleAddTask = (newTask: { id: number; text: string; done: boolean }) => {
        setTL([...taskList, newTask])
    }

    const handleDeletTask = (taskId: number) => {
        setTL(taskList.filter((t) => t.id !== taskId))

    }

    const handleEditTask = (taskId: number, newText: string) => {
        setTL(taskList.map((tas) => {
            return tas.id === taskId ? { ...tas, text: newText } : tas
        }))
    }

    return <>
        <h1>布拉格行程(reducer)</h1>
        <AddTask setTL={handleAddTask} />
        <TaskList taskList={taskList} setTL={setTL} />
    </>
}

function AddTask({ setTL }: { setTL: (s: any) => void }) {
    const [newTask, setNT] = useState('')
    const [nextId, setNI] = useState(1)
    return <label>
        <input value={newTask} onChange={(e) => setNT(e.target.value)}></input>
        <Button onClick={() => {
            setTL({ id: nextId, text: newTask, done: false })
            setNI(nextId + 1)
        }} >添加</Button>
    </label>
}

function TaskList({ taskList, setTL }: { taskList: any[], setTL: (s: any) => void }) {
    console.log(taskList);

    return <Ul>
        {taskList.map((task) => {
            return <Li key={task.id}>
                <Task task={task} setList={setTL} taskList={taskList} />
            </Li>
        })}
    </Ul>
}

const Task = ({ task, taskList, setList }: { task: any, taskList: any[], setList: (s: any) => void }) => {
    const [isEditing, setEditing] = useState(false)
    return <label>
        <input type='checkbox' onChange={(e) => {
            setList(taskList.map(item => {
                return item.id === task.id ? { ...task, done: e.target.checked } : task
            }))
        }} />
        {isEditing ? <>
            <input value={task.text} onChange={(e) =>
                setList(taskList.map((tas) => {
                    return tas.id === task.id ? { ...tas, text: e.target.value } : tas
                }))
            } />
            <Button onClick={() => setEditing(false)}>保存</Button>
        </> : <>
            {task.text}
            <Button onClick={() => setEditing(true)}>编辑</Button>
        </>}
        <button onClick={() => setList(taskList.filter((t) => t.id !== task.id))}>删除</button>
    </label>

}

const Button = styled.button`
    margin: 5px;
`
const Ul = styled.ul`
    padding: 0;
`
const Li = styled.li`
    list-style-type: none;
`
