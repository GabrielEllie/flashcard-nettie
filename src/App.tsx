import { useState } from 'react';
import './App.css';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SelectedCards from './pages/SelectedCards';

function App() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);
  
  return (
    <HashRouter>
      <nav className='flex bg-amber-200 items-center'>
        {sidebar ? (
          <div className='flex w-full items-center justify-center'>
            <div className='flex w-full max-w-[150px] items-center justify-between'>
              <button className='w-fit border-2 border-transparent hover:border-purple-300' onClick={hideSidebar}>
                <Link to="/Home"><img className='w-10' src='/home.png'/></Link>
              </button>
              <button className='w-fit border-2 border-transparent hover:border-purple-300' onClick={hideSidebar}>
                <Link to="/SelectedCards"><img className='w-10' src='/edit.png'/></Link>
              </button>
            </div>
          </div>
          ) : (
          <div className='flex items-center justify-center'>
            <button className='w-fit border-2 border-transparent hover:border-purple-300' onClick={showSidebar}>
              <img className='w-10' src='/menu.png'/>
            </button>
          </div>)} 
        </nav>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/SelectedCards' element={<SelectedCards />} />
      </Routes>
    </HashRouter>
  )
}
export default App
