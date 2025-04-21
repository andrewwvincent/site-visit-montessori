# Distance Matrix Calculator

After testing several free options, here are the best approaches for getting the distance data:

1. **Manual Collection (Most Reliable)**
   - Use Google Maps directly in your browser
   - Search for directions between each pair
   - Copy the distance and estimated time into the CSV files
   - This will give the most accurate results
   - Can be done in batches to manage time

2. **Batch Processing Options**
   - MapQuest API (free tier available)
   - Bing Maps API (free tier available)
   - Both require API keys but have generous free tiers

3. **Current CSV Files**
   The distance matrices are split by region:
   - chicago_matrix.csv (66 pairs)
   - dc_matrix.csv (36 pairs)
   - nyc_newark_matrix.csv (6 pairs)
   - raleigh_matrix.csv (1 pair)

## Recommendation

Since the total number of pairs isn't too large (109 total), and accuracy is important for your analysis, I recommend:

1. Start with the smallest matrix (Raleigh - 1 pair) and work up
2. Use Google Maps manually for the most accurate results
3. Consider time of day for traffic patterns (maybe check both rush hour and non-rush hour times)

This will give you the most accurate data for your traveling salesman analysis.
