import React, { createContext, useContext, useState } from 'react';
import translations from './translations';
import PropTypes from 'prop-types';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('tr'); // Default Turkish

    const t = (key) => {
        return translations[language]?.[key] || translations['en']?.[key] || key;
    };

    const tOptions = (key) => {
        return translations[language]?.[key] || translations['en']?.[key] || {};
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, tOptions }}>
            {children}
        </LanguageContext.Provider>
    );
};

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
