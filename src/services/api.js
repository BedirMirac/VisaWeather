import axios from 'axios';

// =====================================================
// COMPREHENSIVE VISA-FREE COUNTRY DATABASE
// Based on Passport Index data for Turkish passports (2025)
// Source: passportindex.org/passport/turkey/
// =====================================================

const ALL_COUNTRIES = [
    // ==================== BALKANS ====================
    { code: 'RS', name: 'Serbia', city: 'Belgrade', lat: 44.7866, lon: 20.4489, image: 'https://images.unsplash.com/photo-1555990538-1e7e9a624d85?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'ME', name: 'Montenegro', city: 'Podgorica', lat: 42.4304, lon: 19.2594, image: 'https://images.unsplash.com/photo-1565628551897-03472097e3f7?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BA', name: 'Bosnia and Herzegovina', city: 'Sarajevo', lat: 43.8563, lon: 18.4131, image: 'https://images.unsplash.com/photo-1586861256632-3e8d3e3d0d90?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'AL', name: 'Albania', city: 'Tirana', lat: 41.3275, lon: 19.8187, image: 'https://images.unsplash.com/photo-1565628551897-03472097e3f7?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MK', name: 'North Macedonia', city: 'Skopje', lat: 41.9981, lon: 21.4254, image: 'https://images.unsplash.com/photo-1577086665223-26112e1e6737?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'XK', name: 'Kosovo', city: 'Pristina', lat: 42.6629, lon: 21.1655, image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== EASTERN EUROPE ====================
    { code: 'UA', name: 'Ukraine', city: 'Kyiv', lat: 50.4501, lon: 30.5234, image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MD', name: 'Moldova', city: 'Chisinau', lat: 47.0105, lon: 28.8638, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BY', name: 'Belarus', city: 'Minsk', lat: 53.9006, lon: 27.5590, image: 'https://images.unsplash.com/photo-1588084806146-b24a0dbc5a27?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== CAUCASUS ====================
    { code: 'GE', name: 'Georgia', city: 'Tbilisi', lat: 41.7151, lon: 44.8271, image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 360 },
    { code: 'AZ', name: 'Azerbaijan', city: 'Baku', lat: 40.4093, lon: 49.8671, image: 'https://images.unsplash.com/photo-1596541223943-2882103f56b2?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== CENTRAL ASIA ====================
    { code: 'KZ', name: 'Kazakhstan', city: 'Almaty', lat: 43.2220, lon: 76.8512, image: 'https://images.unsplash.com/photo-1562906980-1f48b0f1f8e9?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'KG', name: 'Kyrgyzstan', city: 'Bishkek', lat: 42.8746, lon: 74.5698, image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'UZ', name: 'Uzbekistan', city: 'Tashkent', lat: 41.2995, lon: 69.2401, image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'MN', name: 'Mongolia', city: 'Ulaanbaatar', lat: 47.8864, lon: 106.9057, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== EAST ASIA ====================
    { code: 'JP', name: 'Japan', city: 'Tokyo', lat: 35.6762, lon: 139.6503, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'KR', name: 'South Korea', city: 'Seoul', lat: 37.5665, lon: 126.9780, image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'HK', name: 'Hong Kong', city: 'Hong Kong', lat: 22.3193, lon: 114.1694, image: 'https://images.unsplash.com/photo-1536599018102-9f803c979e65?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MO', name: 'Macao', city: 'Macao', lat: 22.1987, lon: 113.5439, image: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== SOUTHEAST ASIA ====================
    { code: 'TH', name: 'Thailand', city: 'Bangkok', lat: 13.7563, lon: 100.5018, image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MY', name: 'Malaysia', city: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'SG', name: 'Singapore', city: 'Singapore', lat: 1.3521, lon: 103.8198, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'ID', name: 'Indonesia', city: 'Bali', lat: -8.3405, lon: 115.0920, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 14 },
    { code: 'PH', name: 'Philippines', city: 'Manila', lat: 14.5995, lon: 120.9842, image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'BN', name: 'Brunei', city: 'Bandar Seri Begawan', lat: 4.9031, lon: 114.9398, image: 'https://images.unsplash.com/photo-1578469645742-46cae011e1e4?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'VN', name: 'Vietnam', city: 'Hanoi', lat: 21.0285, lon: 105.8542, image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'KH', name: 'Cambodia', city: 'Phnom Penh', lat: 11.5564, lon: 104.9282, image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'TL', name: 'Timor-Leste', city: 'Dili', lat: -8.5569, lon: 125.5603, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== SOUTH ASIA ====================
    { code: 'LK', name: 'Sri Lanka', city: 'Colombo', lat: 6.9271, lon: 79.8612, image: 'https://images.unsplash.com/photo-1566296440373-f9d405f4a5c7?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'NP', name: 'Nepal', city: 'Kathmandu', lat: 27.7172, lon: 85.3240, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BD', name: 'Bangladesh', city: 'Dhaka', lat: 23.8103, lon: 90.4125, image: 'https://images.unsplash.com/photo-1566296440373-f9d405f4a5c7?w=400', visaFree: ['tr-green'], stayDays: 90 },
    { code: 'PK', name: 'Pakistan', city: 'Islamabad', lat: 33.6844, lon: 73.0479, image: 'https://images.unsplash.com/photo-1566296440373-f9d405f4a5c7?w=400', visaFree: ['tr-green'], stayDays: 90 },

    // ==================== ADDITIONAL CENTRAL ASIA ====================
    { code: 'TJ', name: 'Tajikistan', city: 'Dushanbe', lat: 38.5598, lon: 68.7740, image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=400', visaFree: ['tr-green'], stayDays: 60 },
    { code: 'TM', name: 'Turkmenistan', city: 'Ashgabat', lat: 37.9601, lon: 58.3261, image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400', visaFree: ['tr-green'], stayDays: 30 },

    // ==================== EAST ASIA (Additional) ====================
    { code: 'CN', name: 'China', city: 'Beijing', lat: 39.9042, lon: 116.4074, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'TW', name: 'Taiwan', city: 'Taipei', lat: 25.0330, lon: 121.5654, image: 'https://images.unsplash.com/photo-1508564804979-52453aeb8f64?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== MIDDLE EAST ====================
    { code: 'JO', name: 'Jordan', city: 'Amman', lat: 31.9454, lon: 35.9284, image: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'IR', name: 'Iran', city: 'Tehran', lat: 35.6892, lon: 51.3890, image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400', visaFree: ['tr-red', 'tr-green'], stayDays: 90 },
    { code: 'QA', name: 'Qatar', city: 'Doha', lat: 25.2854, lon: 51.5310, image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'AE', name: 'United Arab Emirates', city: 'Dubai', lat: 25.2048, lon: 55.2708, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BH', name: 'Bahrain', city: 'Manama', lat: 26.2235, lon: 50.5876, image: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'KW', name: 'Kuwait', city: 'Kuwait City', lat: 29.3759, lon: 47.9774, image: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'LB', name: 'Lebanon', city: 'Beirut', lat: 33.8938, lon: 35.5018, image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'IL', name: 'Israel', city: 'Tel Aviv', lat: 32.0853, lon: 34.7818, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'IQ', name: 'Iraq', city: 'Baghdad', lat: 33.3152, lon: 44.3661, image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400', visaFree: ['tr-green'], stayDays: 30 },
    { code: 'SY', name: 'Syria', city: 'Damascus', lat: 33.5138, lon: 36.2765, image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400', visaFree: ['tr-green'], stayDays: 90 },
    { code: 'OM', name: 'Oman', city: 'Muscat', lat: 23.5880, lon: 58.3829, image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== AFRICA ====================
    { code: 'MA', name: 'Morocco', city: 'Marrakech', lat: 31.6295, lon: -7.9811, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'TN', name: 'Tunisia', city: 'Tunis', lat: 36.8065, lon: 10.1815, image: 'https://images.unsplash.com/photo-1572454591674-2739f30a2c80?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'ZA', name: 'South Africa', city: 'Cape Town', lat: -33.9249, lon: 18.4241, image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'MU', name: 'Mauritius', city: 'Port Louis', lat: -20.1609, lon: 57.5012, image: 'https://images.unsplash.com/photo-1586979079203-f4f0a8f47f7f?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'BW', name: 'Botswana', city: 'Gaborone', lat: -24.6282, lon: 25.9231, image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'SZ', name: 'Eswatini', city: 'Mbabane', lat: -26.3054, lon: 31.1367, image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3cce?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'GM', name: 'Gambia', city: 'Banjul', lat: 13.4549, lon: -16.5790, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'AO', name: 'Angola', city: 'Luanda', lat: -8.8390, lon: 13.2894, image: 'https://images.unsplash.com/photo-1598790550199-5a969b5f70f1?w=400', visaFree: ['tr-red', 'tr-green'], stayDays: 30 },
    { code: 'GQ', name: 'Equatorial Guinea', city: 'Malabo', lat: 3.7523, lon: 8.7741, image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', visaFree: ['tr-red', 'tr-green'], stayDays: 90 },
    { code: 'ZM', name: 'Zambia', city: 'Lusaka', lat: -15.3875, lon: 28.3228, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'ST', name: 'Sao Tome and Principe', city: 'Sao Tome', lat: 0.1864, lon: 6.6131, image: 'https://images.unsplash.com/photo-1518854982826-535457690d07?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 15 },
    { code: 'DZ', name: 'Algeria', city: 'Algiers', lat: 36.7538, lon: 3.0588, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400', visaFree: ['tr-green'], stayDays: 90 },
    { code: 'LY', name: 'Libya', city: 'Tripoli', lat: 32.8872, lon: 13.1913, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400', visaFree: ['tr-green'], stayDays: 90 },
    { code: 'EG', name: 'Egypt', city: 'Cairo', lat: 30.0444, lon: 31.2357, image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'KE', name: 'Kenya', city: 'Nairobi', lat: -1.2921, lon: 36.8219, image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'TZ', name: 'Tanzania', city: 'Dar es Salaam', lat: -6.7924, lon: 39.2083, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CM', name: 'Cameroon', city: 'Yaounde', lat: 3.8480, lon: 11.5021, image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', visaFree: ['tr-green'], stayDays: 90 },
    { code: 'SN', name: 'Senegal', city: 'Dakar', lat: 14.7167, lon: -17.4677, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'GH', name: 'Ghana', city: 'Accra', lat: 5.6037, lon: -0.1870, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-green'], stayDays: 60 },
    { code: 'MG', name: 'Madagascar', city: 'Antananarivo', lat: -18.8792, lon: 47.5079, image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'ZW', name: 'Zimbabwe', city: 'Harare', lat: -17.8292, lon: 31.0522, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MZ', name: 'Mozambique', city: 'Maputo', lat: -25.9692, lon: 32.5732, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'SD', name: 'Sudan', city: 'Khartoum', lat: 15.5007, lon: 32.5599, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400', visaFree: ['tr-green'], stayDays: 30 },
    { code: 'DJ', name: 'Djibouti', city: 'Djibouti', lat: 11.5886, lon: 43.1456, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'RW', name: 'Rwanda', city: 'Kigali', lat: -1.9403, lon: 29.8739, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'TG', name: 'Togo', city: 'Lome', lat: 6.1256, lon: 1.2254, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CI', name: 'Ivory Coast', city: 'Abidjan', lat: 5.3600, lon: -4.0083, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-green'], stayDays: 90 },
    { code: 'MR', name: 'Mauritania', city: 'Nouakchott', lat: 18.0735, lon: -15.9582, image: 'https://images.unsplash.com/photo-1590845947667-381579052389?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CV', name: 'Cape Verde', city: 'Praia', lat: 14.9205, lon: -23.5087, image: 'https://images.unsplash.com/photo-1518854982826-535457690d07?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== SOUTH AMERICA ====================
    { code: 'BR', name: 'Brazil', city: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'AR', name: 'Argentina', city: 'Buenos Aires', lat: -34.6037, lon: -58.3816, image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CL', name: 'Chile', city: 'Santiago', lat: -33.4489, lon: -70.6693, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CO', name: 'Colombia', city: 'Bogota', lat: 4.7110, lon: -74.0721, image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'PE', name: 'Peru', city: 'Lima', lat: -12.0464, lon: -77.0428, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 180 },
    { code: 'EC', name: 'Ecuador', city: 'Quito', lat: -0.1807, lon: -78.4678, image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'UY', name: 'Uruguay', city: 'Montevideo', lat: -34.9011, lon: -56.1645, image: 'https://images.unsplash.com/photo-1597006220214-8899d8f15b68?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'PY', name: 'Paraguay', city: 'Asuncion', lat: -25.2637, lon: -57.5759, image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BO', name: 'Bolivia', city: 'La Paz', lat: -16.4897, lon: -68.1193, image: 'https://images.unsplash.com/photo-1591631367756-8e7c4f3f5b77?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'VE', name: 'Venezuela', city: 'Caracas', lat: 10.4806, lon: -66.9036, image: 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== CENTRAL AMERICA ====================
    { code: 'PA', name: 'Panama', city: 'Panama City', lat: 8.9824, lon: -79.5199, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CR', name: 'Costa Rica', city: 'San Jose', lat: 9.9281, lon: -84.0907, image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'GT', name: 'Guatemala', city: 'Guatemala City', lat: 14.6349, lon: -90.5069, image: 'https://images.unsplash.com/photo-1547366325-75e1bfc4a8e1?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'HN', name: 'Honduras', city: 'Tegucigalpa', lat: 14.0723, lon: -87.1921, image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'SV', name: 'El Salvador', city: 'San Salvador', lat: 13.6929, lon: -89.2182, image: 'https://images.unsplash.com/photo-1551279880-03041531948f?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 180 },
    { code: 'NI', name: 'Nicaragua', city: 'Managua', lat: 12.1149, lon: -86.2362, image: 'https://images.unsplash.com/photo-1600014810909-a54f5e88297d?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BZ', name: 'Belize', city: 'Belmopan', lat: 17.2510, lon: -88.7590, image: 'https://images.unsplash.com/photo-1548041347-390744c58da1?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== CARIBBEAN ====================
    { code: 'DO', name: 'Dominican Republic', city: 'Punta Cana', lat: 18.5601, lon: -68.3725, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'JM', name: 'Jamaica', city: 'Kingston', lat: 17.9714, lon: -76.7936, image: 'https://images.unsplash.com/photo-1587905069134-008460d7a636?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'TT', name: 'Trinidad and Tobago', city: 'Port of Spain', lat: 10.6596, lon: -61.5086, image: 'https://images.unsplash.com/photo-1569385210018-127685363ce4?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'BB', name: 'Barbados', city: 'Bridgetown', lat: 13.1132, lon: -59.5988, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BS', name: 'Bahamas', city: 'Nassau', lat: 25.0343, lon: -77.3963, image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 240 },
    { code: 'AG', name: 'Antigua and Barbuda', city: "St. John's", lat: 17.1274, lon: -61.8468, image: 'https://images.unsplash.com/photo-1580523097587-5f1e3a1d4c8c?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 180 },
    { code: 'DM', name: 'Dominica', city: 'Roseau', lat: 15.3017, lon: -61.3881, image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 21 },
    { code: 'LC', name: 'Saint Lucia', city: 'Castries', lat: 14.0101, lon: -60.9875, image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 42 },
    { code: 'VC', name: 'St. Vincent and the Grenadines', city: 'Kingstown', lat: 13.1587, lon: -61.2248, image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'HT', name: 'Haiti', city: 'Port-au-Prince', lat: 18.5944, lon: -72.3074, image: 'https://images.unsplash.com/photo-1582908831032-7e4cb1e4e42f?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MX', name: 'Mexico', city: 'Mexico City', lat: 19.4326, lon: -99.1332, image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'GY', name: 'Guyana', city: 'Georgetown', lat: 6.8013, lon: -58.1551, image: 'https://images.unsplash.com/photo-1586979079203-f4f0a8f47f7f?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CU', name: 'Cuba', city: 'Havana', lat: 23.1136, lon: -82.3666, image: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'GD', name: 'Grenada', city: "St. George's", lat: 12.0561, lon: -61.7488, image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'KN', name: 'Saint Kitts and Nevis', city: 'Basseterre', lat: 17.3026, lon: -62.7177, image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== PACIFIC ====================
    { code: 'FJ', name: 'Fiji', city: 'Suva', lat: -18.1248, lon: 178.4501, image: 'https://images.unsplash.com/photo-1558985212-76fc17e73d29?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 120 },
    { code: 'FM', name: 'Micronesia', city: 'Palikir', lat: 6.9166, lon: 158.1580, image: 'https://images.unsplash.com/photo-1607227063002-677dc5fdf96f?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'WS', name: 'Samoa', city: 'Apia', lat: -13.8333, lon: -171.7500, image: 'https://images.unsplash.com/photo-1558985212-76fc17e73d29?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 60 },
    { code: 'TO', name: 'Tonga', city: "Nuku'alofa", lat: -21.2114, lon: -175.1998, image: 'https://images.unsplash.com/photo-1558985212-76fc17e73d29?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 31 },
    { code: 'PW', name: 'Palau', city: 'Ngerulmud', lat: 7.5000, lon: 134.6243, image: 'https://images.unsplash.com/photo-1558985212-76fc17e73d29?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'VU', name: 'Vanuatu', city: 'Port Vila', lat: -17.7334, lon: 168.3273, image: 'https://images.unsplash.com/photo-1558985212-76fc17e73d29?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'TV', name: 'Tuvalu', city: 'Funafuti', lat: -8.5167, lon: 179.2167, image: 'https://images.unsplash.com/photo-1558985212-76fc17e73d29?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },

    // ==================== INDIAN OCEAN ====================
    { code: 'MV', name: 'Maldives', city: 'Male', lat: 4.1755, lon: 73.5093, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'SC', name: 'Seychelles', city: 'Victoria', lat: -4.6191, lon: 55.4513, image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'], stayDays: 90 },

    // ==================== EUROPE (Schengen - Green Passport Only) ====================
    { code: 'DE', name: 'Germany', city: 'Berlin', lat: 52.5200, lon: 13.4050, image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'FR', name: 'France', city: 'Paris', lat: 48.8566, lon: 2.3522, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'IT', name: 'Italy', city: 'Rome', lat: 41.9028, lon: 12.4964, image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'ES', name: 'Spain', city: 'Madrid', lat: 40.4168, lon: -3.7038, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'NL', name: 'Netherlands', city: 'Amsterdam', lat: 52.3676, lon: 4.9041, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BE', name: 'Belgium', city: 'Brussels', lat: 50.8503, lon: 4.3517, image: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'PT', name: 'Portugal', city: 'Lisbon', lat: 38.7223, lon: -9.1393, image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'GR', name: 'Greece', city: 'Athens', lat: 37.9838, lon: 23.7275, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'AT', name: 'Austria', city: 'Vienna', lat: 48.2082, lon: 16.3738, image: 'https://images.unsplash.com/photo-1516550893923-42d28e5a5e90?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CH', name: 'Switzerland', city: 'Zurich', lat: 47.3769, lon: 8.5417, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'CZ', name: 'Czech Republic', city: 'Prague', lat: 50.0755, lon: 14.4378, image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'PL', name: 'Poland', city: 'Warsaw', lat: 52.2297, lon: 21.0122, image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'HU', name: 'Hungary', city: 'Budapest', lat: 47.4979, lon: 19.0402, image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 30 },
    { code: 'SE', name: 'Sweden', city: 'Stockholm', lat: 59.3293, lon: 18.0686, image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'NO', name: 'Norway', city: 'Oslo', lat: 59.9139, lon: 10.7522, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'DK', name: 'Denmark', city: 'Copenhagen', lat: 55.6761, lon: 12.5683, image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'FI', name: 'Finland', city: 'Helsinki', lat: 60.1699, lon: 24.9384, image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'IS', name: 'Iceland', city: 'Reykjavik', lat: 64.1466, lon: -21.9426, image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'IE', name: 'Ireland', city: 'Dublin', lat: 53.3498, lon: -6.2603, image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'LU', name: 'Luxembourg', city: 'Luxembourg', lat: 49.6116, lon: 6.1319, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MT', name: 'Malta', city: 'Valletta', lat: 35.8989, lon: 14.5146, image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'SK', name: 'Slovakia', city: 'Bratislava', lat: 48.1486, lon: 17.1077, image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'SI', name: 'Slovenia', city: 'Ljubljana', lat: 46.0569, lon: 14.5058, image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'EE', name: 'Estonia', city: 'Tallinn', lat: 59.4370, lon: 24.7536, image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'LV', name: 'Latvia', city: 'Riga', lat: 56.9496, lon: 24.1052, image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'LT', name: 'Lithuania', city: 'Vilnius', lat: 54.6872, lon: 25.2797, image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'HR', name: 'Croatia', city: 'Zagreb', lat: 45.8150, lon: 15.9819, image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'BG', name: 'Bulgaria', city: 'Sofia', lat: 42.6977, lon: 23.3219, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'RO', name: 'Romania', city: 'Bucharest', lat: 44.4268, lon: 26.1025, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'AD', name: 'Andorra', city: 'Andorra la Vella', lat: 42.5063, lon: 1.5218, image: 'https://images.unsplash.com/photo-1589459072535-550f4fae08d2?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'MC', name: 'Monaco', city: 'Monaco', lat: 43.7384, lon: 7.4246, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'SM', name: 'San Marino', city: 'San Marino', lat: 43.9424, lon: 12.4578, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'LI', name: 'Liechtenstein', city: 'Vaduz', lat: 47.1410, lon: 9.5209, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'VA', name: 'Vatican City', city: 'Vatican City', lat: 41.9029, lon: 12.4534, image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400', visaFree: ['tr-green', 'us', 'eu'], stayDays: 90 },
    { code: 'RU', name: 'Russia', city: 'Moscow', lat: 55.7558, lon: 37.6173, image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400', visaFree: ['tr-green'], stayDays: 30 },

    // UK (Not Schengen, separate rules)
    { code: 'GB', name: 'United Kingdom', city: 'London', lat: 51.5074, lon: -0.1278, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', visaFree: ['us', 'eu'], stayDays: 180 },
];

// =====================================================
// MOCK WEATHER DATA - Based on Real Climate Averages
// Each country has monthly average temperatures (°C)
// Data based on historical climate data
// =====================================================
const CLIMATE_DATA = {
    // BALKANS - Continental climate with cold winters, warm summers
    'Belgrade': [1, 3, 8, 14, 19, 22, 24, 24, 19, 13, 7, 2],
    'Podgorica': [5, 7, 10, 14, 19, 23, 26, 26, 22, 16, 10, 6],
    'Sarajevo': [0, 2, 6, 11, 16, 19, 21, 21, 17, 12, 6, 1],
    'Tirana': [7, 8, 11, 14, 19, 23, 26, 26, 22, 17, 12, 8],
    'Skopje': [1, 4, 9, 14, 18, 22, 25, 25, 20, 14, 7, 2],
    'Pristina': [0, 2, 7, 12, 16, 20, 22, 22, 18, 12, 6, 1],

    // EASTERN EUROPE
    'Kyiv': [-4, -3, 2, 10, 16, 20, 22, 21, 15, 9, 2, -2],
    'Chisinau': [-2, 0, 5, 12, 17, 21, 23, 23, 18, 11, 5, 0],
    'Minsk': [-5, -4, 0, 8, 14, 18, 20, 19, 13, 7, 1, -3],

    // CAUCASUS
    'Tbilisi': [2, 4, 8, 14, 18, 22, 25, 25, 21, 15, 8, 4],
    'Baku': [4, 4, 7, 13, 18, 23, 26, 26, 23, 16, 11, 6],

    // CENTRAL ASIA - Continental, extreme temperatures
    'Almaty': [-5, -3, 4, 12, 17, 22, 25, 24, 18, 10, 2, -3],
    'Bishkek': [-3, 0, 7, 14, 19, 24, 27, 26, 20, 12, 4, -1],
    'Tashkent': [2, 5, 11, 18, 23, 28, 31, 29, 23, 15, 9, 4],
    'Ulaanbaatar': [-21, -16, -6, 3, 11, 17, 19, 17, 10, 0, -11, -18],

    // EAST ASIA - Varied climates
    'Tokyo': [6, 6, 10, 15, 19, 23, 27, 28, 24, 18, 13, 8],
    'Seoul': [-2, 1, 6, 13, 18, 23, 26, 27, 22, 15, 7, 0],
    'Hong Kong': [16, 17, 19, 23, 27, 29, 29, 29, 28, 26, 22, 18],
    'Macao': [15, 16, 18, 22, 26, 28, 29, 29, 28, 25, 21, 17],

    // SOUTHEAST ASIA - Tropical, warm year-round
    'Bangkok': [27, 28, 30, 31, 30, 29, 29, 28, 28, 28, 27, 26],
    'Kuala Lumpur': [27, 28, 28, 28, 28, 28, 27, 27, 27, 27, 27, 27],
    'Singapore': [27, 27, 28, 28, 28, 28, 28, 28, 27, 27, 27, 27],
    'Bali': [27, 27, 27, 27, 27, 26, 25, 26, 26, 27, 28, 27],
    'Manila': [26, 27, 28, 30, 30, 29, 28, 28, 28, 28, 27, 26],
    'Bandar Seri Begawan': [27, 27, 28, 28, 28, 28, 27, 27, 27, 27, 27, 27],

    // MIDDLE EAST - Hot, dry
    'Amman': [8, 9, 13, 17, 22, 25, 27, 27, 26, 22, 15, 10],
    'Tehran': [3, 5, 10, 16, 21, 27, 30, 29, 25, 17, 10, 5],

    // NORTH AFRICA
    'Marrakech': [12, 14, 17, 19, 23, 27, 31, 31, 27, 22, 17, 13],
    'Tunis': [11, 12, 14, 17, 21, 25, 28, 29, 26, 21, 16, 12],

    // SOUTHERN & CENTRAL AFRICA (Southern Hemisphere - reversed seasons)
    'Cape Town': [21, 21, 20, 17, 14, 12, 12, 12, 14, 16, 18, 20],
    'Port Louis': [27, 27, 26, 25, 23, 21, 20, 20, 21, 23, 25, 26],
    'Gaborone': [26, 25, 24, 21, 17, 13, 13, 16, 21, 24, 25, 26],
    'Mbabane': [21, 21, 20, 17, 14, 11, 11, 14, 17, 19, 20, 21],
    'Banjul': [24, 25, 26, 27, 28, 28, 27, 27, 27, 28, 27, 25],
    'Luanda': [27, 27, 28, 27, 25, 22, 20, 21, 23, 25, 26, 27],
    'Malabo': [25, 26, 26, 26, 25, 24, 23, 23, 24, 24, 25, 25],
    'Lusaka': [21, 21, 21, 19, 16, 13, 13, 16, 21, 24, 24, 22],
    'Sao Tome': [26, 26, 27, 26, 26, 24, 23, 23, 24, 25, 25, 26],

    // SOUTH AMERICA - Southern Hemisphere
    'Rio de Janeiro': [27, 27, 26, 24, 22, 21, 21, 21, 22, 23, 24, 26],
    'Buenos Aires': [25, 24, 22, 17, 14, 11, 10, 12, 14, 17, 20, 23],
    'Santiago': [21, 20, 18, 14, 11, 8, 8, 9, 12, 15, 17, 20],
    'Bogota': [14, 15, 15, 14, 14, 14, 13, 14, 14, 14, 14, 14],
    'Lima': [23, 24, 23, 21, 19, 17, 16, 16, 17, 18, 19, 22],
    'Quito': [15, 15, 15, 14, 14, 14, 14, 15, 15, 15, 15, 15],
    'Montevideo': [23, 22, 20, 16, 13, 10, 10, 11, 13, 15, 18, 21],
    'Asuncion': [28, 28, 26, 23, 19, 17, 17, 19, 21, 24, 26, 27],
    'La Paz': [12, 12, 12, 11, 9, 8, 7, 9, 11, 13, 14, 13],
    'Caracas': [21, 22, 23, 24, 24, 23, 22, 23, 23, 23, 22, 21],

    // CENTRAL AMERICA
    'Panama City': [27, 28, 28, 28, 27, 27, 27, 27, 26, 26, 26, 27],
    'San Jose': [20, 21, 22, 22, 22, 21, 21, 21, 21, 21, 20, 20],
    'Guatemala City': [17, 18, 20, 21, 21, 20, 19, 20, 19, 19, 18, 17],
    'Tegucigalpa': [19, 20, 22, 23, 23, 22, 21, 21, 21, 21, 20, 19],
    'San Salvador': [23, 24, 25, 26, 25, 24, 24, 24, 23, 23, 23, 23],
    'Managua': [27, 28, 29, 30, 29, 27, 27, 27, 26, 26, 27, 27],
    'Belmopan': [24, 25, 27, 29, 29, 28, 27, 28, 27, 26, 25, 24],

    // CARIBBEAN - Tropical
    'Punta Cana': [25, 25, 26, 27, 27, 28, 28, 28, 28, 28, 27, 26],
    'Kingston': [26, 26, 27, 27, 28, 28, 28, 28, 28, 28, 27, 26],
    'Port of Spain': [26, 26, 27, 28, 28, 27, 27, 27, 27, 27, 27, 26],
    'Bridgetown': [26, 26, 27, 27, 28, 28, 28, 28, 28, 28, 27, 27],
    'Nassau': [21, 22, 23, 25, 27, 28, 29, 29, 28, 27, 24, 22],
    "St. John's": [25, 25, 26, 27, 28, 28, 28, 28, 28, 28, 27, 26],
    'Roseau': [25, 25, 26, 27, 28, 28, 28, 28, 28, 27, 27, 26],
    'Castries': [26, 26, 27, 27, 28, 28, 28, 28, 28, 28, 27, 26],
    'Kingstown': [26, 26, 27, 27, 28, 28, 28, 28, 28, 28, 27, 26],
    'Port-au-Prince': [25, 26, 27, 28, 28, 28, 29, 29, 28, 28, 27, 26],

    // PACIFIC ISLANDS
    'Suva': [27, 27, 27, 26, 25, 24, 23, 23, 24, 25, 26, 27],
    'Palikir': [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],

    // INDIAN OCEAN
    'Male': [28, 29, 29, 30, 29, 28, 28, 28, 28, 28, 28, 28],
    'Victoria': [27, 27, 27, 28, 27, 26, 26, 26, 27, 27, 27, 27],

    // WESTERN EUROPE
    'Berlin': [1, 2, 5, 10, 15, 18, 20, 20, 15, 10, 5, 2],
    'Paris': [5, 6, 9, 12, 16, 19, 21, 21, 17, 13, 8, 5],
    'Rome': [8, 9, 12, 14, 19, 23, 26, 26, 22, 17, 12, 9],
    'Barcelona': [10, 11, 13, 15, 19, 23, 26, 26, 23, 18, 13, 10],
    'Amsterdam': [4, 4, 7, 10, 14, 17, 19, 19, 16, 12, 7, 4],
    'Brussels': [4, 4, 7, 10, 14, 17, 19, 19, 16, 12, 7, 4],
    'Lisbon': [12, 13, 15, 16, 18, 21, 24, 24, 22, 19, 15, 12],
    'Athens': [10, 11, 13, 17, 22, 27, 30, 29, 25, 20, 15, 11],
    'Vienna': [1, 2, 6, 11, 16, 19, 22, 21, 17, 11, 5, 2],
    'Zurich': [1, 2, 6, 10, 15, 18, 20, 20, 16, 10, 5, 2],
    'Prague': [0, 1, 5, 10, 15, 18, 20, 20, 15, 10, 4, 1],
    'Warsaw': [-2, -1, 3, 9, 15, 18, 20, 19, 14, 9, 3, -1],
    'Budapest': [1, 3, 7, 12, 17, 21, 23, 22, 18, 12, 6, 2],

    // NORDIC COUNTRIES
    'Stockholm': [-1, -1, 2, 7, 12, 17, 19, 18, 13, 8, 3, 0],
    'Oslo': [-3, -2, 2, 7, 13, 17, 19, 18, 13, 7, 2, -2],
    'Copenhagen': [2, 2, 4, 9, 14, 17, 19, 19, 15, 10, 6, 3],
    'Helsinki': [-4, -5, -1, 5, 11, 16, 19, 17, 12, 6, 1, -3],

    // UK
    'London': [5, 5, 8, 11, 14, 17, 19, 19, 16, 12, 8, 5],
};

// Weather conditions based on temperature and month
const getWeatherCondition = (temp, month) => {
    // Winter months in Northern Hemisphere
    const isWinterNorth = month >= 11 || month <= 2;
    // Summer months in Northern Hemisphere  
    const isSummerNorth = month >= 5 && month <= 8;

    if (temp <= 0) return 'Snow';
    if (temp <= 5) return isWinterNorth ? 'Clouds' : 'Clear';
    if (temp <= 15) return 'Clouds';
    if (temp <= 22) return 'Clear';
    if (temp <= 28) return 'Clear';
    return 'Clear'; // Hot weather is usually clear
};

// =====================================================
// WEATHER FUNCTION - Uses Mock Climate Data
// Returns average temperature for the month of travel
// =====================================================
export const fetchWeather = async (city, dateString) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Get the month from the date string (0-indexed)
            let month;
            if (dateString) {
                const date = new Date(dateString);
                month = date.getMonth();
            } else {
                // Use current month if no date provided
                month = new Date().getMonth();
            }

            // Get climate data for the city
            const temperatures = CLIMATE_DATA[city];

            if (temperatures) {
                const temp = temperatures[month];
                // Add small random variation (-2 to +2 degrees) for realism
                const variation = (Math.random() * 4) - 2;
                const finalTemp = Math.round((temp + variation) * 10) / 10;

                const weatherCondition = getWeatherCondition(temp, month);

                console.log(`🌡️ Mock weather for ${city} (Month ${month + 1}): ${finalTemp}°C`);

                resolve({
                    main: { temp: finalTemp },
                    weather: [{ main: weatherCondition }]
                });
            } else {
                // Fallback for cities not in our database
                // Use a reasonable default based on latitude approximation
                console.warn(`⚠️ No climate data for ${city}, using fallback`);
                const fallbackTemp = 18 + (Math.random() * 10) - 5;
                resolve({
                    main: { temp: Math.round(fallbackTemp * 10) / 10 },
                    weather: [{ main: 'Clear' }]
                });
            }
        }, 100); // Simulate small delay for UX
    });
};

// =====================================================
// VISA STATUS - Filter Countries by Passport
// =====================================================
export const fetchVisaStatus = async (passportType) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const accessible = ALL_COUNTRIES.filter(country =>
                country.visaFree.includes(passportType)
            );
            console.log(`Found ${accessible.length} visa-free countries for ${passportType}`);
            resolve(accessible);
        }, 300);
    });
};

// =====================================================
// AMADEUS API CREDENTIALS (from environment variables)
// Get your free test API key from: https://developers.amadeus.com/register
// =====================================================
const AMADEUS_CONFIG = {
    API_KEY: import.meta.env.VITE_AMADEUS_API_KEY,
    API_SECRET: import.meta.env.VITE_AMADEUS_API_SECRET,
    BASE_URL: 'https://test.api.amadeus.com'
};

// Cache for access token
let amadeusAccessToken = null;
let tokenExpiry = null;

// IATA airport codes mapping
const AIRPORT_CODES = {
    'RS': 'BEG', 'ME': 'TGD', 'BA': 'SJJ', 'AL': 'TIA', 'MK': 'SKP', 'XK': 'PRN',
    'GE': 'TBS', 'AZ': 'GYD', 'KZ': 'ALA', 'KG': 'FRU', 'UZ': 'TAS',
    'TH': 'BKK', 'MY': 'KUL', 'SG': 'SIN', 'ID': 'DPS', 'PH': 'MNL',
    'KR': 'ICN', 'JP': 'NRT', 'HK': 'HKG', 'QA': 'DOH', 'JO': 'AMM', 'LB': 'BEY',
    'MA': 'RAK', 'TN': 'TUN', 'ZA': 'CPT', 'MU': 'MRU', 'SC': 'SEZ', 'MV': 'MLE',
    'DE': 'BER', 'FR': 'CDG', 'IT': 'FCO', 'ES': 'BCN', 'NL': 'AMS',
    'BE': 'BRU', 'PT': 'LIS', 'GR': 'ATH', 'AT': 'VIE', 'CH': 'ZRH',
    'CZ': 'PRG', 'PL': 'WAW', 'HU': 'BUD', 'GB': 'LHR',
    'BR': 'GRU', 'AR': 'EZE', 'CL': 'SCL', 'CO': 'BOG',
    'PE': 'LIM', 'EC': 'UIO', 'UY': 'MVD', 'PY': 'ASU',
    'PA': 'PTY', 'CR': 'SJO', 'DO': 'PUJ'
};

// =====================================================
// AMADEUS AUTHENTICATION
// =====================================================
const getAmadeusToken = async () => {
    // Return cached token if still valid
    if (amadeusAccessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return amadeusAccessToken;
    }

    try {
        const response = await axios.post(
            `${AMADEUS_CONFIG.BASE_URL}/v1/security/oauth2/token`,
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: AMADEUS_CONFIG.API_KEY,
                client_secret: AMADEUS_CONFIG.API_SECRET
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                timeout: 5000
            }
        );

        amadeusAccessToken = response.data.access_token;
        // Token expires in seconds, we'll refresh 1 minute before expiry
        tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;

        console.log('✅ Amadeus token obtained');
        return amadeusAccessToken;
    } catch (error) {
        console.error('Amadeus authentication failed:', error.message);
        return null;
    }
};

// =====================================================
// FLIGHT PRICE - Amadeus Flight Offers API with fallback
// =====================================================
export const fetchFlightPrice = async (destinationCode, destinationCity, departureDate) => {
    // Try Amadeus API if credentials are provided
    if (AMADEUS_CONFIG.API_KEY && AMADEUS_CONFIG.API_SECRET) {
        try {
            const token = await getAmadeusToken();
            if (!token) throw new Error('Failed to get Amadeus token');

            const origin = 'IST'; // Istanbul
            const destination = AIRPORT_CODES[destinationCode] || destinationCode;

            // Format date (YYYY-MM-DD)
            const travelDate = departureDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const params = {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate: travelDate,
                adults: 1,
                max: 1,
                currencyCode: 'USD'
            };

            const response = await axios.get(
                `${AMADEUS_CONFIG.BASE_URL}/v2/shopping/flight-offers`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params,
                    timeout: 8000
                }
            );

            if (response.data && response.data.data && response.data.data.length > 0) {
                const price = Math.round(parseFloat(response.data.data[0].price.total));
                console.log(`✈️ Real price from Amadeus: ${destinationCity} = $${price}`);
                return { price, city: destinationCity };
            }
        } catch (error) {
            console.warn(`Amadeus API failed for ${destinationCity}:`, error.message);
        }
    }

    // Fallback to realistic mock prices
    const priceRanges = {
        'RS': [30, 80], 'ME': [35, 85], 'BA': [30, 80], 'AL': [35, 90], 'MK': [30, 80], 'XK': [35, 85],
        'GE': [50, 120], 'AZ': [60, 130],
        'KZ': [80, 180], 'KG': [90, 190], 'UZ': [85, 175],
        'TH': [200, 350], 'MY': [220, 380], 'SG': [250, 400], 'ID': [200, 350], 'PH': [220, 380],
        'KR': [300, 450], 'JP': [320, 500], 'HK': [280, 420],
        'QA': [80, 150], 'JO': [60, 120], 'LB': [70, 140],
        'MA': [60, 140], 'TN': [50, 120], 'ZA': [300, 500], 'MU': [350, 550], 'SC': [400, 600], 'MV': [250, 400],
        'DE': [60, 150], 'FR': [70, 160], 'IT': [60, 140], 'ES': [70, 150], 'NL': [80, 170],
        'BE': [80, 160], 'PT': [80, 160], 'GR': [60, 130], 'AT': [70, 150], 'CH': [90, 180],
        'CZ': [50, 120], 'PL': [50, 110], 'HU': [50, 120], 'GB': [80, 180],
        'BR': [350, 600], 'AR': [380, 650], 'CL': [400, 700], 'CO': [350, 600],
        'PE': [350, 600], 'EC': [350, 600], 'UY': [380, 650], 'PY': [350, 600],
        'PA': [300, 500], 'CR': [300, 500], 'DO': [250, 450]
    };

    const range = priceRanges[destinationCode] || [100, 250];
    const price = Math.floor(Math.random() * (range[1] - range[0])) + range[0];

    return new Promise(resolve => {
        setTimeout(() => resolve({ price, city: destinationCity }), 100);
    });
};

// =====================================================
// RETURN FLIGHT PRICE - From destination back to Istanbul
// =====================================================
export const fetchReturnFlightPrice = async (destinationCode, destinationCity, returnDate) => {
    // Try Amadeus API if credentials are provided
    if (AMADEUS_CONFIG.API_KEY && AMADEUS_CONFIG.API_SECRET) {
        try {
            const token = await getAmadeusToken();
            if (!token) throw new Error('Failed to get Amadeus token');

            const origin = AIRPORT_CODES[destinationCode] || destinationCode; // From destination
            const destination = 'IST'; // To Istanbul

            // Format date (YYYY-MM-DD)
            const travelDate = returnDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const params = {
                originLocationCode: origin,
                destinationLocationCode: destination,
                departureDate: travelDate,
                adults: 1,
                max: 1,
                currencyCode: 'USD'
            };

            const response = await axios.get(
                `${AMADEUS_CONFIG.BASE_URL}/v2/shopping/flight-offers`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params,
                    timeout: 8000
                }
            );

            if (response.data && response.data.data && response.data.data.length > 0) {
                const price = Math.round(parseFloat(response.data.data[0].price.total));
                console.log(`🔙 Return flight from Amadeus: ${destinationCity} → Istanbul = $${price}`);
                return { price, city: destinationCity };
            }
        } catch (error) {
            console.warn(`Amadeus return flight API failed for ${destinationCity}:`, error.message);
        }
    }

    // Fallback to realistic mock prices (similar to outbound)
    const priceRanges = {
        'RS': [30, 80], 'ME': [35, 85], 'BA': [30, 80], 'AL': [35, 90], 'MK': [30, 80], 'XK': [35, 85],
        'GE': [50, 120], 'AZ': [60, 130],
        'KZ': [80, 180], 'KG': [90, 190], 'UZ': [85, 175],
        'TH': [200, 350], 'MY': [220, 380], 'SG': [250, 400], 'ID': [200, 350], 'PH': [220, 380],
        'KR': [300, 450], 'JP': [320, 500], 'HK': [280, 420],
        'QA': [80, 150], 'JO': [60, 120], 'LB': [70, 140],
        'MA': [60, 140], 'TN': [50, 120], 'ZA': [300, 500], 'MU': [350, 550], 'SC': [400, 600], 'MV': [250, 400],
        'DE': [60, 150], 'FR': [70, 160], 'IT': [60, 140], 'ES': [70, 150], 'NL': [80, 170],
        'BE': [80, 160], 'PT': [80, 160], 'GR': [60, 130], 'AT': [70, 150], 'CH': [90, 180],
        'CZ': [50, 120], 'PL': [50, 110], 'HU': [50, 120], 'GB': [80, 180],
        'BR': [350, 600], 'AR': [380, 650], 'CL': [400, 700], 'CO': [350, 600],
        'PE': [350, 600], 'EC': [350, 600], 'UY': [380, 650], 'PY': [350, 600],
        'PA': [300, 500], 'CR': [300, 500], 'DO': [250, 450]
    };

    const range = priceRanges[destinationCode] || [100, 250];
    const price = Math.floor(Math.random() * (range[1] - range[0])) + range[0];

    return new Promise(resolve => {
        setTimeout(() => resolve({ price, city: destinationCity }), 100);
    });
};


// =====================================================
// GENERATE BOOKING URL - Google Flights
// Supports one-way and round-trip flights with dates
// =====================================================
export const generateBookingUrl = (destinationCity, departureDate, returnDate) => {
    // Google Flights URL format with specific parameters
    // IST = Istanbul Airport (Kalkış)

    const origin = 'IST'; // Istanbul
    const destination = encodeURIComponent(destinationCity);

    // Format dates for Google Flights (YYYY-MM-DD format works)
    let url = `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20Istanbul`;

    // Add departure date if provided
    if (departureDate) {
        // Google Flights uses specific URL structure for dates
        // We can use the search query format which is more reliable
        const depFormatted = departureDate; // Already in YYYY-MM-DD

        if (returnDate) {
            // Round trip
            url = `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20Istanbul%20on%20${depFormatted}%20return%20${returnDate}`;
        } else {
            // One way
            url = `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20Istanbul%20on%20${depFormatted}%20oneway`;
        }
    }

    return url;
};

