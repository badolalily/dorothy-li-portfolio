import fallback from '../../site-public/content.json'
export const content = structuredClone(fallback)
export async function loadContent(){
 try{
  const response=await fetch('/content.json',{cache:'no-cache',signal:AbortSignal.timeout(4000)})
  if(!response.ok)return
  const fresh=await response.json()
  for(const key of ['featured','works','experience','studies','scripts','categories']){
   if(Array.isArray(fresh[key])&&fresh[key].length&&(key!=='featured'||fresh[key].length===4))content[key].splice(0,content[key].length,...fresh[key])
  }
 }catch{/* The validated bundled copy remains available offline or on a failed request. */}
}
