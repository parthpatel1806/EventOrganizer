import { Event } from '../services/events';

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function validateEvent(event: Partial<Event>): event is Event {
  return (
    typeof event.title === 'string' && event.title.trim().length > 0 &&
    typeof event.description === 'string' && event.description.trim().length > 0 &&
    event.date instanceof Date && !isNaN(event.date.getTime()) &&
    typeof event.location === 'string' && event.location.trim().length > 0 &&
    typeof event.userId === 'string' && event.userId.trim().length > 0
  );
}
