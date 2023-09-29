import React, { useState, useMemo } from 'react';

import { Button, Space, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

const Context = React.createContext({
  name: 'Default',
});

export const TodoList = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  return (
    <div className="flex h-screen justify-center items-center align-middle">
      <div className="flex w-fit justify-center  rounded-lg shadow-xl lg:shadow-2xl flex-col items-center">
        {/* //! todo: make this into an input box. add an edit button, user can update the h1 element! */}
        <div className="px-10 bg-sky-600 text-slate-100 w-full py-6 tracking-widest flex justify-start items-center">
          <h1 className="font-bold text-2xl xl:text-3xl">Todo List : 📝</h1>
        </div>

        <ul className="w-screen max-w-3xl p-10 min-h-[45em]">
          <li>Bread 🍞</li>
          <li>Bananas 🍌</li>
          <li>Broccoli 🥦</li>
          <li> MilK 🥛</li>
        </ul>

        <div className="w-10/12">
          <Input
            className="mt-6 mb-4 text-base p-3"
            placeholder="Add an item to your list !"
          />
        </div>

        {contextHolder}
        <Space wrap className="mb-8">
          <Button
            className="tracking-widest"
            onClick={() => openNotification('topRight')}
            size="large"
          >
            Add Task
          </Button>
        </Space>
      </div>
    </div>
  );
};
