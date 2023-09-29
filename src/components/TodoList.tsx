import React, { useState } from 'react';

import { Button, Space, Input, notification } from 'antd';

import type { NotificationPlacement } from 'antd/es/notification/interface';

const Context = React.createContext({
  name: 'Username',
});

interface todoItem {
  id: number;
  text: any;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  // ! I have never seen a useState written like this... what is the <todoItems[]> doing there like this?
  const [todos, setTodos] = useState<todoItem[]>([
    { id: 1, text: 'Hello World!', completed: false },
    { id: 2, text: 'Get Bread!', completed: false },
    { id: 3, text: 'Wash Bananas!', completed: false },
    { id: 4, text: 'Drink Coffee!', completed: false },
  ]);

  const [newTask, setNewTask] = useState<string>('');

  const addItem = () => {
    if (newTask !== '') {
      const newTodo: todoItem = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      openNotification('topRight');
      setNewTask(''); // Reset the newTask state to an empty string
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Saved: New item added to the list!`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const completeTask = (id: number) => {
    setTodos(
      todos.map((todoList) => {
        if (todoList.id === id) {
          return { ...todoList, completed: !todoList.completed };
        }
        return todoList;
      })
    );
  };

  return (
    <div className="h-screen">
      <div className="">
        {/* //! todo: make this into an input box. add an edit button, user can update the h1 element! */}
        <div className="px-10 bg-sky-600 text-slate-100 w-full py-6 tracking-widest flex justify-start items-center">
          <h1 className="font-bold text-2xl xl:text-3xl">Todo List : 📝</h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-11/12 lg:w-10/12">
            <Input
              className="mt-6 mb-4 text-base p-3"
              placeholder="Add an item to your list !"
              value={newTask}
              onChange={(event) => setNewTask(event.currentTarget.value)}
            />
          </div>

          {contextHolder}
          <Space wrap className="mb-8">
            <Button
              className="tracking-widest"
              onClick={() => openNotification('topRight')}
              size="large"
            >
              Save List
            </Button>

            <Button
              className="ml-10 tracking-widest"
              onClick={() => addItem()}
              size="large"
            >
              Add Task
            </Button>
          </Space>
        </div>

        <div className="flex justify-center">
          <ul className="w-11/12 lg:w-10/12">
            {todos.map((data) => (
              <div
                key={data.id}
                onClick={() => completeTask(data.id)}
                className={
                  data.completed
                    ? 'hover:scale-[1.015] cursor-pointer border-2 border-slate-200 mb-2 px-2 py-3 shadow-sm rounded-lg line-through transition-all delay-100'
                    : 'hover:scale-[1.015] cursor-pointer border-2 border-slate-200 mb-2 px-2 py-3 shadow-sm rounded-lg transition-all delay-100'
                }
              >
                <li>{data.text}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
