export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-EN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
};
