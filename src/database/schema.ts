import type { Generated, ColumnType } from "kysely";

export type Numeric = ColumnType<
  string, 
  string | number, 
  string | number
>;
export type Timestamp = ColumnType<
  Date,
  Date | string | undefined,
  Date | string | undefined
>;

export type BookingStatus = 
    "pending" 
  | "confirmed" 
  | "completed" 
  | "cancelled";

export interface UserTable {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RoleTable {
  id: Generated<number>;
  name: string;
  description: string | null;

  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface UserRoleTable {
  user_id: string;
  role_id: number;

  assigned_at: Timestamp;
  assigned_by: string | null;
}

export interface ProfileTable {
  id: Generated<number>;
  user_id: string;

  headline: string | null;
  bio: string | null;

  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface ServiceTable {
  id: Generated<number>;
  mentor_id: string;

  title: string;
  description: string;
  duration: number;

  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface AvailabilityTable {
  id: Generated<number>;
  service_id: number;

  day_of_week: number;
  start_time: string;
  end_time: string;

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


export interface DB {
  user: UserTable;

  role: RoleTable;
  user_role: UserRoleTable;

  profile: ProfileTable;
  service: ServiceTable;
  availability: AvailabilityTable;
  booking: BookingTable;
}
