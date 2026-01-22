import type { FC } from "react";

type BillItem = {
  id: number;
  name: string;
  qty: number;
  price: number;
  total: number;
};

type Props = {
  items: BillItem[];
  totalPrice: number;
  onConfirm: () => void;
  isCollapsed?: boolean;
  collapse?: () => void;
};

export const BillContent: FC<Props> = ({
  items,
  totalPrice,
  onConfirm,
  isCollapsed = false,
  collapse,
}) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'monospace', // Receipt font
        fontSize: 13,
        color: '#333'
      }}
    >
      {/* RECEIPT HEADER - Chỉ hiện khi expanded */}
      {!isCollapsed && (
        <div style={{ 
          textAlign: 'center', 
          paddingBottom: 16,
          borderBottom: '1px solid #ddd',
          marginBottom: 12
        }}>
          <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>
            <div>Shop Name: Gtel OTS</div>
            <div>Date: {new Date().toLocaleDateString('vi-VN')}</div>
          </div>
        </div>
      )}

      {/* RECEIPT TABLE - Chỉ hiện khi expanded */}
      {!isCollapsed && items.length > 0 && (
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
          {/* Table Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 4,
            borderBottom: '1px solid #ddd',
            marginBottom: 8,
            fontSize: 11,
            fontWeight: 'bold'
          }}>
            <span>Description</span>
            <span>Price</span>
          </div>

          {/* Items */}
          {items.map((item) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{ flex: 1, paddingRight: 8 }}>
                  <div style={{ fontWeight: 500, marginBottom: 1 }}>
                    {item.name}
                  </div>
                  <div style={{ 
                    fontSize: 11, 
                    color: '#666' 
                  }}>
                    {item.price.toLocaleString('vi-VN')}đ x {item.qty}
                  </div>
                </div>
                <div style={{ 
                  fontWeight: 500,
                  minWidth: 60,
                  textAlign: 'right'
                }}>
                  {item.total.toLocaleString('vi-VN')}đ
                </div>
              </div>
            </div>
          ))}

          {/* Separator line */}
          <div style={{
            borderTop: '1px solid #ddd',
            margin: '12px 0 8px 0'
          }} />
        </div>
      )}

      {/* TOTAL - Always visible */}
      {items.length > 0 && (
        <div style={{
          borderTop: isCollapsed ? "none" : "2px solid #333",
          paddingTop: isCollapsed ? 0 : 8,
          background: "#fff",
          flexShrink: 0,
          textAlign: 'center'
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isCollapsed ? 0 : 16,
            fontSize: isCollapsed ? 14 : 16,
            fontWeight: 'bold'
          }}>
            <span>Total</span>
            <span style={{ 
              fontSize: isCollapsed ? 16 : 18,
              color: "#333"
            }}>
              {totalPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>

          {/* Receipt footer - Chỉ hiện khi expanded */}
          {!isCollapsed && (
            <>
              {/* Barcode simulation */}
              <div style={{
                textAlign: 'center',
                marginBottom: 12,
                fontFamily: 'monospace',
                fontSize: 10,
                letterSpacing: 1,
                color: '#333'
              }}>
                |||||| |||| | |||| |||| | |||| ||||||
                <br />
                #{Math.random().toString().slice(2, 15)}
              </div>
              
              <div style={{
                fontSize: 11,
                marginBottom: 16,
                color: '#666'
              }}>
                Thank you for shopping!
              </div>

              <button
                onClick={() => {
                  onConfirm();
                  collapse?.();
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  fontFamily: 'monospace'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = "#222";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.background = "#333";
                }}
              >
                PRINT RECEIPT
              </button>
            </>
          )}
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && !isCollapsed && (
        <div style={{ 
          color: "#666", 
          textAlign: "center", 
          marginTop: 40,
          fontSize: 14 
        }}>
          No items yet
        </div>
      )}
    </div>
  );
};