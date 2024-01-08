'use cient';
import { db } from '@/db';
import * as actions from '@/actions';
import DisplaySnippets from '@/components/display-snippets';

export default async function Home() {
  const todos = await db.todo.findMany();

  return <DisplaySnippets todos={todos} />;
}
