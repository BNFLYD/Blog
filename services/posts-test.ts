import { assertEquals } from "$std/assert/assert_equals.ts";
import { PostsLoad } from "./posts.ts";

Deno.test(`PostLoad devuelve null si el post no existe`, async () => {
  const post = await PostsLoad(`no existe mostro`);
  assertEquals(post, null);
});
Deno.test(`Postload devuelve un post si el post existe`,async () => {
    const post = await PostsLoad(`post-01`);
  assertEquals(post?.id, `post-01`);
})