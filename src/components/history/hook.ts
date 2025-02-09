'use client'
import { useState } from "react";

export type historyItem = {
    id: number,
    command: string,
    date: Date,
    output: string
}

export const useHistory = (defaultValue: Array<historyItem>) => {
    const [history, setHistory] = useState<Array<historyItem>>(defaultValue);
    const [command, setCommand] = useState<string>('');
    const [lastCommandIndex, setLastCommandIndex] = useState<number>(0);

    return {
        history,
        command,
        lastCommandIndex,
        addHistory: (value: string) =>
            setHistory([...history,
            {
                id: history.length,
                date: new Date(),
                command,
                output: value
            }]),
        setCommand,
        setLastCommandIndex,
        clearHistory: () => setHistory([])
    }
}