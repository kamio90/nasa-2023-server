interface ResponseType {
  success: boolean;
  message: string;
}
export class UserService {
  async test(): Promise<ResponseType> {
    return { success: true, message: 'Test passed' };
  }
}
