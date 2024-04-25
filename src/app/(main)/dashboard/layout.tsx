import React from "react"
interface IDashboardLayout {
  children: React.ReactNode
  params: any
}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children, params }) => {
  return <div className="flex overflow-hidden h-screen">{children}</div>
}

export default DashboardLayout
