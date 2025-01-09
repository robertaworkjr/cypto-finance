import Card from '../ui/Card'

export default function BlogCategories({ categories, selectedCategory, onSelectCategory }) {
  return (
    <Card className="mb-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-full ${
            !selectedCategory 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 hover:bg-slate-600'
          } transition-colors`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 hover:bg-slate-600'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>
    </Card>
  )
}
