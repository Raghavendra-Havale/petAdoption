import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import adSample from './assets/ad-sample.png';

function App() {
  const [activePet, setActivePet] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'Golden Retriever',
      age: '2 years',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Friendly and energetic, Max loves playing fetch and going on long walks. He\'s great with children and other dogs.'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Tabby Cat',
      age: '1 year',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Luna is a playful and affectionate cat who loves cuddles. She\'s litter-trained and gets along well with other cats.'
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Mixed Breed',
      age: '3 years',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Rocky is a loyal and protective companion. He\'s house-trained and knows basic commands.'
    }
  ];

  const advertisements = [
    {
      id: 1,
      title: "Premium Pet Food",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Quality nutrition for your beloved pets",
      link: "#"
    },
    {
      id: 2,
      title: "Pet Grooming Services",
      image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Professional grooming for all breeds",
      link: "#"
    },
    {
      id: 3,
      title: "Veterinary Care",
      image: "https://images.unsplash.com/photo-1628009368231-7bb5cf0e7d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Expert veterinary services near you",
      link: "#"
    }
  ];

  // Single ad image and link
  const adImage = adSample; // Now using the local image
  const adLink = "https://www.petmart.com/";

  // Timer for ad display
  const adDisplayTime = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const start = Date.now();
    timer.current = setInterval(() => {
      adDisplayTime.current = Date.now() - start;
    }, 1000);

    const handleUnload = () => {
      clearInterval(timer.current!);
      console.log('Ad was displayed for', (adDisplayTime.current / 1000).toFixed(1), 'seconds');
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      clearInterval(timer.current!);
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    };
  }, []);

  const handlePetClick = (petId: number) => {
    setActivePet(petId.toString());
    setShowModal(true);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">PetAdopt</div>
          <div className="nav-links">
            <a href="#featured">Featured Pets</a>
            <a href="#why-adopt">Why Adopt</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Give a Pet a Forever Home</h1>
          <p>Every pet deserves a loving family. Find your perfect companion today.</p>
          <div className="hero-buttons">
            <button className="cta-button primary">Adopt Now</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section id="featured" className="featured-pets">
        <h2>Featured Pets</h2>
        <div className="pets-grid">
          {pets.map(pet => (
            <div key={pet.id} className="pet-card" onClick={() => handlePetClick(pet.id)}>
              <div className="pet-image">
                <img src={pet.image} alt={pet.name} />
                <div className="pet-overlay">
                  <span>Click to learn more</span>
                </div>
              </div>
              <h3>{pet.name}</h3>
              <p>{pet.age} • {pet.type}</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="advertisement-section">
        <div className="single-ad-wrapper">
          <a
            href={adLink}
            target="_blank"
            rel="noopener noreferrer"
            className="single-ad-link"
            onClick={() => {
              console.log('Ad clicked!');
            }}
          >
            <img src={adImage} alt="Advertisement" className="single-ad-image" />
            <span className="ad-label">Ad</span>
          </a>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section id="why-adopt" className="why-adopt">
        <h2>Why Adopt?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">❤️</div>
            <h3>Save a Life</h3>
            <p>Give a homeless pet a second chance at life and love.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏠</div>
            <h3>Unconditional Love</h3>
            <p>Experience the joy of a pet's unconditional love and companionship.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌟</div>
            <h3>Make a Difference</h3>
            <p>Help reduce the number of animals in shelters and support our cause.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get Involved</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Us</h3>
            <div className="contact-details">
              <div className="contact-item">
                <span className="icon">📧</span>
                <p>info@petadoption.org</p>
              </div>
              <div className="contact-item">
                <span className="icon">📞</span>
                <p>(555) 123-4567</p>
              </div>
              <div className="contact-item">
                <span className="icon">📍</span>
                <p>123 Pet Street, Animal City</p>
              </div>
            </div>
          </div>
          <div className="volunteer">
            <h3>Volunteer</h3>
            <p>Join our team of dedicated volunteers and make a difference.</p>
            <button className="volunteer-btn">Become a Volunteer</button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && activePet && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
            {pets.find(pet => pet.id.toString() === activePet) && (
              <div className="modal-pet-info">
                <img src={pets.find(pet => pet.id.toString() === activePet)?.image} alt="Pet" />
                <h3>{pets.find(pet => pet.id.toString() === activePet)?.name}</h3>
                <p className="pet-type">{pets.find(pet => pet.id.toString() === activePet)?.type}</p>
                <p className="pet-age">{pets.find(pet => pet.id.toString() === activePet)?.age}</p>
                <p className="pet-description">{pets.find(pet => pet.id.toString() === activePet)?.description}</p>
                <button className="adopt-btn">Adopt {pets.find(pet => pet.id.toString() === activePet)?.name}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
