import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Square, Circle, Type, Download } from 'lucide-react';

export default function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'square' | 'circle' | 'text'>('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = '#FD7014';
        context.lineWidth = 2;
        setCtx(context);
      }
    }
  }, []);

  const tools = [
    { icon: <Pencil className="w-5 h-5" />, value: 'pencil' },
    { icon: <Eraser className="w-5 h-5" />, value: 'eraser' },
    { icon: <Square className="w-5 h-5" />, value: 'square' },
    { icon: <Circle className="w-5 h-5" />, value: 'circle' },
    { icon: <Type className="w-5 h-5" />, value: 'text' },
  ];

  const startDrawing = (e: React.MouseEvent) => {
    if (ctx) {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (ctx) {
      setIsDrawing(false);
      ctx.closePath();
    }
  };

  return (
    <div className="bg-[#222831] p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {tools.map((t) => (
            <button
              key={t.value}
              onClick={() => setTool(t.value as any)}
              className={`p-2 rounded ${
                tool === t.value ? 'bg-[#FD7014] text-white' : 'bg-[#393E46] text-gray-300'
              }`}
            >
              {t.icon}
            </button>
          ))}
        </div>
        <button className="bg-[#393E46] p-2 rounded text-gray-300 hover:bg-[#FD7014] hover:text-white transition-colors">
          <Download className="w-5 h-5" />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[600px] bg-white rounded-lg cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}