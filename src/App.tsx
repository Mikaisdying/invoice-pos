import { useMemo, useState } from "react";
import { PRODUCTS as products } from "./data/products";
import { useCart } from "./hooks/useCart";
import { BillCard } from "./components/BillCardFlow";
import { BillContent } from "./components/BillContentReceipt";
import { ProductItem } from "./components/ProductItem";

export default function App() {
  const { cart, items, totalPrice, add, remove, reset } = useCart(products);
  const [page, setPage] = useState<0 | 1>(0);

  // Chia data ngay từ đầu - CLEAN
  const page1 = products.slice(0, 5);   // ID 1-5
  const page2 = products.slice(5, 10);  // ID 6-10

  const currentProducts = page === 0 ? page1 : page2;

  const itemsWithName = useMemo(() => {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      return {
        ...item,
        name: product?.name || "",
      };
    });
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
        color: '#fff',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      {/* PRODUCT ZONE - flex: 1, button navigation only */}
      <div 
        style={{ 
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Page Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          padding: '8px 16px',
          background: '#111',
          borderBottom: '1px solid #333'
        }}>
          <button
            onClick={() => setPage(0)}
            style={{
              padding: '8px 16px',
              background: page === 0 ? '#44ff44' : '#333',
              color: page === 0 ? '#000' : '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            Trang 1 
          </button>
          <button
            onClick={() => setPage(1)}
            style={{
              padding: '8px 16px',
              background: page === 1 ? '#44ff44' : '#333',
              color: page === 1 ? '#000' : '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            Trang 2
          </button>
        </div>

        <div
          style={{
            height: 'calc(100% - 60px)', // trừ navigation height
            overflowY: 'auto',
            padding: 16
          }}
        >
          {/* Chỉ render 1 page - KHÔNG render cả 2 cùng lúc */}
          {currentProducts.map((product) => {
            const qty = cart[product.id] || 0;

            return (
              <ProductItem
                key={product.id}
                name={product.name}
                price={product.price}
                qty={qty}
                onAdd={() => add(product.id)}
                onRemove={() => remove(product.id)}
              />
            );
          })}
        </div>
      </div>

      {/* BILL CARD - min-height, trong flow */}
      <BillCard hasItems={totalItems > 0}>
        {(isCollapsed, collapse) => (
          <BillContent
            items={itemsWithName}
            totalPrice={totalPrice}
            onConfirm={() => {
              reset();
            }}
            isCollapsed={isCollapsed}
            collapse={collapse}
          />
        )}
      </BillCard>
    </div>
  );
}
