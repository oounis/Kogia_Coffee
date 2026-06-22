/* Generative oud / Hijaz café ambiance — synthesized live (Web Audio),
   so it is 100% free & copyright-safe. If you drop a licensed track at
   public/audio/ambient.mp3 it will play that instead. */
let ctx, master, delay, timer, started=false, playing=false, usingFile=false, fileEl, step=0;
const PLUCK=[293.66,311.13,369.99,392.00,440.00,587.33];

function build(){
  const AC=window.AudioContext||window.webkitAudioContext; ctx=new AC();
  master=ctx.createGain(); master.gain.value=0; master.connect(ctx.destination);
  delay=ctx.createDelay(); delay.delayTime.value=0.38;
  const fb=ctx.createGain(); fb.gain.value=0.33;
  const tone=ctx.createBiquadFilter(); tone.type='lowpass'; tone.frequency.value=1600;
  delay.connect(fb); fb.connect(delay); delay.connect(tone); tone.connect(master);
  [73.42,110].forEach((f,i)=>{ const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=f;
    const g=ctx.createGain(); g.gain.value=i?0.02:0.028; o.connect(g); g.connect(master); o.start(); });
}
function pluck(freq,when,dur=2.6,vol=0.2){
  const o=ctx.createOscillator(); o.type='triangle'; o.frequency.value=freq;
  const o2=ctx.createOscillator(); o2.type='sine'; o2.frequency.value=freq*2;
  const g=ctx.createGain(); const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2400;
  g.gain.setValueAtTime(0,when); g.gain.linearRampToValueAtTime(vol,when+0.02);
  g.gain.exponentialRampToValueAtTime(0.0008,when+dur);
  const h=ctx.createGain(); h.gain.value=0.25; o2.connect(h); h.connect(g);
  o.connect(g); g.connect(lp); lp.connect(master); lp.connect(delay);
  o.start(when); o2.start(when); o.stop(when+dur+0.1); o2.stop(when+dur+0.1);
}
function schedule(){
  if(!playing||usingFile) return;
  const t=ctx.currentTime+0.05;
  const f=PLUCK[(Math.floor(Math.abs(Math.sin(step*1.7))*PLUCK.length))%PLUCK.length];
  pluck(f,t); if(step%4===2) pluck(f*2,t+0.22,2,0.09); step++;
  timer=setTimeout(schedule, 1700+(step%3)*420+((step*53)%500));
}
function fade(to,sec){ const n=ctx.currentTime; master.gain.cancelScheduledValues(n);
  master.gain.setValueAtTime(master.gain.value,n); master.gain.linearRampToValueAtTime(to,n+sec); }
function startGen(){ if(!ctx) build(); if(ctx.state==='suspended') ctx.resume(); playing=true; fade(0.16,2); schedule(); }
function tryFile(){
  fileEl=new Audio(import.meta.env.BASE_URL+'audio/ambient.mp3'); fileEl.loop=true; fileEl.volume=0;
  fileEl.addEventListener('canplaythrough',()=>{ usingFile=true; playing=true;
    fileEl.play().then(()=>{ let v=0; const id=setInterval(()=>{v=Math.min(.55,v+.03);fileEl.volume=v;if(v>=.55)clearInterval(id);},90); }).catch(startGen);
  },{once:true});
  fileEl.addEventListener('error',startGen,{once:true});
  setTimeout(()=>{ if(!usingFile&&!playing) startGen(); },1000); fileEl.load();
}
export function isPlaying(){ return playing; }
export function toggleAudio(){
  if(!started){ started=true; tryFile(); return true; }
  if(playing){ playing=false; if(usingFile&&fileEl) fileEl.pause(); else { fade(0,0.6); clearTimeout(timer); } return false; }
  playing=true; if(usingFile&&fileEl) fileEl.play(); else { if(ctx&&ctx.state==='suspended') ctx.resume(); fade(0.16,1.2); schedule(); } return true;
}
