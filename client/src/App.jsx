import { useState, useEffect } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './App.css';
import goaVideo from './goa_video.mp4';

const img = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

/* 10 destinations from different parts of India */
const places = [
  {
    name: 'Goa',
    region: 'BEACHES',
    slug: 'goa',
    caption: 'Sun, sand & serenity',
    image: '/goa.jpg',
  },
  {
    name: 'Manali',
    region: 'HIMACHAL PRADESH',
    slug: 'manali',
    caption: 'Mountains & adventure',
    image: 'photo-1626621341517-bbf3d9990a23',
  },
  {
    name: 'Kerala',
    region: 'BACKWATERS',
    slug: 'kerala',
    caption: 'Peaceful backwaters',
    image: 'photo-1602216056096-3b40cc0c9944',
  },
  {
    name: 'Varanasi',
    region: 'UTTAR PRADESH',
    slug: 'varanasi',
    caption: 'Spiritual & cultural heritage',
    image: "/varanasi.jpeg",
  },
  {
    name: 'Rajasthan',
    region: 'ROYAL RAJASTHAN',
    slug: 'rajasthan',
    caption: 'Forts, camels & desert sunsets',
    image: 'photo-1477587458883-47145ed94245',
  },
  {
    name: 'Tamil Nadu',
    region: 'SOUTH INDIA',
    slug: 'tamil-nadu',
    caption: 'Temples & timeless heritage',
    image: '/tamilnadu.jpg',
  },
  {
    name: 'Kashmir',
    region: 'JAMMU & KASHMIR',
    slug: 'kashmir',
    caption: 'Lakes, valleys & snow',
    image: 'photo-1595815771614-ade9d652a65d',
  },
  {
    name: 'Meghalaya',
    region: 'NORTHEAST INDIA',
    slug: 'meghalaya',
    caption: 'Waterfalls & living roots',
    image: 'photo-1448375240586-882707db888b',
  },
  {
    name: 'Hampi',
    region: 'KARNATAKA',
    slug: 'hampi',
    caption: 'Ruins & ancient wonders',
   image: "/hampi.jpg",
  },
  {
    name: 'Andaman',
    region: 'ISLAND ESCAPES',
    slug: 'andaman',
    caption: 'Turquoise waters & island life',
    image: 'photo-1510414842594-a61c69b5ae57',
  },
];

const experiences = {
  goa: [
    { name: 'Beaches', caption: 'Sun, sand & serenity', image: 'photo-1512343879784-a960bf40e7f2' },
    { name: 'Nightlife', caption: 'Clubs, bars & parties', image: 'photo-1470229722913-7c0e2dbbafd3' },
    { name: 'Water Sports', caption: 'Adventure awaits', image: 'photo-1544551763-46a013bb70d5' },
    { name: 'Heritage', caption: 'Churches & old Goa', image: 'photo-1582510003544-4d00b7f74220' },
    { name: 'Food', caption: 'Local flavours', image: 'photo-1547592180-85f173990554' },
  ],
  manali: [
    { name: 'Mountains', caption: 'Himalayan views', image: 'photo-1464822759023-fed622ff2c3b' },
    { name: 'Snow Adventures', caption: 'Winter escapes', image: 'photo-1626621341517-bbf3d9990a23' },
    { name: 'Mountain Trails', caption: 'Explore the hills', image: 'photo-1464278533981-50106e6171b1' },
    { name: 'River Rafting', caption: 'Adventure awaits', image: 'photo-1530866495561-507c9faab2ed' },
    { name: 'Local Cafés', caption: 'Food with a view', image: 'photo-1501339847302-ac426a4a7cbb' },
  ],
  kerala: [
    { name: 'Backwaters', caption: 'Peaceful waters', image: 'photo-1602216056096-3b40cc0c9944' },
    { name: 'Green Escapes', caption: 'Lush landscapes', image: 'photo-1448375240586-882707db888b' },
    { name: 'Tea Gardens', caption: 'Misty hill country', image: 'photo-1500530855697-b586d89ba3ee' },
    { name: 'Beaches', caption: 'Coastal calm', image: 'photo-1512343879784-a960bf40e7f2' },
    { name: 'Local Food', caption: 'Fresh local cuisine', image: 'photo-1547592180-85f173990554' },
  ],
  varanasi: [
    { name: 'Ganga Ghats', caption: 'Sunrise by the river', image: 'photo-1561361513-2d000a50f0dc' },
    { name: 'Temple Trails', caption: 'Sacred architecture', image: 'photo-1600100397608-f0101e7f8f5e' },
    { name: 'Evening Aarti', caption: 'A memorable experience', image: 'photo-1512343879784-a960bf40e7f2' },
    { name: 'Old Streets', caption: 'Culture in every lane', image: 'photo-1582510003544-4d00b7f74220' },
    { name: 'Local Food', caption: 'Taste the city', image: 'photo-1547592180-85f173990554' },
  ],
  rajasthan: [
    { name: 'Desert Safari', caption: 'Camels & golden dunes', image: 'photo-1477587458883-47145ed94245' },
    { name: 'Royal Forts', caption: 'History carved in stone', image: 'photo-1599661046827-dacff0c0f09a' },
    { name: 'Palaces', caption: 'Royal architecture', image: 'photo-1602216056096-3b40cc0c9944' },
    { name: 'Old Markets', caption: 'Colourful local crafts', image: 'photo-1500530855697-b586d89ba3ee' },
    { name: 'Local Food', caption: 'Traditional flavours', image: 'photo-1547592180-85f173990554' },
  ],
  'tamil-nadu': [
    { name: 'Temple Trails', caption: 'Historic architecture', image: 'photo-1600100397608-f0101e7f8f5e' },
    { name: 'Culture', caption: 'Traditions & stories', image: 'photo-1582510003544-4d00b7f74220' },
    { name: 'Coastal Escapes', caption: 'Explore the coastline', image: 'photo-1512343879784-a960bf40e7f2' },
    { name: 'Old Streets', caption: 'Local life & colour', image: 'photo-1599661046827-dacff0c0f09a' },
    { name: 'Local Food', caption: 'Authentic flavours', image: 'photo-1547592180-85f173990554' },
  ],
  kashmir: [
    { name: 'Dal Lake', caption: 'Houseboats & reflections', image: 'photo-1595815771614-ade9d652a65d' },
    { name: 'Mountain Valleys', caption: 'Scenic Himalayan views', image: 'photo-1464822759023-fed622ff2c3b' },
    { name: 'Snow Adventures', caption: 'Winter escapes', image: 'photo-1626621341517-bbf3d9990a23' },
    { name: 'Pine Forests', caption: 'Quiet natural escapes', image: 'photo-1448375240586-882707db888b' },
    { name: 'Local Food', caption: 'Regional specialities', image: 'photo-1547592180-85f173990554' },
  ],
  meghalaya: [
    { name: 'Green Hills', caption: 'Misty landscapes', image: 'photo-1448375240586-882707db888b' },
    { name: 'Waterfalls', caption: 'Nature at its best', image: 'photo-1432405972618-c60b0225b8f9' },
    { name: 'Lake Escapes', caption: 'Quiet waters', image: 'photo-1501785888041-af3ef285b470' },
    { name: 'Living Root Bridges', caption: 'Nature and local ingenuity', image: 'photo-1500530855697-b586d89ba3ee' },
    { name: 'Cafés & Food', caption: 'Local favourites', image: 'photo-1501339847302-ac426a4a7cbb' },
  ],
  hampi: [
    { name: 'Ancient Ruins', caption: 'Explore historic wonders', image: 'photo-1606293926075-69a00dbfde81' },
    { name: 'Stone Temples', caption: 'Architecture & heritage', image: 'photo-1599661046827-dacff0c0f09a' },
    { name: 'Rocky Landscapes', caption: 'Unique scenery', image: 'photo-1500530855697-b586d89ba3ee' },
    { name: 'River Views', caption: 'Peaceful riverside moments', image: 'photo-1501785888041-af3ef285b470' },
    { name: 'Local Food', caption: 'Taste regional favourites', image: 'photo-1547592180-85f173990554' },
  ],
  andaman: [
    { name: 'Island Beaches', caption: 'Turquoise waters', image: 'photo-1510414842594-a61c69b5ae57' },
    { name: 'Snorkelling', caption: 'Discover marine life', image: 'photo-1544551763-46a013bb70d5' },
    { name: 'Island Hopping', caption: 'Explore tropical islands', image: 'photo-1500375592092-40eb2168fd21' },
    { name: 'Sunset Views', caption: 'Golden-hour moments', image: 'photo-1507525428034-b723cf961d3e' },
    { name: 'Seafood', caption: 'Fresh coastal flavours', image: 'photo-1547592180-85f173990554' },
  ],
};

const travelPackages = [
  {
    id: 'solo',
    title: 'Solo Explorer',
    type: 'SOLO TRIP',
    price: '₹6,999',
    per: 'per person',
    duration: '3 Days / 2 Nights',
    description: 'Explore at your own pace, from local attractions to hidden gems.',
    features: ['Budget-friendly stay suggestion', 'Local sightseeing ideas', 'One guided experience suggestion'],
    image: 'photo-1512343879784-a960bf40e7f2',
  },
  {
    id: 'couple',
    title: 'Couple Getaway',
    type: 'COUPLE SPECIAL',
    price: '₹18,999',
    per: 'for 2 people',
    duration: '3 Days / 2 Nights',
    description: 'Sunset spots, relaxing experiences and memorable moments for two.',
    features: ['Double-room stay suggestion', 'Sunset experience', 'Romantic dinner suggestion'],
    image: 'photo-1500375592092-40eb2168fd21',
    featured: true,
  },
  {
    id: 'family',
    title: 'Family Holiday',
    type: 'FAMILY TRIP',
    price: '₹24,999',
    per: 'for a family of 4',
    duration: '4 Days / 3 Nights',
    description: 'A relaxed family escape with sightseeing and activities for different ages.',
    features: ['Family-room suggestion', 'Family-friendly sightseeing', 'Flexible itinerary'],
    image: 'photo-1500530855697-b586d89ba3ee',
  },
];

const itineraries = [
  { name: 'Beach Getaway', label: 'BEACH VIBES', days: '3 Days', detail: 'Beaches + Local Food', price: '₹8,999', image: 'photo-1512343879784-a960bf40e7f2' },
  { name: 'Mountain Escape', label: 'HILLS & NATURE', days: '5 Days', detail: 'Mountains + Scenic Trails', price: '₹14,999', image: 'photo-1626621341517-bbf3d9990a23' },
  { name: 'Royal Rajasthan', label: 'CULTURE TRIP', days: '4 Days', detail: 'Forts + Desert + Food', price: '₹12,999', image: 'photo-1477587458883-47145ed94245' },
];

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-symbol">☼</span>
        <span>
          tripora<span className="brand-dot">.</span>
          <small>YOUR JOURNEY · YOUR INDIA</small>
        </span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Destinations</Link>
        <Link to="/plan">Trip Planner</Link>
        <a href="/#trips">Travel Guides</a>
      </nav>

      <div className="nav-actions">
        <Link to="/explore" className="nav-symbol" aria-label="Search">⌕</Link>
        <Link to="/login" className="nav-symbol" aria-label="Saved trips">♡</Link>
        <Link to="/plan" className="nav-cta">Plan My Trip <span>→</span></Link>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, link = '/explore', action = 'View all' }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2><i />{title}</h2>
      </div>
      <Link to={link} className="section-link">{action} <span>→</span></Link>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [from, setFrom] = useState('Pune');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2 Travelers');

  const activePlace = places[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % places.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function search(event) {
    event.preventDefault();
    navigate(
      `/plan?from=${encodeURIComponent(from)}&to=${encodeURIComponent(destination)}&duration=3 Days&travelers=${encodeURIComponent(travelers)}&date=${encodeURIComponent(date)}`
    );
  }

  function previousSlide() {
    setActiveSlide((current) => (current - 1 + places.length) % places.length);
  }

  function nextSlide() {
    setActiveSlide((current) => (current + 1) % places.length);
  }

  return (
    <>
      <section className="home-hero">
        {/* Same-size background: only the image changes */}
       <div
  key={activePlace.slug}
  className="home-hero-photo hero-background-slide"
  style={{
    backgroundImage: `url("${
  activePlace.image.startsWith("photo-")
    ? img(activePlace.image, 2200)
    : activePlace.image
}")`,
  }}
/>

        <div className="home-hero-overlay" />

        <div className="home-hero-copy">
          <p className="hero-eyebrow">EXPLORE INCREDIBLE INDIA</p>

          <h1>
            Discover India,
            <br />
            one trip at a time.
          </h1>

          <p>
            Personalized trips, real experiences and hidden gems —
            <br className="desktop-break" /> all in one place.
          </p>
        </div>

        <button
          className="hero-slide-arrow hero-slide-previous"
          type="button"
          onClick={previousSlide}
          aria-label="Previous destination"
        >
          ‹
        </button>

        <button
          className="hero-slide-arrow hero-slide-next"
          type="button"
          onClick={nextSlide}
          aria-label="Next destination"
        >
          ›
        </button>

        <div className="hero-active-destination" key={activePlace.slug}>
          <span className="hero-location-icon">⌖</span>
          <div>
            <h2>{activePlace.name}</h2>
            <span className="hero-location-line" />
            <p>{activePlace.caption}</p>
          </div>
        </div>

        <div className="hero-slide-progress" aria-label="Slideshow progress">
          <div className="hero-progress-bars">
            {places.map((place, index) => (
              <button
                type="button"
                key={place.slug}
                className={index === activeSlide ? 'active' : ''}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${place.name}`}
              />
            ))}
          </div>
          <span>{String(activeSlide + 1).padStart(2, '0')} / 10</span>
        </div>

        <form className="home-search" onSubmit={search}>
          <label className="search-cell">
            <span className="search-icon">⌖</span>
            <span>
              <small>From</small>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {['Pune', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'].map(city => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </span>
          </label>

          <label className="search-cell">
            <span className="search-icon">⌁</span>
            <span>
              <small>Where to?</small>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destinations"
              />
            </span>
          </label>

          <label className="search-cell">
            <span className="search-icon">▦</span>
            <span>
              <small>When</small>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </span>
          </label>

          <label className="search-cell">
            <span className="search-icon">♙</span>
            <span>
              <small>Travelers</small>
              <select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
                {['1 Traveler', '2 Travelers', '3 Travelers', '4 Travelers', '5+ Travelers'].map(person => (
                  <option key={person}>{person}</option>
                ))}
              </select>
            </span>
          </label>

          <button className="search-button" type="submit">
            Explore Trips <span>→</span>
          </button>
        </form>
      </section>

      <main className="home-content">
        <section className="popular-section">
          <SectionHeading
            eyebrow="EXPLORE INCREDIBLE INDIA"
            title="Popular Destinations"
            action="Explore all"
          />

          <p className="section-description">
            From tropical beaches and Himalayan valleys to royal forts and ancient temples.
          </p>

          <div className="popular-grid">
            {places.map(place => (
              <Link
                to={`/destinations/${place.slug}`}
                className="popular-card"
                key={place.slug}
              >
               <img
  src={
    place.image.startsWith("/")
      ? place.image
      : img(place.image, 700)
  }
  alt={place.name}
  loading="lazy"
/>
                <span className="image-shade" />
                <span className="popular-card-caption">
                  <span>
                    <strong>{place.name}</strong>
                    <small>{place.region}</small>
                  </span>
                  <span className="round-arrow">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="itinerary-section" id="trips">
          <SectionHeading
            eyebrow="TRIP IDEAS"
            title="Popular Itineraries"
            link="/plan"
            action="Plan your own"
          />

          <p className="section-description">
            Curated plans for every kind of traveller — from beach holidays to mountain adventures.
          </p>

          <div className="itinerary-grid">
            {itineraries.map(trip => (
              <article className="itinerary-card" key={trip.name}>
                <div className="itinerary-photo">
                  <img src={img(trip.image, 750)} alt={trip.name} loading="lazy" />
                  <span className="itinerary-tag">{trip.label}</span>
                </div>

                <div className="itinerary-details">
                  <h3>{trip.days} – {trip.name}</h3>
                  <p>{trip.days} · {trip.detail}</p>

                  <div className="itinerary-price">
                    <span>
                      <strong>{trip.price}</strong>
                      <small> per person · estimated</small>
                    </span>
                    <Link
                      to={`/plan?to=${encodeURIComponent(trip.name)}`}
                      className="round-arrow dark-arrow"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="planner-banner" id="planner">
          <img
            src={img('photo-1500375592092-40eb2168fd21', 1800)}
            alt="Beautiful coastal escape"
            loading="lazy"
          />
          <div className="planner-banner-shade" />

          <div className="planner-banner-copy">
            <small>YOUR TRIP, YOUR WAY</small>
            <h2>Let AI Plan It for You</h2>
            <p>Tell us your preferences and get a personalized itinerary.</p>
            <div className="planner-perks">
              <span>✳ Smart itineraries</span>
              <span>⌖ Local suggestions</span>
              <span>₹ Budget friendly</span>
            </div>
          </div>

          <QuickPlanner />
        </section>
      </main>

      <footer className="footer">
        <Link to="/" className="brand">
          <span className="brand-symbol">☼</span>
          <span>
            tripora<span className="brand-dot">.</span>
            <small>YOUR JOURNEY · YOUR INDIA</small>
          </span>
        </Link>
        <p>Same place, new stories.</p>
        <Link to="/plan">Plan your next journey →</Link>
      </footer>
    </>
  );
}

function QuickPlanner() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('Pune');
  const [duration, setDuration] = useState('3 Days');
  const [travelers, setTravelers] = useState('2 People');
  const [style, setStyle] = useState('Relaxing');

  function submit(event) {
    event.preventDefault();
    navigate(
      `/plan?from=${encodeURIComponent(from)}&to=Goa&duration=${encodeURIComponent(duration)}&travelers=${encodeURIComponent(travelers)}&style=${encodeURIComponent(style)}`
    );
  }

  return (
    <form className="quick-planner" onSubmit={submit}>
      <div className="quick-fields">
        <label>
          <small>From</small>
          <select value={from} onChange={e => setFrom(e.target.value)}>
            {['Pune', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad'].map(city => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          <small>Duration</small>
          <select value={duration} onChange={e => setDuration(e.target.value)}>
            {['3 Days', '5 Days', '7 Days'].map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          <small>Travellers</small>
          <select value={travelers} onChange={e => setTravelers(e.target.value)}>
            {['1 Person', '2 People', '3 People', '4 People', '5+ People'].map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <small className="style-label">Travel Style</small>

      <div className="style-choices">
        {['Relaxing', 'Adventure', 'Culture', 'Food', 'Party'].map(item => (
          <button
            type="button"
            key={item}
            className={style === item ? 'style-choice selected' : 'style-choice'}
            onClick={() => setStyle(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="quick-submit" type="submit">
        Generate My Trip <span>→</span>
      </button>
    </form>
  );
}

function DestinationPage() {
  const { slug } = useParams();
  const place = places.find(item => item.slug === slug);
  const name = place?.name || 'India';
  const items = experiences[slug] || experiences.goa;
  const [active, setActive] = useState(0);

  return (
    <>
      <section className="cinematic-hero destination-full-page">
        <video
          className="cinematic-video"
          autoPlay
          muted
          loop
          playsInline
          poster={img(place?.image || places[0].image, 2200)}
        >
          <source src={goaVideo} type="video/mp4" />
        </video>

        <div className="cinematic-shade" />

        <nav className="cinematic-nav">
          <Link to="/" className="cinematic-logo">
            <span className="logo-symbol">☼</span>
            <span>
              <strong>tripora.</strong>
              <small>YOUR JOURNEY · YOUR INDIA</small>
            </span>
          </Link>

          <div className="cinematic-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Destinations</Link>
            <Link to="/plan">Trip Planner</Link>
            <a href="/#trips">Travel Guides</a>
          </div>

          <Link to="/plan" className="cinematic-nav-button">
            Plan My Trip <span>→</span>
          </Link>
        </nav>

        <div className="cinematic-main">
          <div className="cinematic-intro">
            <p className="cinematic-breadcrumb">
              <Link to="/explore">DESTINATIONS</Link>
              <span>/</span>
              {name.toUpperCase()}
            </p>

            <h1>Make {name}<br />your next<br /><em>escape.</em></h1>

            <p className="cinematic-description">
              {`Discover the sights, local flavours and unforgettable experiences of ${name}.`}
            </p>
          </div>

          <div className="cinematic-card-area">
            <div className="cinematic-cards">
              {items.slice(0, 5).map((item, index) => (
                <button
                  type="button"
                  className={`cinematic-card ${active === index ? 'cinematic-card-active' : ''}`}
                  key={item.name}
                  onClick={() => setActive(index)}
                  aria-label={`Explore ${item.name}`}
                >
                  <img src={img(item.image, 700)} alt={item.name} />
                  <span className="cinematic-card-shade" />
                  <span className="cinematic-card-copy">
                    <span className="cinematic-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <strong>{item.name}</strong>
                    <small>{item.caption}</small>
                    <span className="cinematic-card-arrow">↗</span>
                  </span>
                </button>
              ))}
            </div>

            <a href="#travel-packages" className="view-all-plans">
              View All Plans
            </a>
          </div>
        </div>
      </section>

      <section id="travel-packages" className="travel-packages-section">
        <div className="travel-packages-heading">
          <p className="section-eyebrow">CHOOSE YOUR {name.toUpperCase()} ESCAPE</p>
          <h2>Find a trip that feels <em>like you.</em></h2>
          <p>Thoughtfully planned packages for solo travellers, couples and families.</p>
        </div>

        <div className="travel-packages-grid">
          {travelPackages.map(pkg => (
            <article
              className={`travel-package-card ${pkg.featured ? 'travel-package-featured' : ''}`}
              key={pkg.id}
            >
              <div className="travel-package-image">
                <img src={img(pkg.image, 850)} alt={pkg.title} loading="lazy" />
                <span className="travel-package-tag">{pkg.type}</span>
              </div>

              <div className="travel-package-content">
                <p className="travel-package-duration">{pkg.duration}</p>
                <h3>{pkg.title}</h3>
                <p className="travel-package-description">{pkg.description}</p>

                <ul>
                  {pkg.features.map(feature => (
                    <li key={feature}><span>✓</span>{feature}</li>
                  ))}
                </ul>

                <div className="travel-package-bottom">
                  <div className="travel-package-price">
                    <strong>{pkg.price}</strong>
                    <small>{pkg.per}</small>
                  </div>

                  <Link
                    className="travel-package-details"
                    to={`/plan?to=${encodeURIComponent(name)}&style=${encodeURIComponent(pkg.id)}`}
                  >
                    View Details <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="travel-package-note">
          Prices are sample estimates, not live booking quotes. Final costs depend on travel dates and selected services.
        </p>
      </section>
    </>
  );
}

function PlanPage() {
  const params = new URLSearchParams(window.location.search);
  const [from, setFrom] = useState(params.get('from') || 'Pune');
  const [to, setTo] = useState(params.get('to') || '');
  const [duration, setDuration] = useState(params.get('duration') || '3 Days');
  const [travelers, setTravelers] = useState(params.get('travelers') || '2 Travelers');
  const [budget, setBudget] = useState('₹10,000 – ₹20,000');
  const [style, setStyle] = useState(params.get('style') || 'Relaxing');
  const [interests, setInterests] = useState(['Nature', 'Food']);
  const navigate = useNavigate();

  function toggleInterest(item) {
    setInterests(current =>
      current.includes(item)
        ? current.filter(value => value !== item)
        : [...current, item]
    );
  }

  function submit(event) {
    event.preventDefault();
    navigate(
      `/itinerary?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to || 'Goa')}&duration=${encodeURIComponent(duration)}&travelers=${encodeURIComponent(travelers)}&budget=${encodeURIComponent(budget)}&style=${encodeURIComponent(style)}&interests=${encodeURIComponent(interests.join(','))}`
    );
  }

  return (
    <main className="plan-page">
      <div className="plan-heading">
        <p className="section-eyebrow">YOUR TRIP, YOUR WAY</p>
        <h1>Let's plan something <em>unforgettable.</em></h1>
        <p>Tell us a little about your trip and we'll create a suggested itinerary.</p>
      </div>

      <form className="plan-form" onSubmit={submit}>
        <div className="plan-fields">
          <label>
            Starting city
            <select value={from} onChange={e => setFrom(e.target.value)}>
              {['Pune', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'].map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>

          <label>
            Destination
            <input
              required
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="e.g. Kerala"
            />
          </label>

          <label>
            Duration
            <select value={duration} onChange={e => setDuration(e.target.value)}>
              {['2 Days', '3 Days', '4 Days', '5 Days', '7 Days', '10 Days'].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Travellers
            <select value={travelers} onChange={e => setTravelers(e.target.value)}>
              {['1 Traveler', '2 Travelers', '3 Travelers', '4 Travelers', '5+ Travelers'].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Estimated budget
            <select value={budget} onChange={e => setBudget(e.target.value)}>
              {['Under ₹5,000', '₹5,000 – ₹10,000', '₹10,000 – ₹20,000', '₹20,000 – ₹40,000', '₹40,000+'].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="form-section-label">Travel style</p>
        <div className="plan-choices">
          {['Relaxing', 'Adventure', 'Culture', 'Food', 'Party'].map(item => (
            <button
              type="button"
              key={item}
              className={style === item ? 'style-choice selected' : 'style-choice'}
              onClick={() => setStyle(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="form-section-label">Interests</p>
        <div className="plan-choices">
          {['Nature', 'Beaches', 'History', 'Food', 'Shopping', 'Nightlife', 'Temples', 'Wildlife'].map(item => (
            <button
              type="button"
              key={item}
              className={interests.includes(item) ? 'style-choice selected' : 'style-choice'}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="search-button plan-submit" type="submit">
          Generate My Trip <span>→</span>
        </button>

        <small className="disclaimer">
          Generated plans and prices are estimates, not live booking offers.
        </small>
      </form>
    </main>
  );
}

function ItineraryPage() {
  const params = new URLSearchParams(window.location.search);
  const destination = params.get('to') || 'Goa';
  const duration = params.get('duration') || '3 Days';
  const count = Math.min(Math.max(parseInt(duration, 10) || 3, 1), 10);

  const days = [
    ['Arrival & local discovery', 'Arrive, settle in and explore the nearby area.'],
    ['Signature sights', 'Visit a well-known local attraction and enjoy regional food.'],
    ['Local experiences', 'Choose an outdoor activity or cultural experience.'],
    ['Beyond the centre', 'Explore a nearby natural or historic attraction.'],
    ['Slow travel day', 'Enjoy a relaxed morning and discover local cafés.'],
    ['Hidden gems', 'Leave time for lesser-known stops and local recommendations.'],
    ['Nature & culture', 'Enjoy local landscapes, heritage and regional flavours.'],
  ];

  return (
    <main className="itinerary-page">
      <p className="section-eyebrow">YOUR PERSONAL TRAVEL OUTLINE</p>
      <h1>Your {destination} itinerary<span>.</span></h1>
      <p>{duration} · Suggested travel plan</p>

      <div className="disclaimer-box">
        This is a suggested itinerary. Confirm local opening times, transport and current prices before travelling.
      </div>

      {Array.from({ length: count }, (_, index) => (
        <article className="day-row" key={index}>
          <strong>DAY {String(index + 1).padStart(2, '0')}</strong>
          <div>
            <h2>{days[index % days.length][0]}</h2>
            <p>{days[index % days.length][1]}</p>
          </div>
        </article>
      ))}

      <Link className="nav-cta" to="/plan">Edit trip preferences →</Link>
    </main>
  );
}

function SimplePage({ title, description }) {
  return (
    <main className="simple-page">
      <p className="section-eyebrow">YOUR JOURNEY · YOUR INDIA</p>
      <h1>{title}<span>.</span></h1>
      <p>{description}</p>
      <Link className="nav-cta" to="/plan">Plan a trip →</Link>
    </main>
  );
}

function ExplorePage() {
  return (
    <main className="plan-page">
      <div className="plan-heading">
        <p className="section-eyebrow">EXPLORE INDIA</p>
        <h1>Find your next <em>escape.</em></h1>
        <p>From beaches and mountains to royal cities and hidden gems.</p>
      </div>

      <div className="popular-grid">
        {places.map(place => (
          <Link
            to={`/destinations/${place.slug}`}
            className="popular-card"
            key={place.slug}
          >
            <img src={img(place.image, 700)} alt={place.name} loading="lazy" />
            <span className="image-shade" />
            <span className="popular-card-caption">
              <span>
                <strong>{place.name}</strong>
                <small>{place.region}</small>
              </span>
              <span className="round-arrow">↗</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/explore" element={<><Navbar /><ExplorePage /></>} />
        <Route path="/destinations/:slug" element={<DestinationPage />} />
        <Route path="/plan" element={<><Navbar /><PlanPage /></>} />
        <Route path="/itinerary" element={<><Navbar /><ItineraryPage /></>} />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <SimplePage
                title="Welcome back"
                description="Your saved journeys will appear here once authentication is connected."
              />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <SimplePage
                title="Start your story"
                description="Create your Tripora account to keep your journeys together."
              />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <SimplePage
                title="A little detour"
                description="Let's get you back to your next adventure."
              />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;