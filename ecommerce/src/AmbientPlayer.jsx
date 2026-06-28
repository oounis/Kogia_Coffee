import { useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'

// Lecteur d'ambiance : vraie piste lofi (CC0, public/music/ambient.mp3), en boucle, volume doux.
// Désactivé par défaut (politique d'autoplay des navigateurs) ; démarre au clic, avec fondu.
const SRC = import.meta.env.BASE_URL + 'music/ambient.mp3'
const VOL = 0.35

export default function AmbientPlayer() {
  const [on, setOn] = useState(false)
  const audioRef = useRef(null)
  const fadeRef = useRef(null)

  useEffect(() => {
    const a = new Audio(SRC)
    a.loop = true
    a.preload = 'none'
    a.volume = 0
    audioRef.current = a
    return () => { clearInterval(fadeRef.current); a.pause(); audioRef.current = null }
  }, [])

  const fadeTo = (target, done) => {
    clearInterval(fadeRef.current)
    const a = audioRef.current
    fadeRef.current = setInterval(() => {
      if (!a) return clearInterval(fadeRef.current)
      const step = target > a.volume ? 0.04 : -0.06
      let v = a.volume + step
      if ((step > 0 && v >= target) || (step < 0 && v <= target)) { v = target; clearInterval(fadeRef.current); if (done) done() }
      a.volume = Math.max(0, Math.min(1, v))
    }, 60)
  }

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (on) {
      fadeTo(0, () => a.pause())
      setOn(false)
    } else {
      try {
        a.volume = 0
        await a.play()
        fadeTo(VOL)
        setOn(true)
      } catch { /* lecture bloquée — ignorer */ }
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      title={on ? 'Couper l’ambiance' : 'Ambiance lofi'}
      className="fixed bottom-4 left-4 z-[60] w-12 h-12 rounded-full grid place-items-center text-white shadow-lg transition hover:scale-105"
      style={{ background: on ? '#2A211B' : '#B5673A' }}
    >
      {on
        ? <span className="relative grid place-items-center"><Pause size={18} />
            <span className="absolute -inset-2 rounded-full border-2 border-white/40 animate-ping" /></span>
        : <Music size={18} />}
    </button>
  )
}
