import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status); 

  // Debugging: Log authStatus
  console.log("Auth Status:", authStatus);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="mt-28">
            <div className="p-2 w-full">
              {/* Hero Section */}
              <h1 className="text-white text-6xl font-bold mb-4 animate-fade-in">
                Welcome to Our Blog Website
              </h1>
              <p className="text-xl text-white font-light mb-8 animate-fade-in delay-100">
                Discover insightful articles, tips, and stories from our writers.
              </p>
              {!authStatus && (
                <button
                  onClick={() => window.location.href = '/add-post'}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in delay-200"
                >
                  Start Writing
                </button>
              )}
            </div>
          </div>
        </Container>
        {!authStatus && (
          <section className="mb-16 text-center mt-28">
            <h2 className="text-3xl font-bold text-white mb-6">💬 What Our Readers Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Alice",
                  review: "I love the content here! Always fresh and insightful.",
                  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "Bob",
                  review: "A must-visit site for tech enthusiasts.",
                  avatar: "https://plus.unsplash.com/premium_photo-1723802432770-f37f0bce053c?q=80&w=1049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "Charlie",
                  review: "Fantastic articles. I learn something new every day!",
                  avatar: "https://plus.unsplash.com/premium_photo-1723489294202-775bec46c760?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
              ].map((testimonial, index) => {
                
                console.log("Testimonial:", testimonial);
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-purple-500"
                      />
                    </div>
                    <FaQuoteLeft className="text-purple-500 mx-auto mb-4" />
                    <p className="text-white text-lg italic">"{testimonial.review}"</p>
                    <FaQuoteRight className="text-purple-500 mx-auto mt-4" />
                    <p className="mt-4 text-gray-400 font-semibold">- {testimonial.name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-bold mb-4 animate-fade-in">
            Explore Our Blog
          </h1>
          <p className="text-xl text-white font-light mb-8 animate-fade-in delay-100">
            Dive into a world of knowledge, creativity, and inspiration.
          </p>
          {!authStatus && (
            <button
              onClick={() => window.location.href = '/add-post'}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in delay-200"
            >
              Start Writing
            </button>
          )}
        </div>

        {/* Featured Posts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">🔥 Featured Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </section>

        {/* Testimonial Section - Only for NOT Logged-in Users */}
        
      </Container>
    </div>
  );
}

export default Home;