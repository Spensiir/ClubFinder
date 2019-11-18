const locations = [{
    address : "266 Ferst Dr NW",
    city: 'Atlanta',
    state: 'GA',
    zip: '30332',
    lat: 33.7773,
    long: -84.3962
}];

export function getCoords(loc) {
    for (var i = 0; i < locations.length ; i++) {
        var l = locations[i];
        if (l.address.trim().toLowerCase() !== loc.address.trim().toLowerCase() ) {
            continue;
        } else if (l.city.trim().toLowerCase()  !== loc.city.trim().toLowerCase() ) {
            continue;
        } else if (l.state.trim().toLowerCase()  !== loc.state.trim().toLowerCase() ) {
            continue;
        } else if (l.zip.trim().toLowerCase() !== loc.zip.trim().toLowerCase()) {
            continue;
        }
        return {lat: l.lat, long: l.long};
    }

    return {lat: null, long: null};
}

export default { getCoords };