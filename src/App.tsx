import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Menu, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react'
import type { Group, Mesh, MeshBasicMaterial } from 'three'
import './styles.css'

const ASSETS = {
  sf26Studio: 'https://media.formula1.com/image/upload/c_fit,w_3200,h_1800/q_auto/v1740000001/fom-website/2026/Ferrari/F678_still_f03_16_9_v10.webp',
  sf26Track: 'https://media.formula1.com/image/upload/t_16by9South/c_fit,w_3200,h_1800/q_auto/v1740000001/fom-website/2026/Ferrari/GettyImages-2257747181.webp',
  sf26Alt: 'https://media.formula1.com/image/upload/c_fit,w_2400,h_1350/q_auto/v1740000001/fom-website/2026/Ferrari/F678_still_f01_16_9_v10.webp',
  sf26Detail: 'https://media.formula1.com/image/upload/c_fit,w_1800,h_1200/q_auto/v1740000001/fom-website/2026/Ferrari/F678_still_f04_16_9_v10.webp',
  ferrariWordmark: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari%20wordmark.svg',
  tifosi: 'https://media.formula1.com/image/upload/ar_16:9,c_fill/c_fit,w_3200,h_1800/q_auto/v1740000001/trackside-images/2025/F1_Grand_Prix_of_Italy/2234148740.webp',
  enduranceVideo: 'https://www.youtube.com/watch?v=e087nzfYJpc',
}
const officialVideo = 'muAlUVvOqwE'
const chapters = [
  { year:'1950', title:'A name enters the world championship', sub:'The first start', copy:'At Monaco, Scuderia Ferrari began its Formula One World Championship story. The beginning was not a finished legend; it was a commitment to keep competing.', tag:'THE BEGINNING', image:ASSETS.sf26Alt, accent:'#d7b56d' },
  { year:'1961', title:'A season that changed the team', sub:'Speed and sacrifice', copy:'The 1961 campaign brought a constructors’ title and a drivers’ championship, while the season also carried profound loss. Ferrari history has never been only about the trophies.', tag:'A DEFINING YEAR', image:ASSETS.sf26Studio, accent:'#e8d5ac' },
  { year:'1975', title:'Lauda brings Ferrari back to the summit', sub:'Discipline under pressure', copy:'Niki Lauda’s 1975 drivers’ title ended a long wait. Technical rigour and relentless preparation became inseparable from the team’s identity.', tag:'THE RETURN', image:ASSETS.sf26Track, accent:'#e10600' },
  { year:'2000', title:'Twenty-one years, finally over', sub:'A new era begins', copy:'Michael Schumacher’s first Ferrari drivers’ championship in 2000 ended a 21-year gap and opened a period that would define an era of Formula One.', tag:'THE RELEASE', image:ASSETS.sf26Alt, accent:'#e10600' },
  { year:'2007', title:'One point. One final round.', sub:'Kimi Räikkönen', copy:'A season of shifting momentum ended with Räikkönen taking the drivers’ crown by a single point. The margin was tiny; the memory was not.', tag:'THE LAST DRIVERS’ TITLE', image:ASSETS.sf26Detail, accent:'#c9ad7b' },
]
const aeroModes = [
  { id:'pressure', title:'Pressure field', number:'01', label:'SURFACE LOAD', value:'BALANCE', copy:'Air accelerates around bodywork and wings; pressure differences create aerodynamic forces. The visual field is conceptual, not Ferrari telemetry.' },
  { id:'vortices', title:'Vortex trails', number:'02', label:'FLOW STRUCTURE', value:'VORTICITY', copy:'Vortices can energise boundary layers and shape the wake. Their position and strength are highly sensitive to geometry and operating conditions.' },
  { id:'drs', title:'Active aero', number:'03', label:'DRAG CONTROL', value:'LOW-DRAG MODE', copy:'Modern regulations use active aerodynamic modes. This switch illustrates the concept only; it does not represent the SF-26 mechanism or exact geometry.' },
]
function Streamlines({ active }: { active: string }) {
  const refs = useRef<Group>(null)
  const particles = useMemo(() => Array.from({length:54},(_,i)=>({x:-3.5+(i%9)*.16,y:-.02+Math.floor(i/9)*.15,z:-2.5+(i%7)*.72,speed:.65+(i%5)*.17,phase:(i%13)/13})),[])
  useFrame(({clock}) => {
    if (!refs.current) return
    refs.current.children.forEach((child,i) => {
      const p = particles[i]
      const t = (clock.elapsedTime*p.speed+p.phase*8)%7
      child.position.x = -3.6+t
      child.position.y = p.y + Math.sin(t*1.6+p.z)*.08 + (active==='vortices' ? Math.sin(t*3+p.phase*9)*.13 : 0)
      child.position.z = p.z + (active==='drs' ? Math.sin(t*1.1)*.18 : 0)
      const m = child as Mesh
      const mat = m.material as MeshBasicMaterial
      mat.opacity = .22 + .7*Math.sin((t/7)*Math.PI)
    })
  })
  return <group ref={refs}>{particles.map((p,i)=><mesh key={i} position={[p.x,p.y,p.z]}><sphereGeometry args={[active==='vortices'?.035:.022,8,8]}/><meshBasicMaterial color={active==='drs'?'#e9c78a':i%3===0?'#ff4b3e':'#f4eee4'} transparent opacity={.7}/></mesh>)}</group>
}
function AeroCar({ active }: { active: string }) {
  const car = useRef<THREE.Group>(null)
  useFrame(({clock}) => { if(car.current) { car.current.rotation.y = Math.sin(clock.elapsedTime*.22)*.12; car.current.position.y = Math.sin(clock.elapsedTime*.8)*.025 } })
  const red = '#c8102e'
  return <group ref={car} rotation={[0,.1,0]} scale={.88}>
    <mesh position={[0,.08,0]} castShadow><capsuleGeometry args={[.23,.95,6,14]}/><meshStandardMaterial color={red} metalness={.72} roughness={.24}/></mesh>
    <mesh position={[0,.12,-.24]} scale={[1.55,.6,1.4]} castShadow><sphereGeometry args={[.35,24,16]}/><meshStandardMaterial color={red} metalness={.7} roughness={.25}/></mesh>
    <mesh position={[0,.34,-.14]} scale={[.8,.52,.65]} castShadow><sphereGeometry args={[.28,20,14]}/><meshStandardMaterial color="#151718" metalness={.8} roughness={.18}/></mesh>
    <mesh position={[0,.03,.9]}><boxGeometry args={[1.55,.065,.25]}/><meshStandardMaterial color="#151515" metalness={.4} roughness={.3}/></mesh>
    <mesh position={[0,.25,.9]}><boxGeometry args={[1.25,.06,.09]}/><meshStandardMaterial color={red} metalness={.6} roughness={.25}/></mesh>
    <mesh position={[0,.28,-.86]}><boxGeometry args={[1.22,.055,.12]}/><meshStandardMaterial color="#171717" metalness={.55}/></mesh>
    <mesh position={[0,.48,-.88]}><boxGeometry args={[.95,.05,.08]}/><meshStandardMaterial color={red} metalness={.7}/></mesh>
    {[-1,1].map(side=><group key={side}>{[-.68,.72].map(z=><group key={z} position={[side*.54,.02,z]}><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.26,.26,.2,32]}/><meshStandardMaterial color="#080808" roughness={.9}/></mesh><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.14,.14,.205,24]}/><meshStandardMaterial color="#777" metalness={.8}/></mesh></group>)}<mesh position={[side*.42,.1,-.2]}><boxGeometry args={[.07,.06,.78]}/><meshStandardMaterial color="#222"/></mesh></group>)}
    <mesh position={[0,-.05,0]}><boxGeometry args={[.8,.04,1.6]}/><meshStandardMaterial color="#050505"/></mesh>
  </group>
}
function WindTunnel({ active }: { active:string }) {
  return <Canvas camera={{position:[3.5,2.6,4.2],fov:39}} dpr={[1,1.5]} gl={{antialias:true,alpha:true}}>
    <ambientLight intensity={.75}/><spotLight position={[3,6,3]} intensity={75} angle={.45} penumbra={.8} castShadow/><pointLight position={[-4,1,-2]} color="#e10600" intensity={12}/><pointLight position={[0,2,4]} color="#d5b77b" intensity={4}/>
    <Float speed={.7} rotationIntensity={.04} floatIntensity={.08}><AeroCar active={active}/></Float><Streamlines active={active}/>
    <ContactShadows position={[0,-.36,0]} opacity={.48} scale={6} blur={2.4} far={2}/><Environment preset="city"/><OrbitControls enablePan={false} minDistance={3.2} maxDistance={7} minPolarAngle={.65} maxPolarAngle={1.5} autoRotate autoRotateSpeed={.25}/>
  </Canvas>
}
function App() {
  const [menuOpen,setMenuOpen]=useState(false)
  const [sound,setSound]=useState(false)
  const [videoPaused,setVideoPaused]=useState(false)
  const [activeChapter,setActiveChapter]=useState(3)
  const [activeAero,setActiveAero]=useState('pressure')
  const [saved,setSaved]=useState<string[]>([])
  const [galleryOpen,setGalleryOpen]=useState<number|null>(null)
  const [activeDiscipline,setActiveDiscipline]=useState('f1')
  const [scrolled,setScrolled]=useState(false)
  const heroRef=useRef<HTMLElement>(null)
  const {scrollYProgress}=useScroll({target:heroRef,offset:['start start','end start']})
  const heroY=useTransform(scrollYProgress,[0,1],[0,180])
  const heroScale=useTransform(scrollYProgress,[0,1],[1,1.14])
  const selectedAero=aeroModes.find(a=>a.id===activeAero) ?? aeroModes[0]
  const toggleSaved=(id:string)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>30);window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[])
  const closeMenu=()=>setMenuOpen(false)
  const gallery=[
    {src:ASSETS.sf26Studio,title:'SF-26 / FORM STUDY',credit:'Formula 1 media gallery',ratio:'wide'},
    {src:ASSETS.sf26Track,title:'FIRST LAPS / FIORANO',credit:'Formula 1 media gallery',ratio:'tall'},
    {src:ASSETS.sf26Alt,title:'SCARLET / SURFACE',credit:'Formula 1 media gallery',ratio:'wide'},
    {src:ASSETS.sf26Detail,title:'DETAIL / PRECISION',credit:'Formula 1 media gallery',ratio:'tall'},
  ]
  const nav=[['01','THE WORLD','#home'],['02','FORMULA 1','#formula1'],['03','ENDURANCE','#endurance'],['04','AERODYNAMICS','#aero'],['05','THE ARCHIVE','#archive'],['06','THE TIFOSI','#tifosi'],['07','GALLERY','#gallery']]
  return <div className="site-shell">
    <div className="film-grain" aria-hidden="true"/>
    <header className={scrolled?'topbar topbar-scrolled':'topbar'}>
      <a className="brand" href="#home" onClick={closeMenu} aria-label="IL ROSSO home"><img src={ASSETS.ferrariWordmark} alt="Ferrari wordmark" className="ferrari-wordmark" /><span className="brand-divider"/><span className="brand-label">IL ROSSO<small>AN INDEPENDENT TRIBUTE</small></span></a>
      <nav className={menuOpen?'nav-links nav-open':'nav-links'} aria-label="Main navigation">{nav.map(([n,label,href])=><a key={n} href={href} onClick={closeMenu}><span>{n}</span>{label}</a>)}</nav>
      <div className="top-actions"><button className="sound-button" onClick={()=>setSound(!sound)} aria-label={sound?'Mute video':'Enable video sound'}>{sound?<Volume2 size={15}/>:<VolumeX size={15}/>}<span>{sound?'SOUND ON':'SOUND OFF'}</span></button><button className="menu-button" aria-label={menuOpen?'Close navigation':'Open navigation'} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></div>
    </header>
    <main>
      <section className="hero" id="home" ref={heroRef}>
        <motion.div className="hero-video-layer" style={{y:heroY,scale:heroScale}}>
          <iframe title="Scuderia Ferrari SF-26 — official Ferrari film" src={videoPaused ? 'about:blank' : 'https://www.youtube-nocookie.com/embed/'+officialVideo+'?autoplay=1&mute='+(sound?'0':'1')+'&controls=0&loop=1&playlist='+officialVideo+'&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3'} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />
        </motion.div>
        <div className="hero-shade"/><div className="hero-vignette"/>
        <div className="hero-topline"><span><i className="live-dot"/> SCUDERIA FERRARI / A LIVING RACING HISTORY</span><span>MARANELLO · ITALIA</span></div>
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.25}}>A TEAM. A PEOPLE. A WAY OF LIFE.</motion.p>
          <motion.h1 initial={{opacity:0,y:34}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.2,.7,.2,1]}}>SCUDERIA<br/><em>FERRARI.</em></motion.h1>
          <motion.div className="hero-baseline" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}><span className="red-rule"/><p>Beyond the finish line.<br/>Beyond the generations.</p></motion.div>
          <motion.a className="hero-cta" href="#manifesto" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1}}><span>ENTER THE STORY</span><ArrowDown size={16}/></motion.a>
        </div>
        <div className="hero-bottom"><span>F1 · WEC · CORSE CLIENTI</span><span>ONE NAME. MANY BATTLES.</span><button onClick={()=>setVideoPaused(!videoPaused)}>{videoPaused?<Play size={13}/>:<Pause size={13}/>} {videoPaused?'PLAY MOTION':'PAUSE MOTION'}</button></div>
        <div className="hero-index">IL ROSSO <span>—</span> 001</div>
        <div className="hero-side-note">UNA FEDE, UNA STORIA</div>
      </section>
      <section className="manifesto section-pad" id="manifesto">
        <div className="section-kicker"><span>00 — THE FEELING</span><span>UNA FEDE, UNA STORIA</span></div>
        <div className="manifesto-grid"><h2>Some teams<br/>race for <em>victory.</em><br/>Ferrari races<br/><span>through us.</span></h2><div className="manifesto-body"><p className="dropcap">A red car appears at the end of the pit lane. A grandstand rises before the engine note reaches it. Strangers hold their breath together. For a few seconds, a race becomes something shared.</p><p>Scuderia Ferrari is Formula One, endurance racing, engineering, memory and the Tifosi. This is an independent, cinematic exploration of the machines, the moments and the people who made the red cars mean more than lap time.</p><a className="text-link" href="#formula1">FOLLOW THE RED THREAD <ArrowRight size={15}/></a></div></div>
        <div className="manifesto-foot"><span>01 / THE MACHINE</span><span>02 / THE PEOPLE</span><span>03 / THE MEMORY</span></div>
      </section>
      <section className="discipline section-pad" id="formula1">
        <div className="section-kicker"><span>01 — FORMULA ONE</span><span>THE SCUDERIA / 1950—NOW</span></div>
        <div className="discipline-hero">
          <div className="discipline-image-wrap"><img src={ASSETS.sf26Track} alt="Scuderia Ferrari SF-26 on track at Fiorano, via Formula 1's media gallery" loading="lazy"/><div className="image-index">FIG. 01 / THE PRESENT</div><span className="image-cross">+</span></div>
          <div className="discipline-copy"><p className="eyebrow">THE ORIGINAL STAGE</p><h2>Every lap<br/>carries <em>history.</em></h2><p>From the first championship season to a new technical era, Formula One is the Scuderia’s most visible stage: a contest of speed, engineering, nerve and decisions made in seconds.</p><div className="discipline-facts"><div><strong>1950</strong><span>WORLD CHAMPIONSHIP DEBUT</span></div><div><strong>16</strong><span>CONSTRUCTORS’ TITLES</span></div></div><a className="text-link" href="https://www.formula1.com/en/teams/ferrari.html" target="_blank" rel="noreferrer">EXPLORE THE F1 TEAM <ExternalLink size={14}/></a></div>
        </div>
        <div className="photo-strip"><figure><img src={ASSETS.sf26Studio} alt="Ferrari SF-26 official launch gallery image" loading="lazy"/><figcaption><span>01 / THE FORM</span><span>SF-26</span></figcaption></figure><figure><img src={ASSETS.sf26Alt} alt="Ferrari SF-26 studio detail" loading="lazy"/><figcaption><span>02 / THE SURFACE</span><span>ENGINEERED SCARLET</span></figcaption></figure><figure><img src={ASSETS.sf26Detail} alt="Ferrari SF-26 bodywork detail" loading="lazy"/><figcaption><span>03 / THE DETAIL</span><span>EVERY MILLIMETRE</span></figcaption></figure></div>
      </section>
      <section className="endurance section-pad" id="endurance">
        <div className="section-kicker"><span>02 — ENDURANCE</span><span>24 HOURS / ONE PURPOSE</span></div>
        <div className="endurance-layout"><div className="endurance-copy"><p className="eyebrow">THE LONG DISTANCE</p><h2>Not one lap.<br/><em>All the hours.</em></h2><p>In endurance racing, speed has to survive the night. Drivers share the car. Mechanics repeat precise rituals. Strategy is measured in stints, reliability and the ability to keep pushing when the track empties and dawn returns.</p><p>Ferrari’s return to the top class at Le Mans with the 499P connected a new generation to one of the marque’s oldest racing ambitions.</p><a className="text-link" href="https://www.fiawec.com/" target="_blank" rel="noreferrer">ENTER THE WORLD ENDURANCE CHAMPIONSHIP <ExternalLink size={14}/></a></div><div className="endurance-film"><a className="film-thumb" href="https://www.youtube.com/watch?v=e087nzfYJpc" target="_blank" rel="noreferrer"><img src="https://img.youtube.com/vi/e087nzfYJpc/maxresdefault.jpg" alt="Ferrari 499P Hypercar — WEC Icons official video thumbnail" loading="lazy"/><span className="play-disc"><Play fill="currentColor" size={22}/></span><span className="film-duration">WEC ICONS / OFFICIAL FILM</span></a><div className="film-caption"><span>FERRARI 499P</span><span>LE MANS / HYPERCAR</span></div></div></div>
        <div className="endurance-bottom"><span>FORMULA ONE</span><span className="endurance-x">×</span><span>WORLD ENDURANCE CHAMPIONSHIP</span><span className="endurance-x">×</span><span>FERRARI COMPETIZIONI GT</span></div>
      </section>
      <section className="aero section-pad" id="aero">
        <div className="section-kicker"><span>03 — THE WIND TUNNEL</span><span>SEE THE INVISIBLE</span></div>
        <div className="section-heading"><div><p className="eyebrow">AERODYNAMICS / INTERACTIVE STUDY</p><h2>Air has no shape.<br/><em>Until speed gives it one.</em></h2></div><p className="section-intro">Explore the invisible forces around a race car. Switch the visualisation mode, orbit the model and watch flow particles move through a conceptual wind-tunnel scene.</p></div>
        <div className="windtunnel">
          <div className="wind-head"><span><i className="live-dot"/> VIRTUAL WIND TUNNEL</span><span>CONCEPTUAL VISUALISATION / NOT FERRARI TELEMETRY</span><span>3D / INTERACTIVE</span></div>
          <div className="wind-stage"><WindTunnel active={activeAero}/><div className="wind-axis">X / FLOW<br/>Y / WIDTH<br/>Z / HEIGHT</div><div className="wind-callout"><span>MODE / {selectedAero.number}</span><strong>{selectedAero.label}</strong><small>SIMULATION VISUAL</small></div><div className="wind-legend"><span><i className="legend-red"/> SURFACE FLOW</span><span><i className="legend-ivory"/> PARTICLE TRACE</span></div></div>
          <div className="wind-controls">{aeroModes.map(a=><button key={a.id} className={activeAero===a.id?'wind-tab active':'wind-tab'} onClick={()=>setActiveAero(a.id)}><span>{a.number}</span><b>{a.title}</b><ArrowRight size={15}/></button>)}</div>
          <div className="wind-readout"><div><span className="detail-code">LIVE EXPLANATION / {selectedAero.number}</span><h3>{selectedAero.title}</h3><p>{selectedAero.copy}</p></div><div className="wind-metric"><span>FOCUS</span><strong>{selectedAero.value}</strong><small>QUALITATIVE / NOT TO SCALE</small></div><button className="reset-button" onClick={()=>setActiveAero('pressure')}><RotateCcw size={14}/> RESET STUDY</button></div>
        </div>
        <div className="aero-principles"><article><span>01 / DOWNFORCE</span><h3>Make the air work.</h3><p>Wings and underbody flow generate load that can improve cornering grip, at the cost of drag and sensitivity.</p></article><article><span>02 / PLATFORM</span><h3>Keep the window.</h3><p>Ride height, pitch and yaw change how the aerodynamic package behaves. Mechanical setup and aero cannot be separated.</p></article><article><span>03 / TRADE-OFF</span><h3>Every gain costs.</h3><p>More downforce is not free. Engineers balance cornering, straight-line speed, stability and tyre behaviour for each circuit.</p></article></div>
      </section>
      <section className="archive section-pad" id="archive">
        <div className="section-kicker"><span>04 — THE ARCHIVE</span><span>MEMORY IS A FORM OF SPEED</span></div>
        <div className="section-heading"><div><p className="eyebrow">CHAPTERS IN RED</p><h2>History is not<br/><em>behind us.</em></h2></div><p className="section-intro">Choose a chapter. Each moment is a doorway into a different version of Ferrari: its first promise, its hard lessons, its impossible comebacks and its narrowest victories.</p></div>
        <div className="archive-layout"><div className="era-rail"><div className="era-rail-label">SELECT A CHAPTER <span>1950 — 2007</span></div>{chapters.map((c,i)=><button key={c.year} onClick={()=>setActiveChapter(i)} className={activeChapter===i?'era-tab active':'era-tab'}><span className="era-year">{c.year}</span><span className="era-tab-title">{c.tag}</span><span className="era-dot"/></button>}<p className="archive-note">FIVE MOMENTS<br/>ONE CONTINUOUS STORY</p></div><AnimatePresence mode="wait"><motion.article className="era-feature" key={chapters[activeChapter].year} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.3}}><div className="era-photo"><img src={chapters[activeChapter].image} alt={'Scuderia Ferrari visual for '+chapters[activeChapter].year} loading="lazy"/><div className="era-photo-shade"/><span className="era-year-large">{chapters[activeChapter].year}</span><span className="era-photo-caption">SCUDERIA FERRARI / ARCHIVE</span></div><div className="era-feature-copy"><span className="detail-code">CHAPTER {chapters[activeChapter].year} / {chapters[activeChapter].tag}</span><h3>{chapters[activeChapter].title}</h3><span className="era-driver">{chapters[activeChapter].sub}</span><p>{chapters[activeChapter].copy}</p><div className="era-bottom"><span>THE STORY CONTINUES</span><button onClick={()=>toggleSaved(chapters[activeChapter].year)} className={saved.includes(chapters[activeChapter].year)?'save-button saved':'save-button'}>{saved.includes(chapters[activeChapter].year)?'SAVED TO COLLECTION':'SAVE THIS MOMENT'} <span>{saved.includes(chapters[activeChapter].year)?'✓':'+'}</span></button></div><div className="era-controls"><button onClick={()=>setActiveChapter((activeChapter+chapters.length-1)%chapters.length)} aria-label="Previous chapter"><ChevronLeft size={17}/></button><span>0{activeChapter+1} <i>/</i> 0{chapters.length}</span><button onClick={()=>setActiveChapter((activeChapter+1)%chapters.length)} aria-label="Next chapter"><ChevronRight size={17}/></button></div></div></motion.article></AnimatePresence></div>
        <div className="history-link"><a href="https://www.formula1.com/en/video/the-origins-of-scuderia-ferrari.1687526777541341560" target="_blank" rel="noreferrer">WATCH / THE ORIGINS OF SCUDERIA FERRARI <ArrowRight size={15}/></a><span>HISTORICAL FILM / FORMULA 1</span></div>
      </section>
      <section className="tifosi section-pad" id="tifosi">
        <div className="section-kicker"><span>05 — I TIFOSI</span><span>THE PEOPLE ARE THE SOUND</span></div>
        <div className="tifosi-hero"><div className="tifosi-photo"><img src={ASSETS.tifosi} alt="Tifosi flood the Monza circuit beneath the podium after the 2025 Italian Grand Prix, via Formula 1 media gallery" loading="lazy"/><div className="tifosi-image-overlay"/></div><div className="tifosi-message"><p className="eyebrow">NOT A CROWD. A CHORUS.</p><h2>When the red<br/>appears, <em>we rise.</em></h2><p className="tifosi-italian">La passione non finisce mai.</p><span className="tifosi-translation">THE PASSION NEVER ENDS.</span></div><div className="tifosi-vertical">MONZA · MARANELLO · EVERYWHERE</div></div>
        <div className="tifosi-story"><div className="tifosi-story-intro"><span>06:00 / THE GATES OPEN</span><h3>They arrive before<br/>the engines do.</h3></div><div className="tifosi-story-copy"><p>Flags gathered in the dark. Names painted across faces. A sea of red moving in one direction. The Tifosi are not background scenery to Ferrari’s story; they are one of its main characters.</p><p>At Monza, the circuit becomes a ritual. In Maranello, the team’s home becomes a pilgrimage. Wherever the red car races, people bring their own history with it.</p><a className="text-link" href="https://www.ferrari.com/en-EN/formula1" target="_blank" rel="noreferrer">FOLLOW THE SCUDERIA <ExternalLink size={14}/></a></div></div>
        <div className="tifosi-quote"><span className="quote-mark">“</span><p>We do not simply watch the race.<br/><em>We carry it home.</em></p><span className="quote-end">IL ROSSO / THE TIFOSI</span></div>
      </section>
      <section className="gallery-section section-pad" id="gallery">
        <div className="section-kicker"><span>06 — THE GALLERY</span><span>DETAILS THAT STAY</span></div>
        <div className="section-heading"><div><p className="eyebrow">A STUDY IN SCARLET</p><h2>Look closer.<br/><em>Remember longer.</em></h2></div><p className="section-intro">A small, curated selection from the Formula 1 media gallery. Select an image to view it larger. For rights and source context, open the original gallery.</p></div>
        <div className="gallery-grid">{gallery.map((g,i)=><button className={'gallery-card gallery-'+g.ratio} key={g.title} onClick={()=>setGalleryOpen(i)}><img src={g.src} alt={g.title} loading="lazy"/><span className="gallery-index">0{i+1}</span><span className="gallery-caption"><b>{g.title}</b><small>{g.credit}</small></span><span className="gallery-open">↗</span></button>)}</div>
        <div className="gallery-footer"><span>IMAGERY VIA FORMULA 1 MEDIA GALLERY</span><a href="https://www.formula1.com/en/latest/article/gallery-check-out-every-angle-of-ferraris-2026-f1-car.7HdOPtJJwN5VHJ8XAWVtuS" target="_blank" rel="noreferrer">VIEW SOURCE GALLERY <ExternalLink size={13}/></a></div>
      </section>
      <section className="film-section section-pad">
        <div className="section-kicker"><span>07 — MOVING IMAGE</span><span>THE SOUND OF MARANELLO</span></div>
        <div className="film-feature"><div className="film-feature-copy"><p className="eyebrow">THE ENGINEER’S VIEW</p><h2>Built for a<br/><em>new era.</em></h2><p>Go inside Ferrari’s official SF-26 film to explore active aerodynamics, a new power unit and the design choices behind the 2026 regulation change.</p><a className="text-link" href="https://www.youtube.com/watch?v=75QkI0pGAx4" target="_blank" rel="noreferrer">WATCH THE OFFICIAL FERRARI FILM <ExternalLink size={14}/></a></div><a className="film-feature-image" href="https://www.youtube.com/watch?v=75QkI0pGAx4" target="_blank" rel="noreferrer"><img src="https://img.youtube.com/vi/75QkI0pGAx4/maxresdefault.jpg" alt="Ferrari official SF-26 engineering film thumbnail" loading="lazy"/><span className="play-disc"><Play fill="currentColor" size={22}/></span><span className="film-feature-tag">FERRARI / OFFICIAL VIDEO</span></a></div>
      </section>
      <section className="collection section-pad" id="collection">
        <div className="section-kicker"><span>08 — YOUR ARCHIVE</span><span>KEEP WHAT MOVES YOU</span></div>
        <div className="collection-layout"><div><p className="eyebrow">A PERSONAL COLLECTION</p><h2>Some moments<br/>stay <em>forever.</em></h2><p className="collection-desc">Save the chapters that mean something to you. Your collection stays in this browser session; no account or data upload is required.</p></div><div className="collection-panel"><div className="collection-head"><span>YOUR COLLECTION</span><span>{saved.length.toString().padStart(2,'0')} SAVED</span></div>{saved.length===0?<div className="empty-collection"><span>+</span><p>Your archive begins with a moment.</p><small>Save a chapter from the history section.</small></div>:saved.map(item=><div className="saved-item" key={item}><span>{item}</span><button onClick={()=>toggleSaved(item)} aria-label={'Remove '+item}>×</button></div>)}<button className="collection-clear" onClick={()=>setSaved([])} disabled={saved.length===0}>CLEAR COLLECTION</button></div></div>
      </section>
      <section className="closing"><img src={ASSETS.sf26Studio} alt="" loading="lazy"/><div className="closing-overlay"/><div className="closing-copy"><p className="eyebrow">THE STORY IS STILL BEING WRITTEN</p><h2>Always<br/><em>in motion.</em></h2><a href="#home" className="hero-cta"><span>RETURN TO THE BEGINNING</span><ArrowDown size={16}/></a></div><div className="closing-number">IL ROSSO / FINE</div></section>
    </main>
    <footer className="footer"><a className="footer-brand" href="#home"><img src={ASSETS.ferrariWordmark} alt="Ferrari wordmark" /><span>IL ROSSO<small>AN INDEPENDENT TRIBUTE</small></span></a><p>An independent fan-made tribute to Scuderia Ferrari.<br/>Ferrari and Scuderia Ferrari marks belong to their respective owners. Not affiliated with, endorsed by, or sponsored by Ferrari S.p.A., Formula 1 or FIA WEC.</p><div className="footer-right"><span>BUILT WITH RESPECT.</span><a href="https://www.ferrari.com/" target="_blank" rel="noreferrer">FERRARI OFFICIAL SITE ↗</a><span>© {new Date().getFullYear()} IL ROSSO</span></div></footer>
    {galleryOpen!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={()=>setGalleryOpen(null)}><button className="lightbox-close" aria-label="Close gallery" onClick={()=>setGalleryOpen(null)}><X size={22}/></button><button className="lightbox-prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();setGalleryOpen((galleryOpen+gallery.length-1)%gallery.length)}}><ChevronLeft size={24}/></button><img src={gallery[galleryOpen].src} alt={gallery[galleryOpen].title} onClick={e=>e.stopPropagation()}/><button className="lightbox-next" aria-label="Next image" onClick={e=>{e.stopPropagation();setGalleryOpen((galleryOpen+1)%gallery.length)}}><ChevronRight size={24}/></button><p>{gallery[galleryOpen].title} / {gallery[galleryOpen].credit}</p></div>}
  </div>
}
export default App
