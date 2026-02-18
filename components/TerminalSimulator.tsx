import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface TerminalLine {
    type: 'input' | 'output';
    content: string;
    path?: string;
}

interface TerminalProps {
    lang: Language;
}

export const TerminalSimulator: React.FC<TerminalProps> = ({ lang }) => {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'output', content: 'CyberGuard Linux Kernel v4.2.0-generic' },
        { type: 'output', content: 'Initializing secure connection... OK' },
        { type: 'output', content: lang === 'he' ? 'הקלד "help" לרשימת פקודות.' : 'Type "help" for available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [path, setPath] = useState('~');
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();
        let output = '';

        switch (command) {
            case 'help':
                output = lang === 'he' 
                    ? 'פקודות זמינות: help, ls, pwd, whoami, clear, echo, cat, date, ip'
                    : 'Available commands: help, ls, pwd, whoami, clear, echo, cat, date, ip';
                break;
            case 'ls':
                output = 'Documents  Downloads  secrets.txt  config.conf  malware_analysis.log';
                break;
            case 'pwd':
                output = `/home/user${path === '~' ? '' : path.replace('~', '')}`;
                break;
            case 'whoami':
                output = 'root';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'echo':
                output = args.slice(1).join(' ');
                break;
            case 'cat':
                if (args[1] === 'secrets.txt') output = 'FLAG{L1NUX_M4ST3R_2024}';
                else if (args[1]) output = `cat: ${args[1]}: Permission denied`;
                else output = 'usage: cat [file]';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'ip':
                if (args[1] === 'addr') output = 'eth0: 192.168.1.42/24';
                else output = 'Usage: ip addr';
                break;
            case '':
                break;
            default:
                output = lang === 'he' ? `פקודה לא נמצאה: ${command}` : `command not found: ${command}`;
        }

        setHistory(prev => [
            ...prev, 
            { type: 'input', content: cmd, path },
            ...(output ? [{ type: 'output', content: output }] : []) as TerminalLine[]
        ]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div 
            className="flex flex-col h-full bg-black border border-cyber-border rounded-lg overflow-hidden font-mono text-sm shadow-2xl relative crt-effect"
            dir="ltr" // Terminal always LTR
        >
            {/* Terminal Header */}
            <div className="bg-cyber-card px-4 py-2 border-b border-cyber-border flex items-center justify-between z-20 relative">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                </div>
                <div className="text-gray-400 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    root@kali:~
                </div>
                <div className="w-4"></div>
            </div>

            {/* Terminal Content */}
            <div 
                className="flex-1 p-4 overflow-y-auto cursor-text z-10 relative bg-opacity-90 bg-black"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((line, i) => (
                    <div key={i} className="mb-1 break-words font-medium">
                        {line.type === 'input' ? (
                            <div className="flex text-green-400 text-shadow-sm">
                                <span className="mr-2">root@kali:{line.path}#</span>
                                <span className="text-white">{line.content}</span>
                            </div>
                        ) : (
                            <div className="text-gray-300 whitespace-pre-wrap">{line.content}</div>
                        )}
                    </div>
                ))}
                
                <div className="flex items-center text-green-400">
                    <span className="mr-2 font-bold">root@kali:{path}#</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 caret-green-500"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};