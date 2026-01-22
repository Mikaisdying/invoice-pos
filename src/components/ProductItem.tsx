import { motion, AnimatePresence } from "framer-motion";

interface ProductItemProps {
  name: string;
  price: number;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function ProductItem({ 
  name, 
  price, 
  qty, 
  onAdd, 
  onRemove 
}: ProductItemProps) {
  const active = qty > 0;

  return (
    <div 
      style={{
        position: 'relative',
        padding: '16px 0',
        borderBottom: '1px solid #222',
        minHeight: 72
      }}
    >
      {/* PRODUCT NAME - Instant hide khi active */}
      {!active && (
        <div>
          <div style={{ 
            fontSize: 16, 
            fontWeight: 500,
            color: '#fff',
            marginBottom: 4
          }}>
            {name}
          </div>
          <div style={{ 
            fontSize: 13, 
            color: '#888' 
          }}>
            {price.toLocaleString('vi-VN')}đ
          </div>
        </div>
      )}

      {/* QUANTITY CONTROLS - Instant hide khi về 0 */}
      {active && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16
          }}
        >
          <button
            onClick={onRemove}
            style={{
              background: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 600
              }}
            >
              −
            </button>
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 120,
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#fff',
                marginBottom: 4
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: 12, 
                color: '#888',
                marginBottom: 6
              }}>
                {price.toLocaleString('vi-VN')}đ
              </div>
              <motion.div 
                key={qty}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
                style={{ 
                  fontSize: 18, 
                  fontWeight: 600,
                  color: '#44ff44'
                }}
              >
                {qty}
              </motion.div>
            </div>
            
            <button
              onClick={onAdd}
              style={{
                background: '#44ff44',
                color: '#000',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 600
              }}
            >
              +
            </button>
          </div>
        )}

      {/* INITIAL ADD BUTTON - only when qty = 0 */}
      {!active && (
        <button
          onClick={onAdd}
          style={{
            position: 'absolute',
            right: 0,
            top: 16,
            background: '#44ff44',
            color: '#000',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 600
          }}
        >
          +
        </button>
      )}
    </div>
  );
}