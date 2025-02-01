export interface IAnnouncement {
  _id?: string;
  title: string;
  content: string;
  user?:{
    name: string;
  }
}