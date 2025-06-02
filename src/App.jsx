import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewPaste from './components/ViewPaste'
import Paste from './components/Paste';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Navbar />
          <Home/>
        </div>
      </div>
    )
  },
  {
    path: "/pastes",
    element: (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Navbar/>
          <Paste/>
        </div>
      </div>
    )
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Navbar />
          <ViewPaste/>
        </div>
      </div>
    )
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App