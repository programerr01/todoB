import React, { useState, useEffect } from 'react';
import axios from 'axios';
import checkUserStatus from '../helper';
import Todo from './Todo';
import AddTodoModal from './addTodo';
const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: 'hello', description: 'new todo' });
  const [loading, setLoading ] =  useState(true);
  const [ userId, setUserId] = useState(localStorage['userId']);
  const base_url = process.env.REACT_APP_BACKEND_URL
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const userIdd  = await checkUserStatus();
    setUserId(userIdd);
    try {
      const response = await axios.get(base_url+"/todo/" +userId);
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
    finally{
        setLoading(false);
    }
  };
  const onToggleCompleted = async (id) =>{
    try {
      console.log(id,todos);
      var todo_ = todos.filter((each) => {if(each._id == id){return each}})
      console.log(todo_);
      todo_ = todo_[0]
      todo_.completed= todo_.completed;
      console.log(todo_)
      setTodos(todos.map((each) => {if(each._id == id){each.completed = !each.completed};return each}));
      const response = await axios.put(base_url+"/todo/" +userId+"/"+id, todo_);
      // console.log(response)

    }
    catch(err){
      console.log('error occured',err);
    }
  }
  const addTodo = async (newT) => {
    try {
      const response = await axios.post(base_url+"/todo/" +userId, newT);
      setTodos(prevTodos => [...prevTodos, response.data]);
      setIsModalOpen(false);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  if(loading){
    return (
        <div className='ml-auto m-3 p-3 text-center'>
            <h4>Loading ( please wait for server to boot up) </h4>
        </div>
    )
  }
  return (
    
    <div className='m-3 p-2 text-center'>
      <button  className="btn btn-primary" onClick={() => {setIsModalOpen(true); }}>Add Todo</button>
      <div>
        <AddTodoModal isOpen={isModalOpen} onClose={() =>{setIsModalOpen(false)}} handleAdd={addTodo} />
        <h2>Todo List</h2>
        <ul>
          {todos.map(todo => (
            <Todo id={todo._id} key={todo._id} title={todo.title} description={todo.description} completed={todo.completed}  onToggleCompleted={onToggleCompleted} />
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default TodosPage;
