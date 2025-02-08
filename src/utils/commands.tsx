'use client'
import { createText } from "@/components/figlet";
import { useEffect, useState } from "react"

export default function useCommands() {
    const [hostname, setHostname] = useState('');
    const [host, setHost] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHostname(window.location.hostname); // Obtém o hostname do navegador
            setHost(window.location.host); // Obtém o hostname do navegador
        }
    }, []);

    const commands: Record<string, (args: string[]) => string | string> = {
        help: () => 'Available commands: ' + Object.keys(commands).join(', '),
        hostname: () => hostname,
        host: () => host,
        whoami: () => 'jack970',
        date: () => new Date().toLocaleDateString(),
        echo: (args: string[]) => args.join(' '),
        clear: () => '',
        figlet: (args: string[]) => createText(args.join(' ')),
        banner: () => commands.figlet(['jack970']),
        repo: () => { if (typeof window !== 'undefined') { window.open(`https://github.com/jack970/terminal`) } }
    }

    const getPrompt = () => {
        const user = commands.whoami([''])
        const hostname = commands.hostname(['']); // Obtém o hostname
        return `${user}@${hostname}:~$`;
    }

    return { commands, getPrompt }
}