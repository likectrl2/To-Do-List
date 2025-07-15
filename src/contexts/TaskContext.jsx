import { createContext, useContext } from 'react';
const TaskContext = createContext(null);

import useTask from '../hooks/useTask';

export function useTasks() {  //封装
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider. Did you forget to wrap your component tree?");
  }
  return context;
}

export function TaskProvider({ children }) {
  const apiTask = useTask(); 
    
  return (
    <TaskContext.Provider value={apiTask}>
      {children}
    </TaskContext.Provider>
  );
}