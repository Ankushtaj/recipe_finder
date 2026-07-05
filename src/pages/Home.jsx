import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Recipes from '../components/Recipes'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <Recipes/>
      <Footer/>
    </>
  )
}

export default Home
