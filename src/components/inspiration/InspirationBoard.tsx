import React, { useState } from 'react';
import { Plus, Link, Image as ImageIcon, Bookmark, ExternalLink } from 'lucide-react';

interface InspirationItem {
  id: string;
  type: 'image' | 'url';
  content: string;
  title: string;
  tags: string[];
}

export default function InspirationBoard() {
  const [items, setItems] = useState<InspirationItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ type: 'image', content: '', title: '', tags: '' });

  const addItem = () => {
    if (newItem.content && newItem.title) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          type: newItem.type as 'image' | 'url',
          content: newItem.content,
          title: newItem.title,
          tags: newItem.tags.split(',').map(tag => tag.trim()),
        },
      ]);
      setNewItem({ type: 'image', content: '', title: '', tags: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-[#222831] p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Inspiration Collection</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#FD7014] text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Inspiration</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-[#393E46] p-4 rounded-lg">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setNewItem({ ...newItem, type: 'image' })}
                className={`flex-1 p-3 rounded ${
                  newItem.type === 'image' ? 'bg-[#FD7014] text-white' : 'bg-[#222831] text-gray-300'
                }`}
              >
                <ImageIcon className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setNewItem({ ...newItem, type: 'url' })}
                className={`flex-1 p-3 rounded ${
                  newItem.type === 'url' ? 'bg-[#FD7014] text-white' : 'bg-[#222831] text-gray-300'
                }`}
              >
                <Link className="w-5 h-5 mx-auto" />
              </button>
            </div>
            <input
              type="text"
              placeholder={newItem.type === 'image' ? 'Image URL' : 'Website URL'}
              value={newItem.content}
              onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              className="w-full bg-[#222831] text-white p-2 rounded"
            />
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full bg-[#222831] text-white p-2 rounded"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={newItem.tags}
              onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
              className="w-full bg-[#222831] text-white p-2 rounded"
            />
            <div className="flex space-x-2">
              <button
                onClick={addItem}
                className="bg-[#FD7014] text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-[#393E46] text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#393E46] rounded-lg overflow-hidden">
            {item.type === 'image' ? (
              <img src={item.content} alt={item.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="h-48 flex items-center justify-center bg-[#222831]">
                <ExternalLink className="w-12 h-12 text-[#FD7014]" />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-white font-medium mb-2">{item.title}</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="bg-[#222831] text-gray-300 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              {item.type === 'url' && (
                <a
                  href={item.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center text-[#FD7014] hover:underline"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Visit
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}