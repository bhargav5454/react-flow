import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@xyflow/react/dist/style.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
)
