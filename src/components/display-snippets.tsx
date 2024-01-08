'use client';
import { useState, useEffect } from 'react';
import * as actions from '@/actions';
import { Todo } from '@prisma/client';

interface DisplayTodo {
  todos: Todo[];
}

export default function DisplaySnippets(props: DisplayTodo) {
  const [todos, setTodos] = useState(props.todos);

  useEffect(() => {
    sortAndAnimateTodos();
  }, [props.todos]);

  const sortAndAnimateTodos = () => {
    const sortedTodos = [...props.todos].sort((a, b) =>
      a.complete === b.complete ? 0 : a.complete ? 1 : -1
    );
    const animatedTodos = sortedTodos.map((todo) => ({
      ...todo,
      animate: todo.complete,
    }));
    setTodos(animatedTodos);

    setTimeout(() => {
      setTodos(sortedTodos.map((todo) => ({ ...todo, animate: false })));
    }, 200); // duration of the animation
  };

  const updateTodo = async (id: number, complete: boolean) => {
    await actions.editTodo(id, complete);
    sortAndAnimateTodos();
  };

  const renderedTodos = todos.map((todo) => (
    <div
      className={`flex justify-between items-center p-4 rounded-md mb-2 shadow-md ${
        todo.animate ? 'move-down-animation' : ''
      } ${todo.complete ? 'line-through bg-gray-400' : 'bg-slate-700'}`}
      key={todo.id}
    >
      <h2
        className={`text-xl ${todo.complete ? 'text-gray-600' : 'text-white'}`}
      >
        {todo.description}
      </h2>
      <button
        onClick={() => updateTodo(todo.id, todo.complete)}
        className={`px-4 py-2 rounded-md font-semibold ${
          todo.complete
            ? 'bg-green-600 hover:bg-green-500'
            : 'bg-red-500 hover:bg-red-400'
        }`}
      >
        {todo.complete ? 'Completed' : 'Pending'}
      </button>
    </div>
  ));

  return (
    <div className='bg-slate-800 h-screen flex flex-col items-center pt-12'>
      <div className='w-full max-w-2xl'>{renderedTodos}</div>
    </div>
  );
}
