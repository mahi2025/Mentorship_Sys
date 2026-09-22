import assert from "node:assert/strict";
import test from "node:test";
import { AppError } from "../src/shared/errors/AppError";
import {
  assertBookingAccess,
  validateBookingStart,
} from "../src/modules/booking/booking.policy";
import { createBookingSchema } from "../src/modules/booking/booking.validation";

const booking = {
  mentee_id: "mentee-1",
  mentor_id: "mentor-1",
};

function expectAppError(action: () => void, statusCode: number): void {
  assert.throws(action, (error: unknown) => {
    return error instanceof AppError && error.statusCode === statusCode;
  });
}

test("booking input requires an explicit timezone and returns a Date", () => {
  const result = createBookingSchema.parse({
    timeslot: "2026-10-01T14:00:00+02:00",
  });

  assert.ok(result.timeslot instanceof Date);
  assert.equal(result.timeslot.toISOString(), "2026-10-01T12:00:00.000Z");
  assert.throws(() =>
    createBookingSchema.parse({ timeslot: "2026-10-01T14:00:00" }),
  );
});

test("booking time must satisfy the minimum notice window", () => {
  const now = new Date("2026-09-22T10:00:00.000Z");

  validateBookingStart(new Date("2026-09-22T10:16:00.000Z"), now);
  expectAppError(
    () => validateBookingStart(new Date("2026-09-22T10:14:00.000Z"), now),
    400,
  );
});

test("only the booking mentee, service mentor, or admin can change status", () => {
  expectAppError(
    () => assertBookingAccess(booking, ["mentee"], "other-user", "cancelled"),
    403,
  );

  expectAppError(
    () => assertBookingAccess(booking, ["mentee"], "mentee-1", "confirmed"),
    403,
  );

  assert.doesNotThrow(() =>
    assertBookingAccess(booking, ["mentee"], "mentee-1", "cancelled"),
  );
  assert.doesNotThrow(() =>
    assertBookingAccess(booking, ["mentor"], "mentor-1", "confirmed"),
  );
  assert.doesNotThrow(() =>
    assertBookingAccess(booking, ["admin"], "admin-1", "completed"),
  );
});