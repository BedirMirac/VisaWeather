import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Navbar = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <nav className="navbar">
            <div className="brand">
                <div className="brand-icon">
                    <Globe size={24} />
                </div>
                <span className="brand-name">VisaWeather</span>
            </div>

            <div className="lang-toggle">
                <button
                    className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
                    onClick={() => setLanguage('tr')}
                >
                    TR
                </button>
                <button
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                >
                    EN
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
