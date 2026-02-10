import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import SelectedSet from './pages/SelectedSet';
import Dashboard from './pages/Dashboard';
import SetList from './pages/SetList';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/SetList' element={<SetList />} />
          <Route path='/SelectedSet/:id' element={<SelectedSet />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
export default App;