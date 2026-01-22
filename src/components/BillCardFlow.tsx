import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface BillCardProps {
  hasItems?: boolean;
  children?: (isCollapsed: boolean, collapse: () => void) => React.ReactNode;
}

export function BillCard({
  hasItems = false,
  children
}: BillCardProps) {
  const height = useMotionValue(120); // Tăng từ 96 → 120
  const [state, setState] = useState<"collapsed" | "expanded">("collapsed");

  const snapTo = (next: "collapsed" | "expanded") => {
    setState(next);
    const collapsed = 120; // Tăng từ 96px → 120px
    const expanded = Math.min(window.innerHeight * 0.75, 550); // Tăng từ 60% → 75% và 400px → 550px
    
    animate(height, next === "collapsed" ? collapsed : expanded, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1
    });
  };

  // init  
  useEffect(() => {
    snapTo("collapsed");
  }, []);

  // auto open when has item
  useEffect(() => {
    if (hasItems) snapTo("collapsed");
  }, [hasItems]);

  return (
    <motion.div
      data-bill-card
      style={{ 
        height,
        minHeight: 120, // Tăng từ 96px → 120px
        maxHeight: 550, // Tăng từ 400px → 550px
        background: '#ffffff',
        borderRadius: '0 0 0 0', // Remove border radius để hiện zigzag
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible', // Change to visible để zigzag hiện
        zIndex: 10 // Trên ProductZone nhưng không che gesture
      }}
      drag="y"
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={{ top: -100, bottom: 20 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -50 || info.velocity.y < -500) {
          snapTo("expanded");
        } else {
          snapTo("collapsed");
        }
      }}
    >
      {/* ZIGZAG TOP BORDER */}
      <svg
        style={{
          position: 'absolute',
          top: '-8px',
          left: 0,
          right: 0,
          width: '100%',
          height: '16px',
          zIndex: 1
        }}
        viewBox="0 0 400 16"
        preserveAspectRatio="none"
      >
        <path
          d="M0,8 L10,0 L20,8 L30,0 L40,8 L50,0 L60,8 L70,0 L80,8 L90,0 L100,8 L110,0 L120,8 L130,0 L140,8 L150,0 L160,8 L170,0 L180,8 L190,0 L200,8 L210,0 L220,8 L230,0 L240,8 L250,0 L260,8 L270,0 L280,8 L290,0 L300,8 L310,0 L320,8 L330,0 L340,8 L350,0 L360,8 L370,0 L380,8 L390,0 L400,8 L400,16 L0,16 Z"
          fill="#ffffff"
          stroke="none"
        />
      </svg>
      {/* HANDLE - Replace drag bar with "Cash Receipt" text */}
      <div style={{ 
        padding: '20px 0 12px 0', // Tăng top padding để không bị che bởi zigzag
        display: 'flex',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: 'grab',
        userSelect: 'none'
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#374151',
          fontFamily: 'monospace',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Cash Receipt
        </div>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px 16px 16px', // Giảm bottom padding từ 40px → 16px
        WebkitOverflowScrolling: 'touch',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}>
        {children?.(state === "collapsed", () => snapTo("collapsed"))}
      </div>
    </motion.div>
  );
}