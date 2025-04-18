//import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';
import { useSearch } from '../hooks/useSearch';
import ErrorBoundary from '../components/ErrorBoundary';

import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    isLoading,
    error,
    response,
    loadingProgress,
    handleSearch: executeSearch,
  } = useSearch();

  const [isBackendAvailable, setIsBackendAvailable] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseURL}/health`);
        setIsBackendAvailable(response.ok);
      } catch (error) {
        setIsBackendAvailable(false);
      }
    };

    checkBackend();
  }, []);

  // Progress bar component
  const ProgressBar = () => (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-4">
      <div 
        className="h-full bg-orange-500 transition-all duration-300 ease-out"
        style={{ width: `${loadingProgress}%` }}
      />
    </div>
  );

  const handleSearch = (searchQuery: string) => {
    if (!isBackendAvailable) {
      alert('Search service is currently unavailable. Please try again later.');
      return;
    }
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      executeSearch();
    }
  };

  // Search results fallback UI
  const SearchResultsFallback = () => (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Unable to display search results
      </h3>
      <p className="text-gray-600 mb-6">
        We encountered an issue while displaying the search results. The data might be in an unexpected format.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-nunito">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-[80vh] relative flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/01_Lady_Child_Family_BG.jpg"
            alt="Mother and child smiling"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white w-full">
          {/* User Type Selection */}
          <div className="mb-12">
            <div className="inline-flex rounded-full bg-white p-1 shadow-lg">
              <button className="px-8 py-3 rounded-full bg-primary text-white font-semibold transition-all">
                Tenant
              </button>
              <Link
                to="/Agent"
                className="px-8 py-3 rounded-full text-gray-700 hover:bg-gray-50 font-semibold transition-all"
              >
                Agent
              </Link>
            </div>
          </div>

          {/* Main Heading */}
          <h3 className="text-3xl md:text-6xl font-bold mb-6 font-archive leading-tight">
            Find Your Dream Home
          </h3>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
            We make finding and securing your home easy, every step of the way.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchInput
              onSearch={handleSearch}
              isLoading={isLoading}
              value={query}
              onChange={setQuery}
            />
            {isLoading && <ProgressBar />}
            {!isBackendAvailable && (
              <p className="text-yellow-500 mt-2">
                Search service is currently unavailable. Please try again later.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Display Search Results */}
      {(query || response || isLoading || error) && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ErrorBoundary fallback={<SearchResultsFallback />}>
              <SearchResults
                searchResponse={response}
                isLoading={isLoading}
                error={error}
              />
            </ErrorBoundary>
          </div>
        </section>
      )}

      {/**The new services section */}
<section className="relative py-20 bg-[#f9f5f0]">
  {/* Background Image (Blobs) */}
  <img 
    src="/images/middle-section.png" 
    alt="Decorative background"
    className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
  />

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Book Viewing Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">
        <div className="mb-8">
          <img
            src="/images/viewing-room.jpg"
            alt="Modern living room"
            className="w-full h-64 object-cover rounded-2xl"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        <h3 className="text-[#E65D24] text-3xl font-bold mb-4">Book Viewing</h3>
        <p className="text-gray-600 mb-8 flex-grow">
          Save time and effort with our AI-powered booking service. Simply enter your desired property details and let our system handle the rest.
        </p>
        <button 
        onClick={() => navigate('/bookviewing')}
        className="bg-[#E65D24] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-medium">
          Learn More
        </button>
      </div>

      {/* Referencing Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">
        <div className="mb-8">
          <img
            src="/images/referencing-person.jpg"
            alt="Professional woman with tablet"
            className="w-full h-64 object-cover rounded-2xl"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>
        <h3 className="text-[#E65D24] text-3xl font-bold mb-4">Referencing</h3>
        <p className="text-gray-600 mb-8 flex-grow">
          Ensure peace of mind for both landlords and tenants. Our rigorous referencing process verifies renter or buyer identity, financial stability, and rental history.
        </p>
        <button 
        onClick={() => navigate('/referencing')}
        className="bg-[#E65D24] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-medium">
          Learn More
        </button>
      </div>

      {/* Contract Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">
        <div className="mb-8">
          <img
            src="/images/modern-building.jpg"
            alt="Modern glass building"
            className="w-full h-64 object-cover rounded-2xl"
          />
        </div>
        <h3 className="text-[#E65D24] text-3xl font-bold mb-4">Contract</h3>
        <p className="text-gray-600 mb-8 flex-grow">
          Save time and reduce errors with our contract management solution. We offer a range of customizable lease agreement templates to suit your specific needs.
        </p>
        <button 
        onClick={() => navigate('/contracts')}
        className="bg-[#E65D24] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all text-lg font-medium">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>

      {/**End of the new services section */}

      <FAQSection />
      <Footer />

    </div>
  );
};

export default Home;