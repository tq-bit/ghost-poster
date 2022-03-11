import { PublishedDevToPost } from '../../@types';
import logger from '../../util/logger.util';
import Ghoster, { GhosterConfig, RawGhostPost, RefinedGhostPost } from '../Ghoster';

interface lookupParams {
  title: string;
  slug: string;
}

export default class GhosterDevto extends Ghoster {
  constructor(config: GhosterConfig) {
    super(config);
  }

  public override async publish(post: RawGhostPost, publish: boolean = false): Promise<any> {
    const refinedGhostPost = this.refineRawGhostPost(post);
    const data = this.createDevtoArticleStructure(refinedGhostPost, publish);
    const response = await this.client('/articles', { data });
    return response;
  }

  public override async update(post: RawGhostPost, publish: boolean = true): Promise<any> {
    const { title, slug } = post;
    const devtoArticles = await this.getMyArticles();
    const articleId = this.lookupArticleId(devtoArticles, { title, slug });
    if (articleId) {
      const refinedGhostPost = this.refineRawGhostPost(post);
      const data = this.createDevtoArticleStructure(refinedGhostPost, publish);
      const response = await this.client(`/articles/${articleId}`, { method: 'put', data });
      return response;
    } else {
      throw new Error('Article could not be updated - No match found.')
    }
  }

  private lookupArticleId(
    articles: PublishedDevToPost[],
    { title, slug }: lookupParams
  ): number | null {
    const articleBySlug = this.lookupArticleBySlug(articles, slug);
    if (articleBySlug) {
      logger.info(`Article with slug ${articleBySlug.slug} found!`);
      return articleBySlug.id;
    }
    const articleByTitle = this.lookupArticleByTitle(articles, title);
    if (articleByTitle) {
      logger.info(`Article with title ${articleByTitle.title} found!`);
      return articleByTitle.id;
    }
    logger.warn(`No matching article was found for title: ${title} or slug: ${slug}`);
    return null;
  }

  private lookupArticleBySlug(
    articles: PublishedDevToPost[],
    slug: string
  ): PublishedDevToPost | null {
    const article = articles.find((article) => article.slug.match(slug));
    if (article) {
      return article;
    }
    return null;
  }

  private lookupArticleByTitle(
    articles: PublishedDevToPost[],
    title: string
  ): PublishedDevToPost | null {
    const article = articles.find((article) => article.title.match(title));
    if (article) {
      return article;
    }
    return null;
  }

  private async getMyArticles(): Promise<PublishedDevToPost[]> {
    const { data } = await this.client('/articles/me', { method: 'get' });
    return data;
  }

  private createDevtoArticleStructure(refinedGhostPost: RefinedGhostPost, publish: boolean) {
    return {
      article: {
        title: refinedGhostPost.title,
        body_markdown: refinedGhostPost.html,
        published: publish,
        main_image: refinedGhostPost.feature_image,
        tags: refinedGhostPost.tags,
      },
    };
  }
}
