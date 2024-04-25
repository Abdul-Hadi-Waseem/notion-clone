"use client"
import React from "react"
import HomePage from "./page"
import Header from "@/components/landing-page/Header"
interface IHomePageLayout {
  children: React.ReactNode
}

const HomePageLayout: React.FC<IHomePageLayout> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default HomePageLayout
