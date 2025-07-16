export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="border rounded p-2"
    >
      {categories.map((cat, i) => (
        <option key={i} value={cat}>{cat}</option>
      ))}
    </select>
  )
}
