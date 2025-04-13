class Teacher:
    def __init__(self, _id: int, name: str, lname: str) -> None:
        self._id = _id
        self.name = name
        self.lname = lname

    def __str__(self) -> str:
        return f"{self.name} {self.lname}"