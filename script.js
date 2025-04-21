// Sample data structure for each region
const locationData = {
    detroit: {
        center: [42.564365, -83.440442],
        zoom: 10,
        nodes: [
            { id: 'Walled Lake', kids: 1809, prime: true, lat: 42.564365, lng: -83.440442 }
        ]
    },
    chicago: {
        center: [41.878113, -87.629799],
        zoom: 9,
        nodes: [
            { id: 'Downtown Naperville', kids: 2086, prime: true, lat: 41.775747, lng: -88.146767 },
            { id: 'Burr Ridge', kids: 2501, prime: false, lat: 41.746703, lng: -87.919602 },
            { id: 'Deerbrook', kids: 3334, prime: false, lat: 42.151832, lng: -87.853804 },
            { id: 'Downers Grove', kids: 1555, prime: false, lat: 41.80857, lng: -88.008638 },
            { id: 'Evanston', kids: 1987, prime: false, lat: 42.045429, lng: -87.687899 },
            { id: 'Lincoln Park', kids: 2684, prime: false, lat: 41.925726, lng: -87.644751 },
            { id: 'Magnificent Mile', kids: 2563, prime: false, lat: 41.893345, lng: -87.622666 },
            { id: 'Oak Brook', kids: 4114, prime: false, lat: 41.832753, lng: -87.922647 },
            { id: 'Old Town', kids: 2428, prime: false, lat: 41.911745, lng: -87.634424 },
            { id: 'South Naperville', kids: 5588, prime: false, lat: 41.705747, lng: -88.146767 },
            { id: 'West Loop', kids: 2369, prime: false, lat: 41.884321, lng: -87.647437 },
            { id: 'Wicker Park', kids: 2419, prime: false, lat: 41.909904, lng: -87.677234 }
        ],
        times: {
            'Downtown Naperville': {
                'Burr Ridge': 35,
                'Deerbrook': 75,
                'Downers Grove': 20,
                'Evanston': 65,
                'Lincoln Park': 55,
                'Magnificent Mile': 50,
                'Oak Brook': 30,
                'Old Town': 50,
                'South Naperville': 15,
                'West Loop': 45,
                'Wicker Park': 55
            }
        }
    },
    dc: {
        center: [38.941314, -77.207996],
        zoom: 9,
        nodes: [
            { id: 'Broadlands', kids: 6409, prime: true, lat: 39.00503, lng: -77.516636 },
            { id: 'Chantilly', kids: 3337, prime: false, lat: 38.894354, lng: -77.432574 },
            { id: 'Fairfax', kids: 2322, prime: false, lat: 38.846226, lng: -77.306374 },
            { id: 'Gambrills', kids: 2412, prime: false, lat: 39.035732, lng: -76.669744 },
            { id: 'Hampshire', kids: 1141, prime: false, lat: 38.921314, lng: -77.207996 },
            { id: 'Montclair', kids: 3694, prime: false, lat: 38.590833, lng: -77.335833 },
            { id: 'Reston', kids: 5062, prime: false, lat: 38.959824, lng: -77.357331 },
            { id: 'South Riding', kids: 6894, prime: false, lat: 38.908333, lng: -77.516667 },
            { id: 'West Alex', kids: 3031, prime: false, lat: 38.815767, lng: -77.129087 }
        ]
    },
    nyc: {
        center: [40.840127, -74.035767],
        zoom: 9,
        nodes: [
            { id: 'Brooklyn Heights', kids: 7065, prime: true, lat: 40.697824, lng: -73.993462 },
            { id: 'Mahwah', kids: 2059, prime: true, lat: 41.088976, lng: -74.143644 },
            { id: 'Bridgewater', kids: 2261, prime: false, lat: 40.596431, lng: -74.604906 },
            { id: 'Williamsburg', kids: 8172, prime: false, lat: 40.714052, lng: -73.961773 }
        ]
    },
    raleigh: {
        center: [35.79565, -78.648018],
        zoom: 11,
        nodes: [
            { id: 'Cary', kids: 2893, prime: true, lat: 35.791538, lng: -78.781126 },
            { id: 'Spruce Tree', kids: 2249, prime: false, lat: 35.837843, lng: -78.644527 }
        ]
    }
};



// Store map instances and path layers
const maps = {};
const pathLayers = {};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Calculate travel time between two nodes
function calculateTime(fromNode, toNode, region) {
    // Use predefined times if available
    if (locationData[region].times?.[fromNode.id]?.[toNode.id]) {
        return locationData[region].times[fromNode.id][toNode.id];
    }
    if (locationData[region].times?.[toNode.id]?.[fromNode.id]) {
        return locationData[region].times[toNode.id][fromNode.id];
    }
    
    // Otherwise calculate based on distance
    const distance = calculateDistance(fromNode.lat, fromNode.lng, toNode.lat, toNode.lng);
    const avgSpeed = 50; // km/h
    return Math.round((distance / avgSpeed) * 60); // Convert to minutes
}

// Find optimal path starting from prime location
function findOptimalPath(nodes, region) {
    if (nodes.length <= 1) return { path: nodes, totalTime: 0, totalMarket: nodes[0]?.kids || 0 };
    
    const primeNodes = nodes.filter(n => n.prime);
    const nonPrimeNodes = nodes.filter(n => !n.prime);
    let bestPath = null;
    let minTotalTime = Infinity;
    
    // Try each prime node as a starting point
    primeNodes.forEach(startNode => {
        let currentPath = [startNode];
        let unvisited = [...nonPrimeNodes, ...primeNodes.filter(n => n !== startNode)];
        let totalTime = 0;
        let totalMarket = startNode.kids;
        
        while (unvisited.length > 0) {
            let minTime = Infinity;
            let nextNode = null;
            let nextIndex = -1;
            
            unvisited.forEach((node, index) => {
                const lastNode = currentPath[currentPath.length - 1];
                const time = calculateTime(lastNode, node, region);
                
                if (time < minTime) {
                    minTime = time;
                    nextNode = node;
                    nextIndex = index;
                }
            });
            
            if (nextNode) {
                currentPath.push(nextNode);
                totalTime += minTime;
                totalMarket += nextNode.kids;
                unvisited.splice(nextIndex, 1);
            }
        }
        
        if (totalTime < minTotalTime) {
            minTotalTime = totalTime;
            bestPath = { path: currentPath, totalTime, totalMarket };
        }
    });
    
    return bestPath;
}

// Create map for each region
function createNetwork(region) {
    const containerId = `${region}-network`;
    const container = document.getElementById(containerId);
    
    // Clear existing map and paths
    if (maps[region]) {
        maps[region].remove();
    }
    if (pathLayers[region]) {
        pathLayers[region] = null;
    }
    
    // Sort nodes by market size (ascending)
    const primeNodes = locationData[region].nodes.filter(n => n.prime);
    const nonPrimeNodes = locationData[region].nodes.filter(n => !n.prime)
        .sort((a, b) => a.kids - b.kids);
    
    // Get threshold value if slider exists
    const thresholdSlider = document.getElementById(`${region}-threshold`);
    const threshold = thresholdSlider ? parseInt(thresholdSlider.value) : 0;
    
    // Update max threshold if needed
    if (thresholdSlider && thresholdSlider.max !== (nonPrimeNodes.length).toString()) {
        thresholdSlider.max = nonPrimeNodes.length;
    }
    
    // Mark nodes as filtered based on threshold (filter lowest market size first)
    const allNodes = [...primeNodes, ...nonPrimeNodes].map(node => ({
        ...node,
        filtered: !node.prime && nonPrimeNodes.findIndex(n => n.id === node.id) < threshold
    }));
    
    // Keep all nodes but mark some as filtered
    const activeNodes = allNodes;
    
    // Initialize map
    maps[region] = L.map(containerId).setView(locationData[region].center, locationData[region].zoom);
    
    // Add monotone map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: ' OpenStreetMap contributors,  CARTO',
        maxZoom: 19
    }).addTo(maps[region]);
    
    // Find optimal path
    const { path, totalTime, totalMarket } = findOptimalPath(activeNodes, region);
    
    // Add markers and path
    // Calculate active node positions for numbering
    let activeNodeIndex = 1;
    const nodeIndices = new Map();
    path.forEach(node => {
        if (!node.filtered) {
            nodeIndices.set(node.id, activeNodeIndex++);
        }
    });

    // Clear existing path layers
    if (pathLayers[region]) {
        maps[region].removeLayer(pathLayers[region]);
    }
    pathLayers[region] = L.layerGroup().addTo(maps[region]);

    // Add numbered markers for each node
    path.forEach(node => {
        const markerColor = node.prime ? '#ff4444' : (node.filtered ? '#999999' : '#4444ff');
        const nodeNumber = nodeIndices.get(node.id) || '-';
        
        // Create a custom divIcon for the numbered circle
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-circle ${node.filtered ? 'filtered' : ''}" style="background-color: ${markerColor}">${nodeNumber}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        // Add marker with the custom icon
        const marker = L.marker([node.lat, node.lng], {
            icon: markerIcon
        }).addTo(maps[region]);
        
        marker.bindPopup(`${node.id}<br>${node.kids.toLocaleString()} kids`);
    });

    // Draw lines between consecutive non-filtered nodes
    let lastActiveNode = null;
    path.forEach(node => {
        if (!node.filtered) {
            if (lastActiveNode) {
                // Draw line
                L.polyline([
                    [lastActiveNode.lat, lastActiveNode.lng],
                    [node.lat, node.lng]
                ], {
                    color: '#4444ff',
                    weight: 3,
                    opacity: 0.8
                }).addTo(pathLayers[region]);
            }
            lastActiveNode = node;
        }
    });
    
    // Update path info
    const pathSteps = document.querySelector(`#${region}-path .path-steps`);
    const totalTimeSpan = document.querySelector(`#${region}-path .total-time`);
    const totalDistanceSpan = document.querySelector(`#${region}-path .total-distance`);
    
    // Calculate total distance and time (only between non-filtered nodes)
    let totalDistance = 0;
    let pathTotalTime = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const currentNode = path[i];
        if (currentNode.filtered) continue;
        
        // Find next non-filtered node
        let nextNode = null;
        for (let j = i + 1; j < path.length; j++) {
            if (!path[j].filtered) {
                nextNode = path[j];
                break;
            }
        }
        
        if (nextNode) {
            totalDistance += calculateDistance(currentNode.lat, currentNode.lng, nextNode.lat, nextNode.lng);
            pathTotalTime += calculateTime(currentNode, nextNode, region);
        }
    }
    
    pathSteps.innerHTML = `
        <table class="path-table">
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Kids >$250k</th>
                    <th>Distance to Next</th>
                    <th>Time to Next</th>
                </tr>
            </thead>
            <tbody>
                ${path.map((node, index) => {
                    let nextInfo = { distance: '-', time: '-' };
                    if (index < path.length - 1) {
                        // Find next unfiltered node
                        let nextNodeIndex = index + 1;
                        let nextNode = path[nextNodeIndex];
                        while (nextNodeIndex < path.length - 1 && nextNode.filtered) {
                            nextNodeIndex++;
                            nextNode = path[nextNodeIndex];
                        }
                        
                        if (!node.filtered && !nextNode.filtered) {
                            const distance = calculateDistance(node.lat, node.lng, nextNode.lat, nextNode.lng);
                            const time = calculateTime(node, nextNode, region);
                            nextInfo = {
                                distance: `${distance.toFixed(1)} km`,
                                time: `${time} min`
                            };
                        }
                    }

                    return `<tr class="${node.filtered ? 'filtered-row' : ''}">
                        <td>${node.id}</td>
                        <td>${node.kids.toLocaleString()}</td>
                        <td>${nextInfo.distance}</td>
                        <td>${nextInfo.time}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
    
    totalTimeSpan.textContent = pathTotalTime;
    totalDistanceSpan.textContent = totalDistance.toFixed(1);
    
    // Update removed count if slider exists
    const removedCount = document.getElementById(`${region}-removed-count`);
    if (removedCount) {
        removedCount.textContent = threshold;
    }
    
    // Force a resize to ensure proper rendering
    setTimeout(() => {
        maps[region].invalidateSize();
    }, 100);


}

// Drag functions for the nodes


// Initialize networks and controls
function initializeNetworks() {
    Object.keys(locationData).forEach(region => {
        const threshold = document.getElementById(`${region}-threshold`);
        
        // Initial network creation
        createNetwork(region);
        
        // Add threshold slider listener
        threshold.addEventListener('input', () => {
            createNetwork(region);
        });
    });
}

// Find the shortest path using nearest neighbor algorithm
function findShortestPath(nodes, links) {
    if (nodes.length <= 1) return { path: nodes, totalTime: 0 };
    
    // For NYC, try both prime nodes as starting points
    if (nodes.some(n => n.id === 'Brooklyn Heights') || nodes.some(n => n.id === 'Mahwah')) {
        const primeNodes = nodes.filter(n => n.prime);
        let bestPath = null;
        let minTotalTime = Infinity;
        
        for (const startNode of primeNodes) {
            const path = [];
            let totalTime = 0;
            let current = startNode;
            const unvisited = new Set(nodes.filter(n => n !== current));
            
            path.push(current);
            
            while (unvisited.size > 0) {
                let nearest = null;
                let minTime = Infinity;
                
                for (const node of unvisited) {
                    const link = links.find(l => 
                        (l.source.id === current.id && l.target.id === node.id) ||
                        (l.target.id === current.id && l.source.id === node.id)
                    );
                    
                    if (link && link.time < minTime) {
                        minTime = link.time;
                        nearest = node;
                    }
                }
                
                if (nearest) {
                    path.push(nearest);
                    totalTime += minTime;
                    unvisited.delete(nearest);
                    current = nearest;
                } else {
                    break;
                }
            }
            
            if (totalTime < minTotalTime) {
                minTotalTime = totalTime;
                bestPath = { path, totalTime };
            }
        }
        
        return bestPath;
    }
    
    // For other regions, use original logic
    const path = [];
    let totalTime = 0;
    let current = nodes.find(n => n.prime) || nodes[0];
    const unvisited = new Set(nodes.filter(n => n !== current));
    
    path.push(current);
    
    while (unvisited.size > 0) {
        let nearest = null;
        let minTime = Infinity;
        let nearestLink = null;
        
        for (const node of unvisited) {
            const link = links.find(l => 
                (l.source.id === current.id && l.target.id === node.id) ||
                (l.target.id === current.id && l.source.id === node.id)
            );
            
            if (link && link.time < minTime) {
                minTime = link.time;
                nearest = node;
                nearestLink = link;
            }
        }
        
        if (nearest) {
            path.push(nearest);
            totalTime += minTime;
            unvisited.delete(nearest);
            current = nearest;
        } else {
            break;
        }
    }
    
    return { path, totalTime };
}

// Update path information
function updatePathInfo(region, nodes, links) {
    const pathInfo = findShortestPath(nodes, links);
    const pathStepsDiv = document.querySelector(`#${region}-path .path-steps`);
    const totalTimeSpan = document.querySelector(`#${region}-path .total-time`);
    const totalMarketSpan = document.querySelector(`#${region}-path .total-market`);
    
    // Clear previous path
    pathStepsDiv.innerHTML = '';
    
    // Add path steps
    for (let i = 0; i < pathInfo.path.length; i++) {
        const node = pathInfo.path[i];
        const nextNode = pathInfo.path[i + 1];
        const step = document.createElement('div');
        step.className = 'path-step';
        
        let stepHtml = `<span>${node.id} (${node.kids}k)</span>`;
        
        if (nextNode) {
            const link = links.find(l =>
                (l.source.id === node.id && l.target.id === nextNode.id) ||
                (l.target.id === node.id && l.source.id === nextNode.id)
            );
            stepHtml += `<span>${link.distance.toFixed(1)} mi</span>`;
            stepHtml += `<span>${link.time.toFixed(1)} min</span>`;
        } else {
            stepHtml += `<span>-</span><span>-</span>`;
        }
        
        step.innerHTML = stepHtml;
        pathStepsDiv.appendChild(step);
    }
    
    // Update summary
    totalTimeSpan.textContent = pathInfo.totalTime.toFixed(1);
    totalMarketSpan.textContent = (pathInfo.path.reduce((sum, node) => sum + node.kids, 0) / 1000).toFixed(1);
    
    return pathInfo.path;
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    initializeNetworks();
});

// Handle window resize
window.addEventListener('resize', () => {
    initializeNetworks();
});
