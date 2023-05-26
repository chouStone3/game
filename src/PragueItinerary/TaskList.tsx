import { useState } from "react"
import styled from "styled-components";

export default function TaskList({ taskList, setTL }: { taskList: any[], setTL: (s: any) => void }) {
    console.log(taskList);

    return <Ul>
        {taskList.map((task) => 
           <Li key={task.id}>
                <Task task={task} setList={setTL} taskList={taskList} />
            </Li>
        )}
    </Ul>
}

const Task = ({ task, taskList, setList }: { task: any, taskList: any[], setList: (s: any) => void }) => {
    const [isEditing, setEditing] = useState(false)
    return (
        <label>
            <input type="checkbox" onChange={(e) =>
                setList(taskList.map((tas) => {
                    return tas.id === task.id ? { ...tas, done: e.target.checked } : tas
                }))
            } />
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
            </>

            }
            <Button onClick={() => setList(taskList.filter((t) => t.id !== task.id))}>删除</Button>
        </label>
    )
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