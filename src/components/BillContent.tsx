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
};

export const BillContent: FC<Props> = ({
  items,
  totalPrice,
  onConfirm,
  isCollapsed = false,
}) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* BILL ITEMS - Chỉ hiện khi expanded */}
      {!isCollapsed && (
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
          {items.length === 0 && (
            <div style={{ 
              color: "#666", 
              textAlign: "center", 
              marginTop: 40,
              fontSize: 14 
            }}>
              Chưa có món nào
            </div>
          )}

        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: 15, 
                fontWeight: 500,
                color: "#333",
                marginBottom: 2
              }}>
                {item.name}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: "#888" 
              }}>
                {item.price.toLocaleString('vi-VN')}đ x {item.qty}
              </div>
            </div>

            <div style={{ 
              fontSize: 15,
              fontWeight: 600,
              color: "#333",
              minWidth: 80, 
              textAlign: "right" 
            }}>
              {item.total.toLocaleString('vi-VN')}đ
            </div>
          </div>
        ))}
      </div>
        )}
        
      {items.length > 0 && (
        <div style={{
          borderTop: isCollapsed ? "none" : "2px solid #f0f0f0",
          paddingTop: isCollapsed ? 0 : 16,
          background: "#fff",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: isCollapsed ? "center" : "flex-start",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: isCollapsed ? 0 : 16
          }}>
            <span style={{ 
              fontSize: 16, 
              fontWeight: 600,
              color: "#333"
            }}>
              Tổng cộng
            </span>
            <span style={{ 
              fontSize: 18, 
              fontWeight: 700,
              color: "#2563eb"
            }}>
              {totalPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>

          {/* CONFIRM BUTTON - Chỉ hiện khi expanded */}
          {!isCollapsed && (
            <button
              onClick={onConfirm}
              style={{
                width: "100%",
                padding: "14px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.background = "#1d4ed8";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.background = "#2563eb";
              }}
            >
              XÁC NHẬN ĐƠN HÀNG
            </button>
          )}
        </div>
      )}
    </div>
  );
};