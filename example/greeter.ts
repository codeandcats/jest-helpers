export class Greeter {
  getGreeting(name: string) {
    return `Hello ${name}`;
  }
}

export function showGreeting(greeter: Greeter, name: string) {
  const greeting = greeter.getGreeting(name);
  // tslint:disable-next-line:no-console
  console.log(greeting);
}
