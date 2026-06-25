import React, { useEffect, useMemo } from 'react'
import { words } from '../constants/index.js'

const Hero = () => {
  console.log('[Hero] render')

  const particlesConfig = useMemo(() => ({
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 900
        }
      },
      color: {
        value: ['#d4c4a8', '#c8b489', '#f0e7ce']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.35,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 4,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 120,
        color: '#c8b489',
        opacity: 0.15,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.2
          }
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 0.4
        },
        repulse: {
          distance: 120,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }), [])

  useEffect(() => {
    let scriptEl = null
    let isMounted = true

    const destroyParticles = () => {
      try {
        if (window.pJSDom && window.pJSDom.length) {
          window.pJSDom.forEach((p) => {
            if (p && p.pJS && p.pJS.fn && p.pJS.fn.vendors && p.pJS.fn.vendors.destroypJS) {
              p.pJS.fn.vendors.destroypJS()
              console.log('[Hero] destroyed pJS instance')
            }
          })
        }
      } catch (e) {
        console.error('[Hero] cleanup error', e)
      }

      try {
        if (scriptEl && scriptEl.parentNode) {
          scriptEl.parentNode.removeChild(scriptEl)
        }
      } catch (e) {
        console.error('[Hero] removing script failed', e)
      }
    }

    const loadParticles = () => {
      console.log('[Hero] loadParticles start')

      destroyParticles()

      if (typeof window !== 'undefined' && window.particlesJS) {
        console.log('[Hero] particlesJS already available')
        try {
          window.particlesJS('particles-js', particlesConfig)
          console.log('[Hero] particlesJS initialized from existing')
        } catch (e) {
          console.error('[Hero] particlesJS init failed', e)
        }
        return
      }

      scriptEl = document.createElement('script')
      scriptEl.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
      scriptEl.async = true
      scriptEl.onload = () => {
        if (!isMounted) return

        console.log('[Hero] particles.js script loaded')
        try {
          if (window.particlesJS) {
            window.particlesJS('particles-js', particlesConfig)
            console.log('[Hero] particlesJS initialized after load')
          } else {
            console.warn('[Hero] particlesJS not available after script load')
          }
        } catch (e) {
          console.error('[Hero] particlesJS init error', e)
        }
      }
      scriptEl.onerror = (e) => {
        console.error('[Hero] particles.js failed to load', e)
      }
      console.log('[Hero] appending particles script', scriptEl.src)
      document.body.appendChild(scriptEl)
    }

    loadParticles()

    return () => {
      console.log('[Hero] cleanup particles')
      isMounted = false
      destroyParticles()
    }
  }, [particlesConfig])

  return (
    <section
      id='hero'
      className='relative overflow-hidden z-20'
      style={{
        minHeight: '80vh',
        backgroundImage: "url('/img/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div id='particles-js' className='absolute inset-0 pointer-events-auto' style={{ zIndex: 25 }} />

      <div className='hero-layout'>
        {/* Hero content removed - particle background only */}
      </div>
    </section>
  )
}

export default Hero