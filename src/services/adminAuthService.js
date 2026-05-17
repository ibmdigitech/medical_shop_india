const TOKEN_KEY = 'adminToken';
const SESSION_KEY = 'adminSession';
const AUDIT_KEY = 'adminActivityLog';

const demoUsers = [
  {
    id: 'USR-001',
    name: 'Admin User',
    email: 'admin@amstermedcare.com',
    password: 'admin123',
    role: 'Super Admin',
    permissions: ['*'],
  },
  {
    id: 'USR-002',
    name: 'Maya Pharmacist',
    email: 'pharmacist@amstermedcare.com',
    password: 'pharma123',
    role: 'Pharmacist',
    permissions: ['dashboard:read', 'orders:update', 'prescriptions:verify', 'products:read'],
  },
  {
    id: 'USR-003',
    name: 'Inventory Manager',
    email: 'inventory@amstermedcare.com',
    password: 'stock123',
    role: 'Inventory Manager',
    permissions: ['dashboard:read', 'products:manage', 'stock:manage'],
  },
];

const encodeSession = (payload) => btoa(JSON.stringify(payload));

const decodeSession = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

export const logAdminActivity = (action, metadata = {}) => {
  const session = getAdminSession();
  const entry = {
    id: `LOG-${Date.now()}`,
    action,
    metadata,
    user: session?.user?.name || 'System',
    role: session?.user?.role || 'Guest',
    timestamp: new Date().toISOString(),
  };

  const current = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
  localStorage.setItem(AUDIT_KEY, JSON.stringify([entry, ...current].slice(0, 75)));
  return entry;
};

export const loginAdmin = async ({ email, password }) => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem(TOKEN_KEY, result.token);
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: result.user, issuedAt: Date.now(), expiresAt: result.expiresAt }));
      logAdminActivity('auth.login', { email, source: 'api' });
      return result;
    }
  } catch {
    // Keep demo login available when the local backend is not running.
  }

  const user = demoUsers.find((candidate) => candidate.email === email && candidate.password === password);

  if (!user) {
    throw new Error('Invalid credentials. Try admin@amstermedcare.com / admin123');
  }

  const issuedAt = Date.now();
  const expiresAt = issuedAt + 1000 * 60 * 60 * 8;
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  };
  const token = encodeSession({
    sub: user.id,
    role: user.role,
    permissions: user.permissions,
    iat: issuedAt,
    exp: expiresAt,
    issuer: 'amster-erp-demo',
  });

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user: sessionUser, issuedAt, expiresAt }));
  logAdminActivity('auth.login', { email });

  return { token, user: sessionUser, expiresAt };
};

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);

export const getAdminSession = () => {
  const token = getAdminToken();
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  const tokenPayload = token ? decodeSession(token) : null;

  if (!token || !session || !tokenPayload || tokenPayload.exp < Date.now()) {
    return null;
  }

  return session;
};

export const hasPermission = (requiredPermission) => {
  const session = getAdminSession();
  const permissions = session?.user?.permissions || [];
  return permissions.includes('*') || permissions.includes(requiredPermission);
};

export const logoutAdmin = () => {
  logAdminActivity('auth.logout');
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
};

export const getAdminActivityLog = () => JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
