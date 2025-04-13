from models.Student import Student
from models.Subject import Subject

class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.grades: list[int] = []
        self.student = student
        self.subject = subject

    def grade1(self, grade: int) -> None:
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6!!!!!")
        self.grades.append(grade)

    def grade2(self) -> list[int]:
        return self.grades

    def grade_avg(self) -> float:
        if not self.grades:
            return 0.0
        return round(sum(self.grades) / len(self.grades), 2)