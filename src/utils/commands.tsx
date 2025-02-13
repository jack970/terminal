'use client'
import { createText } from "@/utils/figlet";
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
        help: () => {
            var c = '';
            const sortedCommands = Object.keys(commands).sort();
            for (let i = 1; i <= Object.keys(commands).sort().length; i++) {
                c += sortedCommands[i - 1] + (i % 7 === 0 ? '\n' : ' ');
            }
            return `Available commands: \n\n${c}\n\n[ctrl+l]/clear: clear terminal.`
        },
        hostname: () => hostname,
        host: () => host,
        whoami: () => 'jack970',
        date: () => new Date().toLocaleDateString(),
        echo: (args: string[]) => args.join(' '),
        clear: () => '',
        figlet: (args: string[]) => createText(args.join(' ')),
        banner: () => `         ___   ____
       /' --;^/ ,-_\\     \\ | /      
      / / --o\\ o-\\ \\\\   --(_)--  
     /-/-/|o|-|\\-\\\\|\\\\   / | \\   _____   ________ ______  _________ 
      ''  ' |-|   '' '          / /   | / ____/ //_/ __ \\/__  / __ \\
            |-|            __  / / /| |/ /   / ,< / /_/ /  / / / / /
            |-|O          / /_/ / ___ / /___/ /| |\\__, /  / / /_/ / 
            |-(\\,__       \\____/_/  |_\\____/_/ |_/____/  /_/\\____/  
         ...|-|\\--,\\_....                                  © ${new Date().getFullYear()}
      ,;;;;;;;;;;;;;;;;;;;;;;;;,.  
~~,;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
`,
        repo: () => {
            if (typeof window !== 'undefined') { window.open(`https://github.com/jack970/terminal`) }
            return ''
        }
    }

    return { commands }
}