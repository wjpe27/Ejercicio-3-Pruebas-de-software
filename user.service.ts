// userService.ts
interface User {
    username: string;
    password: string;
    isBlocked: boolean;
   }
   let users: Record<string, User> = {};
   export function register(username: string, password: string): void {
    if (!username || !password) {
    throw new Error('Username and password are required');
    }
    if (users[username]) {
    throw new Error('User already exists');
    }
    users[username] = { username, password, isBlocked: false };
   }
   export function authenticate(username: string, password: string): boolean
   {
    const user = users[username];
    if (!user || user.isBlocked) {
    return false;
    }
    if (user.password !== password) {
    return false;
    }
    return true;
   }
   export function blockUser(username: string): void {
    if (users[username]) {
    users[username].isBlocked = true;
    }
   }
   export function reset(): void {
    users = {};
   }