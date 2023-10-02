const express = require('express');
const ABI = require('./ABI.json');
const cors = require('cors');
const { Web3 } = require('web3');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});


const web3 = new Web3(process.env.PROVIDER);
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(ABI, contractAddress);

console.log(contract.methods);


// const viewTask = async () => {
//     const task = await contract.methods.viewTask(1).call();
//     return task;
// }

// viewTask().then((res) => {
//     console.log(res);
// })

app.use(cors());


app.get('/api/etherum/view-task/:id', async (req, res) => {
    try {
        const task = await contract.methods.viewTask(req.params.id).call()
        const { id, name, date } = task;
        const numId = Number(id);
        const taskObj = {
            id: numId,
            name,
            date
        }
        console.log(task)
        res.status(200).json({ status: 200, taskObj, message: "task fetched succesfully" })
    } catch (error) {
        console.error(error)
    }
})


app.get('/api/etherum/view-all-tasks', async (req, res) => {
    try {
        const tasks = await contract.methods.allTasks().call()
        if (tasks.length < 0) {
            res.status(404).json({ status: 404, message: "no tasks found" })
        }
        const taskArray = tasks.map((task) => {
            const { id, name, date } = task;
            const numId = Number(id);
            const taskObj = {
                id: numId,
                name,
                date
            }
            return taskObj;
        })
        res.status(200).json({ status: 200, taskArray, message: "tasks fetched succesfully" })
    } catch (error) {
        console.error(error)
    }
}
)

const dateClashCheck = async (taskDate) => {
    const tasks = await contract.methods.allTasks().call()
    const taskArray = tasks.map((task) => {
        const { id, name, date } = task;
        const numId = Number(id);
        const taskObj = {
            id: numId,
            name,
            date
        }
        return taskObj;
    })
    const dateArray = taskArray.map((task) => task.date);
    const dateClash = dateArray.includes(taskDate);
    return dateClash;
}


app.post('/api/etherum/createTask', async (req, res) => {

    try {
        const { date } = req.body;
        const dateClash = await dateClashCheck(date);
        if (dateClash) {
            res.status(400).json({ status: 400, message: "date clash" })
        }
        else {
            res.status(200).json({ message: "task can be added " })
        }
    } catch (error) {
        console.error(error)
    }
})



