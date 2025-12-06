import React from 'react';
import { X, Thermometer, Plane, ExternalLink, MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import { useLanguage } from '../i18n/LanguageContext';

const CountryInfo = ({ country, onClose }) => {
    const { t } = useLanguage();

    const handleBookFlight = () => {
        window.open(country.bookingUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="country-info-panel">
            <button className="close-btn" onClick={onClose}>
                <X size={20} />
            </button>

            <div className="country-header">
                <img
                    src={country.image}
                    alt={country.name}
                    className="country-image"
                />
                <div className="country-title">
                    <h3>{country.city}</h3>
                    <p><MapPin size={14} /> {country.name}</p>
                </div>
            </div>

            <div className="country-stats">
                <div className="stat-item">
                    <Thermometer size={20} className="stat-icon temp" />
                    <div>
                        <span className="stat-value">{Math.round(country.temp)}°C</span>
                        <span className="stat-label">{country.weather?.weather?.[0]?.main || 'Clear'}</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Plane size={20} className="stat-icon price" />
                    <div>
                        <span className="stat-value">${country.flightPrice}</span>
                        <span className="stat-label">{t('estFlight')}</span>
                    </div>
                </div>
            </div>

            <div className="country-badge">
                <span className="visa-badge">✓ {t('visaFree')}</span>
            </div>

            <button className="book-flight-btn" onClick={handleBookFlight}>
                <ExternalLink size={18} />
                {t('searchFlight')}
            </button>
        </div>
    );
};

CountryInfo.propTypes = {
    country: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CountryInfo;
