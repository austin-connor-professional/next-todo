'use client';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';

export default function Create() {
  const [formState, action] = useFormState(actions.createTodo, {
    message: '',
  });

  return (
    <div className='bg-slate-800 h-screen'>
      <form action={action}>
        <h3>Create a snippet</h3>
        <label htmlFor='description' className='text-white'>
          Description of task
        </label>
        <textarea name='description' id='title'></textarea>
        <button type='submit' className='text-white'>
          Submit
        </button>
      </form>
    </div>
  );
}
