import { useRef } from 'react';

function InputChatFrame({onSubmit}) {
  const inputRef = useRef(null);

  function handleClick() {
    if(inputRef.current.value !== '') {
      onSubmit(inputRef.current.value);
      inputRef.current.value = ''
    }
  }

  function handleKeyDown(e) {
    if(e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      if(inputRef.current.value !== '') {
        onSubmit(inputRef.current.value);
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className='input-chat-frame'>
      <div className='input-chat-context-frame'>
        <textarea className='text' placeholder='请输入文本' ref={inputRef} onKeyDown={handleKeyDown}></textarea>
        <img className='enter' onClick={handleClick} src="https://media.prts.wiki/8/85/%E7%AB%8B%E7%BB%98_%E8%8E%AB%E6%96%AF%E6%8F%90%E9%A9%AC_2.png"></img>
      </div>
    </div>
  )
}

export default InputChatFrame;