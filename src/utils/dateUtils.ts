export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      timeZone: 'Europe/Lisbon', 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).split('/').reverse().join('-');
  };
  
  export const generateDates = (startDate: Date, numberOfDays: number = 4) => {
    const dates = [];
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(startDate.getTime());
      date.setUTCDate(startDate.getUTCDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };
  
  export const formatDisplayDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'Europe/Lisbon',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const [weekday, monthDay] = formattedDate.split(', ');
    return {
      weekday: weekday.toUpperCase(),
      monthday: monthDay.toUpperCase()
    };
  };
  