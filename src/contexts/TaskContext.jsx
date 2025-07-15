import { createContext, useContext, useState } from 'react';
const TaskContext = createContext(null);

export function useTasks() {  //封装
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider. Did you forget to wrap your component tree?");
  }
  return context;
}

export function TaskProvider({ children }) {

    //暂时的数据和方法，后面再导入真正的的hook
    const [tasks, setTasks] = useState([
        { id: 1, name: "学习 React Context", isCompleted: false },
        { id: 2, name: "重构项目", isCompleted: false },
    ]);

    function addTask(name) {
        const newTask = { id: Date.now(), name, isCompleted: false };
        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    const value = {
        tasks,
        addTask,
    };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}