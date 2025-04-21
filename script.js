// Sample data structure for each region
const locationData = {
    la: {
        center: [33.680355, -117.668628],  // Foothill Ranch coordinates
        zoom: 10,
        nodes: [
            { id: 'Foothill Ranch', kids: 4912, prime: true, lat: 33.680355, lng: -117.668628 },
            { id: 'Alicia', kids: 4601, prime: false, lat: 33.601372, lng: -117.689109 },
            { id: 'Las Flores', kids: 4912, prime: false, lat: 33.589722, lng: -117.625833 }
        ],
        distances: {
            'Foothill Ranch': {
                'Alicia': 13.9,
                'Las Flores': 11.3
            },
            'Alicia': {
                'Las Flores': 5.4
            }
        },
        times: {
            'Foothill Ranch': {
                'Alicia': 17,
                'Las Flores': 16
            },
            'Alicia': {
                'Las Flores': 13
            }
        }
    },
    stlouis: {
        center: [38.566822, -90.4047],  // Kirkwood coordinates
        zoom: 10,
        nodes: [
            { id: 'Kirkwood', kids: 2059, prime: true, lat: 38.566822, lng: -90.4047 },
            { id: 'Arbor Spring', kids: 1395, prime: false, lat: 38.569319, lng: -90.525659 },
            { id: 'Central West End (laclede)', kids: 386, prime: false, lat: 38.637199, lng: -90.248919 },
            { id: 'Creve Coeur', kids: 1100, prime: false, lat: 38.668648, lng: -90.437884 }
        ],
        distances: {
            'Kirkwood': {
                'Arbor Spring': 6.9,
                'Central West End (laclede)': 11.9,
                'Creve Coeur': 10.0
            },
            'Arbor Spring': {
                'Central West End (laclede)': 20.1,
                'Creve Coeur': 11.9
            },
            'Central West End (laclede)': {
                'Creve Coeur': 14.4
            }
        },
        times: {
            'Kirkwood': {
                'Arbor Spring': 16,
                'Central West End (laclede)': 19,
                'Creve Coeur': 15
            },
            'Arbor Spring': {
                'Central West End (laclede)': 29,
                'Creve Coeur': 21
            },
            'Central West End (laclede)': {
                'Creve Coeur': 24
            }
        }
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
        distances: {
            'Downtown Naperville': {
                'Burr Ridge': 18.6,
                'Deerbrook': 38.3,
                'Downers Grove': 8.3,
                'Evanston': 38.3,
                'Lincoln Park': 34.3,
                'Magnificent Mile': 32.3,
                'Oak Brook': 12.9,
                'Old Town': 32.6,
                'South Naperville': 9.1,
                'West Loop': 30.7,
                'Wicker Park': 30.4
            },
            'Burr Ridge': {
                'Deerbrook': 32.0,
                'Downers Grove': 10.0,
                'Evanston': 32.0,
                'Lincoln Park': 24.5,
                'Magnificent Mile': 21.4,
                'Oak Brook': 9.2,
                'Old Town': 21.4,
                'South Naperville': 19.9,
                'West Loop': 19.5,
                'Wicker Park': 19.1
            },
            'Deerbrook': {
                'Downers Grove': 30.0,
                'Evanston': 2.9,
                'Lincoln Park': 15.6,
                'Magnificent Mile': 17.6,
                'Oak Brook': 27.3,
                'Old Town': 15.0,
                'South Naperville': 39.6,
                'West Loop': 19.8,
                'Wicker Park': 16.7
            },
            'Downers Grove': {
                'Evanston': 30.0,
                'Lincoln Park': 26.0,
                'Magnificent Mile': 24.0,
                'Oak Brook': 4.6,
                'Old Town': 24.3,
                'South Naperville': 1.2,
                'West Loop': 22.4,
                'Wicker Park': 22.1
            },
            'Evanston': {
                'Lincoln Park': 12.7,
                'Magnificent Mile': 14.7,
                'Oak Brook': 27.3,
                'Old Town': 12.1,
                'South Naperville': 39.6,
                'West Loop': 16.9,
                'Wicker Park': 13.8
            },
            'Lincoln Park': {
                'Magnificent Mile': 2.0,
                'Oak Brook': 21.4,
                'Old Town': 0.6,
                'South Naperville': 35.6,
                'West Loop': 4.2,
                'Wicker Park': 2.9
            },
            'Magnificent Mile': {
                'Oak Brook': 19.4,
                'Old Town': 1.4,
                'South Naperville': 33.6,
                'West Loop': 2.2,
                'Wicker Park': 2.7
            },
            'Oak Brook': {
                'Old Town': 19.7,
                'South Naperville': 14.2,
                'West Loop': 17.8,
                'Wicker Park': 17.5
            },
            'Old Town': {
                'South Naperville': 33.9,
                'West Loop': 3.6,
                'Wicker Park': 2.3
            },
            'South Naperville': {
                'West Loop': 31.2,
                'Wicker Park': 30.9
            },
            'West Loop': {
                'Wicker Park': 1.3
            }
        },
        times: {
            'Downtown Naperville': {
                'Burr Ridge': 25,
                'Deerbrook': 44,
                'Downers Grove': 17,
                'Evanston': 59,
                'Lincoln Park': 54,
                'Magnificent Mile': 48,
                'Oak Brook': 18,
                'Old Town': 47,
                'South Naperville': 21,
                'West Loop': 42,
                'Wicker Park': 47
            },
            'Burr Ridge': {
                'Deerbrook': 34,
                'Downers Grove': 20,
                'Evanston': 49,
                'Lincoln Park': 34,
                'Magnificent Mile': 31,
                'Oak Brook': 16,
                'Old Town': 34,
                'South Naperville': 28,
                'West Loop': 29,
                'Wicker Park': 34
            },
            'Deerbrook': {
                'Downers Grove': 34,
                'Evanston': 15,
                'Lincoln Park': 24,
                'Magnificent Mile': 26,
                'Oak Brook': 31,
                'Old Town': 23,
                'South Naperville': 45,
                'West Loop': 29,
                'Wicker Park': 26
            },
            'Downers Grove': {
                'Evanston': 42,
                'Lincoln Park': 37,
                'Magnificent Mile': 34,
                'Oak Brook': 11,
                'Old Town': 37,
                'South Naperville': 4,
                'West Loop': 32,
                'Wicker Park': 37
            },
            'Evanston': {
                'Lincoln Park': 21,
                'Magnificent Mile': 23,
                'Oak Brook': 42,
                'Old Town': 20,
                'South Naperville': 60,
                'West Loop': 26,
                'Wicker Park': 23
            },
            'Lincoln Park': {
                'Magnificent Mile': 6,
                'Oak Brook': 31,
                'Old Town': 3,
                'South Naperville': 55,
                'West Loop': 11,
                'Wicker Park': 8
            },
            'Magnificent Mile': {
                'Oak Brook': 28,
                'Old Town': 5,
                'South Naperville': 49,
                'West Loop': 8,
                'Wicker Park': 10
            },
            'Oak Brook': {
                'Old Town': 31,
                'South Naperville': 22,
                'West Loop': 26,
                'Wicker Park': 31
            },
            'Old Town': {
                'South Naperville': 48,
                'West Loop': 8,
                'Wicker Park': 5
            },
            'South Naperville': {
                'West Loop': 43,
                'Wicker Park': 48
            },
            'West Loop': {
                'Wicker Park': 7
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
        ],
        distances: {
            'Broadlands': {
                'Chantilly': 14.6,
                'Fairfax': 22.2,
                'Gambrills': 60.4,
                'Hampshire': 56.4,
                'Montclair': 35.7,
                'Reston': 14.8,
                'South Riding': 7.7,
                'West Alex': 35.9
            },
            'Chantilly': {
                'Fairfax': 9.4,
                'Gambrills': 60.7,
                'Hampshire': 48.4,
                'Montclair': 30.1,
                'Reston': 15.1,
                'South Riding': 6.2,
                'West Alex': 27.9
            },
            'Fairfax': {
                'Gambrills': 50.6,
                'Hampshire': 40.1,
                'Montclair': 23.5,
                'Reston': 11.9,
                'South Riding': 11.8,
                'West Alex': 18.5
            },
            'Gambrills': {
                'Hampshire': 43.9,
                'Montclair': 66.3,
                'Reston': 52.5,
                'South Riding': 56.9,
                'West Alex': 45.1
            },
            'Hampshire': {
                'Montclair': 46.2,
                'Reston': 40.1,
                'South Riding': 44.5,
                'West Alex': 32.7
            },
            'Montclair': {
                'Reston': 38.4,
                'South Riding': 32.7,
                'West Alex': 27.4
            },
            'Reston': {
                'South Riding': 13.5,
                'West Alex': 29.7
            },
            'South Riding': {
                'West Alex': 33.9
            }
        },
        times: {
            'Broadlands': {
                'Chantilly': 19,
                'Fairfax': 30,
                'Gambrills': 68,
                'Hampshire': 67,
                'Montclair': 58,
                'Reston': 23,
                'South Riding': 17,
                'West Alex': 42
            },
            'Chantilly': {
                'Fairfax': 17,
                'Gambrills': 67,
                'Hampshire': 64,
                'Montclair': 43,
                'Reston': 22,
                'South Riding': 15,
                'West Alex': 39
            },
            'Fairfax': {
                'Gambrills': 58,
                'Hampshire': 53,
                'Montclair': 41,
                'Reston': 27,
                'South Riding': 25,
                'West Alex': 31
            },
            'Gambrills': {
                'Hampshire': 54,
                'Montclair': 74,
                'Reston': 62,
                'South Riding': 66,
                'West Alex': 53
            },
            'Hampshire': {
                'Montclair': 55,
                'Reston': 50,
                'South Riding': 54,
                'West Alex': 42
            },
            'Montclair': {
                'Reston': 48,
                'South Riding': 42,
                'West Alex': 37
            },
            'Reston': {
                'South Riding': 23,
                'West Alex': 39
            },
            'South Riding': {
                'West Alex': 43
            }
        }
    },
    nyc: {
        center: [40.840127, -74.035767],
        zoom: 9,
        nodes: [
            { id: 'Brooklyn Heights', kids: 7065, prime: false, lat: 40.697824, lng: -73.993462 },
            { id: 'Mahwah', kids: 2059, prime: true, lat: 41.088976, lng: -74.143644 },
            { id: 'Bridgewater', kids: 2261, prime: false, lat: 40.596431, lng: -74.604906 },
            { id: 'Williamsburg', kids: 8172, prime: false, lat: 40.714052, lng: -73.961773 }
        ],
        distances: {
            'Brooklyn Heights': {
                'Mahwah': 34.4,
                'Bridgewater': 50.5,
                'Williamsburg': 4.2
            },
            'Mahwah': {
                'Bridgewater': 44.2,
                'Williamsburg': 33.6
            },
            'Bridgewater': {
                'Williamsburg': 45.1
            }
        }
    },
    raleigh: {
        center: [35.79565, -78.648018],
        zoom: 11,
        nodes: [
            { id: 'Cary', kids: 2893, prime: true, lat: 35.791538, lng: -78.781126 },
            { id: 'Spruce Tree', kids: 2249, prime: false, lat: 35.837843, lng: -78.644527 }
        ],
        distances: {
            'Cary': {
                'Spruce Tree': 23.1
            }
        }
    }
};



// Store map instances and path layers
const maps = {};
const pathLayers = {};

// Get distance between two nodes from the matrix data
function getDistance(fromNode, toNode, region) {
    // Use predefined distances if available
    if (locationData[region].distances?.[fromNode.id]?.[toNode.id]) {
        return locationData[region].distances[fromNode.id][toNode.id];
    }
    if (locationData[region].distances?.[toNode.id]?.[fromNode.id]) {
        return locationData[region].distances[toNode.id][fromNode.id];
    }
    return null;
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
    return null;
}

// Get the N closest nodes to a given node by travel time
function getNearestNodes(fromNode, nodes, region, n) {
    return nodes
        .map(node => ({
            node,
            time: calculateTime(fromNode, node, region)
        }))
        .sort((a, b) => a.time - b.time)
        .slice(0, n)
        .map(x => x.node);
}

// Generate permutations for a small set of nodes
function permute(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const perms = permute(remaining);
        for (const perm of perms) {
            result.push([current, ...perm]);
        }
    }
    return result;
}

// Calculate total time for a sequence of nodes
function calculateSequenceTime(nodes, region) {
    let totalTime = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
        totalTime += calculateTime(nodes[i], nodes[i + 1], region);
    }
    return totalTime;
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
        let unvisited = [...nonPrimeNodes];
        let totalTime = 0;
        let totalMarket = startNode.kids;
        
        while (unvisited.length > 0) {
            const lastNode = currentPath[currentPath.length - 1];
            
            // Get the 4 nearest unvisited nodes (or all if less than 4)
            const numNeighbors = Math.min(4, unvisited.length);
            const nearestNodes = getNearestNodes(lastNode, unvisited, region, numNeighbors);
            
            // Try all permutations of these nearest nodes
            const perms = permute(nearestNodes);
            let bestSequence = null;
            let bestSequenceTime = Infinity;
            
            perms.forEach(sequence => {
                const sequenceTime = calculateSequenceTime([lastNode, ...sequence], region);
                if (sequenceTime < bestSequenceTime) {
                    bestSequenceTime = sequenceTime;
                    bestSequence = sequence;
                }
            });
            
            // Add the first node from the best sequence to our path
            if (bestSequence && bestSequence.length > 0) {
                const nextNode = bestSequence[0];
                currentPath.push(nextNode);
                totalTime += calculateTime(lastNode, nextNode, region);
                totalMarket += nextNode.kids;
                unvisited = unvisited.filter(n => n !== nextNode);
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
            const distance = getDistance(currentNode, nextNode, region);
            const time = calculateTime(currentNode, nextNode, region);
            if (distance !== null) {
                totalDistance += distance;
            }
            if (time !== null) {
                pathTotalTime += time;
            }
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
                            const distance = getDistance(node, nextNode, region);
                            const time = calculateTime(node, nextNode, region);
                            nextInfo = {
                                distance: distance !== null ? `${distance.toFixed(1)} mi` : '-',
                                time: time !== null ? `${time} min` : '-'
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
