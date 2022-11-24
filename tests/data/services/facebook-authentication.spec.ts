import { FacebookAuthentication } from '../../../src/domain/features/facebook-authentication'
class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserByTokenApi: LoadFacebookUserByTokenApi) { }
  async auth(params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByTokenApi.loadUserByToken(params.token)
  }
}

interface LoadFacebookUserByTokenApi {
  loadUserByToken: (token: string) => Promise<void>
}

class LoadFacebookUserApiByTokenApiSpy implements LoadFacebookUserByTokenApi {
  token?: string
  async loadUserByToken(token: string): Promise<void> {
    this.token = token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserByTokenApi with correct params', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiByTokenApiSpy()
    const fb = new FacebookAuthenticationService(loadFacebookUserByTokenApi)

    await fb.auth({ token: 'any_token' })

    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })
})
