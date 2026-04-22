import { db } from "../db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
		additionalFields: {
      icon: {
        type: "string",
        required: true,
        defaultValue: "star",
        input: false,
      },
      color: {
        type: "string",
        required: true,
        defaultValue: "#ff9900",
        input: false,
      },
			nickname: {
				type: "string",
				required: false,
        input: false,
			},
		},
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    }
	},
  emailAndPassword: { 
    enabled: true,
    minPasswordLength: 7,
  },
  plugins: [
    admin()
  ]
});
