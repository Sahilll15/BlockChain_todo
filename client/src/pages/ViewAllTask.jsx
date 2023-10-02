import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const ViewAllTask = () => {
    const [tasks, setTask] = useState([])

    const viewTask = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/etherum/view-all-tasks');
            console.log(response.data)

            if (response.status === 200) {
                setTask(response.data.taskArray)
            }
            else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        viewTask();
        console.log('tasks' + tasks);
    }, [])

    return (
        <div>
            <h1>Task From The BlockChain</h1>
            {
                tasks.map((task) => {
                    return (
                        <div>
                            <h1>{task.name}</h1>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default ViewAllTask