import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/apiBackend";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";

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
        navigate("/");
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900">Task Manager</h2>
      <form onSubmit={handleAddTask} className="flex mt-6 gap-2">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center transition-all"
        >
          <AiOutlinePlus className="mr-1" /> Add
        </motion.button>
      </form>
      <ul className="mt-6 space-y-4">
        {tasks.map((task) => (
          <motion.li 
            key={task._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <span className={task.completed ? "line-through text-gray-500" : "text-gray-900 font-medium"}>{task.title}</span>
            <div className="flex gap-3">
              <button onClick={() => handleUpdateTask(task._id, task.completed)} className="text-green-500 text-xl hover:text-green-600">
                <AiOutlineCheckCircle />
              </button>
              <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 text-xl hover:text-red-600">
                <AiOutlineDelete />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
        className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all"
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default TaskList;
