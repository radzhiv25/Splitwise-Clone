// import Image from 'next/image'
// import link from 'next/Link'
import {Navbar} from '../components/Navbar'
import { Hero } from '@/components/Hero'
// import { Footer } from '@/components/Footer'
// import {SignUp} from './components/SignUp'
// import {useState} from 'react'

export default function Home() {
  // const [darkMode, useDarkMode] = useState(false);
  return (
    <div className='bg-white md:h-screen xs:h-full text-black'>
      <Navbar className=""/>
      <Hero />
      {/* <Footer /> */}
    </div>
  )
}
