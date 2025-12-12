import { Link } from "../../generated/prisma/client";
import { CreateShortenDTO } from "./dtos/create-shorten.dto";
import { nanoid } from "nanoid";
import { ShortenRepository } from "./shorten.repository";
import { createId } from "@paralleldrive/cuid2";
import { GetShortenDTO, ShortenSortOrder } from "./dtos/get-shorten.dto";

export class ShortenService {
  private repo = new ShortenRepository();

  async getLinks(dto: GetShortenDTO): Promise<Link[]> {
    const { search, sort, limit } = dto;

    let orderBy: { [key: string]: 'asc' | 'desc' } | undefined;

    switch (sort) {
      case ShortenSortOrder.RECENTLY:
        orderBy = { createdAt: 'desc' };
        break;

      case ShortenSortOrder.MOST_CLICKS:
        orderBy = { accessCount: 'desc' };
        break;
    }

    return await this.repo.getAll({
      search,
      limit,
      orderBy
    });
  }

  async createLink(dto: CreateShortenDTO): Promise<Link> {
    const newLink: Link = {
      id: createId(),
      url: dto.url,
      shortCode: this.generateShortCode(),
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return this.repo.create(newLink)
  }

  async updateLink(id: string, data: CreateShortenDTO): Promise<Link> {
    return this.repo.update(id, data);
  }

  private generateShortCode(): string {
    const shortCodeLength = 6
    const shortCode = nanoid(shortCodeLength);
    return shortCode;
  }
}