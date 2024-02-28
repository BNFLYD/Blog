import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import tailwind from "$fresh/plugins/tailwind.ts";

export default function Home() {
  const count = useSignal(3);
  return (
    <main class={"p-20"}>
      <h1 class={"text-4xl"}>Prueba 1</h1>
      <a href="/blog/post-01">blog</a>
    </main>
  );
}
