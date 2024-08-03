let streak = 0;
let scoreMultiplier = 1.75;
let greenPoints = 1254;

// Function to get the current streak value
export function getStreak() {
    return streak;
}

// Function to increment the streak
export function incrementStreak() {
    streak += 1;
    if (streak % 7 === 0) {
        scoreMultiplier += 0.25;
    }
    return streak;
}

// Function to reset the streak to 0
export function resetStreak() {
    streak = 0;
    return streak;
}

// Function to get current score multiplier
export function getScoreMultiplier() {
    return scoreMultiplier;
}

// Function to get green points
export function getGreenPoints() {
    return greenPoints;
    console.log(greenPoints);
}

// Function to update green points
export function updateGreenPoints(points) {
    greenPoints = points;
}

// Function to increment green points
export function incrementGreenPoints(points) {
    greenPoints += points;
    return greenPoints;
}

// Function to decrement green points
export function decrementGreenPoints(amount) {
    if (greenPoints >= amount) {
        greenPoints -= amount;
    } else {
        greenPoints = 0;
    }
}

// Function to convert image to base64
export async function convertImageToBase64(uri) {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const base64Url = `data:image/jpeg;base64,${base64}`; // Adjust MIME type as necessary
    return base64Url;
  } catch (e) {
    console.error('Error converting image to base64:', e);
    return null;
  }
}

