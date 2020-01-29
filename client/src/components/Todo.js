import React, { useState, useEffect } from 'react'
import './Todo.css'
import complete from './assets/images/complete.svg'
import incomplete from './assets/images/incomplete.svg'
// import x from './assets/images/x.png'
import axios from 'axios';

//<--------------------------------------------------------------------------------------------------------------------->

const CreateTask = ({ addTask }) => {
  const [value, setValue] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return

    addTask(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        placeholder='add a task'
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

//<--------------------------------------------------------------------------------------------------------------------->

const Task = ({
  task,
  index,
  completeTask,
  removeTask,
  handleDragStart,
  handleDragOver,
  handleDrop
}) => {
  return (
    <li
      className='task'
      id={index}
      style={{ textDecoration: task.completed ? 'line-through' : '' }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {task.title}
      {/* <button onClick={() => removeTask(index)}>
        <img src={x} />
      </button> */}
      <button onClick={() => completeTask(index)}>
        {task.completed ? <img src={complete} /> : <img src={incomplete} />}
      </button>
    </li>
  )
}

//<--------------------------------------------------------------------------------------------------------------------->
const Todo = () => {
  const stub = [
    {
      title: 'Learn React',
      completed: false
    },
    {
      title: '???',
      completed: false
    },
    {
      title: 'Profit',
      completed: true
    }
  ]
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')))
  // const [tasks, setTasks] = useState(stub)
  // const [tasks, setTasks] = useState(axios.get('/api/getTasks', (res) => console.log(res)))

  // useEffect(async () => {
  //   const result = await axios(
  //     '/api/getTasks',
  //   );
  //   setData(result.data);
  // });

  axios({
    method: 'get',
    url: '/api/getTasks',
    data: stub
  }).then(res => {
    console.log(res)
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = title => {
    const newTasks = [...tasks, { title, completed: false }]
    setTasks(newTasks)
  }

  const completeTask = index => {
    const newTasks = [...tasks]
    newTasks[index].completed
      ? (newTasks[index].completed = false)
      : (newTasks[index].completed = true)
    setTasks(newTasks)
  }

  const removeTask = index => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks([...newTasks])
  }

  const handleDragStart = event => {
    let fromBox = JSON.stringify({ id: event.target.id })
    event.dataTransfer.setData('dragContent', fromBox)
  }

  const handleDrop = event => {
    let fromBox = JSON.parse(event.dataTransfer.getData('dragContent'))
    let toBox = { id: event.target.id }
    swapTasks(fromBox, toBox)
  }

  const handleDragOver = event => {
    event.preventDefault() // Necessary. Allows us to drop.
    return false
  }

  const swapTasks = (fromBox, toBox) => {
    let newTasks = [...tasks]
    let fromIndex = -1
    let toIndex = -1

    for (let i = 0; i < newTasks.length; i++) {
      if (i === Number(fromBox.id)) {
        fromIndex = i
      }
      if (i === Number(toBox.id)) {
        toIndex = i
      }
    }

    if (fromIndex != -1 && toIndex != -1) {
      let { fromId, ...fromRest } = newTasks[fromIndex]
      let { toId, ...toRest } = newTasks[toIndex]
      newTasks[fromIndex] = { id: fromBox.id, ...toRest }
      newTasks[toIndex] = { id: toBox.id, ...fromRest }

      setTasks([...newTasks])
    }
  }

  return (
    <div className='todo-container paper'>
      <div className='header'>React Hooks for Fun and Profit</div>
      <div className='tasks'>
        <h3 className='task-header'>Todo</h3>
        <ul>
          {tasks.map((task, index) =>
            !task.completed ? (
              <Task
                task={task}
                index={index}
                key={index}
                completeTask={completeTask}
                removeTask={removeTask}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
              />
            ) : (
              ''
            )
          )}
        </ul>
      </div>

      <div className='tasks'>
        <h3 className='task-header'>Complete</h3>
        <ul>
          {tasks.map((task, index) =>
            task.completed ? (
              <Task
                task={task}
                index={index}
                key={index}
                completeTask={completeTask}
                removeTask={removeTask}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
              />
            ) : (
              ''
            )
          )}
        </ul>
      </div>
      <div className='create-task'>
        <CreateTask addTask={addTask} />
      </div>
    </div>
  )
}

export default Todo

//<--------------------------------------------------------------------------------------------------------------------->
