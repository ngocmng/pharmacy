import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  components: {
    
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>*/}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)

