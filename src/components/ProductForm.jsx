// ProductForm.jsx
import { useState } from 'react'

export default function ProductForm({ onCreate, onClose }) {
    const [form, setForm] = useState({ name: '', price: '', category: '' })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('https://storeback-o9pt.onrender.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        if (res.ok) {
            const data = await res.json()
            onCreate(data)
            setForm({ name: '', price: '', category: '' })
            if (onClose) onClose() // cerrar el modal si se pasó onClose
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <h2 className="text-2xl font-bold">Agregar Producto</h2>
            <input
                className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
            />
            <input
                className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="number"
                name="price"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
            />
            <input
                className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                name="category"
                placeholder="Categoría"
                value={form.category}
                onChange={handleChange}
            />
            <div className="flex justify-end gap-2">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 mt-2 rounded-xl shadow-md transition duration-200"
                >
                    Guardar
                </button>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 mt-2 rounded-xl shadow-sm transition duration-200"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}
