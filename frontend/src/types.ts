export type priorityType = "easy" | "mid" | "hard";

export interface todoType {
  title: string;
  date: Date;
  tags: string[];
  priority: "high" | "mid" | "low";
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
