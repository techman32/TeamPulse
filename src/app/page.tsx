'use client'
import Particles, {initParticlesEngine} from '@tsparticles/react'
import {useEffect, useState} from 'react'
import {loadSlim} from '@tsparticles/slim'
import Welcome from '@/entities/welcome/ui'

export default function Home() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    <div className={'relative h-screen w-full flex justify-center items-center overflow-hidden'}>
      {init && <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: '#ffffff'
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              }
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: '#000000'
            },
            links: {
              color: '#000000',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: false,
              speed: 6,
              straight: false
            },
            number: {
              density: {
                enable: true
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: {min: 1, max: 5}
            }
          },
          detectRetina: true
        }}
      />}
      <Welcome/>
    </div>
  )
}