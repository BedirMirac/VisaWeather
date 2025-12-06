import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';

// Mapbox token from environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapVisualizer = ({ countries }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const popupRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);

    // Initialize map
    useEffect(() => {
        if (mapRef.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [30, 40],
            zoom: 2.5,
            minZoom: 1,
            maxZoom: 10,
            projection: 'mercator',
            renderWorldCopies: false
        });

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

        map.on('load', () => {
            setMapReady(true);
        });

        // Create persistent popup for hover
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: [0, -45],
            className: 'hover-popup'
        });
        popupRef.current = popup;

        mapRef.current = map;

        return () => {
            if (popupRef.current) popupRef.current.remove();
            markersRef.current.forEach(m => m.remove());
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Update markers when countries change
    useEffect(() => {
        if (!mapRef.current || !mapReady || !countries) return;

        const map = mapRef.current;
        const popup = popupRef.current;

        // Clear old markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (countries.length === 0) return;

        // Create markers for each country
        countries.forEach((country) => {
            // Create custom pin marker element as a simple div
            const el = document.createElement('div');
            el.className = 'custom-marker';

            // Simple SVG pin - no transforms, just display
            el.innerHTML = `
                <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="shadow-${country.code}" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                        </filter>
                    </defs>
                    <path filter="url(#shadow-${country.code})" d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 28 18 28s18-14.5 18-28c0-9.941-8.059-18-18-18z" fill="#22c55e"/>
                    <circle cx="18" cy="16" r="7" fill="#ffffff"/>
                </svg>
            `;

            // Hover effects - only change opacity, no transforms
            el.addEventListener('mouseenter', () => {
                el.style.opacity = '0.85';
                const path = el.querySelector('path');
                if (path) path.setAttribute('fill', '#16a34a');

                // Show popup
                popup.setLngLat([country.lon, country.lat])
                    .setHTML(`
                        <div class="popup-content">
                            <div class="popup-header">
                                <strong>${country.city}</strong>
                                <span>${country.name}</span>
                            </div>
                            <div class="popup-body">
                                <div class="popup-stat">
                                    <span class="icon">🌡️</span>
                                    <span class="value">${Math.round(country.temp || 20)}°C</span>
                                </div>
                                <div class="popup-stat">
                                    <span class="icon">✈️</span>
                                    <span class="value price">$${country.flightPrice || '---'}</span>
                                </div>
                            </div>
                            <div class="popup-footer">
                                <span class="visa-tag">✓ VİZESİZ</span>
                            </div>
                        </div>
                    `)
                    .addTo(map);
            });

            el.addEventListener('mouseleave', () => {
                el.style.opacity = '1';
                const path = el.querySelector('path');
                if (path) path.setAttribute('fill', '#22c55e');
                popup.remove();
            });

            // Create marker - anchor at bottom so pin stays in place
            const marker = new mapboxgl.Marker({
                element: el,
                anchor: 'bottom'
            })
                .setLngLat([country.lon, country.lat])
                .addTo(map);

            markersRef.current.push(marker);
        });

        // Fit bounds to show all markers
        if (countries.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            countries.forEach(c => bounds.extend([c.lon, c.lat]));

            map.fitBounds(bounds, {
                padding: 80,
                maxZoom: 5,
                duration: 1000
            });
        }

    }, [countries, mapReady]);

    return (
        <div
            ref={mapContainer}
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 'inherit'
            }}
        />
    );
};

MapVisualizer.propTypes = {
    countries: PropTypes.array
};

export default MapVisualizer;
