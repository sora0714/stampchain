import { HandlerContext } from "$fresh/server.ts";
import { CommonClass, connectDb, Src20Class } from "$lib/database/index.ts";
import { jsonStringifyBigInt } from "utils/util.ts";
import { convertEmojiToTick, convertToEmoji } from "utils/util.ts";
import {
  ErrorResponseBody,
  PaginatedRequest,
  TickResponseBody,
  TickHandlerContext,
} from "globals";


/**
 * @swagger
 * /tick/{tick}/deploy:
 *   get:
 *     summary: Get deployment details for a specific tick
 *     description: Retrieve deployment details for a specific tick in the tick API.
 *     parameters:
 *       - in: path
 *         name: tick
 *         required: true
 *         description: The tick value.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with deployment details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TickResponseBody'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseBody'
 */


export const handler = async (_req: Request, ctx: TickHandlerContext): Promise<Response> => {
  let { tick } = ctx.params;
  try {
    tick = convertEmojiToTick(tick);
    const client = await connectDb();
    const deployment = await Src20Class
      .get_valid_src20_deploy_by_tick_with_client(
        client,
        tick,
      );
    const mint_status = await Src20Class
      .get_src20_minting_progress_by_tick_with_client(
        client,
        tick,
      );
    const last_block = await CommonClass.get_last_block_with_client(client);

    const body: TickResponseBody = {
      last_block: last_block.rows[0]["last_block"],
      mint_status: {
        ...mint_status,
        max_supply: mint_status.max_supply ? mint_status.max_supply.toString() : null,
        total_minted: mint_status.total_minted ? mint_status.total_minted.toString() : null,
        limit: mint_status.limit ? mint_status.limit.toString() : null,
      },
      data: {
        ...deployment.rows[0], 
        tick: convertToEmoji(deployment.rows[0].tick),

      },
    };
    return new Response(jsonStringifyBigInt(body));
  } catch (error) {
    const body: ErrorResponseBody = { error: `Error: Internal server error` };
    return new Response(JSON.stringify(body));
  }
};
