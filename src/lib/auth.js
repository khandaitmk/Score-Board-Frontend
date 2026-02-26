export const USERS = [
  { username: "admin",    password: "admin123",    role: "admin"    },
  { username: "operator", password: "operator123", role: "operator" },
];

export function login(username, password) {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem("auth-user", JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("auth-user");
}

export function getUser() {
  try {
    const saved = localStorage.getItem("auth-user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}