import React, { useEffect, useRef } from "react";

interface VortexBackgroundProps {
  className?: string;
}

export const VortexBackground: React.FC<VortexBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle resizing beautifully
    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Account for device pixel ratio for super high-DPI display crispness
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Mathematical parameters for the seamless infinite vortex flight
    const NUM_LAYERS = 34; // Number of star layers
    const BASE_ROTATION_SPEED = 0.0003; // Dynamic continuous slow spinning speed of the entire vortex
    const SPIRAL_TWIST = 0.22; // Twisting angle adjustment per layer (creates the spiral staircase look)
    const DECAY_FACTOR = 0.88; // Scale factor between layers (how much smaller each consecutive inner layer gets)
    const ZOOM_SPEED = 0.035; // Slow, perfect zoom speed for steady loop (not too fast, not too slow)

    let time = 0;

    // Helper to draw a single 5-pointed star sub-path
    const addStarPath = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      tips: number,
      outerR: number,
      innerR: number,
      angleOffset: number
    ) => {
      const pointsCount = tips * 2;
      for (let i = 0; i < pointsCount; i++) {
        const angle = angleOffset + (i * Math.PI) / tips;
        const r = i % 2 === 0 ? outerR : innerR;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) {
          c.moveTo(x, y);
        } else {
          c.lineTo(x, y);
        }
      }
      c.closePath();
    };

    // Render loop
    const render = () => {
      time += 0.16; // Increments smoothly based on a standard rough 60fps clock delta

      // Draw solid dark background
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Base radius of the outermost star — covering the screen corners comfortably
      const maxRadius = Math.max(width, height) * 0.95;

      // Seamless zoom fraction 'u' wraps perfectly between 0 and 1
      const u = (time * ZOOM_SPEED) % 1;

      // Iterate starting from the deepest, smallest background layer up to the largest foreground layer
      // Drawing back-to-front causes the larger foreground layers to perfectly stack on top of the inner layers
      for (let j = NUM_LAYERS - 1; j >= 0; j--) {
        // Virtual fractional layer index based on smooth loop offset
        const v = j - u;

        // Exponential scale factor for this layer
        const layerScale = Math.pow(DECAY_FACTOR, v);
        
        // Calculate radii for the outer tips and inner notches of the 5-pointed star
        const outerR = maxRadius * layerScale;
        const innerR = outerR * 0.52; // 0.52 ratio maps closely to the star geometry in the reference image

        // Calculate the cutout radii for the hollow center of this star plate (matches the next inner star)
        const innerLayerScale = Math.pow(DECAY_FACTOR, v + 1);
        const holeOuterR = maxRadius * innerLayerScale;
        const holeInnerR = holeOuterR * 0.52;

        // Base spinning rotation of the entire tunnel + spiral twist proportional to layer depth
        const baseSpin = time * BASE_ROTATION_SPEED;
        const layerRotation = baseSpin + v * SPIRAL_TWIST;

        // Opacity fade in as new layers emerge in center, and fade out as outermost layers leave the screen
        let opacity = 1;
        if (v < 0) {
          // Fade out the biggest layer that moves past the screen zoom bounds
          opacity = Math.max(0, 1 + v);
        } else if (v > NUM_LAYERS - 3) {
          // Smoothly fade in the tiny emerging layers at the deepest center of the vortex
          opacity = Math.max(0, (NUM_LAYERS - v) / 3);
        }

        if (opacity <= 0.01 || outerR < 1) continue;

        ctx.save();
        ctx.globalAlpha = opacity;

        // Enable responsive realistic drop shadows to render beautiful 3D step-by-step depth
        ctx.shadowColor = `rgba(0, 0, 0, ${0.9 * opacity})`;
        ctx.shadowBlur = Math.min(25, outerR * 0.08);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = Math.min(12, outerR * 0.04);

        // Draw a hollow star ring by nesting an outer star path and a counter-oriented inner cutout path
        ctx.beginPath();
        
        // 1. Draw outer 5-pointed star (clockwise points flow)
        addStarPath(ctx, cx, cy, 5, outerR, innerR, layerRotation);
        
        // 2. Draw inner cutout 5-pointed star (which matches next inner layer with slight twist)
        // Adding the same spiral twist ensures the tunnel is perfectly carved out without rendering gaps
        const nextLayerRotation = baseSpin + (v + 1) * SPIRAL_TWIST;
        addStarPath(ctx, cx, cy, 5, holeOuterR, holeInnerR, nextLayerRotation);

        // Set up static elegant 3D spotlight linear gradient (lighting from top-left direction)
        const grad = ctx.createLinearGradient(
          cx - outerR * 0.4,
          cy - outerR * 0.4,
          cx + outerR * 0.4,
          cy + outerR * 0.4
        );
        
        // Pristine dark slate color sequence simulating beautiful metallic/matte lighting
        grad.addColorStop(0, "#1e1e21"); // Raised light highlight edge
        grad.addColorStop(0.3, "#101011"); // Midtone
        grad.addColorStop(1, "#060607"); // Deep shadow recess

        ctx.fillStyle = grad;
        ctx.fill("evenodd"); // This carving rule renders the region between paths cleanly hollow

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden bg-black select-none pointer-events-none ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
