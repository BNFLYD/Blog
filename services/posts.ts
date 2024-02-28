import { extract } from "$std/front_matter/any.ts";
import { render } from "$land/gfm/mod.ts";
import type { Post } from "../types.d.ts";

export async function PostsLoad(id: string): Promise<Post | null> {
  // Esta funcion importa los markdown, divide el contenido de los datos(titulo, descripcion y fecha) usando el estandar front matter y devuelve un objeto del tipo post para usarlo en un articulo
  let raw: string;
  raw = await Deno.readTextFile(`./content/posts/${id}.md`).catch(() => null);
  if (!raw) return null;
  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;
  // ^ Esta linea poronga es para que typescript acepte las variables de attrs, porque se acuerda que tiene que imitar a java y romperte los huevos con los tipos hasta en el aire que respiras; pero bueno gajes del oficio.
  const post: Post = {
    id,
    title: params.title,
    excerpt: params.excerpt,
    date: new Date(params.date),
    body: render(body),
  };
  return post;
}
export async function PostList(): Promise<Post[]> {
  //Esta funcion lista los post mediante un iterable.
  const posts = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    const post = await PostsLoad(id);
    if (!post) continue;
    posts.push(post);
  }
  return posts;
}
await PostList();