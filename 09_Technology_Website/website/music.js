/* ============================================================
   Kogia Coffee — ambient music engine
   Goal: a warm "coffee + oud" Fairouz-style atmosphere — but
   100% copyright-safe and free, because it is SYNTHESIZED live
   in the browser (Web Audio API), not a recorded track.

   • If you license a real track, drop it at assets/audio/ambient.mp3
     and it will play that instead of the generated soundscape.
   • Browsers block autoplay, so playback starts on the first click
     of the floating player (bottom-left).
   ============================================================ */
(function(){
  let started=false, playing=false, ctx=null, master=null, fileEl=null, usingFile=false, timer=null;

  // Hijaz-flavoured scale (evokes Arabic/oud melodies), in Hz.
  const SCALE=[146.83,196.00,220.00, 293.66,311.13,369.99,392.00,440.00,466.16,587.33];
  const PLUCK=[293.66,311.13,369.99,392.00,440.00,587.33]; // melody pool

  function build(){
    const AC=window.AudioContext||window.webkitAudioContext;
    ctx=new AC();
    master=ctx.createGain(); master.gain.value=0.0; master.connect(ctx.destination);

    // gentle stereo feedback delay for "space"
    const delay=ctx.createDelay(); delay.delayTime.value=0.38;
    const fb=ctx.createGain(); fb.gain.value=0.34;
    const tone=ctx.createBiquadFilter(); tone.type='lowpass'; tone.frequency.value=1500;
    delay.connect(fb); fb.connect(delay); delay.connect(tone); tone.connect(master);
    build.delay=delay;

    // warm drone (two detuned low sines)
    [73.42,110.0].forEach((f,i)=>{
      const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=f;
      const g=ctx.createGain(); g.gain.value=i?0.018:0.026;
      const lfo=ctx.createOscillator(); lfo.frequency.value=0.05+i*0.03;
      const lg=ctx.createGain(); lg.gain.value=0.01;
      lfo.connect(lg); lg.connect(g.gain);
      o.connect(g); g.connect(master); o.start(); lfo.start();
    });
  }

  // one soft plucked note (triangle + quick exp decay) -> filter -> delay+master
  function pluck(freq,when,dur=2.6,vol=0.16){
    const o=ctx.createOscillator(); o.type='triangle'; o.frequency.value=freq;
    const o2=ctx.createOscillator(); o2.type='sine'; o2.frequency.value=freq*2; // soft harmonic
    const g=ctx.createGain();
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2200;
    g.gain.setValueAtTime(0,when);
    g.gain.linearRampToValueAtTime(vol,when+0.02);
    g.gain.exponentialRampToValueAtTime(0.0008,when+dur);
    const h=ctx.createGain(); h.gain.value=0.25; o2.connect(h); h.connect(g);
    o.connect(g); g.connect(lp); lp.connect(master); lp.connect(build.delay);
    o.start(when); o2.start(when); o.stop(when+dur+0.1); o2.stop(when+dur+0.1);
  }

  let step=0;
  function schedule(){
    if(!playing||usingFile) return;
    const t=ctx.currentTime+0.05;
    // melody note
    const f=PLUCK[(Math.floor(Math.sin(step*1.7)*3)+ (step%PLUCK.length)+PLUCK.length)%PLUCK.length];
    pluck(f,t);
    // occasional gentle octave shimmer
    if(step%4===2) pluck(f*2,t+0.22,2.0,0.07);
    step++;
    const gap=1700+ (step%3)*420 + ((step*53)%500); // 1.7–2.9s, deterministic-ish
    timer=setTimeout(schedule,gap);
  }

  function fadeMaster(to,sec){
    if(!master) return;
    const now=ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value,now);
    master.gain.linearRampToValueAtTime(to,now+sec);
  }

  function startGenerative(){
    if(!ctx) build();
    if(ctx.state==='suspended') ctx.resume();
    playing=true; fadeMaster(0.13,2.5); schedule();
  }

  function tryFileThenGenerative(){
    // attempt a licensed local track first; fall back to generative
    fileEl=new Audio('assets/audio/ambient.mp3');
    fileEl.loop=true; fileEl.volume=0;
    fileEl.addEventListener('canplaythrough',()=>{
      usingFile=true; playing=true;
      fileEl.play().then(()=>{ // fade in
        let v=0; const id=setInterval(()=>{v=Math.min(.5,v+.03);fileEl.volume=v;if(v>=.5)clearInterval(id);},90);
      }).catch(startGenerative);
    },{once:true});
    fileEl.addEventListener('error',startGenerative,{once:true});
    // if it stalls, fall back quickly
    setTimeout(()=>{ if(!usingFile && !playing) startGenerative(); },1200);
    fileEl.load();
  }

  function toggle(){
    const el=document.getElementById('player');
    if(!started){ started=true; el.classList.add('playing'); tryFileThenGenerative();
      document.querySelector('#player .ptxt b').textContent='Ambiance'; return; }
    if(playing){ // pause
      playing=false; el.classList.remove('playing');
      if(usingFile&&fileEl) fileEl.pause(); else { fadeMaster(0,0.6); clearTimeout(timer); }
    } else { // resume
      playing=true; el.classList.add('playing');
      if(usingFile&&fileEl) fileEl.play(); else { if(ctx&&ctx.state==='suspended')ctx.resume(); fadeMaster(0.13,1.5); schedule(); }
    }
  }

  window.addEventListener('DOMContentLoaded',()=>{
    const p=document.getElementById('player');
    if(p) p.addEventListener('click',toggle);
  });
})();
