export type LecturerType = {
  id: string;
  name: string;
  level: "engineer" | "master" | "doctor" | "professor";
  image: string;
  description: string;
  classes: string[];
  gradeDistribution: {
    s_2: number;
    s_2_5: number;
    s_3: number;
    s_3_5: number;
    s_4: number;
    s_4_5: number;
    s_5: number;
    s_5_5: number;
  };
};
