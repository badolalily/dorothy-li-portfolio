import { useEffect, useRef } from "react";

export default function Dither({
  waveColor = [0.529, 0.396, 0.757],
  enableMouseInteraction = true,
  mouseRadius = 0.2,
  waveSpeed = 0.05,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current,
      ctx = canvas.getContext("2d"),
      mouse = { x: -1, y: -1 };
    let frame;
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * d;
      canvas.height = canvas.clientHeight * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const move = (event) => {
      const box = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - box.left) / box.width;
      mouse.y = (event.clientY - box.top) / box.height;
    };
    const draw = (time) => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight,
        step = 11,
        radius = Math.max(w, h) * mouseRadius;
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < h; y += step)
        for (let x = 0; x < w; x += step) {
          const dx = x / w - mouse.x,
            dy = y / h - mouse.y,
            distance = Math.hypot(dx * w, dy * h);
          const interaction =
            enableMouseInteraction && distance < radius
              ? 1 - distance / radius
              : 0;
          const wave =
            Math.sin((x + y) * 0.018 + time * waveSpeed * 0.002) * 0.06;
          const alpha = 0.035 + interaction * 0.11 + wave;
          ctx.fillStyle = `rgba(${Math.round(waveColor[0] * 255)},${Math.round(waveColor[1] * 255)},${Math.round(waveColor[2] * 255)},${Math.max(0, alpha)})`;
          ctx.fillRect(x, y, 1.25, 1.25);
        }
      frame = requestAnimationFrame(draw);
    };
    size();
    frame = requestAnimationFrame(draw);
    addEventListener("resize", size);
    canvas.parentElement?.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", size);
      canvas.parentElement?.removeEventListener("pointermove", move);
    };
  }, [enableMouseInteraction, mouseRadius, waveColor, waveSpeed]);
  return <canvas ref={ref} aria-hidden="true" className="dither-layer" />;
}
