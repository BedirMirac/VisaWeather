import React, { useState } from 'react';
import { fetchVisaStatus, fetchWeather, fetchFlightPrice, fetchReturnFlightPrice, generateBookingUrl } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapVisualizer from './components/MapVisualizer';
import ResultsList from './components/ResultsList';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const [filters, setFilters] = useState({
    passport: 'tr-red',
    weather: ['any'],
    flightType: 'one-way',
    departureDate: '',
    returnDate: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { t } = useLanguage();

  const handleSearch = async () => {
    // Clear previous error
    setErrorMessage(null);

    // Validate round-trip requires return date
    if (filters.flightType === 'round-trip' && !filters.returnDate) {
      setErrorMessage({
        title: t('returnDateRequired'),
        description: t('returnDateRequiredDesc')
      });
      return;
    }

    setLoading(true);
    setSearchTriggered(true);

    try {
      console.log('Starting search with filters:', filters);

      // Check if this is a return-only search (no departure but has return)
      const isReturnOnly = !filters.departureDate && filters.returnDate;

      const visaFreeCountries = await fetchVisaStatus(filters.passport);
      console.log(`Got ${visaFreeCountries.length} visa-free countries`);

      const countriesWithWeather = await Promise.all(
        visaFreeCountries.map(async (country) => {
          // For return-only, use return date for weather check
          const dateToCheck = isReturnOnly ? filters.returnDate : filters.departureDate;
          const weatherData = await fetchWeather(country.city, dateToCheck);
          return {
            ...country,
            weather: weatherData,
            temp: weatherData?.main?.temp || 20
          };
        })
      );

      let filtered = countriesWithWeather;

      // Filter logic: If 'any' is NOT selected, apply filters
      if (!filters.weather.includes('any') && filters.weather.length > 0) {
        filtered = countriesWithWeather.filter(country => {
          const temp = country.temp;
          // Check if ANY of the selected weather conditions match (OR logic)
          return filters.weather.some(condition => {
            switch (condition) {
              case 'sunny':
                return temp >= 20;
              case 'mild':
                return temp >= 10 && temp < 20;
              case 'snow':
                return temp < 5;
              default:
                return true;
            }
          });
        });
      }

      console.log(`After weather filter: ${filtered.length} countries`);

      const finalResults = await Promise.all(
        filtered.map(async (country) => {
          let flightData;

          if (isReturnOnly) {
            // Return flight: from destination to Istanbul
            flightData = await fetchReturnFlightPrice(
              country.code,
              country.city,
              filters.returnDate
            );
          } else {
            // Outbound flight: from Istanbul to destination
            flightData = await fetchFlightPrice(
              country.code,
              country.city,
              filters.departureDate
            );
          }

          const bookingUrl = generateBookingUrl(
            country.city,
            filters.departureDate,
            filters.returnDate
          );
          return {
            ...country,
            flightPrice: flightData.price,
            bookingUrl: bookingUrl,
            isReturnFlight: isReturnOnly
          };
        })
      );

      finalResults.sort((a, b) => a.flightPrice - b.flightPrice);

      console.log(`Final results: ${finalResults.length} destinations`);
      setResults(finalResults);

    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="app-container">
      <Navbar />

      <Hero
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Error Modal */}
      {errorMessage && (
        <div className="error-modal-overlay" onClick={closeError}>
          <div className="error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="error-icon">⚠️</div>
            <h3>{errorMessage.title}</h3>
            <p>{errorMessage.description}</p>
            <button className="error-close-btn" onClick={closeError}>Tamam</button>
          </div>
        </div>
      )}

      {/* Map Section - Full Width */}
      <section className="map-section-full">
        <MapVisualizer countries={results} />

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p style={{ marginTop: '16px', color: '#94a3b8' }}>{t('analyzing')}</p>
          </div>
        )}
      </section>

      {/* Results Section - Scrollable Grid */}
      <section className="results-section">
        <ResultsList
          results={results}
          searchTriggered={searchTriggered}
          selectedDate={filters.departureDate}
        />
      </section>
    </div>
  );
}

export default App;
