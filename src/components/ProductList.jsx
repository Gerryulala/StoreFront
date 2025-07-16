export default function ProductList({ products, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {products.map(product => (
        <div
          key={product._id || product.id}
          className="border p-4 rounded hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(product)}
        >
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">Precio: ${product.price}</p>
          <p className="text-sm text-gray-500">Categoría: {product.category}</p>
        </div>
      ))}
    </div>
  )
}
