from geopy.geocoders import Nominatim
import time

def test_address(address):
    """Test geocoding for a single address"""
    try:
        geolocator = Nominatim(user_agent="my_distance_calculator")
        print(f"\nTesting address: {address}")
        location = geolocator.geocode(address)
        if location:
            print(f"Found: {location.address}")
            print(f"Coordinates: {location.latitude}, {location.longitude}")
            return True
        else:
            print(f"Could not find coordinates for {address}")
            return False
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

def test_addresses():
    """Test a sample of addresses from each region"""
    addresses = [
        # Raleigh area
        "316 Colonades Way, Cary, NC 27518",
        "12600 Spruce Tree Way, Raleigh, NC 27614",
        
        # Chicago area
        "24 N Washington St., Naperville, IL 60540",
        "7508 S County Line Rd, Burr Ridge, IL 60527",
        
        # DC area
        "42945 Waxpool Rd, Ashburn, VA 20148",
        "4550 Walney Rd, Chantilly, VA 20151"
    ]
    
    success = 0
    for address in addresses:
        if test_address(address):
            success += 1
        time.sleep(1)  # Respect rate limits
    
    print(f"\nSuccessfully geocoded {success} out of {len(addresses)} addresses")

if __name__ == "__main__":
    test_addresses()
