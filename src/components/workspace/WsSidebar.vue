<script setup lang="ts">

defineProps<{
    balance ?: number
}>()

</script>

<template>
    <div class="sidebar">
        <div class="workspace-container">
            <RouterLink class="logo" :to="{name : 'home'}">
                <img src="@/assets/images/header-logo.png">
            </RouterLink>
            <nav> 
                <RouterLink :to="'/workspace/projects'">
                    <div class="tab-item" :class="{active : $route.path == '/workspace/projects'}">
                        <div class="icon-wrap">
                            <icon-projects />
                        </div> Презентации
                        <img src="@/assets/menu_tab_pattern.svg" class="menu-tab-pattern">
                    </div>
                </RouterLink>
                <RouterLink :to="'/workspace/patterns'">
                    <div class="tab-item" :class="{active : $route.path == '/workspace/patterns'}">
                        <div class="icon-wrap">
                            <icon-patterns />
                        </div> Шаблоны
                        <img src="@/assets/menu_tab_pattern.svg" class="menu-tab-pattern">
                    </div>
                </RouterLink>
                <RouterLink :to="'/workspace/shared'">
                    <div class="tab-item" :class="{active : $route.path == '/workspace/shared'}">
                        <div class="icon-wrap">
                            <icon-shared />
                        </div> Общие работы
                        <img src="@/assets/menu_tab_pattern.svg" class="menu-tab-pattern">
                    </div>
                </RouterLink>
                <RouterLink :to="'/workspace/slideeeSearch'">
                    <div class="tab-item" :class="{active : $route.path == '/workspace/slideeeSearch'}">
                        <div class="icon-wrap">
                            <icon-fire />
                        </div> Slideee search
                        <img src="@/assets/menu_tab_pattern.svg" class="menu-tab-pattern">
                    </div>
                </RouterLink> 
            </nav>

            <div class="sidebar-bottom">
                <RouterLink to="/workspace/settings">
                    <div class="tab-item" :class="{active : $route.fullPath == '/workspace/settings'}">
                        <div class="icon-wrap">
                            <icon-settings />
                        </div> Настройки
                        <img src="@/assets/menu_tab_pattern.svg" class="menu-tab-pattern">
                    </div>
                </RouterLink>
                <div class="tokens-block">
                    <div>
                        <span class="user-tokens">
                            {{ balance }} / 10000 токенов
                        </span>
                        <span style="font-size: 14px; font-weight: 400;">Разблокируйте Pro тариф</span>
                    </div>

                    <ui-button 
                        class="theme-gradient sm"
                        @click="$router.push({ name : 'settings', query : { tab : 'subscribtion' } })"
                    >
                    Обновить до Pro
                    </ui-button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.sidebar {
    max-width: var(--ws-sidebar-width);
    width: var(--ws-sidebar-width);
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: var(--color-background-soft);
    overflow-x: hidden;
    padding-top: 30px;
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
}

.logo {
    display: flex;
    gap: 20px;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    margin-left: 8px;
    margin-bottom: 40px;
}

.workspace-container {
    display: flex;
    flex-direction: column;
}

.sidebar-bottom {
    color: #000000;
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

nav {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.tab-item {
    position: relative;
    display: flex;
    gap: 16px;
    align-items: center;
    text-decoration: none;
    height: 42px;
    padding-left: 16px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-dim);
    border-radius: var(--radius-xsm);
    overflow: hidden;
}
.menu-tab-pattern{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
}

.icon-wrap {
    width: 26px;
    height: 26px;
    /* background: var(--color-4); */
}

.icon-wrap>img {
    height: 100%;
    width: auto;
}

.tab-item.active {
    background: var(--color-background);
    color: var(--color-text);
}
.tab-item.active .menu-tab-pattern{
    opacity: 1;
}
.tab-item svg{
    transition: fill 0.1s 0s, stroke 0.1s 0s;
    stroke-width: 0;
    stroke: var(--c-text-white-dim);
    fill: var(--c-text-white-dim);
    will-change: fill, stroke;
}
.tab-item.active svg,
.tab-item:hover svg{
    stroke: var(--color-accent-light);
    fill: var(--color-accent-light);
}

.tokens-block {
    border-radius: var(--radius-common);
    color: var(--c-text-white);
    background: var(--color-background);
    padding: 22px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.tokens-block>div {
    display: flex;
    flex-direction: column;
    gap: 8px;

}
</style>