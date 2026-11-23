'use client';

import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Product } from '../lib/data';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/products/${product.id}/edit`); // ajuste para sua rota
  };

  const handleDelete = async () => {
    if (!confirm(`Excluir "${product.title}"?`)) return;

    const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh(); // recarrega os dados do Server Component
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold">{product.title}</h3>
      <p className="text-lg mt-2">R$ {product.price.toFixed(2)}</p>
      <div className="mt-4 flex gap-2 align-center justify-between">
        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
          <FaEdit /> Editar
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700 flex items-center gap-1">
          <FaTrash /> Excluir
        </button>
      </div>
    </div>
  );
}