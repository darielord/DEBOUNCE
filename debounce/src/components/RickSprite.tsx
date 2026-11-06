import { useRef, useEffect } from "react";

import { sprite } from "../constants/sprite";

export function RickSprite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    let animationId: number;
    let spriteFrame = 0;
    let lastTime = 0;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const img = new Image();

    img.src = sprite.ruta;
    function loop(timestamp: number) {
      const frameDuration = 100;
      if (timestamp - lastTime > frameDuration) {
        ctx?.clearRect(0, 0, sprite.anchoCuadro, sprite.altoCuadro);

        const sx = spriteFrame * sprite.anchoCuadro;

        ctx?.drawImage(
          img,
          sx,
          0,
          sprite.anchoCuadro,
          sprite.altoCuadro,
          0,
          0,
          sprite.anchoCuadro,
          sprite.altoCuadro,
        );

        spriteFrame = (spriteFrame + 1) % sprite.frames;

        lastTime = timestamp;
      }

      animationId = requestAnimationFrame(loop);
    }

    img.onload = () => {
      animationId = requestAnimationFrame(loop);
    };
    return () => {
      img.onload = null;
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      style={{
        width: "120px",
        height: "auto",
        imageRendering: "pixelated",
        display: "block",
        margin: "1rem auto",
      }}
      ref={canvasRef}
      width={sprite.anchoCuadro}
      height={sprite.altoCuadro}
    ></canvas>
  );
}
