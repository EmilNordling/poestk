import { Singleton } from 'one-atom';
import { AuthApiService } from './api/auth_api.service';
import { UserModel } from './api/models/user_model';

@Singleton()
export class AuthService {
  public user: UserModel | null = null;

  constructor(private readonly authApiService: AuthApiService) {
    // Empty
  }

  public async fetchActiveUser(): Promise<UserModel> {
    // todo this is test function, it's currently impl bad

    if (this.user === null) {
      const user = await this.authApiService.get();
      this.user = user;

      return user;
    }

    return this.user;
  }
}
