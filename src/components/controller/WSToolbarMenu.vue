<script setup lang="ts">
  interface ClickSelectEvent {
    id: string;
    value: boolean;
    path: unknown[];
  }

  export interface MenuItem {
    id: string;
    title: string;
    header?: string;
  }

  export interface WSToolbarMenuProps {
    /** メニュー開閉ボタンのタイトル */
    title: string;
    /** メニュー */
    items: MenuItem[];
  }
  withDefaults(defineProps<WSToolbarMenuProps>(), {});

  const emit = defineEmits<{
    'click': [event: string];
  }>();

  const onClick = (event: ClickSelectEvent) => {
    emit('click', event.id);
  }
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn size="small" variant="text" v-bind="props">
        {{ title }}
      </v-btn>
      <v-divider vertical />
    </template>
    <v-list @click:select="onClick" density="compact">
      <template :key="item.id" v-for="item in items">
        <v-list-subheader v-if="item.header">{{item.header}}</v-list-subheader>
        <v-list-item
          v-if="item.title !== 'divider'"
          density="compact"
          :value="item.id"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider v-else />
      </template>
    </v-list>
  </v-menu>
</template>
