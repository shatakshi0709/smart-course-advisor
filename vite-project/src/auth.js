const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const signup = (email, password) => {
  const users = getStoredUsers();
  
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  
  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: "Email is already registered." };
  }
  
  users.push({ email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const login = (email, password) => {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, error: "Invalid email or password." };
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
