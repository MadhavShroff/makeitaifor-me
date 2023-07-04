import React, { useEffect } from 'react';

// @ts-ignore
const GraphicElement = ({ color, opts }) => {
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.getElementById(
      'myCanvas',
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    if (!ctx) return;
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius,
    );
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'orange');

    ctx.fillStyle = gradient;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 100;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (
      let i = 0;
      i < data.length;
      i += opts.type == 1 ? 8 : opts.type == 2 ? 4 : opts.type == 3 ? 24 : 4
    ) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const noise = Math.random() * 100;

      if (brightness + noise > 255) {
        data[i] = data[i + 1] = data[i + 2] = 255;
      } else {
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [color, opts]);

  return (
    <div>
      <canvas
        id="myCanvas"
        height="800"
        width="800"
        style={{ border: '1px solid #d3d3d3' }}
      ></canvas>
    </div>
  );
};

export default GraphicElement;
