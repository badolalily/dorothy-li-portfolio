import { useEffect, useRef } from "react";

// Pure-white Canvas implementation with the same API as GlowCursor.
export default function GlowCursor({
  color = "#ffffff",
  secondaryColor = "#ffffff",
  trailLength = 21,
  trailWidth = 5,
  trailTaper = 0.6,
  followSpeed = 0.4,
  glowIntensity = 1.6,
  glowSpread = 1.2,
  hotspot = 0.4,
  brightness = 1.25,
  opacity = 1,
  pulseSpeed = 1.7,
  noiseStrength = 0.035,
  idleFade = true,
  idleTimeout = 700,
  fadeDuration = 900,
  blendMode = "plus-lighter",
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const trail = [];
    const point = { x: -100, y: -100, last: 0 };
    let frame;
    const ratio = () => Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = innerWidth * ratio();
      canvas.height = innerHeight * ratio();
      ctx.setTransform(ratio(), 0, 0, ratio(), 0, 0);
    };
    const move = (event) => {
      point.x = event.clientX;
      point.y = event.clientY;
      point.last = performance.now();
      trail.unshift({ x: point.x, y: point.y });
      trail.length = trailLength;
    };
    const render = (now) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const idle = idleFade
        ? Math.max(
            0,
            Math.min(1, 1 - (now - point.last - idleTimeout) / fadeDuration),
          )
        : 1;
      if (trail.length > 1 && idle > 0) {
        ctx.globalCompositeOperation =
          blendMode === "plus-lighter" ? "lighter" : blendMode;
        for (let i = trail.length - 1; i > 0; i -= 1) {
          const a = trail[i],
            b = trail[i - 1],
            t = 1 - i / trail.length;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineCap = "round";
          ctx.lineWidth = Math.max(
            1,
            trailWidth * (trailTaper + t * (1 - trailTaper)),
          );
          ctx.strokeStyle = `rgba(255,255,255,${t * 0.52 * opacity * idle})`;
          ctx.shadowColor = color;
          ctx.shadowBlur = 14 * glowSpread * glowIntensity;
          ctx.stroke();
        }
        const pulse =
          1 + Math.sin(now * 0.001 * pulseSpeed * Math.PI * 2) * 0.08;
        const radius = 24 * glowSpread * pulse;
        const glow = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius,
        );
        glow.addColorStop(
          0,
          `rgba(255,255,255,${Math.min(1, brightness) * opacity * idle})`,
        );
        glow.addColorStop(
          hotspot,
          `rgba(255,255,255,${0.42 * opacity * idle})`,
        );
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.shadowColor = secondaryColor;
        ctx.shadowBlur = 30 * glowIntensity;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(render);
    };
    resize();
    frame = requestAnimationFrame(render);
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
    };
  }, [
    blendMode,
    brightness,
    color,
    fadeDuration,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    idleFade,
    idleTimeout,
    noiseStrength,
    opacity,
    pulseSpeed,
    secondaryColor,
    trailLength,
    trailTaper,
    trailWidth,
  ]);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
