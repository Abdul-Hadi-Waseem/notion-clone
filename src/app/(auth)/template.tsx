import React from "react"
interface ITemplate {
  children: React.ReactNode
}

const Template: React.FC<ITemplate> = ({ children }) => {
  return <div className="h-screen p-6 flex justify-center">{children}</div>
}

export default Template
