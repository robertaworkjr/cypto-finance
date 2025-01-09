import { useState } from 'react'
import BlogList from '../components/blog/BlogList'
import BlogPost from '../components/blog/BlogPost'
import BlogCategories from '../components/blog/BlogCategories'

// Expanded categories
const CATEGORIES = [
  'Cryptocurrency',
  'Finance',
  'Technology',
  'Markets',
  'Cars',
  'Domestic',
  'Entertainment',
  'Gaming',
  'Film',
  'Sport'
]

// Expanded mock posts with new categories
const MOCK_POSTS = [
  {
    id: 1,
    title: 'Understanding Cryptocurrency Market Trends',
    author: 'John Doe',
    date: '2024-03-15',
    category: 'Cryptocurrency',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Cryptocurrency markets are known for their volatility and rapid changes. Understanding these trends is crucial for both investors and enthusiasts.',
      'Technical analysis plays a significant role in predicting market movements. Key indicators include moving averages, trading volume, and market sentiment.',
      'Risk management and diversification remain essential strategies in the cryptocurrency market.'
    ],
    likes: 42,
    comments: [
      {
        author: 'Jane Smith',
        date: '2024-03-16',
        content: 'Great insights! Would love to see more content about DeFi.'
      }
    ]
  },
  {
    id: 2,
    title: 'Electric Vehicles: The Future of Automotive Industry',
    author: 'Mike Johnson',
    date: '2024-03-14',
    category: 'Cars',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Electric vehicles are revolutionizing the automotive industry with unprecedented growth and innovation.',
      'Major manufacturers are committing to electric-only lineups in the coming decades.',
      'Infrastructure development and battery technology continue to be key focus areas.'
    ],
    likes: 38,
    comments: []
  },
  {
    id: 3,
    title: 'Smart Home Technology Trends 2024',
    author: 'Sarah Wilson',
    date: '2024-03-13',
    category: 'Domestic',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Smart home technology is becoming increasingly sophisticated and integrated.',
      'New AI-powered devices are making homes more efficient and comfortable.',
      'Security and privacy remain top priorities in smart home development.'
    ],
    likes: 29,
    comments: []
  },
  {
    id: 4,
    title: 'The Rise of Cloud Gaming Services',
    author: 'Alex Chen',
    date: '2024-03-12',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Cloud gaming services are transforming how we play and access video games.',
      'Major tech companies are investing heavily in cloud gaming infrastructure.',
      'The future of gaming might be platform-agnostic and instantly accessible.'
    ],
    likes: 45,
    comments: []
  },
  {
    id: 5,
    title: 'Oscar Winners 2024: Industry Analysis',
    author: 'Emma Thompson',
    date: '2024-03-11',
    category: 'Film',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80',
    content: [
      'The 2024 Academy Awards highlighted significant shifts in the film industry.',
      'Streaming services continue to challenge traditional studio dominance.',
      'Diversity and representation remain key topics in Hollywood.'
    ],
    likes: 52,
    comments: []
  },
  {
    id: 6,
    title: 'Premier League Transfer Market Analysis',
    author: 'David Williams',
    date: '2024-03-10',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Transfer spending in football continues to reach new heights.',
      'Financial fair play regulations are shaping club strategies.',
      'Young talent development becomes increasingly important.'
    ],
    likes: 33,
    comments: []
  },
  {
    id: 7,
    title: 'AI in Entertainment: Changing Content Creation',
    author: 'Lisa Anderson',
    date: '2024-03-09',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Artificial Intelligence is revolutionizing how entertainment content is created.',
      'From music composition to video editing, AI tools are becoming mainstream.',
      'The balance between human creativity and AI assistance is being redefined.'
    ],
    likes: 41,
    comments: []
  },
  {
    id: 8,
    title: 'Stock Market Trends: Tech Sector Analysis',
    author: 'Robert Chang',
    date: '2024-03-08',
    category: 'Markets',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80',
    content: [
      'Technology stocks continue to drive market movements.',
      'AI and semiconductor companies show strong growth potential.',
      'Market volatility remains a concern for investors.'
    ],
    likes: 37,
    comments: []
  }
]

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [posts, setPosts] = useState(MOCK_POSTS)

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: [...post.comments, {
              author: 'Anonymous User',
              date: new Date().toISOString().split('T')[0],
              content: comment
            }]
          }
        : post
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <BlogCategories 
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {selectedPost ? (
        <div>
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-4 text-blue-500 hover:text-blue-400 transition-colors"
          >
            ← Back to all posts
          </button>
          <BlogPost 
            post={selectedPost}
            onLike={handleLike}
            onComment={(comment) => handleComment(selectedPost.id, comment)}
          />
        </div>
      ) : (
        <BlogList 
          posts={posts}
          onSelectPost={setSelectedPost}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  )
}
