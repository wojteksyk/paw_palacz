import datetime
import json
from models.Student import Student
from models.Teacher import Teacher
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade

__copyright__ = "Zespol Szkół Komunikacji"
__author__ = "Wojciech Sytk 4c"


def teacher1(file_path: str) -> list[Teacher]:
    teachers = []

    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            _id = int(parts[0])
            name = parts[1]
            lname = ' '.join(parts[2:])
            teachers.append(Teacher(_id, name, lname))
    return teachers


def subjects1(file_path: str, teachers: list[Teacher]) -> list[Subject]:
    subjects = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            _id = int(parts[0])
            name = parts[1]
            teacher_id = int(parts[2])
            teacher = next((t for t in teachers if t._id == teacher_id), None)
            if teacher:
                subjects.append(Subject(_id, name, teacher))
    return subjects


def students1(file_path: str) -> list[Student]:
    students = []

    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            _id = int(parts[0])
            first_name = parts[1]
            last_name = ' '.join(parts[2:-1])
            birth_date = datetime.datetime.strptime(parts[-1], '%Y-%m-%d').date()
            students.append(Student(_id, first_name, last_name, birth_date))
    return students


def grades1(file_path: str, students: list[Student], subjects: list[Subject]) -> list[Grades]:
    grades_list = []

    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split()
            student_id = int(parts[0])
            subject_id = int(parts[1])
            grades_str = parts[2].split(',')

            student = next((s for s in students if s._id == student_id), None)
            subject = next((sub for sub in subjects if sub._id == subject_id), None)

            if student and subject:
                grades = Grades(student, subject)
                for grade in grades_str:
                    grades.grade1(int(grade))
                grades_list.append(grades)
    return grades_list


def main():

    teachers = teacher1('teachers.txt')
    subjects = subjects1('subjects.txt', teachers)
    students = students1('students.txt')
    grades = grades1('grades.txt', students, subjects)

    print("Oceny i średnie poszczególnych uczniów")
    students_data = {}
    for student in students:
        student_grades = [g for g in grades if g.student._id == student._id]
        student_data = {}

        print(f"{student}:")
        for grade in student_grades:
            subject_name = grade.subject.name
            ocenka = ', '.join(map(str, grade.grade2()))
            avg = grade.grade_avg()
            roczna = year_grade(avg)

            print(f"{subject_name}:")
            print(f"Oceny: {ocenka}")
            print(f"Srednia: {avg:.2f}")
            print(f"Ocena końcowa: {roczna}")
            print("")

            student_data[subject_name] = {
                "Oceny": ocenka,
                "Średnia": avg,
                "Ocena roczna": roczna
            }

        students_data[str(student)] = student_data
        print()


    with open('students.json', 'w') as f:
        json.dump(students_data, f, indent=4, ensure_ascii=False)


    print("" * 50)
    print("")

    subjects_data = {}
    for subject in subjects:
        subject_grades = [g for g in grades if g.subject._id == subject._id]
        all_grades = []

        for grade in subject_grades:
            all_grades.extend(grade.grade2())

        if all_grades:
            avg = sum(all_grades) / len(all_grades)

            print(f"{subject.name}:")
            print(f"   Nauczyciel: {subject.teacher}")
            print(f"   Oceny: {', '.join(map(str, all_grades))}")
            print(f"   Średnia: {avg:.2f}")
            print("")

            subjects_data[subject.name] = {
                "Nauczyciel": str(subject.teacher),
                "Oceny": all_grades,
                "Średnia": avg
            }
    with open('subjects.json', 'w') as f:
        json.dump(subjects_data, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    main()