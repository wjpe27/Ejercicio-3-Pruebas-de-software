import { register, authenticate, blockUser, reset } from './userService';
describe('Fail Based Tests', () => {
    beforeEach(() => {
        reset();
    });

    it('should throw an error when trying to register with an empty username or password', () => {
        expect(() => register('', 'password123')).toThrow('Username and password are required');
        expect(() => register('user1', '')).toThrow('Username and password are required');
    });

    it('should throw an error when trying to register an already existing user', () => {
        register('user1', 'password123');
        expect(() => register('user1', 'anotherPassword')).toThrow('User already exists');
    });

    it('should do nothing when trying to block a non-existent user', () => {
        expect(() => blockUser('nonexistent')).not.toThrow();
        expect(authenticate('nonexistent', 'password')).toBe(false);
    });
});

describe('Use Based Tests', () => {
    beforeEach(() => {
        reset();
    });

    it('should authenticate successfully with correct credentials', () => {
        register('user1', 'password123');
        expect(authenticate('user1', 'password123')).toBe(true);
    });

    it('should fail authentication with incorrect credentials', () => {
        register('user1', 'password123');
        expect(authenticate('user1', 'wrongPassword')).toBe(false);
    });
});

describe('Model Based Tests', () => {
    beforeEach(() => {
        reset();
    });

    it('should create a new user with isBlocked set to false by default', () => {
        register('user1', 'password123');
        expect(authenticate('user1', 'password123')).toBe(true);  // Verifica que isBlocked es false
    });

    it('should block a user and prevent them from authenticating', () => {
        register('user2', 'password456');
        blockUser('user2');
        expect(authenticate('user2', 'password456')).toBe(false);
    });

    it('should not block a non-existent user', () => {
        blockUser('nonexistent');
        expect(authenticate('nonexistent', 'password')).toBe(false);
    });
});