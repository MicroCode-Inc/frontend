import '../styles/custom-bootstrap.scss'
import '../styles/animations.css'
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import Navbar from './Navbar'
import PixelBlast from './PixelBlast'

export default function HtmlShell({
  children,
  title = 'MicroCode Inc - Cursos Para Todos'
}) {
  const { theme } = useTheme()

  return (
    <html
      lang='en'
      data-bs-theme={theme}
    >
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body className='d-flex flex-column min-vh-100'>
        <PixelBlast
          variant='square'
          pixelSize={6}
          color='#0E6575'
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'auto'
          }}
        />
        <Navbar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
