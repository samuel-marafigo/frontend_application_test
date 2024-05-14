export interface Professional {
  id: number;
  name: string;
  role: string;
  location: string;
  price: number;
  appointment_length: number;
  description: string;
  timezone: string;
  total_reviews: number;
  review_score: number;
}

export interface ScheduleDay {
  professional_id: number;
  date: string; // Format: YYYY-MM-DD
  times: string[];
}