import { apiFetch } from "@/lib/api-client";
import { ILoginForm } from "@/app/login/types";
import { IRegisterForm } from "@/app/register/types";
import { User } from "@/types";

/**
 * Register a new user
 */
export async function register(data: IRegisterForm) {
  const response = await apiFetch("/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

/**
 * Login a user
 */
export async function login(data: ILoginForm) {
  const response = await apiFetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

/**
 * Logout the current user
 */
export async function logout() {
  const response = await apiFetch("/api/v1/auth/logout", {
    method: "POST",
  });
  return response?.data;
}

/**
 * Get current user profile
 */
export async function getMe(): Promise<User> {
  const response = await apiFetch<any>("/api/v1/users/me");
  return response?.data;
}

/**
 * Update current user profile
 */
export async function updateMe(data: { fullName: string; email: string; governorate: string }) {
  const response = await apiFetch("/api/v1/users/update-me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Change current user password
 */
export async function updatePassword(data: { currentPassword: string; newPassword: string; passwordConfirm: string }) {
  const response = await apiFetch("/api/v1/users/change-my-password", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response?.data;
}

/**
 * Send password reset OTP to email
 */
export async function forgotPassword(data: { email: string }) {
  const response = await apiFetch("/api/v1/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

/**
 * Verify the OTP reset code
 */
export async function verifyResetCode(data: { resetCode: string }) {
  const response = await apiFetch("/api/v1/auth/verify-reset-code", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

/**
 * Reset the password with email + new passwords
 */
export async function resetPassword(data: { email: string; newPassword: string; newPasswordConfirm: string }) {
  const response = await apiFetch("/api/v1/auth/reset-password", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
}
