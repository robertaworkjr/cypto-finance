import { useState } from 'react'
import Card from '../ui/Card'

export default function BlogList({ posts, onSelectPost, selectedCategory }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content[0].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 rounded bg-slate-700 border border-slate-600"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <Card 
            key={post.id}
            className="cursor-pointer hover:bg-slate-700 transition-colors"
            onClick={() => onSelectPost(post)}
          >
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>
            <p className="text-gray-300 line-clamp-3">{post.content[0]}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments.length}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
