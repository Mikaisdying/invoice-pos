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
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onConfirm: () => void;
  expanded: boolean;
  onToggle: () => void;
};

export const BillCard: FC<Props> = ({
  items,
  totalPrice,
  onAdd,
  onRemove,
  onConfirm,
  expanded,
  onToggle,
}) => {
  const visibleItems = expanded ? items : items.slice(-3);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: expanded ? "70vh" : "25vh",
        background: "#111",
        color: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          width: 40,
          height: 4,
          background: "#444",
          borderRadius: 2,
          alignSelf: "center",
          marginBottom: 12,
          cursor: "pointer",
        }}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {visibleItems.length === 0 && (
          <div style={{ color: "#666", textAlign: "center", marginTop: 40 }}>
            Chưa có món nào
          </div>
        )}

        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 14 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {item.price.toLocaleString()} x {item.qty}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => onRemove(item.id)}>-</button>
              <div>{item.qty}</div>
              <button onClick={() => onAdd(item.id)}>+</button>
            </div>

            <div style={{ minWidth: 90, textAlign: "right" }}>
              {item.total.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid #222",
          paddingTop: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: expanded ? 12 : 0,
          }}
        >
          <strong>Tổng</strong>
          <strong>{totalPrice.toLocaleString()}</strong>
        </div>

        {expanded && (
          <button
            onClick={onConfirm}
            style={{
              width: "100%",
              padding: 12,
              background: "#fff",
              color: "#000",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Xác nhận
          </button>
        )}
      </div>
    </div>
  );
};