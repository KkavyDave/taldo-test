# How to Extract YouTube Shorts Video IDs

## Method 1: Browser Console (Recommended)

1. Navigate to: https://www.youtube.com/channel/UC30kGBAio5wWREcoyJ8bYtQ/shorts
2. Scroll down to load all Shorts videos (keep scrolling until no more load)
3. Open browser console (Press F12 or Right-click → Inspect → Console tab)
4. Copy and paste the following script:

```javascript
(function() {
    const videoIds = new Set();
    
    // Method 1: Find all links with /shorts/ in href
    document.querySelectorAll('a[href*="/shorts/"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const match = href.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
            if (match) {
                videoIds.add(match[1]);
            }
        }
    });
    
    // Method 2: Search page source for video IDs
    const pageSource = document.documentElement.outerHTML;
    const matches = pageSource.match(/\/shorts\/([a-zA-Z0-9_-]{11})/g);
    if (matches) {
        matches.forEach(m => {
            const id = m.match(/\/([a-zA-Z0-9_-]{11})/)[1];
            videoIds.add(id);
        });
    }
    
    // Method 3: Look in script tags for video data
    document.querySelectorAll('script').forEach(script => {
        if (script.textContent) {
            const matches = script.textContent.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
            if (matches) {
                matches.forEach(m => {
                    const id = m.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)[1];
                    videoIds.add(id);
                });
            }
        }
    });
    
    const result = Array.from(videoIds).sort();
    console.log('Found', result.length, 'video IDs:');
    console.log(JSON.stringify(result, null, 2));
    
    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(result, null, 2)).then(() => {
        console.log('✅ Copied to clipboard!');
    });
    
    return result;
})();
```

5. Press Enter to run the script
6. The video IDs will be logged to the console and copied to your clipboard
7. Update the `shortsVideos` array in `src/components/webinar/YouTubeShorts.tsx` with the extracted IDs

## Method 2: Manual Extraction

1. Go to the Shorts page
2. Right-click on each Short video → "Copy video URL"
3. Extract the video ID from the URL (the part after `/shorts/`)
4. Add each video ID to the `shortsVideos` array

## Current Video IDs Found

- eQ23qmDEa_Q
- Gkykh0qXkxc
- PDrFXZtNJMs
- Vd_F6DkD-QU

Add more as you find them!

