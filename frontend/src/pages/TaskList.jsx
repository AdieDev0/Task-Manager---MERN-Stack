import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/apiBackend";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center">Task Manager</h2>
      <form onSubmit={handleAddTask} className="flex mt-4">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit" 
          className="ml-2 bg-blue-600 text-white p-2 rounded-md flex items-center hover:bg-blue-700"
        >
          <AiOutlinePlus className="mr-1" /> Add
        </motion.button>
      </form>
      <ul className="mt-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li 
              key={task._id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-between items-center p-2 border-b"
            >
              <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
              <div className="flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleUpdateTask(task._id, task.completed)} 
                  className="text-green-500"
                >
                  <AiOutlineCheckCircle />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleDeleteTask(task._id)} 
                  className="text-red-500"
                >
                  <AiOutlineDelete />
                </motion.button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
        className="w-full mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default TaskList;
