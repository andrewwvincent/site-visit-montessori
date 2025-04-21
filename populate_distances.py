import os
import time
import pandas as pd
from dotenv import load_dotenv
import googlemaps
from datetime import datetime
import csv

# Load environment variables
load_dotenv()

# Initialize Google Maps client
gmaps = googlemaps.Client(key=os.getenv('GOOGLE_MAPS_API_KEY'))

def get_distance_matrix(origin, destination):
    """Get distance and duration between two locations"""
    try:
        # Use arrival time of 9 AM on a Wednesday for consistent traffic patterns
        next_wednesday = datetime.now().replace(hour=9, minute=0)
        while next_wednesday.weekday() != 2:  # 2 is Wednesday
            next_wednesday = next_wednesday.replace(day=next_wednesday.day + 1)

        result = gmaps.distance_matrix(
            origin,
            destination,
            mode="driving",
            arrival_time=next_wednesday
        )

        if result['rows'][0]['elements'][0]['status'] == 'OK':
            distance = result['rows'][0]['elements'][0]['distance']['text']
            duration = result['rows'][0]['elements'][0]['duration']['text']
            
            # Convert distance to miles if in km
            if 'km' in distance:
                distance_value = float(distance.replace(' km', '')) * 0.621371
                distance = f"{distance_value:.1f} mi"
            
            # Convert duration to minutes
            duration_parts = duration.split()
            total_minutes = 0
            for i in range(0, len(duration_parts), 2):
                value = int(duration_parts[i])
                unit = duration_parts[i+1]
                if 'hour' in unit:
                    total_minutes += value * 60
                elif 'min' in unit:
                    total_minutes += value
                    
            return distance.replace(' mi', ''), str(total_minutes)
        return None, None
    except Exception as e:
        print(f"Error getting distance matrix for {origin} to {destination}: {str(e)}")
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
            
        # Sleep to respect API rate limits
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
