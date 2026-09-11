import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileText } from "lucide-react";
import type { ScriptProject } from "./scriptData";
import DetailVideo from './components/DetailVideo';

/**
 * Trigger + modal for viewing a project's condensed script.
 * Drop <ScriptTrigger project={scripts[0]} /> next to a video card.
 *
 * Deliberately shows only scene direction + spoken/on-screen line per shot —
 * the full internal production notes (voice casting, timing, animation specs)
 * stay in the source doc and are not surfaced here.
 */

export function ScriptTrigger({ project }: { project: ScriptProject }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="script-trigger"
      >
        <FileText className="script-trigger-icon" />
        View script
      </button>

      <AnimatePresence>
        {open && <ScriptOverlay project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function ScriptOverlay({
  project,
  onClose,
}: {
  project: ScriptProject;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="script-overlay"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="script-overlay-panel"
      >
        <button
          onClick={onClose}
          aria-label="Close script"
          className="script-close"
        >
          <X className="script-close-icon" />
        </button>

        <ScriptContent project={project} />
      </motion.div>
    </motion.div>
  );
}

export function ScriptContent({project}: {project: ScriptProject}) { const [image,setImage]=useState<{src:string;alt:string}|null>(null); return <div className="condensed-script">        <p className="condensed-project-name">{project.title}</p>
        <h3 className="condensed-project-title">
          {project.subtitle}
        </h3>

        <p className="script-description">{project.description}</p>{project.referenceVideo&&<div className="script-reference-video"><DetailVideo key={project.referenceVideo} src={project.referenceVideo} muted/><small>Reference video · QY06</small></div>}
        <div className="condensed-shots">
          {project.shots.map((shot) => (
            <div key={shot.n} className="condensed-shot">
              <span className="condensed-shot-number">
                {String(shot.n).padStart(2, "0")}
              </span>
              <div>
                <small className="shot-field">Scene</small><p className="condensed-scene">{shot.scene}</p>
                {shot.line && (
                  <p className="condensed-line"><small className="shot-field">Line</small>
                    "{shot.line}"
                  </p>
                )}
                {shot.reference&&<button className="shot-reference" onClick={()=>setImage(shot.reference!)} aria-label={"Enlarge "+shot.reference.alt}><img loading="lazy" src={shot.reference.src} alt={shot.reference.alt}/><span>View storyboard ↗</span></button>}
              </div>
            </div>
          ))}
        </div>{image&&<ReferenceViewer image={image} onClose={()=>setImage(null)}/>}</div>; }

function ReferenceViewer({image,onClose}:{image:{src:string;alt:string};onClose:()=>void}){const ref=useRef<HTMLDialogElement>(null);useEffect(()=>{ref.current?.showModal()},[]);return <dialog className="reference-viewer" ref={ref} aria-label={image.alt} onCancel={e=>{e.stopPropagation();onClose()}} onClick={e=>{e.stopPropagation();if(e.target===e.currentTarget)onClose()}}><button onClick={onClose} aria-label="Close image"><X/></button><img src={image.src} alt={image.alt}/></dialog>}
