import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const ViewTask = () => {
    const [task, setTask] = useState('');
    const [id, setId] = useState(null)
    const viewTask = async () => {
        try {
            if (!id) {
                setTask(null);
                return;
            }

            const response = await axios.get(`http://localhost:4000/api/etherum/view-task/${id}`)
            console.log(response.data)
            if (response.status === 200) {
                setTask(response.data.taskObj)
            } else {
                console.log("error")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleBlur = (e) => {
        setId(null)
    }

    useEffect(() => {
        viewTask();
    }, [id])
    return (
        <div>
            <h1>view task by id</h1>
            <form action="">
                <input type="text" name="taskId" id="" onChange={
                    (e) => {
                        setId(e.target.value)
                    }
                }
                    onBlur={handleBlur}
                />

            </form>
            {
                task ?
                    <div>
                        <h1>{task.name}</h1>
                        <h1>{task.date}</h1>
                        <h1>{task.id}</h1>
                    </div>
                    : <h1>no task found</h1>
            }
        </div>
    )
}

export default ViewTask