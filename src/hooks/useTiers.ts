import { ref } from 'vue';
import type { TextGrid, TierOptions } from '../components/plugins/textgrid';
import type { TierItem } from '../components/plugins/textgrid/tier';

type NewTier = Omit<TierOptions, 'items'>;
interface DuplicateTier {
  id: string;
  name: string;
}
type ActiveID = string | null;

export default function useTiers() {
  /** 現在選択された Tier を管理 */
  const activeTierID = ref<ActiveID>(null);
  const setActiveTierID = (id: ActiveID) => {
    activeTierID.value = id;
  }

  /** args を追加した TextGrid を返します */
  const createTier = (args: NewTier, old: TextGrid): TextGrid => {
    return {
      ...old,
      [args.name]: { name: args.name, type: args.type, items: [] },
    }
  }

  /** args を複製した TextGrid を返します */
  const duplicateTier = (args: DuplicateTier, old: TextGrid): TextGrid => {
    if (!old.hasOwnProperty(args.id)) return old;
    const origin = old[args.id];
    return {
      ...old,
      [args.name]: {
        name: args.name,
        type: origin.type,
        items: origin.items,
      },
    }
  }

  /** id を name に変更した TextGrid を返します */
  const renameTier = (id: string, name: string, old: TextGrid): TextGrid => {
    return Object.fromEntries(
      Object.entries(old).map(([key, value]) => {
        if (key === id) return [name, { ...value, name }]
        return [key, value]
      })
    )
  }

  /** id で指定された Tier を削除した TextGrid を返します */
  const removeTier = (id: string, old: TextGrid): TextGrid => Object.fromEntries(
    Object.entries(old).filter(([key]) => (key !== id))
  )

  /** id で指定された Tier の Text 情報を削除した TextGrid を返します */
  const removeTexts = (id: string, old: TextGrid): TextGrid => Object.fromEntries(
    Object.entries(old).map(([key, value]) => {
      if (key === id) {
        const items = value.items.map((x) => ({...x, text: ""}))
        return [key, { ...value, items }]
      }
      return [key, value]
    })
  )

  /** ID で指定された Tier の Item を更新した TextGrid を返します */
  const updateTierItem = (id: string, index: number, item: TierItem, old: TextGrid): TextGrid => Object.fromEntries(
    Object.entries(old).map(([key, value]) => {
      if (key === id) {
        const items = value.items.map((x, i) => {
          if (i === index) return item
          return x
        })
        return [key, { ...value, items }]
      }
      return [key, value]
    })
  )

  const updateTierItemText = (id: string, item: TierItem, old: TextGrid): TextGrid => Object.fromEntries(
    Object.entries(old).map(([key, value]) => {
      if (key === id) {
        const items = value.items.map((x) => {
          if (x.time === item.time) return item
          return x
        })
        return [key, { ...value, items }]
      }
      return [key, value]
    })
  )


  /** アクティブな Tier を複製した TextGrid を返します */
  const duplicateActiveTier = (name: string, old: TextGrid): TextGrid => {
    const id = activeTierID.value;
    if (name && id) return duplicateTier({ id, name }, old);
    return old;
  }
  /** アクティブな Tier を name に変更した TextGrid を返します */
  const renameActiveTier = (name: string, old: TextGrid): TextGrid => {
    const id = activeTierID.value;
    if (name && id) return renameTier(id, name, old);
    return old
  }

  /** アクティブな Tier を削除した TextGrid を返します */
  const removeActiveTier = (old: TextGrid): TextGrid => {
    const id = activeTierID.value;
    if (id) return removeTier(id, old);
    return old
  }

  /** アクティブな Tier の Text 情報を削除した TextGrid を返します */
  const removeActiveTierTexts = (old: TextGrid): TextGrid => {
    const id = activeTierID.value;
    if (id) return removeTexts(id, old);
    return old
  }

  const updateActiveTierItemText = (item: TierItem, old: TextGrid): TextGrid => {
    const id = activeTierID.value;
    if (id) return updateTierItemText(id, item, old);
    return old
  }

  return {
    activeTierID,
    setActiveTierID,
    createTier,
    duplicateTier,
    renameTier,
    removeTier,
    removeTexts,
    updateTierItem,
    updateTierItemText,
    duplicateActiveTier,
    renameActiveTier,
    removeActiveTier,
    removeActiveTierTexts,
    updateActiveTierItemText,
  }

}
