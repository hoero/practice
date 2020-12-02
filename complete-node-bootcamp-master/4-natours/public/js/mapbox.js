/* eslint-disable */

export const displayMap = locations => {
    mapboxgl.accessToken =
        'pk.eyJ1IjoiaG9lcnUiLCJhIjoiY2s2dmplNWt3MDJqNDNsbWcya3VrbDh2byJ9.KbyINFYrFWoRmUp4XD1Ruw';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/hoeru/ck6vjhoer02zg1imztp1107u5',
        scrollZoom: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);

        // Add popup
        new mapboxgl.Popup({ offset: 30 })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};
