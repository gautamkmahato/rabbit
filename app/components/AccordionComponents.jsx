'use client'


import { useContext } from "react"
import AccordionContext from "./Accordion"
import { ChevronDown } from "lucide-react"



export function AccordionItem({ value, children, className }) {
  const { openItems } = useContext(AccordionContext)
  const isOpen = openItems.includes(value)

  return (
    <div data-state={isOpen ? "open" : "closed"} className={className}>
      {children}
    </div>
  )
}


export function AccordionTrigger({ children, className }) {
  const { toggleItem, openItems } = useContext(AccordionContext)
  const itemValue = children.props?.value || children.key
  const isOpen = openItems.includes(itemValue)

  const handleClick = () => {
    const value = children.props.value || children.key
    toggleItem(value)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex justify-between items-center ${className}`}
    >
      {children}
      <ChevronDown
        className={`ml-2 h-4 w-4 transition-transform ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  )
}

export function AccordionContent({ children, className }) {
  const { openItems } = useContext(AccordionContext)
  const itemValue = children?.props?.value || children?.key
  const isOpen = openItems.includes(itemValue)

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      } ${className}`}
    >
      {isOpen && children}
    </div>
  )
}
