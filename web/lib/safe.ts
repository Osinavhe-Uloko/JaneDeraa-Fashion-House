// Server components call the Express API at request time. Before the API is
// running (or before `npm run seed` has been executed) that fetch will fail —
// this wrapper keeps pages rendering with an empty fallback instead of a 500,
// which matters most on a first-run dev setup.
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    console.error('[api]', (err as Error).message);
    return fallback;
  }
}
