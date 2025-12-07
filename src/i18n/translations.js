// Language translations for VisaWeather App
const translations = {
    tr: {
        // Hero
        badge: "Dünyayı Sınırsız Keşfet",
        title1: "Pasaportun seni",
        title2: "nereye götürecek?",
        subtitle: "Vizesiz gidebileceğin ülkeleri gerçek zamanlı hava durumu ve uçuş bilgileriyle keşfet.",

        // Filters
        passport: "Pasaport",
        passportOptions: {
            "tr-red": "Bordo Pasaport",
            "tr-green": "Yeşil Pasaport"
        },
        flightType: "Uçuş Tipi",
        flightTypeOptions: {
            "one-way": "Tek Yön",
            "round-trip": "Gidiş-Dönüş"
        },
        weather: "Hava Durumu",
        weatherOptions: {
            "any": "Tümü",
            "sunny": "Güneşli (>20°C)",
            "mild": "Ilık (10-20°C)",
            "snow": "Soğuk/Kar (<5°C)"
        },
        departureDate: "Gidiş Tarihi",
        returnDate: "Dönüş Tarihi",
        explore: "Keşfet",
        searching: "Aranıyor...",

        // Results
        destinationsFound: "Destinasyon Bulundu",
        noResults: "Sonuç Bulunamadı",
        noResultsDesc: "Seçtiğiniz kriterlere uygun destinasyon bulunamadı. Farklı bir hava durumu filtresi deneyin.",
        startExploring: "Keşfetmeye Başla",
        startExploringDesc: "Pasaport türünü ve hava durumu tercihini seçin, ardından \"Keşfet\" butonuna tıklayın.",
        visaFree: "VİZESİZ",
        estFlight: "Tahmini Uçuş",
        searchFlight: "Uçuş Ara",
        returnFlight: "Dönüş Uçuşu",
        toIstanbul: "→ İstanbul",

        // Loading
        analyzing: "Destinasyonlar analiz ediliyor...",

        // Warnings
        returnDateRequired: "Dönüş Tarihi Gerekli",
        returnDateRequiredDesc: "Gidiş-dönüş seçeneği için lütfen dönüş tarihini de seçin."
    },

    en: {
        // Hero
        badge: "Explore the World Without Limits",
        title1: "Where will your",
        title2: "Passport take you?",
        subtitle: "Discover visa-free destinations with real-time weather conditions and flight availability.",

        // Filters
        passport: "Passport",
        passportOptions: {
            "tr-red": "Turkish Passport",
            "tr-green": "Special Passport"
        },
        flightType: "Flight Type",
        flightTypeOptions: {
            "one-way": "One-Way",
            "round-trip": "Round-Trip"
        },
        weather: "Weather",
        weatherOptions: {
            "any": "Any Weather",
            "sunny": "Sunny (>20°C)",
            "mild": "Mild (10-20°C)",
            "snow": "Cold/Snow (<5°C)"
        },
        departureDate: "Departure",
        returnDate: "Return",
        explore: "Explore",
        searching: "Searching...",

        // Results
        destinationsFound: "Destinations Found",
        noResults: "No Results Found",
        noResultsDesc: "No destinations match your criteria. Try a different weather filter.",
        startExploring: "Start Exploring",
        startExploringDesc: "Select passport type and weather preference, then click \"Explore\".",
        visaFree: "VISA FREE",
        estFlight: "Est. Flight",
        searchFlight: "Search Flights",
        returnFlight: "Return Flight",
        toIstanbul: "→ Istanbul",

        // Loading
        analyzing: "Analyzing destinations...",

        // Warnings
        returnDateRequired: "Return Date Required",
        returnDateRequiredDesc: "Please select a return date for round-trip option."
    }
}

export default translations;
