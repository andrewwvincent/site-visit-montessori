import os
import time
import pandas as pd
import requests
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import json

def get_coordinates(address):
    """Get coordinates for an address using OpenStreetMap's Nominatim"""
    try:
        geolocator = Nominatim(user_agent="my_distance_calculator")
        location = geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        return None
    except GeocoderTimedOut:
        print(f"Timeout for address: {address}")
        return None

def get_distance_matrix(origin_address, dest_address):
    """Get distance and duration between two locations using OSRM"""
    try:
        # Get coordinates for both addresses
        origin_coords = get_coordinates(origin_address)
        dest_coords = get_coordinates(dest_address)
        
        if not origin_coords or not dest_coords:
            print(f"Could not find coordinates for {origin_address} or {dest_address}")
            return None, None
            
        # Format coordinates for OSRM
        coords_str = f"{origin_coords[1]},{origin_coords[0]};{dest_coords[1]},{dest_coords[0]}"
        
        # Make request to OSRM
        url = f"http://router.project-osrm.org/route/v1/driving/{coords_str}?overview=false"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            if data["code"] == "Ok" and len(data["routes"]) > 0:
                # Distance is in meters, convert to miles
                distance_miles = data["routes"][0]["distance"] * 0.000621371
                # Duration is in seconds, convert to minutes
                duration_minutes = data["routes"][0]["duration"] / 60
                
                return f"{distance_miles:.1f}", f"{duration_minutes:.0f}"
        
        return None, None
    except Exception as e:
        print(f"Error getting distance matrix for {origin_address} to {dest_address}: {str(e)}")
        return None, None

def process_matrix_file(file_path):
    """Process a single matrix file"""
    print(f"Processing {file_path}...")
    
    # Read existing CSV
    df = pd.read_csv(file_path)
    
    # Process each row
    for index, row in df.iterrows():
        # Skip if already has data
        if pd.notna(row['Distance (miles)']) and pd.notna(row['Travel Time (minutes)']):
            continue
            
        origin = row['From Location']
        destination = row['To Location']
        
        print(f"Getting distance from {origin} to {destination}...")
        
        distance, duration = get_distance_matrix(origin, destination)
        
        if distance and duration:
            df.at[index, 'Distance (miles)'] = distance
            df.at[index, 'Travel Time (minutes)'] = duration
            
            # Save after each successful request to avoid losing data
            df.to_csv(file_path, index=False)
            
        # Sleep to respect rate limits
        time.sleep(1)

def main():
    """Main function to process all matrix files"""
    matrix_dir = "distance_matrices"
    
    # Process each matrix file
    for file_name in os.listdir(matrix_dir):
        if file_name.endswith('_matrix.csv'):
            file_path = os.path.join(matrix_dir, file_name)
            process_matrix_file(file_path)
            print(f"Completed processing {file_name}")

if __name__ == "__main__":
    main()
