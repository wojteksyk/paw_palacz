from models.Teacher import Teacher

class Subject:
    def __init__(self, _id: int, name: str, teacher: Teacher) -> None:
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self) -> str:
        return f"{self.name} {self.teacher}"