import React, { useEffect, useRef } from "react";

interface VortexBackgroundProps {
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface FloatingPolyhedron {
  x: number;
  y: number;
  scale: number;
  rx: number;
  ry: number;
  rz: number;
  drx: number;
  dry: number;
  drz: number;
  dx: number;
  dy: number;
  targetX: number;
  targetY: number;
}

export const VortexBackground: React.FC<VortexBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Set canvas dimensions
    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

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

    // Generate static/twinkling stars (cosmic dust texture)
    const stars: Star[] = [];
    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
      const baseAlpha = 0.04 + Math.random() * 0.18;
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.3 + Math.random() * 0.7,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        twinkleSpeed: 0.003 + Math.random() * 0.012,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Geometry data for a clean 3D icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1,  phi,  0], [ 1,  phi,  0], [-1, -phi,  0], [ 1, -phi,  0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi,  0, -1], [ phi,  0,  1], [-phi,  0, -1], [-phi,  0,  1],
    ];

    // Normalize vertices to unit sphere
    const vertices = rawVertices.map(([x, y, z]) => {
      const length = Math.sqrt(x*x + y*y + z*z);
      return { x: x / length, y: y / length, z: z / length };
    });

    // Generate edges connecting vertices with distance <= 1.1 on unit sphere
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < 1.1) {
          edges.push([i, j]);
        }
      }
    }

    // Set up instances of the wireframes floating beautifully on screen
    // Polyhedron 1: Large slow floating complex in top-right
    // Polyhedron 2: Main complex in bottom-left
    // Polyhedron 3: Small background accent in mid-right
    const polyhedrons: FloatingPolyhedron[] = [
      {
        x: 0.85, // fractional coordinates (percent of screen)
        y: 0.2,
        scale: 180,
        rx: 0.2,
        ry: 0.5,
        rz: 0.1,
        drx: 0.002,
        dry: 0.003,
        drz: 0.001,
        dx: -0.0001,
        dy: 0.0001,
        targetX: 0.85,
        targetY: 0.2,
      },
      {
        x: 0.15,
        y: 0.75,
        scale: 170,
        rx: 0.8,
        ry: 0.2,
        rz: 0.4,
        drx: -0.002,
        dry: 0.003,
        drz: -0.0015,
        dx: 0.0001,
        dy: -0.0001,
        targetX: 0.15,
        targetY: 0.75,
      },
      {
        x: 0.5,
        y: 0.45,
        scale: 70,
        rx: 0.5,
        ry: 0.5,
        rz: 0.5,
        drx: 0.004,
        dry: -0.002,
        drz: 0.003,
        dx: 0.0,
        dy: 0.0,
        targetX: 0.5,
        targetY: 0.45,
      },
    ];

    // Track mouse coordinates for dynamic parallax displacement
    let mouseX = 0;
    let mouseY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords (-1 to 1)
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetParallaxX = mouseX * 25; // max 25px displacement
      targetParallaxY = mouseY * 25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3D Rotation helper
    const rotate3D = (
      p: { x: number; y: number; z: number },
      ax: number,
      ay: number,
      az: number
    ) => {
      // Rotation X
      let y1 = p.y * Math.cos(ax) - p.z * Math.sin(ax);
      let z1 = p.y * Math.sin(ax) + p.z * Math.cos(ax);
      let x1 = p.x;

      // Rotation Y
      let x2 = x1 * Math.cos(ay) + z1 * Math.sin(ay);
      let z2 = -x1 * Math.sin(ay) + z1 * Math.cos(ay);
      let y2 = y1;

      // Rotation Z
      let x3 = x2 * Math.cos(az) - y2 * Math.sin(az);
      let y3 = x2 * Math.sin(az) + y2 * Math.cos(az);
      let z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    let frameCount = 0;

    // Main animation layer
    const render = () => {
      frameCount++;

      // Create pure space back drop
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Smooth interpolation for parallax float
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;

      // Draw starry galaxy backdrop dust
      for (const star of stars) {
        // Twinkle effect
        star.phase += star.twinkleSpeed;
        star.alpha = star.baseAlpha + Math.sin(star.phase) * 0.15;

        // Render dot with clean subpixel coordinates + subtle parallax
        const sX = (star.x * width + currentParallaxX * 0.25) % width;
        const sY = (star.y * height + currentParallaxY * 0.25) % height;
        
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.max(0.02, Math.min(star.alpha, 1)) * 0.4})`;
        ctx.beginPath();
        ctx.arc(sX < 0 ? width + sX : sX, sY < 0 ? height + sY : sY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw premium floating polyhedrons (constellations)
      polyhedrons.forEach((poly, index) => {
        // Slow rotation increment
        poly.rx += poly.drx;
        poly.ry += poly.dry;
        poly.rz += poly.drz;

        // Gentle drift animation
        poly.x += poly.dx;
        poly.y += poly.dy;

        // Boundaries bounce to keep inside preferred screen area
        if (index === 0) {
          // Top-right bounds
          if (poly.x < 0.65 || poly.x > 0.95) poly.dx *= -1;
          if (poly.y < 0.05 || poly.y > 0.35) poly.dy *= -1;
        } else if (index === 1) {
          // Bottom-left bounds
          if (poly.x < 0.05 || poly.x > 0.35) poly.dx *= -1;
          if (poly.y < 0.6 || poly.y > 0.9) poly.dy *= -1;
        } else {
          // Centered bounds
          if (poly.x < 0.4 || poly.x > 0.6) poly.dx *= -1;
          if (poly.y < 0.35 || poly.y > 0.55) poly.dy *= -1;
        }

        // absolute screen center for this structure
        const px = poly.x * width + (index === 0 ? currentParallaxX * 0.8 : index === 1 ? currentParallaxX * 0.65 : currentParallaxX * 0.4);
        const py = poly.y * height + (index === 0 ? currentParallaxY * 0.8 : index === 1 ? currentParallaxY * 0.65 : currentParallaxY * 0.4);

        // Project rotated vertices
        const rotated = vertices.map((v) => {
          const rot = rotate3D(v, poly.rx, poly.ry, poly.rz);
          // Standard perspective projections (scale local coords based on perspective depth)
          const perspective = 4.0 / (4.0 - rot.z); // Perspective factor
          return {
            x: px + rot.x * poly.scale * perspective,
            y: py + rot.y * poly.scale * perspective,
            z: rot.z, // Z coordinate used for depth shading
          };
        });

        // Draw geometric line segments between vertices
        edges.forEach(([u, v]) => {
          const p1 = rotated[u];
          const p2 = rotated[v];

          // Edge color depth cue: front edges are brighter than rear edges
          const avgZ = (p1.z + p2.z) / 2; // range from -1 to 1
          // normalize depth to 0..1 scale
          const depthScale = (avgZ + 1) / 2;
          const alphaOnDepth = 0.02 + depthScale * 0.10; // Extra subtle line intensity

          ctx.strokeStyle = `rgba(59, 130, 246, ${alphaOnDepth * 1.5})`;
          ctx.lineWidth = 0.35 + depthScale * 0.45; // Subtly thinner and more elegant
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Make nodes look polished: outer soft glowing rings on positive-facing coordinates
        rotated.forEach((node) => {
          // Draw only visible/closer half nodes with clean white dots to match constellation look
          if (node.z > -0.4) {
            const nodeRadius = 1.0 + (node.z + 1) * 0.8; // smaller based on depth
            const nodeOpacity = 0.06 + (node.z + 1) * 0.12; // lower opacity

            // Draw center hard point
            ctx.fillStyle = `rgba(1, 58, 224, ${nodeOpacity * 1.25})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
            ctx.fill();

            // Draw subtle surrounding glow ring on main polyhedrons
            if (index < 2 && node.z > 0.3) {
               ctx.strokeStyle = `rgba(1, 58, 224, ${nodeOpacity * 0.3})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeRadius * 2.5, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden bg-white select-none pointer-events-none ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
