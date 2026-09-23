"use client"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
export function ThemeToggle() {
 const [dark,setDark]=useState(false)
 useEffect(()=>{setDark(document.documentElement.classList.contains("dark"))},[])
 function toggle(){const next=!document.documentElement.classList.contains("dark");document.documentElement.classList.toggle("dark",next);setDark(next);try{localStorage.setItem("dizi-theme",next?"dark":"light")}catch{}}
 return <button type="button" className="header-icon theme-toggle" onClick={toggle} aria-label={dark?"切換至淺色閱讀":"切換至深色閱讀"} title={dark?"切換至淺色閱讀":"切換至深色閱讀"}><Sun className="theme-sun" size={19} strokeWidth={1.5} aria-hidden="true"/><Moon className="theme-moon" size={19} strokeWidth={1.5} aria-hidden="true"/></button>
}

