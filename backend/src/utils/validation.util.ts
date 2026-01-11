export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateRegistrationData = (data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Invalid email address");
  }

  if (!data.password || !isValidPassword(data.password)) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!data.first_name || data.first_name.trim().length === 0) {
    errors.push("First name is required");
  }

  if (!data.last_name || data.last_name.trim().length === 0) {
    errors.push("Last name is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateLoginData = (data: {
  email: string;
  password: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Invalid email address");
  }

  if (!data.password || data.password.trim().length === 0) {
    errors.push("Password is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
