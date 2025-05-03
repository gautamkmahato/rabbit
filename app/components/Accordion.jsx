'use client'

import { createContext, useContext, useState } from "react"

const AccordionContext = createContext()

export function Accordion({ type = "single", children, className }) {
  const [openItems, setOpenItems] = useState([])

  const toggleItem = (value) => {
    setOpenItems((prev) =>
      type === "single"
        ? prev.includes(value) ? [] : [value]
        : prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

export default AccordionContext