import { getAuth } from 'firebase-admin/auth';

export const authenticate = async (
  request: any,
  response: any,
  next: any
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return response
      .status(401)
      .json({ error: 'Unauthorized: No token provided' });

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    request.user = decodedToken;
    next();
  } catch (error) {
    return response
      .status(401)
      .json({ error: 'Unauthorized: Invalid token', details: error });
  }
};
