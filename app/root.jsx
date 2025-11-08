import { Outlet } from 'react-router'
import HtmlShell from './components/HtmlShell.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HtmlShell>
          <main
            className='container-fluid d-flex flex-grow-1 pb-3'
            style={{
              background: 'transparent',
              overflowY: 'auto',
              height: 'calc(100vh - 100px)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0px, black 20px)',
              maskImage:
                'linear-gradient(to bottom, transparent 0px, black 20px)'
            }}
          >
            <Outlet />
          </main>
        </HtmlShell>
      </ThemeProvider>
    </AuthProvider>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HtmlShell>
          <div className='container'>
            <h2>Error!</h2>
            <h4>{error.message}</h4>
          </div>
        </HtmlShell>
      </ThemeProvider>
    </AuthProvider>
  )
}
