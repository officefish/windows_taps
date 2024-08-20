class Auth {
    private static readonly tokenKey = 'token';
  
    static get token(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    static set token(value: string | null) {
      if (value) {
        localStorage.setItem(this.tokenKey, value);
      } else {
        localStorage.removeItem(this.tokenKey);
      }
    }
  
    static clearToken(): void {
      localStorage.removeItem(this.tokenKey);
    }
  }
export default Auth