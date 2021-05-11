import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList"

/*
const task = {
  id: 0,
  title: 'Nova tarefa',
  state: 'pendente'
}
*/

let idAcc = 0
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
}

export default function App() {
  //Container com todas as tarefas
  const [tasks, setTasks] = useState([]);

  //Função para criar uma tarefa em algum botão
  const addTask = (title, state) => {
    console.log("Função sendo chamada");
    const newTask = {
      id: generateId(),
      title,
      state
    };
    //Adicionar nova tarefa no tasks, chamando o setTasks
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    })
  };

  //Função que recebe os parametros, e tenta achar, se encontrar atualiza
  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if(task.id === id){
          //...task = todos os parametros da task (id, title, state), porem sobrescreve title e state
          //e o id permanece o mesmo
          return {...task, title, state}
        } else {
          return task;
        }
      })
    });
  }

//Função para deletaras tarefas

const deleteTask = (id) => {
  setTasks((existingTasks) => {
    //Retornar uma lista de tarefas
    //retornar o que não quer filtrar da lista para remove-la
    //Tarefas diferentes dos Ids que foram passados
    return existingTasks.filter(task => task.id !== id);
  })
}
  //TaskList encarregado de chamar a função addTask
  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <TaskList 
        title={`Pendente`} 
        onAddTask={addTask}
        taskState = "Pendente"
        tasks={tasks.filter((t) => t.state === "Pendente")} 
        onTaskUpdate={updateTask}
        onDeleteTask={deleteTask}
        />
        <TaskList 
        title={`Fazendo`} 
        onAddTask={addTask} 
        taskState = "Fazendo"
        tasks={tasks.filter((t) => t.state === "Fazendo")} 
        onTaskUpdate={updateTask}
        onDeleteTask={deleteTask}
        />
        <TaskList 
        title={`Completa`} 
        onAddTask={addTask} 
        taskState = "Completa"
        tasks={tasks.filter((t) => t.state === "Completa")} 
        onTaskUpdate={updateTask}
        onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
