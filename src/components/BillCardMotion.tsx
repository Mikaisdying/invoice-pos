import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SNAP = {
  collapsed: 0.6,
  expanded: 0.05
};

interface BillCardProps {
  hasItems?: boolean;
  children?: React.ReactNode;
}

export function BillCard({
  hasItems = false,
  children
}: BillCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [, setState] = useState<"collapsed" | "expanded">("collapsed");

  const getHeight = () =>
    containerRef.current?.clientHeight || 0;

  const snapTo = (next: "collapsed" | "expanded") => {
    const h = getHeight();
    if (!h) return;

    setState(next);
    animate(y, h * SNAP[next], {
      type: "spring",
      stiffness: 340,
      damping: 38
    });
  };

  // init
  useEffect(() => {
    requestAnimationFrame(() => {
      snapTo("collapsed");
    });
  }, []);

  // auto open when has item
  useEffect(() => {
    if (hasItems) snapTo("collapsed");
  }, [hasItems]);

  // prevent pull-to-refresh
  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
      // Only prevent if touch starts on BillCard area
      const target = e.target as HTMLElement;
      if (target.closest('[data-bill-card]')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventPullToRefresh, { passive: false });
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventPullToRefresh);
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 75,
        zIndex: 1000
      }}
    >
      <motion.div
        data-bill-card
        style={{ 
          y,
          pointerEvents: 'auto',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          marginLeft: '-46%',
          width: '92%',
          height: '75%',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          willChange: 'transform',
          touchAction: 'pan-y pinch-zoom',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        drag="y"
        dragElastic={0.1}
        dragMomentum={false}
        dragConstraints={{ top: -50, bottom: 50 }}
        onDragEnd={(_, info) => {
          if (info.offset.y < -80 || info.velocity.y < -500) {
            snapTo("expanded");
          } else {
            snapTo("collapsed");
          }
        }}
      >
        {/* HANDLE */}
        <div style={{ padding: '12px 0' }}>
          <div style={{
            margin: '0 auto',
            height: '6px',
            width: '40px',
            borderRadius: '999px',
            background: '#9ca3af'
          }} />
        </div>

        {/* CONTENT */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 16px 60px 16px',
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)',
          willChange: 'scroll-position'
        }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}