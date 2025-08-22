"use client";

import { useState } from "react";

interface inboxData {
  name: string;
  id: string;
}

export default function Inbox() {
  const getInbox = () => {
    return [
      {
        name: "test1",
        id: "1234",
      },
      {
        name: "测试2",
        id: "adwd",
      },
      {
        name: "测试2",
        id: "dawd",
      },
    ];
  };

  const [datas, setDatas] = useState<inboxData[]>(getInbox());

  const addInbox = () => {
    setDatas([...datas, { name: "新建收集", id: "1010" }]);
  };

  const deleteInbox = (id: string) => {
    setDatas(datas.filter((i) => i.id !== id));
  };

  return (
    <main className='page flex flex-col'>
      <div className='bg-background-2 h-10'>
        <button
          className='hover:bg-background-3 flex aspect-square h-full items-center justify-center'
          onClick={addInbox}
        >
          +
        </button>
      </div>
      <div className='flex flex-1 flex-col gap-2 p-1'>
        {datas.map((i) => {
          return (
            <div
              key={i.id}
              className='bg-background-3 flex h-auto w-full'
            >
              <input
                type='text'
                className='flex-1'
                defaultValue={i.name}
              />
              <button
                className='aspect-square h-full hover:bg-red-500'
                onClick={() => deleteInbox(i.id)}
              >
                D
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
