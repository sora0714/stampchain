import { HandlerContext, Handlers, Request } from "$fresh/server.ts";
import {
  connectDb,
  get_last_x_blocks_with_client,
} from "$lib/database/index.ts";
import { api_get_related_blocks } from "$lib/controller/block.ts";
import { isIntOr32ByteHex } from "$lib/utils/util.ts";
import { BlockRelatedResponseBody, ErrorResponseBody, BlockHandlerContext} from "globals";


/**
 * @swagger
 * /api/v2/block/related/{block_index}:
 *   get:
 *     summary: Get related blocks by block index or block hash
 *     parameters:
 *       - in: path
 *         name: block_index
 *         required: true
 *         schema:
 *           type: string
 *         description: The block index or block hash
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlockRelatedResponseBody'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseBody'
 */
export const handler: Handlers = {
  async GET(_req: Request, ctx: BlockHandlerContext) {
    const block_index_or_hash = ctx.params.block_index;

    if (!isIntOr32ByteHex(block_index_or_hash)) {
      const body: ErrorResponseBody = {
        error: "Invalid argument provided. Must be an integer or 32 byte hex string.",
      };
      return new Response(JSON.stringify(body));
    }
 
    try {
      const blocks: BlockRelatedResponseBody = await api_get_related_blocks(block_index_or_hash);
      return new Response(JSON.stringify(blocks))
    } catch (error) {
      const body: ErrorResponseBody = {
        error: `Related blocks not found`,
      };
      return new Response(JSON.stringify(body));
    }
  },
};
