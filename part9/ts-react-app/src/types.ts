export interface HeaderProps {
  name: string
}

export interface Part {
  name: string,
  exerciseCount: number
}

export interface PartProps {
  part: Part
}

export interface CourseProps {
  parts: Array<Part>
}