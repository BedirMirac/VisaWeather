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
// Data based on user-provided climate data (2025)
// =====================================================
const CLIMATE_DATA = {
    // BALKANS
    'Belgrade': [4.3, 4.9, 11.1, 15.3, 21.2, 24.6, 28.8, 27.5, 24.5, 20.2, 14.2, 8.3], // Serbia
    'Podgorica': [4.6, 6.8, 9.7, 15.3, 21.3, 24.1, 27.2, 28.1, 26.5, 19.5, 12.7, 6.5], // Montenegro
    'Sarajevo': [3.9, 5.0, 10.0, 16.2, 21.1, 25.5, 28.2, 29.8, 25.8, 18.1, 13.3, 6.0], // Bosnia
    'Tirana': [4.5, 6.7, 10.1, 13.8, 21.5, 25.7, 28.8, 28.9, 24.4, 18.1, 13.3, 7.5], // Albania
    'Skopje': [4.7, 5.7, 11.2, 14.5, 20.8, 25.2, 27.2, 30.4, 26.3, 17.8, 12.0, 7.0], // North Macedonia
    'Pristina': [4.7, 5.7, 11.2, 14.5, 20.8, 25.2, 27.2, 30.4, 26.3, 17.8, 12.0, 7.0], // Kosovo

    // EASTERN EUROPE
    'Kyiv': [3.9, 7.4, 10.2, 13.8, 20.7, 23.6, 29.4, 30.4, 26.0, 17.9, 13.8, 8.4], // Ukraine
    'Chisinau': [4.2, 6.2, 9.3, 14.8, 20.3, 24.0, 26.7, 29.9, 23.9, 20.3, 12.0, 7.4], // Moldova
    'Minsk': [5.8, 6.6, 9.8, 15.6, 19.5, 23.8, 27.1, 28.8, 24.3, 19.8, 12.1, 6.5], // Belarus

    // CAUCASUS
    'Tbilisi': [5.7, 5.3, 10.1, 16.0, 20.7, 25.9, 27.4, 27.8, 24.6, 18.1, 13.0, 6.1], // Georgia
    'Baku': [5.1, 6.9, 10.3, 14.1, 18.8, 25.5, 27.7, 30.5, 23.8, 20.3, 13.4, 8.5], // Azerbaijan

    // CENTRAL ASIA
    'Almaty': [5.7, 6.6, 8.8, 14.1, 19.5, 26.3, 29.2, 27.7, 26.2, 19.4, 13.2, 8.4], // Kazakhstan
    'Bishkek': [6.1, 6.6, 10.7, 14.2, 20.6, 26.5, 27.3, 29.0, 25.5, 17.7, 11.7, 5.9], // Kyrgyzstan
    'Tashkent': [4.0, 5.7, 10.7, 15.9, 20.9, 24.6, 27.9, 30.1, 24.1, 17.9, 14.4, 8.2], // Uzbekistan
    'Ulaanbaatar': [6.0, 5.8, 8.6, 15.1, 19.2, 25.0, 28.7, 28.0, 24.3, 18.7, 14.2, 6.6], // Mongolia
    'Dushanbe': [6.2, 5.5, 10.8, 16.4, 21.2, 23.7, 28.0, 30.4, 26.1, 19.7, 14.5, 5.8], // Tajikistan
    'Ashgabat': [5.2, 4.8, 8.5, 14.7, 20.3, 26.1, 27.7, 30.4, 24.6, 18.0, 14.1, 7.3], // Turkmenistan

    // EAST ASIA
    'Tokyo': [4.4, 6.3, 11.1, 16.5, 19.9, 24.9, 29.3, 28.2, 23.7, 17.7, 12.6, 7.1], // Japan
    'Seoul': [6.2, 6.7, 10.9, 13.9, 21.3, 24.1, 27.5, 28.8, 25.8, 17.9, 13.9, 7.2], // South Korea
    'Hong Kong': [5.8, 7.1, 10.4, 15.5, 19.3, 23.6, 26.8, 30.3, 24.4, 19.6, 11.7, 7.0],
    'Macao': [5.8, 5.4, 10.1, 16.1, 19.2, 24.6, 28.0, 28.8, 25.0, 19.0, 12.3, 7.9],
    'Beijing': [6.2, 5.4, 9.3, 15.9, 20.5, 25.4, 26.5, 29.1, 24.2, 20.3, 11.9, 7.7], // China
    'Taipei': [4.6, 7.0, 10.2, 13.5, 19.1, 24.8, 28.7, 28.5, 26.0, 18.3, 12.2, 6.1], // Taiwan

    // SOUTHEAST ASIA
    'Bangkok': [23.8, 26.4, 26.5, 29.1, 30.9, 30.3, 29.1, 30.3, 29.7, 29.8, 28.0, 24.7], // Thailand
    'Kuala Lumpur': [5.8, 5.8, 11.4, 15.9, 18.6, 25.2, 26.8, 27.5, 26.1, 18.1, 13.5, 6.3], // Malaysia
    'Singapore': [5.5, 6.8, 10.5, 13.6, 19.3, 24.2, 28.7, 28.9, 26.1, 20.0, 12.5, 6.4],
    'Bali': [26.0, 26.1, 27.3, 30.5, 29.7, 31.0, 30.2, 29.1, 29.5, 27.8, 27.1, 26.8], // Indonesia
    'Manila': [25.6, 26.2, 27.4, 30.9, 31.0, 29.6, 29.5, 28.8, 28.7, 27.6, 27.2, 26.0], // Philippines
    'Bandar Seri Begawan': [5.7, 7.2, 9.4, 14.2, 20.8, 25.7, 28.2, 30.4, 24.0, 19.9, 11.6, 7.1], // Brunei
    'Hanoi': [5.1, 7.1, 8.6, 16.3, 19.1, 25.0, 28.3, 30.4, 24.8, 20.1, 13.0, 6.0], // Vietnam
    'Phnom Penh': [4.0, 6.8, 8.5, 14.1, 21.2, 23.9, 26.8, 28.5, 26.1, 18.8, 12.0, 5.8], // Cambodia
    'Dili': [4.4, 6.4, 9.0, 14.6, 21.1, 25.1, 27.0, 28.1, 26.4, 18.3, 13.8, 7.7], // Timor-Leste

    // SOUTH ASIA
    'Colombo': [6.3, 4.7, 9.8, 14.6, 19.3, 24.8, 28.9, 29.1, 24.1, 20.0, 13.6, 6.3], // Sri Lanka
    'Kathmandu': [5.6, 7.3, 8.9, 15.0, 20.7, 25.7, 29.0, 28.5, 24.5, 19.0, 13.9, 8.4], // Nepal
    'Dhaka': [5.7, 5.5, 10.4, 14.8, 19.8, 24.3, 27.4, 29.3, 24.4, 19.1, 12.9, 5.8], // Bangladesh
    'Islamabad': [4.9, 6.1, 10.6, 15.6, 20.9, 24.0, 27.2, 28.9, 25.0, 19.6, 12.7, 6.8], // Pakistan

    // MIDDLE EAST
    'Amman': [3.9, 5.3, 9.0, 16.5, 21.3, 24.3, 27.1, 28.6, 25.5, 18.8, 12.2, 6.2], // Jordan
    'Tehran': [6.5, 7.0, 9.3, 16.3, 19.8, 24.2, 26.9, 28.5, 25.1, 19.5, 13.6, 7.6], // Iran
    'Doha': [15.3, 16.7, 23.7, 30.8, 35.6, 39.3, 43.1, 42.0, 36.7, 31.7, 24.9, 16.2], // Qatar
    'Dubai': [15.1, 17.5, 23.2, 28.6, 34.7, 40.8, 42.2, 40.0, 39.0, 32.4, 25.2, 16.9], // UAE
    'Manama': [5.6, 6.3, 8.9, 15.7, 21.1, 25.4, 29.3, 30.1, 23.9, 17.6, 13.9, 7.6], // Bahrain
    'Kuwait City': [4.4, 7.2, 11.0, 15.4, 20.4, 25.1, 28.1, 30.3, 26.4, 18.4, 12.2, 8.3], // Kuwait
    'Beirut': [3.6, 7.0, 10.9, 16.0, 20.2, 24.7, 27.3, 28.7, 24.7, 17.8, 13.2, 7.2], // Lebanon
    'Tel Aviv': [4.2, 5.5, 9.3, 16.0, 19.5, 25.2, 28.7, 30.2, 25.9, 20.0, 14.4, 5.7], // Israel
    'Baghdad': [16.0, 16.9, 24.1, 31.0, 34.6, 39.7, 42.7, 41.9, 39.0, 30.5, 22.9, 18.3], // Iraq
    'Damascus': [4.6, 5.8, 9.4, 15.9, 20.9, 23.7, 27.5, 30.2, 25.5, 20.3, 14.2, 6.7], // Syria
    'Muscat': [15.9, 17.8, 23.7, 28.6, 33.6, 40.8, 41.2, 40.8, 38.1, 32.7, 24.3, 16.4], // Oman

    // NORTH AFRICA
    'Marrakech': [5.3, 7.1, 9.4, 16.0, 21.4, 25.9, 27.1, 29.0, 24.6, 18.2, 13.4, 7.1], // Morocco
    'Tunis': [5.0, 4.7, 10.2, 14.3, 21.5, 24.4, 28.1, 29.4, 25.7, 20.2, 13.6, 7.9], // Tunisia
    'Algiers': [3.6, 6.3, 10.5, 15.4, 20.1, 24.5, 28.5, 30.5, 24.5, 17.8, 11.8, 7.5], // Algeria
    'Tripoli': [5.3, 5.8, 9.6, 15.1, 18.9, 24.9, 27.9, 30.4, 26.0, 18.6, 13.9, 5.9], // Libya
    'Cairo': [16.1, 16.7, 22.8, 31.1, 36.2, 39.0, 40.8, 40.2, 39.3, 31.7, 22.5, 15.9], // Egypt

    // SUB-SAHARAN AFRICA
    // Note: Cape Town has correct Southern Hemisphere data (summer Jan-Feb, winter Jun-Aug)
    'Cape Town': [26.0, 25.2, 21.3, 18.4, 13.6, 10.8, 9.0, 13.3, 13.8, 18.3, 21.9, 24.5], // South Africa ✓
    // Mauritius (Southern Hemisphere - summer in Dec-Feb)
    'Port Louis': [27.0, 27.5, 27.0, 25.5, 23.0, 21.0, 20.0, 20.5, 21.5, 23.5, 25.0, 26.5], // Mauritius ✓
    // Botswana (Southern Hemisphere)
    'Gaborone': [31.0, 30.0, 28.5, 25.0, 22.0, 18.0, 18.5, 21.0, 25.0, 28.0, 29.5, 30.5], // Botswana ✓
    // Eswatini (Southern Hemisphere)
    'Mbabane': [25.0, 25.0, 23.5, 21.0, 18.0, 15.0, 15.5, 17.0, 20.0, 22.0, 23.5, 24.5], // Eswatini ✓
    // Gambia (Northern Hemisphere - near equator, but north)
    'Banjul': [24.0, 25.0, 27.0, 29.0, 30.0, 30.5, 28.0, 27.5, 28.0, 29.0, 27.0, 25.0], // Gambia
    // Angola (Southern Hemisphere - coastal tropical)
    'Luanda': [27.5, 28.0, 28.0, 27.5, 25.0, 22.0, 20.0, 21.0, 23.0, 25.0, 26.5, 27.0], // Angola ✓
    // Equatorial Guinea (near Equator)
    'Malabo': [26.0, 26.5, 27.0, 27.0, 26.5, 25.0, 24.0, 24.0, 25.0, 25.5, 26.0, 26.0], // Equatorial Guinea
    // Zambia (Southern Hemisphere)
    'Lusaka': [26.0, 26.0, 25.5, 24.0, 21.0, 18.0, 18.0, 21.0, 25.0, 28.0, 27.5, 26.5], // Zambia ✓
    // Sao Tome (near Equator)
    'Sao Tome': [26.5, 27.0, 27.0, 26.5, 25.5, 24.0, 23.0, 23.5, 24.5, 25.5, 26.0, 26.5], // Sao Tome
    // Kenya (Equatorial - relatively stable temps year-round)
    'Nairobi': [25.0, 26.0, 25.5, 24.0, 22.5, 21.0, 20.0, 21.0, 23.0, 24.5, 23.0, 24.0], // Kenya
    // Tanzania (Southern Hemisphere)
    'Dar es Salaam': [31.0, 31.5, 31.0, 29.5, 28.0, 27.0, 26.5, 27.0, 28.0, 29.5, 30.5, 31.0], // Tanzania ✓
    // Cameroon (Northern Hemisphere - near equator)
    'Yaounde': [27.5, 28.0, 28.0, 27.5, 26.5, 25.5, 24.5, 25.0, 26.0, 26.5, 27.0, 27.0], // Cameroon
    // Senegal (Northern Hemisphere)
    'Dakar': [24.0, 24.5, 25.5, 26.0, 27.0, 29.0, 28.5, 28.0, 28.5, 29.0, 27.5, 25.0], // Senegal
    // Ghana (near Equator)
    'Accra': [28.0, 29.0, 29.5, 29.5, 28.5, 26.5, 25.5, 25.0, 26.0, 27.5, 28.5, 28.5], // Ghana
    // Madagascar (Southern Hemisphere)
    'Antananarivo': [25.5, 25.0, 24.0, 22.0, 19.0, 16.0, 15.5, 17.0, 20.0, 23.0, 24.5, 25.0], // Madagascar ✓
    // Zimbabwe (Southern Hemisphere)
    'Harare': [26.0, 25.5, 25.0, 23.0, 20.0, 17.5, 17.0, 20.0, 24.0, 26.5, 26.5, 26.0], // Zimbabwe ✓
    // Mozambique (Southern Hemisphere)
    'Maputo': [30.0, 30.0, 29.0, 27.0, 24.0, 22.0, 22.0, 23.0, 25.0, 27.0, 28.5, 29.5], // Mozambique ✓
    // Sudan (Northern Hemisphere - desert)
    'Khartoum': [32.0, 34.0, 37.0, 40.0, 42.0, 41.0, 38.0, 36.0, 38.0, 39.0, 35.0, 32.0], // Sudan
    // Djibouti (Northern Hemisphere - hot desert)
    'Djibouti': [29.0, 30.0, 31.0, 33.0, 36.0, 39.0, 42.0, 41.0, 37.0, 33.0, 30.0, 29.0], // Djibouti
    // Rwanda (near Equator - relatively mild)
    'Kigali': [21.0, 21.5, 21.0, 21.0, 20.5, 20.0, 20.5, 21.5, 22.0, 21.5, 20.5, 20.5], // Rwanda
    // Togo (Northern Hemisphere)
    'Lome': [27.0, 28.0, 29.0, 29.0, 28.0, 26.0, 25.0, 25.0, 26.0, 27.5, 28.0, 27.5], // Togo
    // Ivory Coast (Northern Hemisphere)
    'Abidjan': [27.5, 28.5, 28.5, 28.5, 27.5, 25.5, 24.5, 24.5, 25.5, 27.0, 28.0, 27.5], // Ivory Coast
    // Mauritania (Northern Hemisphere - desert)
    'Nouakchott': [24.0, 26.0, 28.0, 30.0, 32.0, 34.0, 33.0, 32.0, 33.0, 31.0, 28.0, 25.0], // Mauritania
    // Cape Verde (Northern Hemisphere - Atlantic islands)
    'Praia': [23.0, 23.0, 24.0, 24.5, 25.0, 26.0, 27.0, 28.0, 28.0, 27.5, 26.0, 24.0], // Cape Verde

    // SOUTH AMERICA
    // Southern Hemisphere cities have summer in Dec-Feb, winter in Jun-Aug
    'Rio de Janeiro': [30.0, 30.5, 29.0, 27.0, 25.0, 23.0, 22.5, 23.0, 24.0, 26.0, 27.5, 29.0], // Brazil ✓
    'Buenos Aires': [30.0, 29.0, 26.0, 21.0, 16.0, 12.0, 11.5, 13.5, 16.0, 20.0, 24.0, 28.0], // Argentina ✓
    'Santiago': [29.0, 28.5, 25.0, 20.0, 15.0, 11.0, 10.0, 12.0, 15.0, 19.0, 23.5, 27.0], // Chile ✓
    // Colombia - near equator, stable temps
    'Bogota': [19.0, 19.5, 19.0, 18.5, 18.0, 17.5, 17.0, 17.5, 18.0, 18.5, 18.5, 19.0], // Colombia (high altitude)
    // Peru - Lima is on the coast, mild year-round due to ocean current
    'Lima': [26.0, 27.0, 26.0, 23.0, 20.0, 18.0, 17.0, 17.0, 18.0, 20.0, 22.0, 24.0], // Peru ✓
    // Ecuador - near equator, Quito is high altitude
    'Quito': [21.0, 21.0, 21.0, 21.0, 21.5, 21.5, 21.5, 22.0, 22.0, 21.5, 21.0, 21.0], // Ecuador (high altitude)
    // Uruguay (Southern Hemisphere)
    'Montevideo': [28.0, 27.0, 24.0, 19.0, 15.0, 12.0, 11.0, 12.5, 15.0, 18.0, 22.0, 26.0], // Uruguay ✓
    // Paraguay (Southern Hemisphere)
    'Asuncion': [34.0, 33.0, 31.0, 27.0, 23.0, 20.0, 20.0, 22.0, 25.0, 28.0, 31.0, 33.0], // Paraguay ✓
    // Bolivia (Southern Hemisphere, high altitude)
    'La Paz': [18.0, 18.0, 17.5, 17.0, 15.0, 13.0, 12.0, 13.0, 15.0, 17.0, 18.0, 18.0], // Bolivia ✓
    // Venezuela (near equator, tropical)
    'Caracas': [27.0, 28.0, 29.0, 29.0, 28.0, 27.0, 26.5, 27.0, 27.5, 28.0, 27.5, 27.0], // Venezuela

    // CENTRAL AMERICA - Tropical climate, warm year-round, slightly cooler Dec-Feb
    'Panama City': [31.0, 32.0, 32.5, 31.5, 30.0, 29.5, 29.5, 29.5, 29.0, 29.0, 29.5, 30.5], // Panama
    'San Jose': [24.0, 24.5, 26.0, 26.5, 25.5, 25.0, 25.0, 25.5, 25.0, 24.5, 24.0, 24.0], // Costa Rica (high altitude)
    'Guatemala City': [25.0, 27.0, 28.5, 28.0, 26.0, 24.0, 24.0, 24.5, 24.0, 24.0, 24.0, 24.5], // Guatemala
    'Tegucigalpa': [26.0, 28.0, 30.0, 30.0, 28.5, 27.0, 26.5, 27.0, 27.0, 26.5, 26.0, 25.5], // Honduras
    'San Salvador': [32.0, 33.0, 34.0, 33.0, 31.0, 30.0, 31.0, 31.0, 30.0, 30.0, 31.0, 31.5], // El Salvador
    'Managua': [32.0, 33.0, 35.0, 35.0, 33.0, 31.0, 31.0, 31.5, 31.0, 31.0, 31.0, 32.0], // Nicaragua
    'Belmopan': [27.0, 28.0, 30.0, 32.0, 32.5, 31.0, 30.5, 31.0, 31.0, 30.0, 28.0, 27.0], // Belize
    'Mexico City': [22.0, 24.0, 26.0, 27.0, 26.0, 24.0, 22.0, 22.5, 22.0, 21.5, 21.0, 21.0], // Mexico (high altitude)
    'Havana': [26.0, 27.0, 28.0, 29.5, 30.5, 31.0, 32.0, 32.0, 31.5, 30.0, 28.0, 26.5], // Cuba

    // CARIBBEAN - Tropical, warm year-round
    'Punta Cana': [28.0, 28.5, 29.0, 30.0, 31.0, 31.5, 32.0, 32.0, 31.5, 31.0, 30.0, 28.5], // Dominican Republic
    'Kingston': [30.0, 30.0, 30.5, 31.0, 31.5, 32.5, 33.0, 33.0, 32.5, 31.5, 31.0, 30.0], // Jamaica
    'Port of Spain': [31.0, 31.0, 32.0, 32.5, 32.0, 31.0, 31.0, 31.5, 32.0, 32.0, 31.5, 31.0], // Trinidad
    'Bridgetown': [29.0, 29.0, 30.0, 30.5, 31.0, 31.0, 31.0, 31.5, 31.5, 31.0, 30.5, 29.5], // Barbados
    'Nassau': [25.0, 25.5, 27.0, 29.0, 30.5, 32.0, 33.0, 33.0, 32.0, 30.0, 28.0, 26.0], // Bahamas
    "St. John's": [28.0, 28.0, 29.0, 30.0, 31.0, 31.5, 32.0, 32.0, 31.5, 31.0, 30.0, 28.5], // Antigua
    'Roseau': [28.0, 28.0, 29.0, 30.0, 31.0, 31.0, 31.5, 32.0, 31.5, 31.0, 30.0, 28.5], // Dominica
    'Castries': [29.0, 29.0, 30.0, 30.5, 31.0, 31.0, 31.5, 31.5, 31.5, 31.0, 30.5, 29.5], // Saint Lucia
    'Kingstown': [29.0, 29.0, 30.0, 30.5, 31.0, 31.0, 31.0, 31.5, 31.5, 31.0, 30.5, 29.5], // St. Vincent
    'Port-au-Prince': [31.0, 31.5, 32.0, 32.5, 33.0, 34.0, 35.0, 34.5, 34.0, 33.0, 32.0, 31.0], // Haiti
    'Georgetown': [29.0, 30.0, 30.5, 30.5, 30.0, 29.5, 30.0, 31.0, 32.0, 32.0, 31.0, 29.5], // Guyana
    "St. George's": [29.0, 29.0, 30.0, 30.5, 30.5, 30.5, 30.5, 31.0, 31.0, 31.0, 30.5, 29.5], // Grenada
    'Basseterre': [28.0, 28.0, 29.0, 30.0, 31.0, 31.5, 32.0, 32.0, 31.5, 31.0, 30.0, 28.5], // St. Kitts

    // PACIFIC - Mix of Northern and Southern Hemisphere
    // Fiji (Southern Hemisphere)
    'Suva': [30.0, 30.0, 29.5, 28.0, 26.5, 25.0, 24.5, 25.0, 26.0, 27.5, 28.5, 29.5], // Fiji ✓
    // Micronesia (near Equator)
    'Palikir': [27.0, 27.0, 27.5, 28.0, 28.0, 27.5, 27.0, 27.0, 27.5, 28.0, 28.0, 27.5], // Micronesia
    // Samoa (Southern Hemisphere)
    'Apia': [29.5, 29.5, 29.0, 28.0, 27.0, 26.0, 26.0, 26.5, 27.0, 28.0, 28.5, 29.0], // Samoa ✓
    // Tonga (Southern Hemisphere)
    "Nuku'alofa": [29.0, 29.0, 28.5, 26.0, 24.0, 22.0, 21.5, 22.0, 23.0, 25.0, 27.0, 28.5], // Tonga ✓
    // Palau (near Equator)
    'Ngerulmud': [29.0, 29.0, 29.5, 30.0, 30.0, 29.5, 29.0, 29.0, 29.5, 30.0, 30.0, 29.5], // Palau
    // Vanuatu (Southern Hemisphere)
    'Port Vila': [30.0, 30.0, 29.5, 27.5, 25.5, 24.0, 23.5, 24.0, 25.0, 27.0, 28.5, 29.5], // Vanuatu ✓
    // Tuvalu (near Equator)
    'Funafuti': [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 29.5, 29.5, 30.0, 30.0, 30.5, 30.5], // Tuvalu

    // INDIAN OCEAN
    // Maldives (near Equator)
    'Male': [30.0, 31.0, 31.5, 32.0, 31.5, 30.5, 30.0, 30.0, 30.0, 30.5, 30.5, 30.0], // Maldives
    // Seychelles (Southern Hemisphere, near Equator)
    'Victoria': [29.5, 30.0, 30.0, 30.5, 29.5, 28.0, 27.0, 27.5, 28.0, 29.0, 29.5, 29.5], // Seychelles

    // WESTERN EUROPE
    'Berlin': [5.7, 6.3, 8.7, 16.4, 18.9, 24.5, 28.1, 28.9, 25.5, 20.3, 13.0, 7.7], // Germany
    'Paris': [4.3, 4.6, 9.7, 14.1, 19.2, 26.1, 27.4, 29.0, 25.4, 19.8, 14.4, 8.1], // France
    'Rome': [3.9, 5.7, 10.1, 15.5, 20.5, 25.3, 26.8, 29.9, 23.6, 18.3, 12.0, 7.0], // Italy
    'Madrid': [5.8, 5.0, 9.6, 14.5, 19.7, 24.2, 29.1, 29.3, 25.1, 19.1, 11.6, 6.7], // Spain
    'Amsterdam': [6.5, 7.3, 8.9, 15.5, 19.9, 26.0, 28.6, 29.9, 24.3, 20.4, 13.4, 6.0], // Netherlands
    'Brussels': [4.9, 5.4, 10.8, 13.8, 20.1, 24.8, 27.0, 30.4, 24.6, 19.4, 11.8, 7.5], // Belgium
    'Lisbon': [5.0, 7.5, 8.7, 13.6, 19.9, 25.6, 27.5, 28.9, 25.2, 20.1, 12.8, 6.4], // Portugal
    'Athens': [4.2, 6.7, 10.3, 15.9, 21.3, 24.4, 28.4, 28.1, 24.5, 18.7, 13.4, 6.7], // Greece
    'Vienna': [6.2, 6.3, 10.9, 16.1, 18.9, 24.3, 28.1, 27.8, 25.5, 19.7, 12.5, 5.8], // Austria
    'Zurich': [4.5, 6.0, 10.2, 14.4, 21.0, 25.9, 29.2, 27.6, 25.9, 19.6, 12.9, 8.5], // Switzerland
    'Prague': [6.1, 6.5, 9.9, 14.9, 20.3, 23.5, 27.1, 27.9, 25.3, 19.4, 12.1, 5.9], // Czechia
    'Warsaw': [4.2, 6.6, 10.1, 16.3, 21.0, 23.6, 26.6, 28.6, 24.7, 20.3, 12.6, 7.7], // Poland
    'Budapest': [4.4, 5.3, 9.4, 15.8, 21.3, 24.0, 28.5, 29.7, 26.0, 20.1, 13.7, 6.7], // Hungary

    // NORDIC COUNTRIES
    'Stockholm': [-10.3, -8.7, -2.3, 4.4, 12.9, 15.8, 21.0, 17.1, 10.7, 6.2, -2.3, -8.8], // Sweden
    'Oslo': [-10.6, -8.7, -4.2, 5.2, 11.2, 16.7, 20.8, 17.2, 11.1, 5.7, -2.8, -9.1], // Norway
    'Copenhagen': [4.1, 6.9, 11.5, 14.1, 19.3, 24.0, 27.6, 28.0, 26.1, 19.2, 14.3, 7.5], // Denmark
    'Helsinki': [-9.0, -7.8, -3.2, 3.9, 11.5, 17.4, 18.8, 17.4, 12.6, 5.9, -3.4, -7.8], // Finland
    'Reykjavik': [-11.0, -8.5, -2.1, 4.1, 11.3, 16.4, 20.1, 17.9, 11.6, 4.9, -1.7, -9.2], // Iceland

    // OTHER EUROPE
    'Dublin': [6.1, 6.4, 8.6, 15.0, 21.0, 25.0, 28.0, 28.6, 25.9, 18.1, 12.6, 8.2], // Ireland
    'Luxembourg': [3.6, 5.3, 11.1, 16.2, 21.3, 25.9, 28.3, 29.2, 26.3, 18.9, 12.0, 5.9],
    'Valletta': [6.4, 6.6, 10.3, 14.1, 20.4, 23.7, 27.1, 29.5, 25.8, 18.8, 12.4, 6.8], // Malta
    'Bratislava': [5.3, 6.3, 10.1, 16.2, 21.3, 26.5, 28.8, 27.5, 26.4, 17.8, 13.0, 6.2], // Slovakia
    'Ljubljana': [4.6, 7.0, 10.3, 14.4, 19.1, 25.9, 28.6, 27.6, 25.3, 19.5, 12.3, 5.9], // Slovenia
    'Tallinn': [3.7, 6.0, 9.2, 16.0, 21.0, 25.0, 28.7, 27.6, 23.8, 18.0, 13.0, 7.9], // Estonia
    'Riga': [3.5, 7.3, 9.1, 15.0, 20.7, 23.7, 29.4, 28.3, 24.1, 18.9, 12.5, 5.6], // Latvia
    'Vilnius': [4.1, 7.2, 10.1, 13.9, 18.9, 25.0, 27.7, 30.0, 23.5, 17.6, 12.0, 7.5], // Lithuania
    'Zagreb': [3.9, 6.5, 11.1, 16.2, 19.3, 24.1, 28.2, 30.1, 24.8, 19.4, 13.3, 7.8], // Croatia
    'Sofia': [5.3, 7.2, 11.2, 16.2, 18.9, 25.0, 26.9, 30.2, 25.5, 19.5, 14.4, 6.5], // Bulgaria
    'Bucharest': [5.9, 7.3, 8.5, 15.6, 19.4, 24.9, 27.4, 30.2, 24.9, 20.4, 13.0, 6.2], // Romania
    'Andorra la Vella': [3.8, 7.5, 10.1, 14.4, 20.5, 24.3, 26.7, 28.8, 26.1, 17.8, 13.8, 6.0], // Andorra
    'Monaco': [5.7, 6.0, 9.7, 15.8, 21.2, 26.4, 28.5, 30.4, 25.9, 17.5, 14.1, 7.9],
    'San Marino': [5.0, 5.1, 10.8, 15.6, 19.0, 24.4, 27.7, 29.3, 25.5, 18.3, 14.0, 6.1],
    'Vaduz': [4.9, 4.6, 10.7, 13.9, 20.1, 24.0, 26.6, 30.2, 26.5, 17.6, 14.2, 6.8], // Liechtenstein
    'Vatican City': [4.2, 6.3, 8.8, 15.9, 19.4, 25.1, 29.2, 28.2, 25.4, 18.6, 11.9, 8.0],
    'Moscow': [-9.8, -9.1, -3.2, 3.9, 12.3, 16.4, 19.4, 17.7, 12.6, 4.2, -2.8, -8.0], // Russia

    // UK
    'London': [5.8, 4.9, 10.0, 16.1, 19.1, 24.3, 28.5, 28.6, 24.1, 19.7, 14.2, 5.7], // UK

    // OCEANIA
    'Sydney': [24.2, 23.1, 20.7, 16.4, 14.2, 10.5, 10.9, 12.2, 12.9, 17.9, 20.9, 24.0], // Australia
    'Auckland': [24.0, 22.6, 22.1, 16.0, 14.2, 10.3, 9.7, 12.4, 13.9, 16.8, 20.0, 22.3], // New Zealand
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
// SOUTHERN HEMISPHERE COUNTRIES
// Countries with negative latitude (below equator)
// These have reversed seasons compared to Northern Hemisphere
// =====================================================
const SOUTHERN_HEMISPHERE_CITIES = [
    // South America
    'Rio de Janeiro', 'Buenos Aires', 'Santiago', 'Lima', 'Montevideo',
    'Asuncion', 'La Paz',
    // Africa
    'Cape Town', 'Port Louis', 'Gaborone', 'Mbabane', 'Luanda', 'Lusaka',
    'Nairobi', 'Dar es Salaam', 'Antananarivo', 'Harare', 'Maputo', 'Kigali',
    // Pacific/Oceania  
    'Suva', 'Apia', "Nuku'alofa", 'Port Vila',
    // Indian Ocean
    'Victoria', // Seychelles
    // Southeast Asia (near equator, but technically south)
    'Bali', 'Dili',
    // Australia & New Zealand (if added)
    'Sydney', 'Auckland'
];

// Helper function to check if city is in Southern Hemisphere
const isInSouthernHemisphere = (city) => {
    return SOUTHERN_HEMISPHERE_CITIES.includes(city);
};

// Helper function to get adjusted month for Southern Hemisphere
// Southern Hemisphere seasons are opposite: their summer is Dec-Feb, winter is Jun-Aug
const getAdjustedMonth = (month, city) => {
    if (isInSouthernHemisphere(city)) {
        // Offset by 6 months for southern hemisphere
        // January (0) in NH = July (6) weather equivalent in SH
        // But since our CLIMATE_DATA already has actual monthly temps,
        // we don't need to offset - the data should reflect actual temps for that month
        // HOWEVER, if the data was entered with NH logic, we need to adjust
        // 
        // The correct approach: CLIMATE_DATA should store actual temps for each month
        // So Cape Town January = 26°C (their summer) is correct
        // No adjustment needed if data is properly stored

        // Let's check: if CLIMATE_DATA[Cape Town][0] = 26 (January = summer), data is correct
        // We just need to use the month directly
        return month;
    }
    return month;
};

// =====================================================
// WEATHER FUNCTION - Uses Mock Climate Data
// Returns average temperature for the month of travel
// Considers hemisphere for accurate seasonal weather
// =====================================================
export const fetchWeather = async (city, dateString, countryLat = null) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Get the month from the date string (0-indexed: 0=Jan, 11=Dec)
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
                // Use the month directly - CLIMATE_DATA should have actual temps per month
                // The data is stored as [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
                // So for Southern Hemisphere cities, January temp = their summer temp (high)
                // and July temp = their winter temp (low)
                const adjustedMonth = getAdjustedMonth(month, city);
                const temp = temperatures[adjustedMonth];

                // Add small random variation (-2 to +2 degrees) for realism
                const variation = (Math.random() * 4) - 2;
                const finalTemp = Math.round((temp + variation) * 10) / 10;

                // For weather condition, consider if it's winter or summer in that location
                const isSouthern = isInSouthernHemisphere(city);
                const weatherCondition = getWeatherConditionWithHemisphere(temp, month, isSouthern);

                const hemisphere = isSouthern ? '🌍 Southern' : '🌍 Northern';
                console.log(`🌡️ Mock weather for ${city} (Month ${month + 1}, ${hemisphere}): ${finalTemp}°C`);

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

// Weather conditions based on temperature, month, and hemisphere
const getWeatherConditionWithHemisphere = (temp, month, isSouthern) => {
    // Determine if it's winter in the location
    let isWinter, isSummer;

    if (isSouthern) {
        // Southern Hemisphere: Winter = Jun-Aug, Summer = Dec-Feb
        isWinter = month >= 5 && month <= 7; // June, July, August
        isSummer = month >= 11 || month <= 1; // December, January, February
    } else {
        // Northern Hemisphere: Winter = Dec-Feb, Summer = Jun-Aug
        isWinter = month >= 11 || month <= 1; // December, January, February
        isSummer = month >= 5 && month <= 7; // June, July, August
    }

    if (temp <= 0) return 'Snow';
    if (temp <= 5) return isWinter ? 'Clouds' : 'Clear';
    if (temp <= 10) return 'Clouds';
    if (temp <= 15) return isSummer ? 'Clear' : 'Clouds';
    if (temp <= 22) return 'Clear';
    if (temp <= 28) return 'Clear';
    return 'Clear'; // Hot weather is usually clear
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

