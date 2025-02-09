import useCommands from "@/utils/commands"

export default function Prompt() {
    const { commands } = useCommands()
    return (
        <div>
            <span className="text-green-400 font-bold">{commands.whoami([''])}</span>
            <span className="text-white">@</span>
            <span className="text-blue-400 font-bold">{commands.hostname([''])}</span>
            <span className="text-yellow-400">:~$</span>
        </div>
    )
}