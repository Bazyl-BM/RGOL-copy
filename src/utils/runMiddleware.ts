import type { NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';

export function runMiddleware(
  req: NextRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
