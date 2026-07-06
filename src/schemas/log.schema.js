import { z } from "zod";

export const logSchema = z.object({

    actor:z.string().min(1),

    action:z.string().min(1),

    payload:z.any()

});