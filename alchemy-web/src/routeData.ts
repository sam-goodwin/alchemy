import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
  let route: StarlightRouteData;
  // Get the content collection entry for this page.
  try {
    route = context.locals.starlightRoute;
  } catch (_) {
    // This is a non-starlight route, so we want to skip the og generation
    return;
  }

  // Base OG image URL
  const baseImageUrl = `/og/${route.id ?? "index"}`;
  console.log("slug:", route.id);

  // Open Graph image (Facebook, LinkedIn, WhatsApp) - 1200x630
  route.head.push({
    tag: "meta",
    attrs: {
      property: "og:image",
      content: `${baseImageUrl}?width=1200&height=630`,
    },
  });

  // Twitter Card
  route.head.push({
    tag: "meta",
    attrs: {
      name: "twitter:card",
      content: "summary_large_image",
    },
  });

  // Twitter image - 1200x600
  route.head.push({
    tag: "meta",
    attrs: {
      name: "twitter:image",
      content: `${baseImageUrl}?width=1200&height=600`,
    },
  });
});
