import { Router, Request, Response, raw } from 'express';
import logger from '../util/logger.util';
import devto from '../controller/devto.controller';

const router: Router = Router();

async function postFromGhostToDevto(req: Request, res: Response): Promise<void> {
  try {
    const rawPost = req.body.post.current;
    const response = await devto.getGhoster().publish(rawPost);
    const { id, url } = response.data;
    logger.info(`Post #${id} created under ${url}`);
  } catch (error: any) {
    logger.error(`Could not create new post: HTTP ${error}`);
  } finally {
    res.status(200).send('stop');
  }
}

async function updatePublishedDevtoArticle(req: Request, res: Response): Promise<void> {
  try {
    const rawPost = req.body.post.current;
    const response = await devto.getGhoster().update(rawPost);
    const { id, url } = response.data;
    logger.info(`Post #${id} updated under ${url}`);
  } catch (error: any) {
    logger.error(`Could not update post: HTTP ${error}`);
  } finally {
    res.status(200).send('stop');
  }
}

router.post('/post/devto', postFromGhostToDevto);
router.post('/post/devto/update', updatePublishedDevtoArticle);

export default router;
