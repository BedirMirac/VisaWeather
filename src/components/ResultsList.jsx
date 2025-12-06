import React from 'react';
import { Plane, Thermometer, ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';
import { useLanguage } from '../i18n/LanguageContext';

const ResultsList = ({ results, searchTriggered, selectedDate }) => {
    const { t } = useLanguage();

    if (!searchTriggered) {
        return (
            <div className="results-empty">
                <div className="empty-icon">🌍</div>
                <h3>{t('startExploring')}</h3>
                <p>{t('startExploringDesc')}</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="results-empty">
                <div className="empty-icon">😔</div>
                <h3>{t('noResults')}</h3>
                <p>{t('noResultsDesc')}</p>
            </div>
        );
    }

    const handleViewDetails = (bookingUrl) => {
        window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="results-container">
            <div className="results-header">
                <h2>🎯 {results.length} {t('destinationsFound')}</h2>
                {selectedDate && (
                    <span className="date-badge">
                        📅 {new Date(selectedDate).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                )}
            </div>

            <div className="results-grid">
                {results.map((country, index) => (
                    <div
                        key={country.code}
                        className="destination-card"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div
                            className="card-image"
                            style={{ backgroundImage: `url(${country.image})` }}
                        >
                            <div className="card-overlay"></div>
                            <div className="card-badges">
                                <span className="badge-visa">✓ {t('visaFree')}</span>
                                {country.isReturnFlight && (
                                    <span className="badge-return">🔙 {t('toIstanbul')}</span>
                                )}
                            </div>
                            <div className="card-info">
                                <h3>{country.city}</h3>
                                <p>{country.name}</p>
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="card-stats">
                                <div className="stat">
                                    <Thermometer size={16} />
                                    <span>{Math.round(country.temp)}°C</span>
                                </div>
                                <div className="stat">
                                    <Plane size={16} />
                                    <span className="price">${country.flightPrice}</span>
                                </div>
                            </div>

                            <button
                                className="btn-book"
                                onClick={() => handleViewDetails(country.bookingUrl)}
                            >
                                <ExternalLink size={16} />
                                {t('searchFlight')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ResultsList.propTypes = {
    results: PropTypes.array.isRequired,
    searchTriggered: PropTypes.bool.isRequired,
    selectedDate: PropTypes.string
};

export default ResultsList;
