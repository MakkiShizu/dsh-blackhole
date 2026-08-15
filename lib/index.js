// Host half of the dsh-blackhole plugin. The blackhole lives entirely in the
// browser (lib/client.js, the dsh.client bundle); this no-op apply only gives
// the host loader row a mounted fiber so the client-modules scan includes the
// entry in window.__DSH_BOOT__ on every DSH start.
export function apply() {}
