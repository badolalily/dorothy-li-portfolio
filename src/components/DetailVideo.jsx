import {useEffect,useRef,useState} from 'react'

export default function DetailVideo({src,muted=false}){
 const ref=useRef(null),[failed,setFailed]=useState(false)
 const poster='/posters/'+src.split('/').pop().replace(/\.mp4$/i,'.jpg')
 useEffect(()=>{
  const video=ref.current
  return()=>{if(video){video.pause();video.removeAttribute('src');video.load()}}
 },[])
 return <div className="detail-video-player"><video ref={ref} src={src} poster={poster} controls autoPlay muted={muted} playsInline preload="metadata" onError={()=>setFailed(true)}/>{failed&&<div className="video-error" role="status">This video could not be loaded.</div>}</div>
}
