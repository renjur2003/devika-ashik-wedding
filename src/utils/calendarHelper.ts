/**
 * Wedding Calendar Integration
 * Provides one-click Google Calendar URL and .ics iCalendar file generator
 */

export const weddingEvent = {
  title: 'Devika & Ashish Wedding • Guruvayur',
  description:
    'Wedding of Devika & Ashish (From Schoolmates to Soulmates).\\n\\nMuhurtham (Thalikettu): 6:30 AM – 7:00 AM at Sree Krishna Temple, Guruvayur.\\n\\nFollowed by Wedding Feast & Reception at Geetha Govindam Hall, Guruvayur.',
  location: 'Sree Krishna Temple, Guruvayur, Thrissur, Kerala, India',
  startTime: '20261226T063000',
  endTime: '20261226T140000',
};

export const getGoogleCalendarUrl = () => {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent(weddingEvent.title);
  const dates = `${weddingEvent.startTime}/${weddingEvent.endTime}`;
  const details = encodeURIComponent(weddingEvent.description);
  const location = encodeURIComponent(weddingEvent.location);

  return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
};

export const downloadIcsFile = () => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Devika and Ashish Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:' + weddingEvent.title,
    'DESCRIPTION:' + weddingEvent.description.replace(/\n/g, '\\n'),
    'LOCATION:' + weddingEvent.location,
    'DTSTART:20261226T010000Z', // 6:30 AM IST is 01:00 UTC
    'DTEND:20261226T083000Z',   // 2:00 PM IST is 08:30 UTC
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Devika-Ashish-Wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
