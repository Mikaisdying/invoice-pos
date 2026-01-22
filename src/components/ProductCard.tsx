import { motion } from 'framer-motion';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-100 hover:border-blue-300 transition-colors cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onAdd(product)}
    >
      <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight">
        {product.name}
      </h3>
      <p className="text-lg font-bold text-blue-600">
        {product.price.toLocaleString('vi-VN')}đ
      </p>
    </motion.div>
  );
};