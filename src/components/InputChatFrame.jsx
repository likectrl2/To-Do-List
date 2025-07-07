/* eslint-disable react-refresh/only-export-components */

import { useRef } from 'react';

function InputChatFrame({onSubmit}) {
  const inputRef = useRef(null);
  const frameRef = useRef(null);

  function autoResize() {
    const el = inputRef.current;
    const frame = frameRef.current;
    if (el && frame) {
      el.style.height = 'auto';
      const newHeight = Math.min(el.scrollHeight, 120);
      el.style.height = newHeight + 'px';
      frame.style.height = (newHeight + 32) + 'px';
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendOut();
    }
  }

  function sendOut() {
    if (inputRef.current.value.trim() !== '') {
      onSubmit(inputRef.current.value);
      inputRef.current.value = '';
      autoResize();
    }
  }

  return (
    <div className='input-chat-frame' ref={frameRef}>
      <div className="input-chat-area">
        <textarea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onInput={autoResize}
          style={{height: '40px'}}
        />
        <button onClick={sendOut}>{'>'}</button>
      </div>
    </div>
  )
}

export default InputChatFrame;