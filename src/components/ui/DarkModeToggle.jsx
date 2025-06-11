'use client';
import { useState, useEffect } from 'react';
// import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

const THEME_KEY = 'theme';
const DARK_CLASS = 'dark';

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
        document.documentElement.classList.toggle(DARK_CLASS, newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add(DARK_CLASS);
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    return (
        <div onClick={toggleDarkMode} className="p-2">
            <div className='sr-only'>darkmode</div>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </div>
    );
}
