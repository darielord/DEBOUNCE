import { useRef, useEffect } from "react";

import { sprite } from "../constants/sprite";

export function RickSprite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0, 0, sprite.anchoCuadro, sprite.altoCuadro);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={sprite.anchoCuadro}
      height={sprite.altoCuadro}
    ></canvas>
  );
}
