/**
 * Gets the dates for the current week, starting from Monday.
 * @returns {Array<Object>} An array of date objects for the week.
 * Each object contains a display-friendly format and a machine-readable format.
 */
export const getWeekDays = () => {
  const today = new Date();
  const currentDay = today.getDay(); 
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    
    weekDays.push({
    
      display: day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
 
      iso: day.toISOString().split('T')[0], 
    });
  }
  return weekDays;
};
