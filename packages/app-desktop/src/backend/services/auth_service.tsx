import { Service } from '@kira/instantiation';
import { StorageService } from './storage_service';

interface User {}

@Service()
export class AuthService {
  public static readonly ctor_name = Symbol('AuthService');
  protected user: null | User = null;

  constructor(private readonly storage_service: StorageService) {
    this.user = this.storage_service.local.get('auth');
  }

  public request_sign_in(): void {
    this.user = {};
    this.storage_service.local.set('auth', this.user);
  }

  public is_authenticated(): boolean {
    return !!this.user;
  }
}
