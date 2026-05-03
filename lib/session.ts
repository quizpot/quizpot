import { auth } from "./auth";

/**
 * Dynamically derived Session type from the auth.api.getSession return value.
 * Note: This type includes null if the user is not authenticated.
 */
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

/**
 * Dynamically derived User type extracted from the Session.
 */
export type User = NonNullable<Session>["user"];
