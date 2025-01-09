import { useState } from 'react'
import Card from '../ui/Card'

export default function BlogPost({ post, onLike, onComment }) {
  const [comment, setComment] = useState('')

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    onComment(comment)
    setComment('')
  }

  return (
    <Card className="mb-8">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{post.date}</span>
          <span>By {post.author}</span>
          <span>{post.category}</span>
        </div>
        <div className="mb-6">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <div className="space-y-4">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
          >
            <span>❤️</span>
            <span>{post.likes} likes</span>
          </button>
          <span className="text-sm text-gray-400">{post.comments.length} comments</span>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Comments</h3>
          <form onSubmit={handleSubmitComment} className="space-y-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 min-h-[100px]"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Post Comment
            </button>
          </form>
          <div className="space-y-4">
            {post.comments.map((comment, index) => (
              <div key={index} className="p-4 bg-slate-700 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
