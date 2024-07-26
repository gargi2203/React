import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import home from './components/Home/home'
import Contact from './components/Contact/contact'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout
