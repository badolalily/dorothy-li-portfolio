import {useState} from 'react'
import DetailVideo from './DetailVideo'

export default function WorkDetails({item}){
 const [selected,setSelected]=useState(0)
 const clips=item.videos?.length?item.videos:[{src:item.video,label:item.name}]
 return <div className="project-detail">
  <div className="project-media-column">
   <div className="project-media">{clips[selected].src?<DetailVideo key={clips[selected].src} src={clips[selected].src}/>:<img src={item.image} alt={item.name}/>}</div>
   {clips.length>1&&<div className="series-picker" role="group" aria-label="Series videos">{clips.map((clip,i)=><button key={clip.src} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{clip.label}</button>)}</div>}
  </div>
  <aside tabIndex={0} aria-label="Creative notes">
   <small>{item.type}{item.duration&&<span className="work-duration"> · {item.duration}</span>}</small>
   <h2>{item.name}</h2>
   <p className="work-tagline">{item.text}</p>
   {item.overview&&<p className="work-overview">{item.overview}</p>}
   {item.tags?.length>0&&<div className="work-tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div>}
   {item.notes?.length>0&&<ul>{item.notes.map(n=><li key={n}>{n}</li>)}</ul>}
  </aside>
 </div>
}
