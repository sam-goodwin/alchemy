import { queryDb } from '@livestore/livestore'
import { useStore } from '@livestore/react'
import React from 'react'

import { events } from '../livestore/events.ts'
import { uiState$ } from '../livestore/queries.ts'
import { tables } from '../livestore/tables.ts'

const visibleTodos$ = queryDb(
  (get) => {
    const { filter } = get(uiState$)
    return tables.todos.where({
      deletedAt: null,
      completed: filter === 'all' ? undefined : filter === 'completed',
    })
  },
  { label: 'visibleTodos' },
)

export const MainSection: React.FC = () => {
  const { store } = useStore()

  const toggleTodo = React.useCallback(
    ({ id, completed }: typeof tables.todos.Type) =>
      store.commit(completed ? events.todoUncompleted({ id }) : events.todoCompleted({ id })),
    [store],
  )

  const visibleTodos = store.useQuery(visibleTodos$)

  return (
    <section className="main">
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            <div className="state">
              <input type="checkbox" className="toggle" checked={todo.completed} onChange={() => toggleTodo(todo)} />
              <label>{todo.text}</label>
              <button
                className="destroy"
                onClick={() => store.commit(events.todoDeleted({ id: todo.id, deletedAt: new Date() }))}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
