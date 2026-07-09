import type { Generated, ColumnType } from "kysely";

export type Numeric = ColumnType<string, string | number, string | number>;
type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type ServiceType = "free" | "paid";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface UserTable {
  id: string;
}
export interface ProfileTable {
  id: Generated<number>;
  user_id: string;
  headline: string | null;
  bio: string | null;

  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface role {
  id: Generated<number>;
  name: string;
  description: string;

  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface user_role{
  user_id: string;
  role_id:string;
  assigned_at:string;
  assigned_by: string;
}

export interface ServiceTable {
  id: Generated<number>;
  mentor_id: string;
  title: string;
  description: string;

  type: ServiceType;

  duration: number;
  price: Numeric;

  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface BookingTable {
  id: Generated<number>;
  mentee_id: string;
  service_id: number;
  timeslot: Date;

  status: BookingStatus;

  meeting_platform: string | null;
  meeting_link: string | null;

  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface PaymentTable {
  id: Generated<number>;
  booking_id: number;
  amount: Numeric;
  method: string;

  status: PaymentStatus;

  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface DB {
  user: UserTable;

  profile: ProfileTable;
  service: ServiceTable;
  booking: BookingTable;
  payment: PaymentTable;
}
