import { Storage } from '@google-cloud/storage';
import { SessionData, SessionStore } from 'genkit/beta';

/**
 * GcsSessionStore is a class that implements the SessionStore interface for storing session data in Google Cloud Storage.
 */
class GcsSessionStore<S = any> implements SessionStore<S> {
  private storage;
  /**
   * @param {string} projectId The ID of the Google Cloud project.
   * @param {string} bucket The name of the GCS bucket.
   * @param {string} sessionDir The directory within the bucket to store sessions.
   */
  constructor(private projectId: string, private bucket: string, private sessionDir: string) {
    this.storage = new Storage({ projectId: this.projectId });
  }

  /**
   * Constructs the file path for a session.
   * @param {string} sessionId The ID of the session.
   * @returns {string} The file path for the session.
   */
  private sessionFilePath(sessionId: string): string {
    return `${this.sessionDir}/${sessionId}`;
  }

  /**
   * Retrieves session data from GCS.
   * @param {string} sessionId The ID of the session to retrieve.
   * @returns {Promise<SessionData<S> | undefined>} The session data, or undefined if not found.
   */
  async get(sessionId: string): Promise<SessionData<S> | undefined> {
    try {
      const file = await this.storage.bucket(this.bucket).file(this.sessionFilePath(sessionId)).download();
      return JSON.parse(file[0].toString('utf-8'));
    } catch (error) {
      console.error(`Error fetching session ${sessionId}:`, error);
      return undefined;
    }
  }

  /**
   * Saves session data to GCS.
   * @param {string} sessionId The ID of the session to save.
   * @param {Omit<SessionData<S>, 'id'>} data The session data to save.
   * @returns {Promise<void>}
   */
  async save(sessionId: string, data: Omit<SessionData<S>, 'id'>): Promise<void> {
    try {
      const sessionFile = this.sessionFilePath((sessionId))
      await this.storage.bucket(this.bucket).file(sessionFile).save(JSON.stringify(data));
      console.log(`session saved to : ${sessionFile}`)
    } catch (error) {
      console.error(`Error saving session ${sessionId}:`, error);
    }
  }
}
