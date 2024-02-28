//Aca cree un Handler con contexto para renderizar los posts, extrayendolos de la funcion de services con el mismo nombre.
import { Handlers, PageProps } from "$fresh/server.ts";
import { PostsLoad } from "../../services/posts.ts";
//Es importante recordar algo antes de crear cualquier funcion u objeto asincrono. Este tipo de FW funciona mediante un sistema de islas, por ende realiza las peticiones antes de renderizarce, por lo cual es importante predefinir los datos de la consulta antes de ejecutarla, de lo contrario se rompe todo a la pija.
//Del contexto extraemos la constante params y sacamos toda info necesaria para renderizar los posts
export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await PostsLoad(id);
    return context.render({ post });
  },
};

export default function PostPage(props: PageProps) {
  const { post } = props?.data || {};
  return (
    <article class={"p-4"}>
      <h1 class={`text-2xl font-bold`}>{post.title}</h1>
      <time>{Intl.DateTimeFormat(`es`).format(post.date)}</time>
      <div class={"markdown-body"} dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
