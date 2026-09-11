import {Component,useRef,useEffect,useState} from 'react'
import {useReducedMotion} from 'framer-motion'
import FaultyTerminal from './reactbits/FaultyTerminal'
import PrismaticBurst from './reactbits/PrismaticBurst'
const grid=[2,1],colors=['#ff007a','#4d3dff','#ffffff'],offset={x:0,y:0}
const backgrounds={0:'head-background',1:'process-background',5:'experience-background',6:'contact-background'}
export class BackgroundBoundary extends Component{
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<div className="background-unavailable" aria-label="Animated background unavailable"/>:this.props.children}
}
function BackgroundVideo({name,reduced}){
 const ref=useRef(null),[ready,setReady]=useState(false)
 const src='/media/'+name+'.mp4',poster='/posters/'+name+'.jpg'
 useEffect(()=>{
  const v=ref.current;if(!v)return
  let disposed=false
  const play=()=>{if(disposed||reduced||document.hidden){v.pause();return}v.play().catch(()=>{})}
  document.addEventListener('visibilitychange',play);play()
  return()=>{disposed=true;document.removeEventListener('visibilitychange',play);v.pause();v.removeAttribute('src');v.load()}
 },[name,reduced])
 return <><img className="background background-poster" src={poster} alt="" fetchPriority="high"/><video ref={ref} className={'background background-video '+(ready&&!reduced?'is-ready':'')} src={src} poster={poster} autoPlay={!reduced} muted playsInline loop preload="auto" data-background="true" onCanPlay={()=>setReady(true)} onError={()=>setReady(false)}/></>
}
export default function SlideBackground({index}){
 const reduced=useReducedMotion(),name=backgrounds[index],key=name||(index===4?'prismatic':'terminal')
 return <div className={'page-background background-page-'+(index+1)} aria-hidden="true"><BackgroundBoundary key={key}>
 {name?<BackgroundVideo key={name+!!reduced} name={name} reduced={reduced}/>:index===4?<PrismaticBurst animationType="rotate3d" intensity={2} speed={0.5} distort={1} paused={!!reduced} offset={{x:0,y:0}} hoverDampness={0.25} rayCount={24} mixBlendMode="lighten" colors={['#ff007a','#4d3dff','#ffffff']}/>:<FaultyTerminal scale={1.5} gridMul={[2,1]} digitSize={1.2} timeScale={1} pause={!!reduced} scanlineIntensity={1} glitchAmount={1} flickerAmount={1} noiseAmp={1} chromaticAberration={0} dither={0} curvature={0} tint="#7C3AED" mouseReact={true} mouseStrength={0.5} pageLoadAnimation={false} brightness={1}/>} 
 </BackgroundBoundary><div className="background-legibility"/></div>
}

