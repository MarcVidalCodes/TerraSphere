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


// Function to handle item redemption
export const redeemItem = (item, currentPoints, updatePoints) => {
  if (currentPoints >= item.pointsCost) {
    // Decrease points and update state
    decrementGreenPoints(item.pointsCost);
    const updatedPoints = getGreenPoints(); // Fetch updated points
    updatePoints(updatedPoints);

    return {
      redeemable: false, // Mark as not redeemable
      redeemed: true, // Mark as redeemed
    };
  } else {
    return {
      redeemable: true, // Keep as redeemable
      redeemed: false, // Not redeemed
    };
  }
};