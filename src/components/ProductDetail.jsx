import { useState } from 'react'

export default function ProductDetail({ product, onClose, onUpdate }) {
  const [form, setForm] = useState(product)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:3000/products/${form._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      alert('Producto actualizado')
      onUpdate()
      onClose()
    }
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/products/${form._id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      alert('Producto eliminado')
      onUpdate()
      onClose()
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">Detalles del Producto</h2>

      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
              Guardar
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
              Eliminar
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Nombre:</strong> {form.name}</p>
          <p><strong>Precio:</strong> ${form.price}</p>
          <p><strong>Categoría:</strong> {form.category}</p>
          <div className="flex gap-2 mt-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
              Editar
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
