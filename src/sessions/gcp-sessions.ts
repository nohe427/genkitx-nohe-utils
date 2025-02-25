import { Storage } from '@google-cloud/storage';
import { SessionData, SessionStore } from 'genkit/beta';

class GcsSessionStore<S = any> implements SessionStore<S> {
  private storage;
  constructor(private projectId: string, private bucket: string, private sessionDir: string) {
    this.storage = new Storage({ projectId: this.projectId });
  }

  private sessionFilePath(sessionId: string): string {
    return `${this.sessionDir}/${sessionId}`;
  }

  async get(sessionId: string): Promise<SessionData<S> | undefined> {
    try {
      const file = await this.storage.bucket(this.bucket).file(this.sessionFilePath(sessionId)).download();
      return JSON.parse(file[0].toString('utf-8'));
    } catch (error) {
      console.error(`Error fetching session ${sessionId}:`, error);
      return undefined;
    }
  }

  async save(sessionId: string, data: Omit<SessionData<S>, 'id'>): Promise<void> {
    try {
      const sessionFile = this.sessionFilePath((sessionId))
      await this.storage.bucket(this.bucket).file(sessionFile).save(JSON.stringify(data));
      console.log(`session saved to : ${sessionFile}`)
    } catch (error) {
      console.error(error);
    }
  }
}
