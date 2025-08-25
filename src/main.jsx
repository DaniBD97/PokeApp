import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PokemonProvider } from './context/PokemonProvider.jsx'
import { BrowserRouter } from "react-router";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PokemonProvider>
      <App />
      <ToastContainer progressClassName={'bg-[white]'} />
    </PokemonProvider>
  </BrowserRouter>


)
