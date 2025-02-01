export interface IQuiz {
  _id?: string;
  title: string;
  questions: { questionText: string; options: string[]; answer: string }[];
  duration: number;
  passingScore: number;
  course: any;
  dueDate: string;
  createdAt?: any;
  score?: number;
}