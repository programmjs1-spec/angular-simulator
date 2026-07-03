// Задание №3.

function sum(a: number, b: number): number {
  const result = a + b;
  return result;
}
const a = 5;
const b = 7;

console.log(sum(a, b));

// Задание №4.

let status: "loading" | "success" | "error" = "loading";

// Задание №5.

let textFormat: "uppercase" | "lowercase" | "capitalize" = "uppercase"; 

// Задание №6.

interface IUser {
  name: string;
  age: number;
  email?: string;
}

// Задание №7.

interface IDeveloper extends IUser {
  programmingLanguage: string;
  experience: number;
}

// Задание №8.

function formatText(
  text: string,
  format: "uppercase" | "lowercase" | "capitalize"
): string {
  switch (format) {
    case "uppercase":
      return text.toUpperCase();

    case "lowercase":
      return text.toLowerCase();

    case "capitalize":
      return text.charAt(0).toUpperCase() + text.slice(1);

      default:
        return text;
  }
}

// Задание №9.

function removeSymbol(text: string, symbol: string): string {
  return text.replaceAll(symbol, "");
}

// Задание №10.

const users: IUser[] = [
  {
  name: "Иван",
  age: 25,
  email: "ivan@mail.com",
},
 {
    name: "Анна",
    age: 17,
  },
  {
    name: "Петр",
    age: 30,
    email: "petr@mail.com",
  },
];

const adults = users.filter((user) => user.age >= 18);

console.log(adults);

