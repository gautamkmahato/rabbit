'use client'

import { createContext, useContext, useState } from "react"

const PrContext = createContext()

export function GitPr({children}) {
  const [prData, setPrData] = useState([])

  return (
    <PrContext.Provider value={{ prData, setPrData }}>
      {children}
    </PrContext.Provider>
  )
}

export default PrContext;