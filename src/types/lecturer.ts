export type LecturerType = {
  _id: string;
  name: string;
  level: LecturerLevel;
  image: string;
  description: string;
  classes: string[];
  gradeDistribution: GradeDistributionType;
  comments: string[];
};

export type GradeDistributionType = {
  [key: string]: number;
  s_2: number;
  s_3: number;
  s_3_5: number;
  s_4: number;
  s_4_5: number;
  s_5: number;
  s_5_5: number;
}

export enum LecturerLevel {
  ENGINEER = "engineer",
  MASTER = "master",
  DOCTOR = "doctor",
  PROFESSOR = "professor",
}
