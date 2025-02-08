'use client'

import useCommands from "@/utils/commands";
import { useEffect, useRef, useState } from "react";

type outputItem = {
  type: 'command' | 'output',
  content: string
}

export default function Home() {
  const [inputCommand, setInputCommand] = useState('');
  const [outputCommand, setOutputCommand] = useState<outputItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastCommandIndex, setLastCommandIndex] = useState<number>(0)

  const { commands, getPrompt } = useCommands()

  const processCommand = (command: string) => {
    // Aqui você pode adicionar a lógica para processar o comando
    const [commandName, ...args] = command.split(' ')
    const commandFunction = commands[commandName]

    if (commandFunction) {
      let output = commandFunction(args)
      setOutputCommand((prevOutput) => [...prevOutput, { type: 'output', content: output }])
      if (commandName == 'clear') {
        setOutputCommand([{ type: 'output', content: '' }])
      }
    } else {
      let output = `${commandName}: command not found`;
      setOutputCommand((prevOutput) => [...prevOutput, { type: 'output', content: output }])
    }
  }

  useEffect(() => {
    processCommand('echo Bem-vindo ao terminal!'); // Comando inicial
    processCommand('banner'); // Processa o comando inicial
    processCommand("echo Type 'help' to see list of available commands."); // Processa o comando inicial
  }, []); // Executa apenas uma vez, ao montar o componente

  const handleCommand = () => {
    setOutputCommand((prevOutput) => [...prevOutput, { type: 'command', content: `${getPrompt()} ${inputCommand}` }]);
    processCommand(inputCommand)
    setInputCommand('');
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Foca no input ao clicar na tela
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const historyCommands = outputCommand.filter(value => value.type === "command")
    if (!historyCommands.length) {
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand()
      setLastCommandIndex(0);
    }
    if (e.key === 'ArrowUp') {
      const index = lastCommandIndex + 1
      if (index <= historyCommands.length) {
        setLastCommandIndex(index)
        const { content } = historyCommands[historyCommands.length - index]
        setInputCommand(content.split(' ').splice(1).join(' '))
      }
    }
    if (e.key === 'ArrowDown') {
      const index = lastCommandIndex - 1
      if (index > 0) {
        setLastCommandIndex(index)
        const { content } = historyCommands[historyCommands.length - index]
        setInputCommand(content.split(' ').splice(1).join(' '))
      } else {
        setLastCommandIndex(0)
        setInputCommand('')
      }
    }
  }

  return (
    <div onClick={handleClick} className="bg-black text-green-400 font-mono h-screen p-4">
      <div className="h-full overflow-y-auto">
        {outputCommand.map((item, index) => (
          <div key={index} className={item.type === 'command' ? 'text-green-400' : 'text-white whitespace-pre'}>
            {item.content}
          </div>
        ))}
        <form onSubmit={(e) => {
          e.preventDefault()
          handleCommand()
        }} className="flex">
          <span className="text-green-400">{getPrompt()}</span>
          <input
            type="text"
            ref={inputRef}
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-green-400 outline-none flex-grow ml-2"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
