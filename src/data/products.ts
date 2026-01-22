export interface Product {
  id: number;
  name: string;
  price: number;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Hồng treo gió", price: 95000 },
  { id: 2, name: "Khoai lang dẻo", price: 45000 },
  { id: 3, name: "Mứt bưởi", price: 150000 },
  { id: 4, name: "Chuối cuộn", price: 85000 },
  { id: 5, name: "Khóm cuộn", price: 85000 },

  { id: 6, name: "Đông trùng hạ thảo", price: 490000 },
  { id: 7, name: "Set 1 đông trùng + táo", price: 600000 },
  { id: 8, name: "Set 3 hộp trà", price: 490000 },
  { id: 9, name: "Set 2 đông trùng", price: 1000000 },
  { id: 10, name: "Set rượu + 1 đtht + táo", price: 1100000 },
  { id: 11, name: "Set rượu + 2 đtht", price: 1500000 },
];