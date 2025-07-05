import Slidebar from "./Slidebar"
import Navbar from "./Navbar"

const Layout = ({children,showSlidebar=false}) => {
  return (
    <div className='min-h-screen '>
        <div className='flex'>
           {showSlidebar && <Slidebar/>}
           <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
           </div>
        </div>
    </div>
  )
}

export default Layout