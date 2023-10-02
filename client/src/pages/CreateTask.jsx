import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const CreateTask = ({ state }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // const createTask = async (e) => {
    //     e.preventDefault();
    //     const { contract, account } = state;
    //     console.log(account)
    //     try {
    //         const res = await axios.post('http://localhost:4000/api/etherum/createTask', {
    //             date: formData.date,
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         console.log(res.data)
    //         if (res.status === 200) {
    //             const tx = await contract.methods.createTask(formData.name, formData.date).send({ from: account });
    //             console.log(tx);
    //         }
    //         else {
    //             console.log("error")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    const createTask = async (e) => {
        e.preventDefault();
        const { contract, account } = state;
        try {
            const tx = await contract.methods.createTask(formData.name, formData.date).send({ from: account });
            console.log(tx);


        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <h1>CreateTask</h1>
            <form onSubmit={createTask} >

                <input type="text" name="name" id="" placeholder="name"
                    onChange={handleChange}
                />
                <br />
                <br />
                <input type="text" name="date" id="" placeholder="date"
                    onChange={handleChange}
                />
                <br />
                <br />
                <button type='submit' >Create Task</button>
            </form>
        </div>
    )
}

export default CreateTask