// src/utils/trpc.ts
import type { AppRouter } from '../server/router'
import { createReactQueryHooks } from '@trpc/react'
import { inferProcedureOutput } from '@trpc/server'

export const trpc = createReactQueryHooks<AppRouter>()

/**
 * Check out tRPC docs for Inference Helpers
 * https://trpc.io/docs/infer-types#inference-helpers
 */
export type TQuery = keyof AppRouter['_def']['queries']

/**
 * Enum containing all api mutation paths
 */
export type TMutation = keyof AppRouter['_def']['mutations']

/**
 * Enum containing all api subscription paths
 */
export type TSubscription = keyof AppRouter['_def']['subscriptions']

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

export type SongData = InferQueryOutput<'userData.getAlbumSongs'>
export type UserProfile = InferQueryOutput<'userData.profile'>
