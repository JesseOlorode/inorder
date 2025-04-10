
// Array of motivational messages to display after task completion
export const motivationalMessages = [
  "Awesome work! Let's tackle the next one.",
  "Well done! Small progress is still progress.",
  "Great job! You're making meaningful strides.",
  "Success! One step closer to your goals.",
  "Excellent! Momentum is building with each completion.",
  "Nice work! Consistency is your superpower.",
  "Task crushed! Your productivity is inspiring.",
  "Perfect! Each task completed is a win.",
  "Fantastic job! Keep that positive energy flowing.",
  "Boom! Another one down, you're on a roll!",
  "Achievement unlocked! You're making it happen.",
  "Brilliant! Your determination is paying off.",
  "Amazing! Small wins lead to big results.",
  "Nailed it! Keep up the great work.",
  "Victory! Every task completed is progress made."
];

/**
 * Returns a random motivational message
 */
export const getRandomMotivationalMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
  return motivationalMessages[randomIndex];
};
