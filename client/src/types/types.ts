import { z } from "zod";

export const SignUpFormSchema = z.object({
  firstname: z.string().trim().min(1, "This field is required"),
  lastname: z.string().trim().min(1, "This field is required"),
  role: z.string({ message: "This field is required" }),
  email: z.string().trim().min(1, "This field is required").email(),
  password: z.string().trim().min(1, "This field is required"),
});
export type SignUpForm = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().trim().min(1, "This field is required").email(),
  password: z.string().trim().min(1, "This field is required"),
});
export type SignInForm = z.infer<typeof SignInFormSchema>;

export const ClassFormSchema = z.object({
  class_subject: z.string().trim().min(1, "This field is required"),
  class_section: z.string().trim().min(1, "This field is required"),
});
export type ClassForm = z.infer<typeof ClassFormSchema>;
export type ClassData = ClassForm & {
  teacher_id?: number;
  class_id?: number;
};

export const EnrollmentFormSchema = z.object({
  class_code: z.string().trim().min(6, "Class codes are 6 characters long"),
});
export type EnrollmentForm = z.infer<typeof EnrollmentFormSchema>;
export type EnrollmentData = EnrollmentForm & {
  student_id: number;
};

export const AssignmentFormSchema = z.object({
  title: z.string().trim().min(1, "This field is required"),
  description: z.string().trim().min(1, "This field is required"),
  points: z.number({ invalid_type_error: "This field is required" }).min(1),
});
export type AssignmentForm = z.infer<typeof AssignmentFormSchema>;
export type AssignmentData = AssignmentForm & {
  class_id: number;
  creator_id: number;
};

export type SubmissionData = {
  assignment_id: number;
  student_id: number;
  answer: string;
};

export type AnnouncementData = {
  class_id: number;
  announcement: string;
  announcer_id: number;
};

export type Assignment = {
  assignment_id: number;
  title: string;
  description?: string;
  points?: number;
  created_at: string;
  creator?: string;
  class_subject?: string;
  class_section?: string;
  banner_color?: string;
  class_id?: number;
  submitted_at?: string | null;
  given_points?: number | null;
};

export type ApiResponse = {
  success: boolean;
  error?: string;
  message: string;
};

export type User = {
  user_id: number;
  user: string;
  role: "teacher" | "student";
};

export type Class = {
  class_id: number;
  class_subject: string;
  class_code?: string;
  banner_color: string;
  class_section: string;
  class_teacher?: string;
};

export type ClassFeed = {
  feed_id: number;
  id: number;
  content: string;
  type: "announcement" | "assignment";
  creator_id: number;
  creator: string;
  created_at: string;
};

export type Submission = {
  assignment_completion_id?: number;
  user_id?: number;
  student_name?: string;
  answer: string | null;
  submitted_at: string | null;
  points: number;
  given_points: number | null;
};

export type AssignmentSubmissionData = {
  marked: number;
  handedIn: number;
  assigned: number;
};
