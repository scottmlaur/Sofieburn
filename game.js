// Load level JSON (precise fix to use flappy-level.json)
fetch('data/flappy-level.json')
  .then(response => response.json())
  .then(levelData => {
    console.log("🕯️ Detailed level loaded:", levelData);
    initializeLevel(levelData); // This stays untouched
  })
  .catch(error => {
    console.error("Error loading flappy-level.json:", error);
  });
