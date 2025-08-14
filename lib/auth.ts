// Client-side auth service using localStorage
// Note: This is for demo/educational purposes only. Do not use in production.

export type NormalizedRole = 'admin' | 'prof' | 'parent' | 'student';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  role: NormalizedRole;
  firstName?: string;
  lastName?: string;
  department?: string;
  createdAt: string; // ISO string
}

export interface SessionData {
  userId: string;
  email: string;
  role: NormalizedRole;
}

const USERS_KEY = 'supiga_users';
const SESSION_KEY = 'supiga_session';

export function normalizeRole(input: string | undefined | null): NormalizedRole {
  const r = (input || '').toLowerCase();
  if (r === 'admin') return 'admin';
  if (r === 'prof' || r === 'professor') return 'prof';
  if (r === 'parent') return 'parent';
  // map french 'etudiant' and english 'student'
  return 'student';
}

function ensureClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readUsers(): StoredUser[] {
  if (!ensureClient()) return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  if (!ensureClient()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): SessionData | null {
  if (!ensureClient()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionData) : null;
  } catch {
    return null;
  }
}

function writeSession(session: SessionData | null): void {
  if (!ensureClient()) return;
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
  // notify other tabs/listeners
  try {
    window.dispatchEvent(new StorageEvent('storage', { key: SESSION_KEY }));
  } catch {
    // ignore
  }
}

function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function hashPassword(plain: string): Promise<string> {
  if (!ensureClient() || !(window.crypto && window.crypto.subtle)) {
    // very weak fallback — do NOT use for production
    return `sha256:${btoa(unescape(encodeURIComponent(plain)))}`;
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return `sha256:${toHex(digest)}`;
}

export async function registerUser(params: {
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
  department?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!ensureClient()) return { ok: false, error: 'Client requis' };
  const users = readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === params.email.toLowerCase());
  if (exists) return { ok: false, error: 'Un utilisateur avec cet email existe déjà' };

  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const role = normalizeRole(params.role);
  const passwordHash = await hashPassword(params.password);
  const user: StoredUser = {
    id,
    email: params.email,
    passwordHash,
    role,
    firstName: params.firstName,
    lastName: params.lastName,
    department: params.department,
    createdAt: new Date().toISOString(),
  };
  writeUsers([...users, user]);
  return { ok: true };
}

export async function loginUser(email: string, password: string): Promise<{ ok: true; role: NormalizedRole } | { ok: false; error: string }> {
  if (!ensureClient()) return { ok: false, error: 'Client requis' };
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, error: 'Email ou mot de passe incorrect' };
  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) return { ok: false, error: 'Email ou mot de passe incorrect' };
  writeSession({ userId: user.id, email: user.email, role: user.role });
  return { ok: true, role: user.role };
}

export function logoutUser(): void {
  writeSession(null);
}

export function getCurrentSession(): SessionData | null {
  return readSession();
}

export function getCurrentUser(): StoredUser | null {
  const session = readSession();
  if (!session) return null;
  const users = readUsers();
  const user = users.find((u) => u.id === session.userId);
  return user || null;
}

export function routeForRole(role: NormalizedRole): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'prof':
      return '/prof';
    case 'parent':
      return '/parent';
    case 'student':
    default:
      return '/dashboard';
  }
}


