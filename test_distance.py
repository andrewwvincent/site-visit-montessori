import requests
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import time

def get_coordinates(address):
    """Get coordinates for an address using OpenStreetMap's Nominatim"""
    try:
        geolocator = Nominatim(user_agent="my_distance_calculator")
        # Add USA to improve accuracy
        if "US" not in address and "USA" not in address:
            address = f"{address}, USA"
        location = geolocator.geocode(address)
        if location:
            print(f"Found coordinates for {address}: {location.latitude}, {location.longitude}")
            return location.latitude, location.longitude
        print(f"Could not find coordinates for {address}")
        return None
    except GeocoderTimedOut:
        print(f"Timeout for address: {address}")
        return None
    except Exception as e:
        print(f"Error geocoding {address}: {str(e)}")
        return None

def get_distance_matrix(origin_address, dest_address):
    """Get distance and duration between two locations using OSRM"""
    try:
        print(f"\nTesting route from {origin_address} to {dest_address}")
        
        # Get coordinates for both addresses
        origin_coords = get_coordinates(origin_address)
        time.sleep(1)  # Respect rate limits
        dest_coords = get_coordinates(dest_address)
        
        if not origin_coords or not dest_coords:
            print("Could not get coordinates for one or both addresses")
            return None, None
            
        # Format coordinates for OSRM
        coords_str = f"{origin_coords[1]},{origin_coords[0]};{dest_coords[1]},{dest_coords[0]}"
        
        # Make request to OSRM
        url = f"http://router.project-osrm.org/route/v1/driving/{coords_str}?overview=false"
        print(f"Requesting route from OSRM: {url}")
        
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            if data["code"] == "Ok" and len(data["routes"]) > 0:
                # Distance is in meters, convert to miles
                distance_miles = data["routes"][0]["distance"] * 0.000621371
                # Duration is in seconds, convert to minutes
                duration_minutes = data["routes"][0]["duration"] / 60
                
                print(f"Success! Distance: {distance_miles:.1f} miles, Duration: {duration_minutes:.0f} minutes")
                return f"{distance_miles:.1f}", f"{duration_minutes:.0f}"
        
        print(f"Error in OSRM response: {response.text}")
        return None, None
    except Exception as e:
        print(f"Error calculating route: {str(e)}")
        return None, None

def test_pairs():
    """Test a few sample pairs"""
    # Test Raleigh pair
    print("\n=== Testing Raleigh Pair ===")
    get_distance_matrix(
        "316 Colonades Way, Cary, NC 27518",
        "12600 Spruce Tree Way, Raleigh, NC 27614"
    )
    
    time.sleep(2)  # Respect rate limits
    
    # Test a Chicago pair
    print("\n=== Testing Chicago Pair ===")
    get_distance_matrix(
        "24 N Washington St., Naperville, IL 60540",
        "7508 S County Line Rd, Burr Ridge, IL 60527"
    )
    
    time.sleep(2)  # Respect rate limits
    
    # Test a DC pair
    print("\n=== Testing DC Pair ===")
    get_distance_matrix(
        "42945 Waxpool Rd, Ashburn, VA 20148",
        "4550 Walney Rd, Chantilly, VA 20151"
    )

if __name__ == "__main__":
    test_pairs()
