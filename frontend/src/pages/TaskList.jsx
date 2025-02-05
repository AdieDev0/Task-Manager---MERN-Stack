import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        navigate("/login");
      }
    };
    getTasks();
  }, [navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    const { data } = await createTask({ title: newTask });
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const handleUpdateTask = async (id, completed) => {
    await updateTask(id, { completed: !completed });
    setTasks(tasks.map(task => (task._id === id ? { ...task, completed: !completed } : task)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="New Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
            <button onClick={() => handleUpdateTask(task._id, task.completed)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default TaskList;
