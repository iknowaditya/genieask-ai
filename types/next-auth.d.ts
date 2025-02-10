// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      emailVerified?: Date | null;
      role?: "user" | "admin";
      createdAt?: string;
      updatedAt?: string;
      // Add any other custom fields you need
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    emailVerified?: Date | null;
    role?: "user" | "admin";
    createdAt?: string;
    updatedAt?: string;
    // Add any other custom user fields
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string | null;
    picture?: string;
    image?: string | null;
    sub?: string;
    role?: "user" | "admin";
    emailVerified?: Date | null;
    createdAt?: string;
    updatedAt?: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}

// Add additional types for better type safety
export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role?: "user" | "admin";
  emailVerified?: Date | null;
}

// Add custom error types
export interface AuthError extends Error {
  type: "AuthError";
  code?: string;
}

// Add custom session callback types
export interface CustomSessionCallback {
  session: Session;
  token: JWT;
  user: User;
}

// Add custom JWT callback types
export interface CustomJWTCallback {
  token: JWT;
  user?: User;
  account?: any;
  profile?: any;
  isNewUser?: boolean;
}

// Add provider types if you're using multiple providers
export interface AuthProviders {
  google: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  // Add other providers as needed
}
