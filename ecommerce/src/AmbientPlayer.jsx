import { useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'

// Ambiance sonore générée à la volée (Web Audio API) — aucune licence, aucun fichier.
// Pad chaud + notes de "boîte à musique" en gamme pentatonique (jamais dissonant), volume doux.
// Désactivée par défaut : le son ne démarre que sur un clic de l'utilisateur (politique navigateurs).
export default function AmbientPlayer() {
  const [on, setOn] = useState(false)
  const ref = useRef(null)

  const stop = () => {
    const r = ref.current
    if (!r) return
    clearInterval(r.iv)
    try { r.master.gain.linearRampToValueAtTime(0, r.ctx.currentTime + 0.5) } catch { /* noop */ }
    setTimeout(() => { try { r.ctx.close() } catch { /* noop */ } }, 700)
    ref.current = null
  }

  const start = () => {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2)

    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'; lp.frequency.value = 1300; lp.connect(master)

    // Écho/réverbération simple
    const delay = ctx.createDelay(); delay.delayTime.value = 0.38
    const fb = ctx.createGain(); fb.gain.value = 0.33
    delay.connect(fb); fb.connect(delay); delay.connect(lp)

    // Nappe grave (drone) racine + quinte
    const drone = [65.41, 98.0].map(f => {
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f
      const g = ctx.createGain(); g.gain.value = 0.07
      o.connect(g); g.connect(lp); o.start()
      return o
    })

    // LFO lent sur la fréquence du filtre → mouvement organique
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05
    const lfoG = ctx.createGain(); lfoG.gain.value = 480
    lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start()

    // Notes en Do majeur pentatonique
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99]
    const tick = () => {
      const f = scale[Math.floor(Math.random() * scale.length)]
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f
      const g = ctx.createGain(); g.gain.value = 0
      o.connect(g); g.connect(delay); g.connect(lp)
      const t = ctx.currentTime
      g.gain.linearRampToValueAtTime(0.2, t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.2)
      o.start(t); o.stop(t + 2.4)
    }
    tick()
    const iv = setInterval(tick, 1700)
    ref.current = { ctx, drone, lfo, iv, master }
  }

  const toggle = () => {
    if (on) { stop(); setOn(false) } else { start(); setOn(true) }
  }

  useEffect(() => () => stop(), [])

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      title={on ? 'Couper l’ambiance' : 'Ambiance sonore'}
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
