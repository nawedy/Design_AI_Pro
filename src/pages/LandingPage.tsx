import React from 'react';
import Header from '../components/Header';
import Hero from '../components/landing/Hero';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#222831]">
      <Header />
      <Hero />
    </div>
  );
}