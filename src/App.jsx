import { useEffect, useState } from 'react'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import CategoryFilter from './components/CategoryFilter'
import ProductForm from './components/ProductForm'
import Modal from './components/Modal'

export default function App() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory)

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const handleCreate = newProduct => {
    setProducts(prev => [...prev, newProduct])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 drop-shadow-sm">Catálogo de Productos</h1>


        <div className="flex justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-white bg-green-500 hover:bg-green-600 rounded-full w-12 h-12 flex items-center justify-center shadow-md"
          >
            +
          </button>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow border border-purple-200">
          <h2 className="text-xl font-semibold text-purple-700">Filtrar por categoría:</h2>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <ProductList products={filteredProducts} onSelect={setSelectedProduct} />

        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <ProductForm
            onCreate={product => {
              handleCreate(product)
              setIsAddModalOpen(false)
            }}
            onClose={() => setIsAddModalOpen(false)} // ✅ para que el botón "Cancelar" funcione
          />
        </Modal>
        {selectedProduct && (
          <Modal isOpen={true} onClose={() => setSelectedProduct(null)}>
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onUpdate={fetchProducts}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}
