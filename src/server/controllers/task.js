import Task from '../models/Task.js';

// create 

export const createTask = async (req, res) => {
    const {userId, title, description, status, priority, dueDate} = req.body;
    console.log(req.body);
    try{
        const task = new Task({
            userId:userId, 
            title:title, 
            description:description, 
            status: status,
            priority: priority, 
            dueDate: dueDate});
        await task.save();
        return res.status(201).json({message: "Task created successfully"});
    }
    catch(error){
        return res.status(500).json({message: "Error creating the task ", error});
    }
}

// read

//read all tasks
export const getTasks = async (req, res) => {
    // console.log("here")
    try{
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    }
    catch(error){
        return res.status(500).json({message: "Error fetching tasks ", error});
    }
}

// update complete task
export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, description, dueDate, priority, status} = req.body;
    console.log(req.body);
    try{
        const task= await Task.findByIdAndUpdate
        (
            id, 
            {
                title: title, 
                description: description, 
                dueDate: dueDate, 
                priority: priority, 
                status: status
            }, 
            {new: true}
        );
        return res.status(200).json(task);
    } 
    catch(error){
        return res.status(500).json({message: "Error updating the task ", error});
    }
}

//read a task
export const getTaskById = async (req, res) => {
    const {id} = req.params;
    try{
        const task= await Task.findById(id);
        if(task) return res.status(200).json(task);
        else return res.status(404).json({message: "Task not found"});
    }
    catch(error){
        return res.status(500).json({message: "Error fetching the task ", error});
    }
}

// update

//update task status
export const updateTaskStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try{
        const task= await Task.findByIdAndUpdate(
            id,
            {status: status}, 
            {new: true}
        );

        return res.status(200).json(task);
    }
    catch(error){
        return res.status(500).json({message: "Error updating the task ", error});
    }
}

//update task priority
export const updateTaskPriority = async (req, res) => {
    const {id} = req.params;
    const {priority} = req.body;
    try{
        const task= await Task.findByIdAndUpdate(
            id, 
            {priority: priority}, 
            {new: true}
        );
        return res.status(200).json(task);
    }
    catch(error){
        return res.status(500).json({message: "Error updating the task ", error});
    }
}

//update task due date
export const updateTaskDueDate = async (req, res) => {
    const {id} = req.params;
    const {dueDate} = req.body;
    try{
        const task= await Task.findByIdAndUpdate(
            id, 
            {dueDate: dueDate}, 
            {new: true}
        );
        return res.status(200).json(task);
    }

    catch(error){
        return res.status(500).json({message: "Error updating the task ", error});
    }
}

//update task description
export const updateTaskDescription = async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try{
        const task= await Task.findByIdAndUpdate(
            id, 
            {description: description}, 
            {new: true}
        );
        return res.status(200).json(task);
    }
    catch(error){
        return res.status(500).json({message: "Error updating the task ", error});
    }
}

//update task title
export const updateTaskTitle = async (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    try{
        const task= await Task.findByIdAndUpdate(
            id, 
            {title: title}, 
            {new: true}
        );
        return res.status(200).json(task);
    }
    catch(error){
        return res.status(500).json({message: "Error updating the task ", error});
    }
}


// delete
export const deleteTask = async (req, res) => {
    const {id} = req.params;
    try{
        await Task.findByIdAndDelete(id);
        return res.status(200).json({message: "Task deleted successfully"});
    }
    catch(error){
        return res.status(500).json({message: "Error deleting the task ", error});
    }
}