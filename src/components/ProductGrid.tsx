import type { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAddToCart}
        />
      ))}
    </div>
  );
};