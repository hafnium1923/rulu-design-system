import type { TRIGGER_KEYS } from '@/constants/keyboard'

export type TriggerKey = (typeof TRIGGER_KEYS)[keyof typeof TRIGGER_KEYS]
