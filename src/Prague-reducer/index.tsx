import { useReducer, useState } from "react"
import styled from "styled-components";
interface Task {
    id: number,
    text: string,
    done: boolean
}

let nextId = 3;
export default function PragueReducer() {
    const initList: Task[] = [{ id: 0, text: '参观卡夫卡博物馆', done: true },
    { id: 1, text: '看木偶戏', done: false },
    { id: 2, text: '打卡列侬墙', done: false },]

    const [tasks, disPatch] = useReducer(tasksReducter, initList)

    const handleAddTask = (text: string) => {
        disPatch({ id: nextId++, type: 'added', text })
    }

    const handleDeletTask = (taskId: number) => {
        disPatch({ id: taskId, type: 'deleted' })
    }

    const handleChangeTask = (task: Task) => {
        disPatch({ ...task, type: 'changed' })
    }

    function tasksReducter(tasks: any, action: any) {
        switch (action.type) {
            case 'added': {
                return [...tasks, { id: action.id, text: action.text, done: false }]
            }
            case 'changed': {
                return tasks.map((task: Task) => {
                    return task.id === action.id ? { ...task, text: action.text, done: action.done } : task
                })
            }
            case 'deleted': {
                return tasks.filter((task: Task) => task.id !== action.id)
            }
            default: {
                throw Error('未知操作：' + action.type);
            }
        }
    }

    return <>
        <h1>布拉格行程(reducer)</h1>
        <AddTask
            addTask={handleAddTask}
        />
        <TaskList
            tasks={tasks}
            onDeleteTask={handleDeletTask}
            onChangeTask={handleChangeTask}
        />
    </>
}

function AddTask({ addTask }: { addTask: (text: string) => void }) {
    const [newText, setNT] = useState('')
    return <label>
        <input value={newText} onChange={(e) => setNT(e.target.value)}></input>
        <Button onClick={() => {
            addTask(newText)
            setNT('')
        }} >添加</Button>
    </label>
}

function TaskList({ tasks, onDeleteTask, onChangeTask }:
    { tasks: any[], onDeleteTask: (taskId: number) => void, onChangeTask: (task: Task) => void }) {
    return <Ul>
        {tasks.map((task) => {
            return <Li key={task.id}>
                <Task task={task} onDeleted={onDeleteTask} onChanged={onChangeTask} />
            </Li>
        })}
    </Ul>
}

const Task = ({ task, onDeleted, onChanged }: { task: any, onDeleted: (taskId: number) => void, onChanged: (task: Task) => void }) => {
    const [isEditing, setEditing] = useState(false)
    return <label>
        <input type='checkbox' onChange={(e) => {
            onChanged({ ...task, done: e.target.checked })
        }} />
        {isEditing ? <>
            <input value={task.text} onChange={(e) => onChanged({ ...task, text: e.target.value })} />
            <Button onClick={() => setEditing(false)}>保存</Button>
        </> : <>
            {task.text}
            <Button onClick={() => setEditing(true)}>编辑</Button>
        </>}
        <button onClick={() => onDeleted(task.id)}>删除</button>
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
