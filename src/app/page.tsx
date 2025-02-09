'use client'

import { useHistory } from "@/components/history/hook";
import PS1 from "@/components/PS1";
import useCommands from "@/utils/commands";
import { useEffect, useRef } from "react";


export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    addHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const { commands } = useCommands()

  const shell = (command: string) => {
    // Aqui você pode adicionar a lógica para processar o comando
    const [name, ...args] = command.split(' ')
    const commandName = name.toLowerCase()
    const commandFunction = commands[commandName]

    if (commandName === 'clear') {
      clearHistory()
    } else if (commandName === '') {
      addHistory('')
    } else if (commandFunction) {
      let output = commandFunction(args)
      addHistory(output)
    } else {
      let output = `${commandName}: command not found`;
      addHistory(output)
    }
  }

  useEffect(() => {
    shell('banner'); // Processa o comando inicial
  }, []); // Executa apenas uma vez, ao montar o componente

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView()
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history])

  const handleCommand = () => {
    setCommand(command)
    shell(command)
    setCommand('')
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Foca no input ao clicar na tela
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const historyCommands = history.map(({ command }) => command).filter((historyCommand: string) => historyCommand)

    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand()
      setLastCommandIndex(0);
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearHistory();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      const index = lastCommandIndex + 1
      if (index <= historyCommands.length) {
        setLastCommandIndex(index)
        setCommand(historyCommands[historyCommands.length - index])
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      const index = lastCommandIndex - 1
      if (index > 0) {
        setLastCommandIndex(index)
        setCommand(historyCommands[historyCommands.length - index])
      } else {
        setLastCommandIndex(0)
        setCommand('')
      }
    }
  }
  return (
    <div onClick={handleClick} className="h-full bg-black text-green-400 font-mono border-2 rounded-md p-8 overflow-auto border-gray-600">
      <div className="h-full overflow-y-auto">
        {history.map((item, index) => (
          <div key={index}>
            <div>
              <div className="flex items-center space-x-1">
                <PS1 />
                <span className="text-white">{item.command}</span>
              </div>
            </div>
            <p className="whitespace-pre mb-3">{item.output}</p>
          </div>
        ))}
        <form onSubmit={(e) => {
          e.preventDefault()
          handleCommand()
        }} className="flex">
          <PS1 />
          <input
            type="text"
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-green-400 outline-none flex-grow ml-2"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
