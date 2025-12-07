import React, { useState, useEffect, useRef } from 'react';
import { Globe, Search, ChevronDown, Check } from 'lucide-react';
import PropTypes from 'prop-types';
import { useLanguage } from '../i18n/LanguageContext';

const Hero = ({ filters, setFilters, onSearch, loading }) => {
    const { t, tOptions } = useLanguage();
    const passportOptions = tOptions('passportOptions');
    const flightTypeOptions = tOptions('flightTypeOptions');
    const weatherOptions = tOptions('weatherOptions');

    // State for custom dropdown visibility
    const [isWeatherOpen, setIsWeatherOpen] = useState(false);
    const weatherRef = useRef(null);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (weatherRef.current && !weatherRef.current.contains(event.target)) {
                setIsWeatherOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [weatherRef]);

    // Handler for flight type change
    const handleFlightTypeChange = (newType) => {
        setFilters({
            ...filters,
            flightType: newType,
            // Clear return date if switching to one-way
            returnDate: newType === 'one-way' ? '' : filters.returnDate
        });
    };

    // Handler for multi-select weather change
    const handleWeatherChange = (value) => {
        let newWeather = [...filters.weather];

        if (value === 'any') {
            newWeather = ['any'];
        } else {
            // Remove 'any' if generic selection was active
            if (newWeather.includes('any')) {
                newWeather = [];
            }

            if (newWeather.includes(value)) {
                // Deselect
                newWeather = newWeather.filter(item => item !== value);
            } else {
                // Select
                newWeather.push(value);
            }

            // If nothing selected, default back to 'any'
            if (newWeather.length === 0) {
                newWeather = ['any'];
            }
        }

        setFilters({ ...filters, weather: newWeather });
    };

    return (
        <div className="hero">
            <div className="hero-badge">
                <Globe size={16} />
                <span>{t('badge')}</span>
            </div>

            <h1 className="hero-title">
                {t('title1')}<br />
                <span className="text-gradient">{t('title2')}</span>
            </h1>

            <p className="hero-subtitle">
                {t('subtitle')}
            </p>

            {/* Filter Bar */}
            <div className="filter-bar">
                <div className="filter-group">
                    <label htmlFor="passport-select" className="filter-label">{t('passport')}</label>
                    <select
                        id="passport-select"
                        value={filters.passport}
                        onChange={(e) => setFilters({ ...filters, passport: e.target.value })}
                        className="filter-select"
                    >
                        {Object.entries(passportOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="flight-type-select" className="filter-label">{t('flightType')}</label>
                    <select
                        id="flight-type-select"
                        value={filters.flightType}
                        onChange={(e) => handleFlightTypeChange(e.target.value)}
                        className="filter-select"
                    >
                        {Object.entries(flightTypeOptions).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                {/* Custom Multi-Select Dropdown for Weather */}
                <div className="filter-group" ref={weatherRef}>
                    <label className="filter-label">{t('weather')}</label>
                    <div
                        className={`custom-select-trigger ${isWeatherOpen ? 'active' : ''}`}
                        onClick={() => setIsWeatherOpen(!isWeatherOpen)}
                    >
                        <span className="truncate-text">
                            {filters.weather.includes('any')
                                ? weatherOptions['any']
                                : filters.weather.map(w => weatherOptions[w]).join(', ')}
                        </span>
                        <ChevronDown size={14} className={`dropdown-arrow ${isWeatherOpen ? 'open' : ''}`} />
                    </div>

                    {isWeatherOpen && (
                        <div className="custom-select-options">
                            {Object.entries(weatherOptions).map(([value, label]) => (
                                <div
                                    key={value}
                                    className={`custom-option ${filters.weather.includes(value) ? 'selected' : ''}`}
                                    onClick={() => handleWeatherChange(value)}
                                >
                                    <span>{label}</span>
                                    {filters.weather.includes(value) && <Check size={14} className="check-icon" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="filter-group">
                    <label htmlFor="departure-date" className="filter-label">{t('departureDate')}</label>
                    <input
                        id="departure-date"
                        type="date"
                        value={filters.departureDate}
                        min={today}
                        onChange={(e) => setFilters({ ...filters, departureDate: e.target.value })}
                        className="filter-input"
                    />
                </div>

                {filters.flightType === 'round-trip' && (
                    <div className="filter-group">
                        <label htmlFor="return-date" className="filter-label">{t('returnDate')}</label>
                        <input
                            id="return-date"
                            type="date"
                            value={filters.returnDate}
                            min={filters.departureDate || today}
                            onChange={(e) => setFilters({ ...filters, returnDate: e.target.value })}
                            className="filter-input"
                        />
                    </div>
                )}

                <button
                    onClick={onSearch}
                    disabled={loading}
                    className="btn-explore"
                >
                    {loading ? (
                        <>{t('searching')}</>
                    ) : (
                        <><Search size={20} /> {t('explore')}</>
                    )}
                </button>
            </div>
        </div>
    );
};

Hero.propTypes = {
    filters: PropTypes.shape({
        passport: PropTypes.string,
        flightType: PropTypes.string,
        weather: PropTypes.arrayOf(PropTypes.string),
        departureDate: PropTypes.string,
        returnDate: PropTypes.string
    }).isRequired,
    setFilters: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default Hero;
