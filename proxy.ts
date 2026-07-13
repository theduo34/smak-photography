import {
  convexAuthNextjsMiddleware,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const ADMIN_PATH_SECRET = process.env.ADMIN_PATH_SECRET;

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (segments[0] !== "admin") return;

  const [, secret, second] = segments;
  // Wrong or unset secret: do nothing here and let the route layout 404,
  // so a bad guess looks identical to a route that doesn't exist.
  if (!ADMIN_PATH_SECRET || secret !== ADMIN_PATH_SECRET) return;

  const isLoginPath = second === "login" && segments.length === 3;
  const authenticated = await convexAuth.isAuthenticated();

  if (isLoginPath && authenticated) {
    return nextjsMiddlewareRedirect(request, `/admin/${secret}`);
  }
  if (!isLoginPath && !authenticated) {
    return nextjsMiddlewareRedirect(request, `/admin/${secret}/login`);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
