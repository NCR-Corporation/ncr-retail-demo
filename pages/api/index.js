/**
 * @swagger
 * /api:
 *  get:
 *    description: Returns homepage status
 *    responses:
 *      200:
 *        description: Welcome message
 */
export default async function handler(_, res) {
  res.status(200).json({ message: 'Welcome to NCR Retail Demo.' });
}
