<script setup lang="ts">
import WSToolbarMenu, { MenuItem } from './WSToolbarMenu.vue'
  const emit = defineEmits<{
    'click': [event: string];
  }>();

  interface Menu {
    id: string;
    title: string;
    items: MenuItem[];
  }
  const menus: Menu[] = [
    {
      id: "File",
      title: "File",
      items: [
        { id: "read-from-file", title: 'Read from file...' },
        { id: "save-text-grid", title: 'Save TextGrid as Text file...' },
      ]
    },
    {
      id: "Edit",
      title: "Edit",
      items: [
        { id: "undo", title: 'Undo' },
        { id: "redo", title: 'Redo' },
        { id: "find-divider", title: 'divider' },
        { id: "find", title: 'Find...' },
        { id: "find-again", title: 'Find again' },
      ]
    },
    {
      id: "Time",
      title: "Time",
      items: [
        { id: "get-start-of-visible-part", title: 'Get start of visible part' },
        { id: "get-end-of-visible-part", title: 'Get end of visible part' },
        { id: "get-length-of-visible-part", title: 'Get length of visible part' },
        { id: "zoom-divider", title: 'divider' },
        { id: "zoom-in", title: 'zoom in', header: "Set visible part:" },
        { id: "zoom-out", title: 'zoom out' },
        { id: "zoom-to-selection", title: 'zoom to selection' },
        { id: "show-all", title: 'show all' },
        { id: "query-selection-divider", title: 'divider' },
        { 
          id: "get-start-of-selection",
          title: "Get start of selection",
          header:"Query selection:"
        },
        { id: "get-end-of-selection", title: "Get end of selection" },
        { id: "get-corsor", title: "Get cursor" },
        { id: "Get length of selection", title: "Get length of selection"},
        { id: "selection-divider", title: 'divider' },
        { id: "select", title: "Select...", header: "Set selection:" },
        { id: "widen-or-shrink-selection", title: "Widen or shrink selection..."},
        { id: "move-cursor-to-start-of-selection", title: "Move cursor to start of selection"},
        { id: "move-cursor-to-end-of-selection", title: "Move cursor to end of selection"},   
        { id: "move-cursor-to", title: "Move cursor to..."},
        { id: "move-cursor-by", title: "Move cursor by..."},
        { id: "move-start-of-selection-by", title: "Move start of selection by..."},
        { id: "move-end-of-selection-by", title: "Move end of selection by..."},
        { id: "select-earlier", title: "Select earlier"},
        { id: "select-later", title: "Select later"},
        { id: "move-start-of-selection-left", title: "Move start of selection left"},
        { id: "move-start-of-selection-right", title: "Move start of selection right"},
        { id: "move-end-of-selection-left", title: "Move end of selection left"},
        { id: "move-end-of-selection-right", title: "Move end of selection right"},
      ]
    },
    {
      id: "Play",
      title: "Play",
      items: [
        { id: "play", title: "Play..."},
        { id: "play-or-stop", title: "Play or stop"},
        { id: "play-window", title: "Play window"},
        { id: "interrupt-playing", title: "Interrupt playing"},
      ]
    },
    {
      id: "TextGrid",
      title: "TextGrid",
      items: [
        {id: "text-grid-settings", title: "TextGrid settings..."},
        {id: "divider-select-by-text-grid:", title: "divider"},
        {
          id: "select-previous-tier",
          title: "Select previous tier",
          header: "Select by TextGrid:"
        },
        {id: "select-next-tier", title: "Select next tier"},
        {id: "select-previous-interval", title: "Select previous interval"},
        {id: "select-next-interval", title: "Select next interval"},
        {id: "extend-select-left", title: "Extend-select left"},
        {id: "extend-select-right", title: "Extend-select right"},
      ]
    },
    {
      id: "Interval",
      title: "Interval",
      items: [
        {id: "divider-after-align", title: "divider"},
        {id: "add-interval-on-tier-1", title: "Add interval on tier 1", header: "New interval:" },
        {id: "add-interval-on-tier-2", title: "Add interval on tier 2"},
        {id: "add-interval-on-tier-3", title: "Add interval on tier 3"},
        {id: "add-interval-on-tier-4", title: "Add interval on tier 4"},
        {id: "add-interval-on-tier-5", title: "Add interval on tier 5"},
        {id: "add-interval-on-tier-6", title: "Add interval on tier 6"},
        {id: "add-interval-on-tier-7", title: "Add interval on tier 7"},
        {id: "add-interval-on-tier-8", title: "Add interval on tier 8"},
        {id: "divider-query-interval", title: "divider"},
        {
          id: "get-starting-point-of-interval",
          title: "Get starting point of interval",
          header: "Query interval:"
        },
        {id: "get-end-point-of-interval", title: "Get end point of interval"},
        {id: "get-label-of-interval", title: "Get label of interval"},
      ]
    },
    {
      id: "Boundary",
      title: "Boundary",
      items: [
        { 
          id: "add-on-selected-tier",
          title: "Add on selected tier",
          header: "New boundary or point:"
        },
        { id: "add-on-tier-1", title: "Add on tier 1" },
        { id: "add-on-tier-2", title: "Add on tier 2" },
        { id: "add-on-tier-3", title: "Add on tier 3" },
        { id: "add-on-tier-4", title: "Add on tier 4" },
        { id: "add-on-tier-5", title: "Add on tier 5" },
        { id: "add-on-tier-6", title: "Add on tier 6" },
        { id: "add-on-tier-7", title: "Add on tier 7" },
        { id: "add-on-tier-8", title: "Add on tier 8" },
        { id: "add-on-all-tiers", title: "Add on all tiers" },
        { id: "divider-modify-boundary-or-point:", title: "divider" },
        { 
          id: "move-to-nearest-zero-crossing",
          title: "Move to nearest zero crossing",
          header: "Modify boundary or point:"
        },
        { id: "boundary-remove", title: "Remove"},
      ]
    },
    {
      id: "Tier",
      title: "Tier",
      items: [
        { id: "add-interval-tier", title: "Add interval tier...", header: "New tier:" },
        { id: "add-point-tier", title: "Add point tier..." },
        { id: "duplicate-tier", title: "Duplicate tier..." },
        { id: "divider-modify-tier", title: "divider" },
        { id: "rename-tier", title: "Rename tier...", header: "Modify tier:" },
        { id: "remove-all-text-from-tier", title: "Remove all text from tier" },
        { id: "remove-entire-tier", title: "Remove entire tier" },
      ]
    }
  ]

  const onClick = (event: string | PointerEvent) => {
    if (event instanceof PointerEvent) {
      event.stopPropagation();
      const target = event.target as HTMLSpanElement;
      const value = target.textContent
      if (value) {
        emit('click', value);
      }
    } else {
      emit('click', event);
    }
  }
</script>

<template>
  <v-toolbar density="compact">
    <v-toolbar-items>
      <w-s-toolbar-menu 
        @click="onClick"
        v-for="menu in menus"
        :key="menu.id"
        :title="menu.title"
        :items="menu.items"
      />
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="onClick">help</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
