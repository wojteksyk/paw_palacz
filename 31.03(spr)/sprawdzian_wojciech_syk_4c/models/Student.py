from datetime import datetime, date

class Student:
    def __init__(self, _id: int, fname: str, lname: str, birth_date: date) -> None:
        self._id = _id
        self.fname = fname
        self.lname = lname
        self.birth_date = birth_date

    @property
    def age(self) -> int:
        today = date.today()
        return today.year - self.birth_date.year - ((today.month, today.day) < (self.birth_date.month, self.birth_date.day))

    def __str__(self) -> str:
        return f"{self.fname} {self.lname} ({self.age})"