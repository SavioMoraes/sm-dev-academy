export interface Notification {
  id: string;
  title: string;
  playlistId: string;
  action: 'ADDED' | 'REMOVED';
  read: boolean;
  createdAt: string;
}