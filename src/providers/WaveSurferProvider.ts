import { InjectionKey } from 'vue'
import useWaveSurfer from '../hooks/useWavesurfer';

export type WSStore = ReturnType<typeof useWaveSurfer>
const WSKey: InjectionKey<WSStore> = Symbol('WSStore');
export default WSKey;
