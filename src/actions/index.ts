'use server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function createTodo(
  formState: { message: string },
  formData: FormData
) {
  const description = formData.get('description') as string;

  try {
    await db.todo.create({
      data: {
        description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: 'Something went wrong',
      };
    }
  }
  revalidatePath('/');
  redirect('/');
}

export async function editTodo(id: number, complete: boolean) {
  await db.todo.update({
    where: { id },
    data: {
      complete: !complete,
    },
  });
  revalidatePath('/');
}
