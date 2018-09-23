@Cache({ namespace: 'auth::userId' })
class Auth
{

  @Persist({ autoRestore: true })
  public jwt: string

  public userId: number
}
