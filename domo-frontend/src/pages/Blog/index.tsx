import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import {
  NewspaperIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "DOMO Platform Launch: A New Era of Gaming",
    excerpt: "We're excited to announce the official launch of the DOMO gaming platform. Discover what's in store for our players and the future of blockchain gaming.",
    category: "Announcements",
    author: "DOMO Team",
    date: "2024-03-15",
    readTime: "5 min",
    image: "https://picsum.photos/seed/1/800/400",
    featured: true
  },
  {
    id: 2,
    title: "March Update: New Features and Improvements",
    excerpt: "Check out the latest features added to DOMO, including enhanced base management, new reward systems, and marketplace updates.",
    category: "Updates",
    author: "Dev Team",
    date: "2024-03-10",
    readTime: "4 min",
    image: "https://picsum.photos/seed/2/800/400",
    featured: true
  },
  {
    id: 3,
    title: "Player Guide: Maximizing Your Base Efficiency",
    excerpt: "Learn the best strategies for optimizing your base production and managing resources effectively.",
    category: "Guides",
    author: "GameMaster",
    date: "2024-03-08",
    readTime: "7 min",
    image: "https://picsum.photos/seed/3/800/400"
  },
  {
    id: 4,
    title: "Community Spotlight: Top Players of February",
    excerpt: "Meet the most successful players of last month and learn about their strategies and achievements.",
    category: "Community",
    author: "Community Team",
    date: "2024-03-05",
    readTime: "6 min",
    image: "https://picsum.photos/seed/4/800/400"
  },
  {
    id: 5,
    title: "Tokenomics Explained: Understanding $DOMO",
    excerpt: "A comprehensive guide to DOMO's token economics, utility, and future prospects.",
    category: "Education",
    author: "Crypto Expert",
    date: "2024-03-01",
    readTime: "8 min",
    image: "https://picsum.photos/seed/5/800/400"
  }
];

const categories = [
  "All",
  "Announcements",
  "Updates",
  "Guides",
  "Community",
  "Education"
];

const formatTokens = (text: string) => {
  return text.split(/(\$DOMO|\$SOL)/).map((part, index) => {
    if (part === '$DOMO') return <span key={index} className="text-blue-400 font-medium">{part}</span>;
    if (part === '$SOL') return <span key={index} className="text-yellow-400 font-medium">{part}</span>;
    return <span key={index} className="text-gray-300">{part}</span>;
  });
};

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <PageLayout
      title="Blog"
      subtitle="Latest news, updates and guides"
    >
      {/* Featured Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredPosts.map(post => (
          <div
            key={post.id}
            className="bg-[#151835] rounded-lg overflow-hidden hover:bg-[#1a1f40] transition-colors cursor-pointer group"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                {formatTokens(post.title)}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {formatTokens(post.excerpt)}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-gray-300">{post.author}</span>
                  <CalendarIcon className="w-4 h-4 ml-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-[#151835] text-gray-300 hover:bg-[#1a1f40] hover:text-white'
            }`}
          >
            <TagIcon className="w-4 h-4" />
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.filter(post => !post.featured).map(post => (
          <div
            key={post.id}
            className="bg-[#151835] rounded-lg overflow-hidden hover:bg-[#1a1f40] transition-colors cursor-pointer group"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                {formatTokens(post.title)}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                {formatTokens(post.excerpt)}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-gray-300">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-12 bg-[#151835] rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <NewspaperIcon className="w-12 h-12 text-blue-400" />
            <div>
              <h3 className="text-xl font-medium text-white">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300">Get the latest updates and news directly in your inbox</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-[#1a1f40] rounded-lg text-gray-300 placeholder-gray-500 flex-1 md:w-64"
            />
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPage; 