import { Generated , ColumnType } from 'kysely';

export type Numeric = ColumnType<string, string | number, string | number>;


export type serviceType = "free" | "paid";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";



export interface profile {
  id: Generated<number>;
  user_id: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface Service {
  id: Generated<number>;
  mentor_id: string;
  title: string;
  type: "free" | "paid";
  description: string;
  duration: number;
  price: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface booking {
  id: Generated<number>;
  mentee_id: string;
  service_id: number;
  timeslot: Date;
  status: string;
  meeting_platform: string | null;
  meeting_link: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
export interface payment {
  id: Generated<number>;
  booking_id: number;
  amount: number;
  method: string;
  status: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
export interface DB {
  profile: profile;
  service: Service;
  booking: booking;
  payment: payment;
}
