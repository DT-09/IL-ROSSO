import { useMemo, useState, type CSSProperties } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Gauge, Menu, RotateCcw, Volume2, VolumeX, X } from 'lucide-react'
import './styles.css'

type Era = { year: string; title: string; driver: string; note: string; wins: string; number: string; color: string }
const eras: Era[] = [
  { year: '1950', title: 'The beginning', driver: 'The first chapter', note: 'Ferrari enters the inaugural Formula One World Championship. A new name begins writing itself into racing history.', wins: 'FOUNDING ERA', number: '01', color: '#b8a58a' },
  { year: '1961', title: 'A season of consequence', driver: 'The team that endured', note: 'A landmark championship season, remembered for both sporting achievement and profound loss.', wins: 'WORLD CHAMPIONS', number: '02', color: '#c7b9a2' },
  { year: '1975', title: 'The return to the summit', driver: 'Niki Lauda', note: 'Precision, discipline and a formidable technical partnership bring Ferrari back to the drivers’ championship.', wins: 'CHAMPIONSHIP', number: '03', color: '#e10600' },
  { year: '2000', title: 'A twenty-one-year wait ends', driver: 'Michael Schumacher', note: 'A defining season closes a long gap in the drivers’ title and opens a remarkable period of dominance.', wins: 'WORLD CHAMPIONS', number: '04', color: '#e10600' },
  { year: '2007', title: 'Decided at the final corner of possibility', driver: 'Kimi Räikkönen', note: 'A dramatic final round delivers Ferrari’s most recent drivers’ world championship to date.', wins: 'WORLD CHAMPIONS', number: '05', color: '#e10600' },
]
const components = [
  { id: 'aero', name: 'Aerodynamics', code: 'AERO / 01', detail: 'Front wing & airflow', copy: 'Wings and floor shape the air around the car. Their job is to create useful downforce while managing drag and turbulent wake.', metric: 'LOAD / BALANCE' },
  { id: 'chassis', name: 'Carbon-fibre monocoque', code: 'STRUCTURE / 02', detail: 'Survival cell', copy: 'A rigid carbon-composite survival cell protects the driver and forms the structural core around which the car is engineered.', metric: 'STIFFNESS / SAFETY' },
  { id: 'power', name: 'Hybrid power unit', code: 'ENERGY / 03', detail: 'Power & recovery', copy: 'Modern Formula One power units combine a turbocharged internal-combustion engine with electrical energy systems and strict energy limits.', metric: 'ENERGY / DEPLOYMENT' },
  { id: 'suspension', name: 'Suspension', code: 'DYNAMICS / 04', detail: 'Tyre contact', copy: 'Suspension geometry manages wheel motion, load transfer and tyre contact. Setup is a compromise between grip, stability and aerodynamic platform control.', metric: 'GRIP / CONTROL' },
]
function CarModel() {
  const red = '#d20b12', carbon = '#171717', dark = '#090909'
  return <group rotation={[0, -0.16, 0]} scale={1.05}>
    <mesh position={[0, .12, 0]} castShadow><boxGeometry args={[.76,.23,2.2]}/><meshStandardMaterial color={red} metalness={.72} roughness={.27}/></mesh>
    <mesh position={[0,.22,-.22]} castShadow><boxGeometry args={[.52,.24,.84]}/><meshStandardMaterial color={red} metalness={.65} roughness={.28}/></mesh>
    <mesh position={[0,.38,-.14]} rotation={[-.16,0,0]} castShadow><sphereGeometry args={[.29,24,16,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color={carbon} metalness={.8} roughness={.2}/></mesh>
    <mesh position={[0,.38,-.13]} rotation={[-.16,0,0]}><sphereGeometry args={[.24,24,16,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#111c22" metalness={.6} roughness={.12} transparent opacity={.8}/></mesh>
    <mesh position={[0,.02,1.03]} castShadow><boxGeometry args={[1.38,.055,.34]}/><meshStandardMaterial color={carbon} metalness={.7} roughness={.3}/></mesh>
    <mesh position={[0,.18,1.17]} castShadow><boxGeometry args={[1.24,.07,.09]}/><meshStandardMaterial color={red} metalness={.7} roughness={.25}/></mesh>
    <mesh position={[0,.28,-.95]} castShadow><boxGeometry args={[1.15,.07,.12]}/><meshStandardMaterial color={carbon} metalness={.65} roughness={.26}/></mesh>
    <mesh position={[0,.52,-.91]} castShadow><boxGeometry args={[.82,.055,.08]}/><meshStandardMaterial color={red} metalness={.7} roughness={.25}/></mesh>
    {[-1,1].map(side => <group key={side}>
      <mesh position={[side*.47,.02,-.65]} rotation={[0,0,side*.1]} castShadow><boxGeometry args={[.1,.09,.9]}/><meshStandardMaterial color={carbon}/></mesh>
      {[-.76,.77].map(z => <group key={z} position={[side*.48,.03,z]}>
        <mesh rotation={[0,0,Math.PI/2]} castShadow><cylinderGeometry args={[.28,.28,.2,32]}/><meshStandardMaterial color="#080808" roughness={.82}/></mesh>
        <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.16,.16,.205,24]}/><meshStandardMaterial color="#77746e" metalness={.85} roughness={.25}/></mesh>
        <mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.065,.065,.21,20]}/><meshStandardMaterial color="#222" metalness={.7}/></mesh>
      </group>)}
    </group>)}
    <mesh position={[0,-.07,0]}><boxGeometry args={[.82,.035,1.8]}/><meshStandardMaterial color={dark}/></mesh>
    <mesh position={[0,.1,-1.19]}><boxGeometry args={[.22,.18,.15]}/><meshStandardMaterial color="#f0b8a0" emissive="#8b130d" emissiveIntensity={1.5}/></mesh>
  </group>
}
function GarageScene() {
  return <Canvas camera={{ position:[3.7,2.5,4.3], fov:37 }} dpr={[1,1.7]} shadows gl={{ antialias:true, alpha:true }}>
    <ambientLight intensity={1.05}/><spotLight position={[3,6,3]} intensity={90} angle={.45} penumbra={.8} castShadow/><pointLight position={[-4,1,-2]} color="#e10600" intensity={18}/>
    <Float speed={1} rotationIntensity={.1} floatIntensity={.12}><CarModel/></Float>
    <ContactShadows position={[0,-.34,0]} opacity={.55} scale={5} blur={2.5} far={2}/><Environment preset="city"/>
    <OrbitControls enablePan={false} minDistance={3.4} maxDistance={7.5} minPolarAngle={.55} maxPolarAngle={1.65} autoRotate autoRotateSpeed={.45}/>
  </Canvas>
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sound, setSound] = useState(false)
  const [activeEra, setActiveEra] = useState(3)
  const [activeComponent, setActiveComponent] = useState('aero')
  const [tyre, setTyre] = useState('medium')
  const [lap, setLap] = useState(18)
  const [showBrief, setShowBrief] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const component = components.find(c => c.id === activeComponent) ?? components[0]
  const strategy = useMemo(() => {
    const life = tyre === 'soft' ? 13 : tyre === 'medium' ? 21 : 31
    const pace = tyre === 'soft' ? 'HIGH' : tyre === 'medium' ? 'BALANCED' : 'CONSERVATIVE'
    const window = Math.max(1, life - lap % life)
    return { life, pace, window, status: lap > life + 8 ? 'DEGRADED' : lap > life ? 'WATCH' : 'STABLE' }
  }, [tyre, lap])
  const toggleSaved = (item: string) => setSaved(s => s.includes(item) ? s.filter(x => x !== item) : [...s, item])
  const closeMenu = () => setMenuOpen(false)
  return <div className="site-shell">
    <div className="film-grain" aria-hidden="true"/>
    <header className="topbar">
      <a className="wordmark" href="#home" onClick={closeMenu} aria-label="IL ROSSO home"><span className="wordmark-mark">I<span>R</span></span><span className="wordmark-type">IL ROSSO<small>LA PASSIONE NON FINISCE MAI</small></span></a>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {[['01','THE WORLD','#home'],['02','THE MACHINE','#machine'],['03','THE ARCHIVE','#archive'],['04','THE PIT WALL','#pitwall'],['05','THE TIFOSI','#tifosi']].map(([n,label,href])=><a key={n} href={href} onClick={closeMenu}><span>{n}</span>{label}</a>)}
      </nav>
      <div className="top-actions"><button className="sound-button" onClick={() => setSound(!sound)} aria-label={sound ? 'Mute sound' : 'Enable sound'}>{sound ? <Volume2 size={15}/> : <VolumeX size={15}/>}<span>{sound ? 'SOUND ON' : 'SOUND OFF'}</span></button><button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-image" role="img" aria-label="A red Formula One racing car emerging from darkness"/>
        <div className="hero-shade"/>
        <div className="hero-topline"><span><i className="live-dot"/> AN INDEPENDENT TRIBUTE TO SCUDERIA FERRARI</span><span>EST. IN PASSION / 001</span></div>
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.2}}>A CENTURY OF PURSUIT. A LIFETIME OF BELIEF.</motion.p>
          <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.2,.7,.2,1]}}>IL <em>ROSSO</em></motion.h1>
          <motion.div className="hero-baseline" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}><span className="red-rule"/><p>Not merely a colour.<br/>A promise carried at speed.</p></motion.div>
          <motion.a className="discover-link" href="#machine" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}><span>ENTER THE WORLD</span><ArrowDown size={16}/></motion.a>
        </div>
        <div className="hero-bottom"><span>MARANELLO, ITALIA</span><span className="hero-coordinates">44°31′ N&nbsp;&nbsp; 10°52′ E</span><span>SCROLL TO DISCOVER <span className="scroll-line"/></span></div>
        <div className="hero-index">01 <span>/</span> 05</div>
      </section>
      <section className="manifesto section-pad">
        <div className="section-kicker"><span>01 — THE REASON</span><span>UNA FEDE, UNA STORIA</span></div>
        <div className="manifesto-grid"><h2>Some teams<br/>win races.<br/><em>Some become</em><br/><span>part of you.</span></h2><div className="manifesto-body"><p className="dropcap">There is a particular silence before the lights go out. A held breath across continents. Then the world turns red, and for a moment every detail matters.</p><p>IL ROSSO is an independent digital tribute to the machine, the minds behind it, the history that shaped it, and the people who never stopped believing. A place to look closer. To understand more. To remember why.</p><a className="text-link" href="#archive">FOLLOW THE THREAD <ArrowRight size={15}/></a></div></div>
        <div className="manifesto-stamp"><span>SCUDERIA</span><b>F</b><span>FERRARI</span></div>
      </section>
      <section className="machine section-pad" id="machine">
        <div className="section-kicker"><span>02 — THE MACHINE</span><span>FORM FOLLOWS FASTER</span></div>
        <div className="section-heading"><div><p className="eyebrow">ENGINEERED ON THE EDGE</p><h2>The art of<br/><em>going further.</em></h2></div><p className="section-intro">Every surface has a reason. Every millimetre is a decision. Enter the garage and examine the principles behind a modern Formula One car.</p></div>
        <div className="garage-frame">
          <div className="garage-top"><span><i className="live-dot"/> VIRTUAL GARAGE / CONCEPT MODEL</span><span>DRAG TO ORBIT · SCROLL TO ZOOM</span><span>MODEL 001 / F1-INSPIRED</span></div>
          <div className="garage-canvas"><GarageScene/><div className="canvas-crosshair">+</div><div className="model-label label-front">FRONT WING <span>01</span></div><div className="model-label label-rear">REAR AERO <span>02</span></div><div className="model-axis">X / LONGITUDINAL<br/>Y / LATERAL<br/>Z / VERTICAL</div></div>
          <div className="garage-footer"><span>INTERACTIVE 3D STUDY</span><span>ILLUSTRATIVE MODEL — NOT AN OFFICIAL FERRARI CAD MODEL</span><button onClick={() => window.location.hash = '#machine'} aria-label="Return to car model"><RotateCcw size={14}/> RESET VIEW BY RELOADING</button></div>
        </div>
        <div className="component-explorer"><div className="component-list"><p className="eyebrow">SELECT A SYSTEM</p>{components.map((c,i)=><button key={c.id} className={activeComponent===c.id?'component-tab active':'component-tab'} onClick={()=>setActiveComponent(c.id)}><span className="component-number">0{i+1}</span><span>{c.name}<small>{c.detail}</small></span><ArrowRight size={15}/></button>)}</div><AnimatePresence mode="wait"><motion.div key={component.id} className="component-detail" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:.22}}><span className="detail-code">{component.code}</span><h3>{component.name}</h3><p>{component.copy}</p><div className="detail-metric"><Gauge size={17}/><span>ENGINEERING PRINCIPLE</span><b>{component.metric}</b></div><div className="schematic"><div className="schematic-grid"/><svg viewBox="0 0 480 110" role="img" aria-label={component.name+' illustrative technical diagram'}><path d="M20 78 L78 78 L112 48 L182 48 L218 30 L315 30 L347 48 L420 48 L454 78" fill="none" stroke="#e10600" strokeWidth="1.5"/><path d="M20 89 L460 89 M50 66 L50 96 M110 36 L110 96 M220 18 L220 96 M350 36 L350 96 M430 66 L430 96" fill="none" stroke="#77716b" strokeWidth=".6" strokeDasharray="3 5"/><circle cx="220" cy="30" r="4" fill="#e10600"/><path d="M220 30 L250 8 L340 8" fill="none" stroke="#e10600" strokeWidth=".8"/><text x="345" y="12" fill="#c5bdb2" fontSize="8" letterSpacing="1.5">LOAD PATH / STUDY</text></svg><span>SCHEMATIC / NOT TO SCALE</span></div></motion.div></AnimatePresence></div>
      </section>
      <section className="archive section-pad" id="archive">
        <div className="section-kicker"><span>03 — THE ARCHIVE</span><span>MEMORY IS A FORM OF SPEED</span></div>
        <div className="section-heading"><div><p className="eyebrow">THE YEARS THAT MADE US</p><h2>History does not<br/><em>stand still.</em></h2></div><p className="section-intro">A living timeline of the people, machines and moments that shaped Ferrari's Formula One story. Select an era. Stay with it awhile.</p></div>
        <div className="archive-layout"><div className="era-rail"><div className="era-rail-label">CHOOSE AN ERA <span>1950 — NOW</span></div>{eras.map((e,i)=><button key={e.year} onClick={()=>setActiveEra(i)} className={activeEra===i?'era-tab active':'era-tab'}><span className="era-year">{e.year}</span><span className="era-tab-title">{e.title}</span><span className="era-dot"/></button>)}<p className="archive-note">A SELECTED HISTORY<br/>MORE RECORDS TO BE VERIFIED AND ADDED</p></div><AnimatePresence mode="wait"><motion.article className="era-feature" key={eras[activeEra].year} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.25}}><div className="era-art" style={{'--era-color':eras[activeEra].color} as CSSProperties}><div className="era-art-glow"/><div className="era-art-year">{eras[activeEra].year}</div><div className="era-art-number">{eras[activeEra].number}</div><div className="era-art-lines"/><div className="era-art-caption">SCUDERIA FERRARI<br/>FORMULA ONE / ARCHIVE</div></div><div className="era-feature-copy"><span className="detail-code">CHAPTER {eras[activeEra].number} / {eras[activeEra].year}</span><h3>{eras[activeEra].title}</h3><span className="era-driver">{eras[activeEra].driver}</span><p>{eras[activeEra].note}</p><div className="era-bottom"><span>{eras[activeEra].wins}</span><button onClick={()=>toggleSaved(eras[activeEra].year)} className={saved.includes(eras[activeEra].year)?'save-button saved':'save-button'}>{saved.includes(eras[activeEra].year)?'SAVED TO YOUR COLLECTION':'SAVE THIS MOMENT'} <span>{saved.includes(eras[activeEra].year)?'✓':'+'}</span></button></div><div className="era-controls"><button onClick={()=>setActiveEra((activeEra+eras.length-1)%eras.length)} aria-label="Previous era"><ChevronLeft size={17}/></button><span>0{activeEra+1} <i>/</i> 0{eras.length}</span><button onClick={()=>setActiveEra((activeEra+1)%eras.length)} aria-label="Next era"><ChevronRight size={17}/></button></div></div></motion.article></AnimatePresence></div>
        <p className="source-note">HISTORICAL SUMMARIES ARE EDITORIAL OVERVIEWS. CHAMPIONSHIP RECORDS AND DETAILED CLAIMS SHOULD BE VERIFIED AGAINST PRIMARY SOURCES BEFORE PUBLICATION.</p>
      </section>
      <section className="pitwall section-pad" id="pitwall">
        <div className="section-kicker"><span>04 — THE PIT WALL</span><span>THE RACE IS NEVER JUST THE LAP</span></div>
        <div className="section-heading"><div><p className="eyebrow">A STRATEGY LABORATORY</p><h2>Decisions made<br/><em>at 300 km/h.</em></h2></div><p className="section-intro">Race strategy is a negotiation with uncertainty. Explore a simplified tyre-life scenario and see how assumptions change the call.</p></div>
        <div className="strategy-console"><div className="console-head"><span><i className="live-dot"/> SIMULATION / SCENARIO 01</span><span>HYPOTHETICAL · NOT LIVE RACE DATA</span><span>TRACK CONDITIONS / DRY</span></div><div className="console-grid"><div className="console-controls"><label className="control-label">TYRE COMPOUND <span>SELECT ONE</span></label><div className="tyre-options">{[{id:'soft',name:'SOFT',color:'#e10600',desc:'Peak grip'},{id:'medium',name:'MEDIUM',color:'#e9c941',desc:'Balanced'},{id:'hard',name:'HARD',color:'#e9e6df',desc:'Long stint'}].map(t=><button key={t.id} onClick={()=>setTyre(t.id)} className={tyre===t.id?'tyre-option active':'tyre-option'}><span className="tyre-ring" style={{'--tyre-color':t.color} as CSSProperties}/><b>{t.name}</b><small>{t.desc}</small></button>)}</div><div className="lap-control"><label className="control-label" htmlFor="lap-range">CURRENT STINT LAP <strong>{lap.toString().padStart(2,'0')}</strong></label><input id="lap-range" type="range" min="1" max="40" value={lap} onChange={e=>setLap(Number(e.target.value))}/><div className="range-labels"><span>LAP 01</span><span>LAP 40</span></div></div><div className="assumption"><span>MODEL ASSUMPTION</span><p>Illustrative tyre-life bands only. Real degradation depends on compound specification, temperature, track surface, driving style, traffic and setup.</p></div></div><div className="console-readout"><div className="readout-top"><span>STINT ANALYSIS</span><span className={'status status-'+strategy.status.toLowerCase()}>{strategy.status}</span></div><div className="readout-stat"><span>INDICATIVE TYRE LIFE</span><b>{strategy.life}<small> LAPS</small></b></div><div className="readout-stat"><span>PACE CHARACTER</span><b className="pace-word">{strategy.pace}</b></div><div className="readout-stat"><span>EST. LAPS TO BAND LIMIT</span><b>{Math.max(0,strategy.life-lap)}<small> LAPS</small></b></div><div className="stint-visual"><div className="stint-track">{Array.from({length:20},(_,i)=><span key={i} className={i<Math.min(20,Math.round(lap/40*20))?'filled':''} style={{'--bar':tyre==='soft'?'#e10600':tyre==='medium'?'#e9c941':'#d5d0c6'} as CSSProperties}/>)}</div><div className="range-labels"><span>STINT START</span><span>LAP {lap}</span></div></div><button className="decision-button" onClick={()=>setShowBrief(!showBrief)}>{showBrief?'HIDE STRATEGY NOTE':'READ THE STRATEGY NOTE'} <ArrowRight size={15}/></button>{showBrief&&<div className="strategy-note"><b>THE TRADE-OFF</b><p>{tyre==='soft'?'Soft tyres may deliver stronger short-run pace, but the illustrative life band is shorter. An early stop can expose you to traffic or force a second stop.':tyre==='medium'?'Medium tyres represent a compromise in this simplified model. The right stop depends on the time lost in traffic, pit-lane cost and the remaining race distance.':'Hard tyres are assigned a longer illustrative life band, but durability alone does not make them fastest. Warm-up, grip and track evolution can change the balance.'}</p></div>}</div></div><div className="console-foot"><span>IL ROSSO / STRATEGY STUDY</span><span>NO TELEMETRY OR TEAM DATA USED</span><span>MODEL VERSION 0.1</span></div></div>
      </section>
      <section className="tifosi section-pad" id="tifosi">
        <div className="section-kicker"><span>05 — I TIFOSI</span><span>WE ARE PART OF THE STORY</span></div>
        <div className="tifosi-quote"><span className="quote-mark">“</span><h2>La passione<br/>non finisce <em>mai.</em></h2><p>The passion never ends.</p><div className="quote-rule"/></div>
        <div className="tifosi-bottom"><div><p className="eyebrow">A PERSONAL ARCHIVE</p><h3>Keep the moments<br/>that stay with you.</h3><p className="tifosi-desc">Save the chapters that mean something to you. Your collection lives in this session; no account or data upload is required.</p></div><div className="collection-panel"><div className="collection-head"><span>YOUR COLLECTION</span><span>{saved.length.toString().padStart(2,'0')} SAVED</span></div>{saved.length===0?<div className="empty-collection"><span>+</span><p>Your archive begins with a moment.</p><small>Save a chapter from the history section.</small></div>:saved.map(item=><div className="saved-item" key={item}><span>{item}</span><button onClick={()=>toggleSaved(item)} aria-label={'Remove '+item}>×</button></div>)}<button className="collection-clear" onClick={()=>setSaved([])} disabled={saved.length===0}>CLEAR COLLECTION</button></div></div>
      </section>
      <section className="closing">
        <div className="closing-image"/><div className="closing-copy"><p className="eyebrow">THE NEXT CHAPTER IS ALWAYS AHEAD</p><h2>Still<br/><em>believing.</em></h2><a href="#home" className="discover-link"><span>RETURN TO THE BEGINNING</span><ArrowDown className="return-arrow" size={16}/></a></div><div className="closing-number">IL ROSSO / FINE</div>
      </section>
    </main>
    <footer className="footer"><a className="footer-brand" href="#home">IL ROSSO<span>LA PASSIONE NON FINISCE MAI</span></a><p>An independent fan-made tribute to Scuderia Ferrari.<br/>Not affiliated with, endorsed by, or sponsored by Ferrari S.p.A. or Formula 1.</p><div className="footer-right"><span>BUILT WITH RESPECT.</span><a href="https://www.ferrari.com/" target="_blank" rel="noreferrer">FERRARI OFFICIAL SITE ↗</a><span>© {new Date().getFullYear()} IL ROSSO</span></div></footer>
  </div>
}
export default App
