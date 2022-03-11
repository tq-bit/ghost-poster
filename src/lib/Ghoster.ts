// Generic Object with typed keys
// https://stackoverflow.com/questions/40641370/generic-object-type-in-typescript#40641527

export type GhosterHeaderKeys = 'api-key' | 'content-type';

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description: string;
  feature_image: string;
  meta_title: string;
  meta_description: string;
  url: string;
  accent_color: string;
}

export interface RawGhostPost {
  title: string;
  slug: string;
  html: string;
  feature_image: string;
  tags: GhostTag[];
  url: string;
}

export interface RefinedGhostPost {
  title: string;
  html: string;
  feature_image: string;
  tags: string[];
  url: string;
}

export interface GhosterConfig {
  targetUrl: string;
  targetApiKeyName: GhosterHeaderKeys;
  targetApiKeyValue?: string;
  convertToMarkdown: boolean;
  headers: {
    [key in GhosterHeaderKeys]?: string;
  };
}

export interface GhosterOptions {
  headers: {
    [key in GhosterHeaderKeys]?: string;
  };
  convertToMarkdown: boolean;
}

import TurndownService from 'turndown';
import axios from 'axios';

export default class Ghoster {
  url: string;
  options: GhosterOptions;
  client: any;
  headers?: { [key in GhosterHeaderKeys]?: string };
  constructor({
    targetUrl,
    targetApiKeyName,
    targetApiKeyValue,
    convertToMarkdown,
    headers,
  }: GhosterConfig) {
    this.url = targetUrl;
    this.options = { headers, convertToMarkdown };
    this.options.headers[targetApiKeyName] = targetApiKeyValue;
    this.client = axios.create({
      baseURL: this.url,
      method: 'post',
      timeout: 10000,
      headers: this.options.headers,
    });
  }

  public async publish(post: RawGhostPost, publish: boolean = false): Promise<any> {
    return null;
  }

  public async update(post: RawGhostPost, publish: boolean = true): Promise<any> {
    return null;
  }

  /**
   * @description Convert created post into a format other api's can understand
   */
  protected refineRawGhostPost(post: RawGhostPost, postScript?: string): RefinedGhostPost {
    let { title, html, feature_image, tags: ghostTags, url } = post;

    if (this.options.convertToMarkdown === true) {
      html = this.convertFromHtmlToMarkdown(html);
    }

    if (!!postScript) {
      html += postScript;
    }

    const tags = ghostTags.map((tag) => this.standardizeGhostTag(tag));
    return { title, html, feature_image, tags, url };
  }

  /**
   * @description Transform a tag name into pascal case
   */
  private standardizeGhostTag(tag: GhostTag): string {
    return tag.name.replace(/(\w)(\w*)/g, (g0: string, g1: string, g2: string) => {
      return g1.toUpperCase() + g2.toLowerCase();
    });
  }

  /**
   * @description Use turndown to convert html text into markdown
   */
  private convertFromHtmlToMarkdown(html: string) {
    const converter = new TurndownService({ codeBlockStyle: 'fenced' });
    return converter.turndown(html);
  }
}
