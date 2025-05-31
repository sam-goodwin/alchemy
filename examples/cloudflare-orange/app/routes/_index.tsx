import { Route } from ".types/routes/_index";

export default function Home({}: Route.ComponentProps) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-6xl font-bold text-center">Hello World 🍊</h1>
    </div>
  );
}
