import React from "react"
import HomePage from "./page"
interface IHomePageLayout {}

const HomePageLayout: React.FC<IHomePageLayout> = () => {
  return (
    <main>
      <HomePage />
    </main>
  )
}

export default HomePageLayout
