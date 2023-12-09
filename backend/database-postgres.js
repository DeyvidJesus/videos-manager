import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    #videos = new Map();

    async list(search) {
        let videos;

        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ilike ${'%' + search + '%'}`;
        } else {
            videos = await sql`SELECT * FROM videos`;
        }

        return videos;
    }

    async create(video) {
        const videoId = randomUUID();

        await sql`INSERT INTO videos (
            title, 
            description,
            duration, 
            videoid)
        VALUES (
            ${video.title}, 
            ${video.description}, 
            ${video.duration}, 
            ${videoId})`;
    }

    async update(id, video) {
        await sql`UPDATE videos
        SET
          title = ${video.title},
          description = ${video.description},
          duration = ${video.duration}
        WHERE
          videoId = ${id};
        `;
    }

    async delete(id) {
        await sql`DELETE from videos WHERE videoId = ${id}`;
    }
}