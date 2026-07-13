/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as albums from "../albums.js";
import type * as auth from "../auth.js";
import type * as authz from "../authz.js";
import type * as dashboard from "../dashboard.js";
import type * as enquiries from "../enquiries.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as images from "../images.js";
import type * as packages from "../packages.js";
import type * as photos from "../photos.js";
import type * as seed from "../seed.js";
import type * as setup from "../setup.js";
import type * as siteSettings from "../siteSettings.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  albums: typeof albums;
  auth: typeof auth;
  authz: typeof authz;
  dashboard: typeof dashboard;
  enquiries: typeof enquiries;
  files: typeof files;
  http: typeof http;
  images: typeof images;
  packages: typeof packages;
  photos: typeof photos;
  seed: typeof seed;
  setup: typeof setup;
  siteSettings: typeof siteSettings;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
