import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './app.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [all, setAll] = useState(true)
  const [showFinished, setShowFinished] = useState(true)

  const refAll = useRef()
  const refPending = useRef()
  const refDone = useRef()

  const showAll = () => {
    setAll(true)
    refAll.current.style.backgroundColor = "rgb(20 83 45 / var(--tw-bg-opacity, 1)"
    refAll.current.style.color = "#e9f7ef"

    refPending.current.style.backgroundColor = "#013a1a42"
    refPending.current.style.color = "#1c2833"

    refDone.current.style.backgroundColor = "#013a1a42"
    refDone.current.style.color = "#1c2833"
  }
  const showPending = () => {
    setShowFinished(false)
    setAll(false)

    refPending.current.style.backgroundColor = "rgb(20 83 45 / var(--tw-bg-opacity, 1)"
    refPending.current.style.color = "#e9f7ef"

    refAll.current.style.backgroundColor = "#013a1a42"
    refAll.current.style.color = "#1c2833"

    refDone.current.style.backgroundColor = "#013a1a42"
    refDone.current.style.color = "#1c2833"
  }
  const showDone = () => {
    setShowFinished(true)
    setAll(false)

    refDone.current.style.backgroundColor = "rgb(20 83 45 / var(--tw-bg-opacity, 1)"
    refDone.current.style.color = "#e9f7ef"

    refAll.current.style.backgroundColor = "#013a1a42"
    refAll.current.style.color = "#1c2833"

    refPending.current.style.backgroundColor = "#013a1a42"
    refPending.current.style.color = "#1c2833"
  }
  

  useEffect(() => {
    let check = localStorage.getItem("todos")
    if (check) { 
      setTodos(JSON.parse(check))
    }
  }, [])

  useEffect(() => {
 if (todos[0]) {
  localStorage.setItem("todos", JSON.stringify(todos))
  }
  }, [todos])
  

  const handleAdd = async (e) => {
    e.preventDefault();
    if (todo) {
      const currentDate = new Date();
       const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        let time = `${currentDay}-${currentMonth}-${currentYear}`
    setTodos([...todos, { id: uuidv4(), todo, time: time ,isCompleated: false }])
    setTodo("")
    }
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckBox = (e) => {
    let name = e.target.name
    let currTodo = todos.find(todo => todo.id === name)
    currTodo.isCompleated = !currTodo.isCompleated
    setTodos([...todos])
  }
  const handleEdit = (e, id) => {
    let curr = todos.filter(todo => todo.id === id)
    if (!curr[0].isCompleated) {
      setTodo(curr[0].todo)
    let currTodo = todos.filter(todo => todo.id !== id)
    setTodos(currTodo)
    }
  }
  const handleDelete = (e, id) => {
    if (confirm("Are you sure that you want to delete this todo?")) {
      let currTodo = todos.filter(todo => todo.id !== id)
    setTodos(currTodo)
    }
  }
 
  return (
    <>
      <Navbar />

      <main className='flex flex-col items-center p-[20px]'>

        <div className="boxes flex gap-[1px] w-[90vw] sm:w-[600px] justify-center items-center px-[20px] py-[10px]">
          <div ref={refAll} onClick={showAll} className="box w-[150px] bg-green-900 flex justify-center items-center border-none cursor-pointer font-semibold text-[#e9f7ef] p-[8px] rounded-l-md">All</div>
          <div ref={refPending} onClick={showPending} className="box w-[150px] bg-[#013a1a42] hover:bg-[#013a1a56] flex justify-center items-center border-none cursor-pointer font-semibold text-[#1c2833] p-[8px]">Pending</div>
          <div ref={refDone} onClick={showDone} className="box w-[150px] bg-[#013a1a42] hover:bg-[#013a1a56] flex justify-center items-center border-none cursor-pointer font-semibold text-[#1c2833] p-[8px] rounded-r-md">Done</div>
        </div>

        <div className="addtask w-[95vw] sm:w-[80vw] lg:w-[60vw] mt-[12px]">
        <form action="" onSubmit={handleAdd} className='todoform w-full flex items-center p-[10px] justify-between'>
        <div className='flex justify-center items-center'>
        <h2 className='text-3xl font-semibold mr-2'>Tasks</h2>
        <input onChange={handleChange} value={todo} className='w-[80%] outline-none h-[60px] bg-transparent border-b-[1px] text-lg' type="text" placeholder='Enter your task' maxLength={500} required />
        </div>
          <button onClick={handleAdd} type='submit' className='w-[110px] h-[40px] bg-green-800 flex justify-center items-center gap-[3px] border-none cursor-pointer font-semibold text-sm text-[#e9f7ef] p-[8px] mx-2 rounded-md'> <svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px" fill="#e8eaed"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg> Add Task</button>
       </form>  
         </div>

        <div className="taskcontainer w-[95vw] sm:w-[80vw] md:w-[60vw] mt-[20px] flex flex-col gap-[6px] px-[10px] mb-10">

          {todos.length === 0 && <div className='w-full h-[200px] flex justify-center items-center text-[#7b7d7d]'>No todos to display</div>}
          {todos.map((item) => {
            if (all) {
              return (
                <div key={item.id} className="task w-full bg-white pl-[12px] pr-[16px] py-[20px] flex justify-between border-none outline-none rounded-sm">
                  <div className="text h-full flex items-center gap-2 max-w-[70%]">
                  {item.isCompleated?<input onChange={handleCheckBox} type="checkbox" name={item.id} value={item.idCompleated} checked className='h-4 w-4' />:  <input onChange={handleCheckBox} type="checkbox" name={item.id} value={item.idCompleated} className='h-4 w-4' />}
                    <div className={item.isCompleated ? 'todoText text-[17px] line-through text-[#7b7d7d]' : 'todoText text-[17px]'}>{item.todo}</div>
                  </div>
                  <div className="time flex justify-center items-center gap-2">
                    <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg></div>
                    <div className='text-[#566573]'>{item.time}</div>
                  </div>
                  <div className="btns flex gap-3">
                    <button onClick={(e)=>{handleEdit(e, item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z" /></svg></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
                  </div>
                </div>
              )
            }
            else if (showFinished && item.isCompleated) {
              return (
                <div key={item.id} className="task w-full bg-white pl-[12px] pr-[16px] py-[20px] flex justify-between border-none outline-none rounded-sm">
                  <div className="text h-full flex items-center gap-2 max-w-[70%]">
                    <input onChange={handleCheckBox} type="checkbox" name={item.id} value={item.idCompleated} checked className='h-4 w-4' />
                    <div className={item.isCompleated ? 'todoText text-[17px] line-through text-[#7b7d7d]' : 'todoText text-[17px]'}>{item.todo}</div>
                  </div>
                  <div className="time flex justify-center items-center gap-2">
                    <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg></div>
                    <div className='text-[#566573]'>01/01/2025</div>
                  </div>
                  <div className="btns flex gap-3">
                    <button onClick={(e)=>{handleEdit(e, item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z" /></svg></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
                  </div>
                </div>
              )
            }
            else if (!showFinished && !item.isCompleated) {
              return (
                <div key={item.id} className="task w-full bg-white pl-[12px] pr-[16px] py-[20px] flex justify-between border-none outline-none rounded-sm">
                  <div className="text h-full flex items-center gap-2 max-w-[70%]">
                    <input onChange={handleCheckBox} type="checkbox" name={item.id} value={item.idCompleated} className='h-4 w-4' />
                    <div className={item.isCompleated ? 'todoText text-[17px] line-through text-[#7b7d7d]' : 'todoText text-[17px]'}>{item.todo}</div>
                  </div>
                  <div className="time flex justify-center items-center gap-2">
                    <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg></div>
                    <div className='text-[#566573]'>01/01/2025</div>
                  </div>
                  <div className="btns flex gap-3">
                    <button onClick={(e)=>{handleEdit(e, item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z" /></svg></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808b96"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
                  </div>
                </div>
              )
            }
          }
          )}

        </div>

      </main>

      <Footer />
    </>
  )
}

export default App
