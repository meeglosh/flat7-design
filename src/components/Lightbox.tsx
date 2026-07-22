import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type TouchEvent, type WheelEvent } from 'react';

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.6;
const ZOOM_CLICK = 2.5;

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartXRef = useRef<number | null>(null);

  const total = images.length;
  const current = images[index];

  const clampPan = useCallback((p: { x: number; y: number }, z: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || z <= 1) return { x: 0, y: 0 };
    const maxX = (rect.width * (z - 1)) / 2;
    const maxY = (rect.height * (z - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, p.x)),
      y: Math.min(maxY, Math.max(-maxY, p.y)),
    };
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback((newIndex: number) => {
    resetZoom();
    onIndexChange((newIndex + total) % total);
  }, [total, onIndexChange, resetZoom]);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, goPrev, goNext]);

  useEffect(() => { resetZoom(); }, [index, resetZoom]);

  function handleImageClick(e: MouseEvent) {
    e.stopPropagation();
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    if (zoom > 1) {
      resetZoom();
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
    setZoom(ZOOM_CLICK);
    setPan(clampPan({ x: -offsetX * rect.width * (ZOOM_CLICK - 1), y: -offsetY * rect.height * (ZOOM_CLICK - 1) }, ZOOM_CLICK));
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom + delta));
    setZoom(next);
    setPan(p => (next === 1 ? { x: 0, y: 0 } : clampPan(p, next)));
  }

  function handleMouseDown(e: MouseEvent) {
    if (zoom <= 1) return;
    draggingRef.current = true;
    dragMovedRef.current = false;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  }

  function handleMouseMove(e: MouseEvent) {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPointRef.current.x;
    const dy = e.clientY - lastPointRef.current.y;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    const totalDx = e.clientX - dragStartRef.current.x;
    const totalDy = e.clientY - dragStartRef.current.y;
    if (Math.hypot(totalDx, totalDy) > 5) dragMovedRef.current = true;
    setPan(p => clampPan({ x: p.x + dx, y: p.y + dy }, zoom));
  }

  function handleMouseUp() {
    draggingRef.current = false;
  }

  function handleTouchStart(e: TouchEvent) {
    if (zoom > 1) return;
    touchStartXRef.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchStartXRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev(); else goNext();
    }
  }

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={overlayStyle}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={closeBtnStyle}
      >
        ✕
      </button>

      {total > 1 && (
        <div style={counterStyle}>
          {index + 1} / {total}
        </div>
      )}

      {total > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous image" style={navBtnStyle('left')}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next image" style={navBtnStyle('right')}>›</button>
        </>
      )}

      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={stageStyle}
      >
        <img
          src={current.src}
          alt={current.alt}
          onClick={handleImageClick}
          draggable={false}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            cursor: zoom > 1 ? 'grab' : 'zoom-in',
            display: 'block',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      <div style={hintStyle}>
        click or scroll to zoom · drag to pan · esc to close
      </div>
    </div>
  );
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  background: 'rgba(8,8,10,0.96)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
};

const closeBtnStyle: CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '24px',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  fontSize: '16px',
  cursor: 'pointer',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const counterStyle: CSSProperties = {
  position: 'absolute',
  top: '28px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'rgba(255,255,255,0.7)',
  fontFamily: 'monospace',
  fontSize: '12px',
  letterSpacing: '0.15em',
};

const hintStyle: CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'rgba(255,255,255,0.4)',
  fontFamily: 'monospace',
  fontSize: '10px',
  letterSpacing: '0.1em',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const stageStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '72px 88px',
  boxSizing: 'border-box',
};

function navBtnStyle(side: 'left' | 'right'): CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '16px',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    fontSize: '26px',
    lineHeight: 1,
    cursor: 'pointer',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}
