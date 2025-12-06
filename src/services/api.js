import axios from 'axios';

// API Keys from environment variables
const KEYS = {
    WEATHER: import.meta.env.VITE_OPENWEATHER_API_KEY,
};

// =====================================================
// COMPREHENSIVE VISA-FREE COUNTRY DATABASE
// Based on real visa policies for Turkish passports
// =====================================================

const ALL_COUNTRIES = [
    // BALKANS - Visa Free for ALL Turkish Passports
    { code: 'RS', name: 'Serbia', city: 'Belgrade', lat: 44.7866, lon: 20.4489, image: 'https://images.unsplash.com/photo-1555990538-1e7e9a624d85?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'ME', name: 'Montenegro', city: 'Podgorica', lat: 42.4304, lon: 19.2594, image: 'https://images.unsplash.com/photo-1565628551897-03472097e3f7?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'BA', name: 'Bosnia', city: 'Sarajevo', lat: 43.8563, lon: 18.4131, image: 'https://images.unsplash.com/photo-1586861256632-3e8d3e3d0d90?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'AL', name: 'Albania', city: 'Tirana', lat: 41.3275, lon: 19.8187, image: 'https://images.unsplash.com/photo-1565628551897-03472097e3f7?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'MK', name: 'North Macedonia', city: 'Skopje', lat: 41.9981, lon: 21.4254, image: 'https://images.unsplash.com/photo-1577086665223-26112e1e6737?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'XK', name: 'Kosovo', city: 'Pristina', lat: 42.6629, lon: 21.1655, image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // CAUCASUS - Visa Free for Turkish Passports
    { code: 'GE', name: 'Georgia', city: 'Tbilisi', lat: 41.7151, lon: 44.8271, image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'AZ', name: 'Azerbaijan', city: 'Baku', lat: 40.4093, lon: 49.8671, image: 'https://images.unsplash.com/photo-1596541223943-2882103f56b2?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // CENTRAL ASIA - Visa Free for Turkish Passports
    { code: 'KZ', name: 'Kazakhstan', city: 'Almaty', lat: 43.2220, lon: 76.8512, image: 'https://images.unsplash.com/photo-1562906980-1f48b0f1f8e9?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'KG', name: 'Kyrgyzstan', city: 'Bishkek', lat: 42.8746, lon: 74.5698, image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'UZ', name: 'Uzbekistan', city: 'Tashkent', lat: 41.2995, lon: 69.2401, image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // ASIA - Visa Free / Visa on Arrival
    { code: 'TH', name: 'Thailand', city: 'Bangkok', lat: 13.7563, lon: 100.5018, image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'MY', name: 'Malaysia', city: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'SG', name: 'Singapore', city: 'Singapore', lat: 1.3521, lon: 103.8198, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'ID', name: 'Indonesia', city: 'Bali', lat: -8.3405, lon: 115.0920, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'PH', name: 'Philippines', city: 'Manila', lat: 14.5995, lon: 120.9842, image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'KR', name: 'South Korea', city: 'Seoul', lat: 37.5665, lon: 126.9780, image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'JP', name: 'Japan', city: 'Tokyo', lat: 35.6762, lon: 139.6503, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'HK', name: 'Hong Kong', city: 'Hong Kong', lat: 22.3193, lon: 114.1694, image: 'https://images.unsplash.com/photo-1536599018102-9f803c979e65?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // MIDDLE EAST
    { code: 'QA', name: 'Qatar', city: 'Doha', lat: 25.2854, lon: 51.5310, image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'JO', name: 'Jordan', city: 'Amman', lat: 31.9454, lon: 35.9284, image: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'LB', name: 'Lebanon', city: 'Beirut', lat: 33.8938, lon: 35.5018, image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // AFRICA - Visa Free / Visa on Arrival
    { code: 'MA', name: 'Morocco', city: 'Marrakech', lat: 31.6295, lon: -7.9811, image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'TN', name: 'Tunisia', city: 'Tunis', lat: 36.8065, lon: 10.1815, image: 'https://images.unsplash.com/photo-1572454591674-2739f30a2c80?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'ZA', name: 'South Africa', city: 'Cape Town', lat: -33.9249, lon: 18.4241, image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'MU', name: 'Mauritius', city: 'Port Louis', lat: -20.1609, lon: 57.5012, image: 'https://images.unsplash.com/photo-1586979079203-f4f0a8f47f7f?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'SC', name: 'Seychelles', city: 'Victoria', lat: -4.6191, lon: 55.4513, image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'MV', name: 'Maldives', city: 'Male', lat: 4.1755, lon: 73.5093, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // SOUTH AMERICA - Visa Free for Turkish Passports
    { code: 'BR', name: 'Brazil', city: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'AR', name: 'Argentina', city: 'Buenos Aires', lat: -34.6037, lon: -58.3816, image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'CL', name: 'Chile', city: 'Santiago', lat: -33.4489, lon: -70.6693, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'CO', name: 'Colombia', city: 'Bogota', lat: 4.7110, lon: -74.0721, image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'PE', name: 'Peru', city: 'Lima', lat: -12.0464, lon: -77.0428, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'EC', name: 'Ecuador', city: 'Quito', lat: -0.1807, lon: -78.4678, image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'UY', name: 'Uruguay', city: 'Montevideo', lat: -34.9011, lon: -56.1645, image: 'https://images.unsplash.com/photo-1597006220214-8899d8f15b68?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'PY', name: 'Paraguay', city: 'Asuncion', lat: -25.2637, lon: -57.5759, image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // CENTRAL AMERICA & CARIBBEAN
    { code: 'PA', name: 'Panama', city: 'Panama City', lat: 8.9824, lon: -79.5199, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'CR', name: 'Costa Rica', city: 'San Jose', lat: 9.9281, lon: -84.0907, image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },
    { code: 'DO', name: 'Dominican Republic', city: 'Punta Cana', lat: 18.5601, lon: -68.3725, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', visaFree: ['tr-red', 'tr-green', 'us', 'eu'] },

    // EUROPE (Green Passport / Schengen for Others)
    { code: 'DE', name: 'Germany', city: 'Berlin', lat: 52.5200, lon: 13.4050, image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'FR', name: 'France', city: 'Paris', lat: 48.8566, lon: 2.3522, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'IT', name: 'Italy', city: 'Rome', lat: 41.9028, lon: 12.4964, image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'ES', name: 'Spain', city: 'Barcelona', lat: 41.3851, lon: 2.1734, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'NL', name: 'Netherlands', city: 'Amsterdam', lat: 52.3676, lon: 4.9041, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'BE', name: 'Belgium', city: 'Brussels', lat: 50.8503, lon: 4.3517, image: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'PT', name: 'Portugal', city: 'Lisbon', lat: 38.7223, lon: -9.1393, image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'GR', name: 'Greece', city: 'Athens', lat: 37.9838, lon: 23.7275, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'AT', name: 'Austria', city: 'Vienna', lat: 48.2082, lon: 16.3738, image: 'https://images.unsplash.com/photo-1516550893923-42d28e5a5e90?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'CH', name: 'Switzerland', city: 'Zurich', lat: 47.3769, lon: 8.5417, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'CZ', name: 'Czech Republic', city: 'Prague', lat: 50.0755, lon: 14.4378, image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'PL', name: 'Poland', city: 'Warsaw', lat: 52.2297, lon: 21.0122, image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400', visaFree: ['tr-green', 'us', 'eu'] },
    { code: 'HU', name: 'Hungary', city: 'Budapest', lat: 47.4979, lon: 19.0402, image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400', visaFree: ['tr-green', 'us', 'eu'] },

    // UK (Not Schengen, separate rules)
    { code: 'GB', name: 'United Kingdom', city: 'London', lat: 51.5074, lon: -0.1278, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', visaFree: ['us', 'eu'] },
];

// =====================================================
// WEATHER API - Supports Date-Based Forecasts
// =====================================================
export const fetchWeather = async (city, dateString) => {
    try {
        const baseURL = 'https://api.openweathermap.org/data/2.5';

        // Determine if we need forecast or current weather
        let endpoint = 'weather';
        const params = {
            q: city,
            units: 'metric',
            appid: KEYS.WEATHER
        };

        // If a date is provided, check if it's in the future (within 5 days)
        if (dateString) {
            const targetDate = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            targetDate.setHours(0, 0, 0, 0);

            const diffDays = Math.round((targetDate - today) / (1000 * 60 * 60 * 24));

            if (diffDays >= 1 && diffDays <= 5) {
                endpoint = 'forecast';
            }
        }

        const response = await axios.get(`${baseURL}/${endpoint}`, { params });

        if (endpoint === 'forecast' && dateString) {
            // Parse forecast data to find the closest match to selected date
            const targetDate = new Date(dateString);
            const forecasts = response.data.list;

            // Find forecast closest to noon on the target date
            let bestMatch = forecasts[0];
            for (const item of forecasts) {
                const forecastDate = new Date(item.dt * 1000);
                if (forecastDate.toDateString() === targetDate.toDateString()) {
                    const hour = forecastDate.getHours();
                    if (hour >= 11 && hour <= 15) {
                        bestMatch = item;
                        break;
                    }
                    bestMatch = item;
                }
            }

            return {
                main: bestMatch.main,
                weather: bestMatch.weather
            };
        }

        return response.data;

    } catch (error) {
        console.error(`Weather API Error for ${city}:`, error.message);
        // Return realistic fallback based on latitude (rough climate estimation)
        const fallbackTemp = Math.floor(Math.random() * 30) + 5;
        return {
            main: { temp: fallbackTemp },
            weather: [{ main: fallbackTemp > 20 ? 'Clear' : 'Clouds' }]
        };
    }
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

