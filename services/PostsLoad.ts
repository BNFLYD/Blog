import { extract } from "$std/front_matter/any.ts";
import { render } from "$fresh/src/server/render.ts";
import type { Post } from "../types.d.ts";


export async function PostsLoad(id: string) {
  let raw: string;
  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
  } catch (e) {
    return null;
  }
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
