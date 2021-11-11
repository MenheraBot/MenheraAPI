import type { NextRequest } from 'next/server';
import cors from '../lib/cors';

export default (req: NextRequest): Promise<Response> => {
  return cors(
    req,
    new Response(JSON.stringify({ message: 'Aknownledged' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  );
};
