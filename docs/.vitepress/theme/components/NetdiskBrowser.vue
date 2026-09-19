<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

const root = {
  name: 'download',
  children: [
    {
      name: '27招新任务',
      children: [
        {
          name: 'shuru.png',
          size: 1119473,
          modified: '2026-09-19 21:52',
          href: '/download/27招新任务/shuru.png'
        },
        {
          name: 'jieguo.png',
          size: 849951,
          modified: '2026-09-19 21:55',
          href: '/download/27招新任务/jieguo.png'
        }
      ]
    },
    {
      name: '机甲相关skill',
      children: [
        {
          name: 'rm-skill-share.zip',
          size: 1014619,
          modified: '2026-09-19 21:25',
          href: '/download/机甲相关skill/rm-skill-share.zip'
        },
        {
          name: '规则skill.txt',
          size: 69,
          modified: '2026-09-19 22:41',
          href: '/download/机甲相关skill/规则skill.txt'
        }
      ]
    },
    {
      name: 'An.introduction.to.CV.and.RoboMaster.Perception.pdf',
      size: 79148621,
      modified: '2026-09-01 16:41',
      href: '/download/An.introduction.to.CV.and.RoboMaster.Perception.pdf'
    }
  ]
}

const path = ref([])
const selected = ref(null)

const current = computed(() => (path.value.length ? path.value[path.value.length - 1] : root))
const items = computed(() => current.value.children)
const selectedItem = computed(() => items.value.find((item) => item.name === selected.value) ?? null)

const status = computed(() => {
  if (selectedItem.value) {
    return selectedItem.value.children
      ? '已选择 1 个项目'
      : '已选择 1 个项目 ' + sizeText(selectedItem.value.size)
  }
  return items.value.length + ' 个项目'
})

function select(item) {
  selected.value = item.name
}

function clearSelection(event) {
  if (event.target === event.currentTarget) selected.value = null
}

function openItem(item) {
  if (item.children) {
    path.value = [...path.value, item]
    selected.value = null
    return
  }
  const link = document.createElement('a')
  link.href = withBase(item.href)
  link.download = ''
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function goUp() {
  if (path.value.length) {
    path.value = path.value.slice(0, -1)
    selected.value = null
  }
}

function goTo(depth) {
  path.value = path.value.slice(0, depth)
  selected.value = null
}

function displayDate(iso) {
  const [date, time] = iso.split(' ')
  const [y, m, d] = date.split('-')
  return y + '/' + Number(m) + '/' + Number(d) + ' ' + time
}

function folderDate(folder) {
  const dates = folder.children.map((item) => item.modified).sort()
  return displayDate(dates[dates.length - 1])
}

function typeText(item) {
  if (item.children) return '文件夹'
  const m = /\.([^.]+)$/.exec(item.name)
  return (m ? m[1].toUpperCase() : '') + ' 文件'
}

function sizeText(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  if (bytes >= 1024) return Math.round(bytes / 1024) + ' KB'
  return bytes + ' B'
}
</script>

<template>
  <div class="nd">
    <div class="nd-toolbar">
      <button class="nd-up" :disabled="!path.length" title="上一级" aria-label="上一级" @click="goUp">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M8 3.2 13.2 8.4l-1.06 1.06L9 6.32V13H7V6.32L3.86 9.46 2.8 8.4 8 3.2Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div class="nd-address">
        <svg class="nd-address-icon" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
          <path
            d="M1.5 5.75C1.5 4.78 2.28 4 3.25 4h3.4c.46 0 .9.18 1.22.5l.94.94c.14.14.33.22.53.22h5.41c.97 0 1.75.78 1.75 1.75v.34H1.5v-2Z"
            fill="#E8A33D"
          />
          <path
            d="M1.5 7.5h17v7.75c0 .97-.78 1.75-1.75 1.75H3.25c-.97 0-1.75-.78-1.75-1.75V7.5Z"
            fill="#FFD04C"
          />
        </svg>
        <button class="nd-crumb" @click="goTo(0)">download</button>
        <template v-for="(folder, i) in path" :key="folder.name">
          <span class="nd-sep">›</span>
          <button class="nd-crumb" @click="goTo(i + 1)">{{ folder.name }}</button>
        </template>
      </div>
    </div>

    <div class="nd-head">
      <span class="nd-cell-name">名称</span>
      <span class="nd-cell-date">修改日期</span>
      <span class="nd-cell-type">类型</span>
      <span class="nd-cell-size">大小</span>
    </div>

    <div class="nd-body" @click="clearSelection">
      <template v-for="item in items" :key="item.name">
        <button
          v-if="item.children"
          class="nd-row"
          :class="{ selected: selected === item.name }"
          @click="select(item)"
          @dblclick="openItem(item)"
        >
          <span class="nd-cell nd-cell-name nd-label-cell">
            <svg class="nd-icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
              <path
                d="M1.5 5.75C1.5 4.78 2.28 4 3.25 4h3.4c.46 0 .9.18 1.22.5l.94.94c.14.14.33.22.53.22h5.41c.97 0 1.75.78 1.75 1.75v.34H1.5v-2Z"
                fill="#E8A33D"
              />
              <path
                d="M1.5 7.5h17v7.75c0 .97-.78 1.75-1.75 1.75H3.25c-.97 0-1.75-.78-1.75-1.75V7.5Z"
                fill="#FFD04C"
              />
            </svg>
            <span class="nd-label">{{ item.name }}</span>
          </span>
          <span class="nd-cell nd-cell-date">{{ folderDate(item) }}</span>
          <span class="nd-cell nd-cell-type">文件夹</span>
          <span class="nd-cell nd-cell-size"></span>
        </button>

        <a
          v-else
          class="nd-row"
          :class="{ selected: selected === item.name }"
          :href="withBase(item.href)"
          download
          @click.prevent="select(item)"
          @dblclick="openItem(item)"
        >
          <span class="nd-cell nd-cell-name nd-label-cell">
            <svg class="nd-icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
              <path
                d="M4.5 2.5h6.9L16 7.1v10.4c0 .55-.45 1-1 1H4.5c-.55 0-1-.45-1-1V3.5c0-.55.45-1 1-1Z"
                fill="#fff"
                stroke="#A9B0BA"
              />
              <path d="M11.4 2.5 16 7.1h-3.6c-.55 0-1-.45-1-1V2.5Z" fill="#D3D8DE" />
            </svg>
            <span class="nd-label">{{ item.name }}</span>
          </span>
          <span class="nd-cell nd-cell-date">{{ displayDate(item.modified) }}</span>
          <span class="nd-cell nd-cell-type">{{ typeText(item) }}</span>
          <span class="nd-cell nd-cell-size">{{ sizeText(item.size) }}</span>
        </a>
      </template>
    </div>

    <div class="nd-status">{{ status }}</div>
  </div>
</template>

<style scoped>
.nd {
  --nd-sel-bg: #cce8ff;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  font-size: 13px;
  user-select: none;
}

.dark .nd {
  --nd-sel-bg: #264f78;
}

.nd-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.nd-up {
  flex: none;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
  background: none;
  color: var(--vp-c-text-2);
  cursor: default;
}

.nd-up:hover:not(:disabled) {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider);
}

.nd-up:disabled {
  opacity: 0.45;
}

.nd-address {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  height: 28px;
  padding: 0 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.nd-address-icon {
  flex: none;
  margin: 0 4px 0 2px;
}

.nd-crumb {
  padding: 3px 6px;
  border: none;
  border-radius: 3px;
  background: none;
  font: inherit;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  cursor: default;
}

.nd-crumb:hover {
  background: var(--vp-c-bg-alt);
}

.nd-sep {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.nd-head,
.nd-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px 96px 84px;
  align-items: center;
}

.nd-head {
  height: 30px;
  padding: 0 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.nd-body {
  padding: 4px 8px 6px;
}

button.nd-row,
a.nd-row {
  width: 100%;
  height: 30px;
  padding: 0 6px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background: none;
  font: inherit;
  text-align: left;
  text-decoration: none;
  color: inherit;
  cursor: default;
}

.nd-row:hover {
  background: var(--vp-c-bg-soft);
  text-decoration: none;
}

.nd-row.selected,
.nd-row.selected:hover {
  background: var(--nd-sel-bg);
}

.nd-cell {
  padding: 0 6px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nd-label-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-1);
}

.nd-icon {
  flex: none;
}

.nd-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nd-status {
  padding: 5px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

@media (max-width: 640px) {
  .nd-head,
  .nd-row {
    grid-template-columns: minmax(0, 1fr) 84px;
  }

  .nd-cell-date,
  .nd-cell-type {
    display: none;
  }
}
</style>
