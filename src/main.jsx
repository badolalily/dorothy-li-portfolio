import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import {loadContent} from './data/content'
const root=createRoot(document.getElementById('root'))
root.render(<App />)
loadContent().finally(()=>root.render(<App />))
