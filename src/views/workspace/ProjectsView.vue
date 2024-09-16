<script setup lang="ts">

import { computed, onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";

import { type PresentationObject } from "@/types/Presentation";
import { getUserPresentations } from '@/api/getUserPresentations'
import { usePresentationStore } from "@/stores/presentation";
import { useNotificationStore } from "@/stores/notification";

import ProjectItem from "@/components/workspace/ProjectItem.vue";

const userName = ref(useUserStore().currentUser.name)
const { showNotification } = useNotificationStore()

interface UserProjects {
    data: PresentationObject[] | null,
    loading: boolean;
    error: string | null;
}

const userProjects = reactive<UserProjects>({
    data: null,
    loading: false,
    error: null,
});

async function fetchUserProjects() {
    userProjects.loading = true;
    try {
    const response = await getUserPresentations()
    if (response) {
        userProjects.data = response.presentations.sort( (a,b) => a.json.date_edited + b.json.date_edited );
    }
    } catch (error:any) {
    userProjects.error = error.message || 'Неизвестная ошибка';
    } finally {
    userProjects.loading = false;
    }
}

const sortedProjectsByTime = computed( () => {
    
    if (!userProjects.data) return []
    // Создаем копию массива перед сортировкой
    const sortedArray = [...userProjects.data];
    return sortedArray.sort((a, b) => b.json.date_edited - a.json.date_edited);
})

const sortedProjectsAll = computed(()=> sortedProjectsByTime.value?.filter((project) => !project.json.removed))
const sortedProjectsFavourite = computed(()=> sortedProjectsAll.value?.filter((project) => project.json.favourite))
const sortedProjectsRemoved = computed(()=> sortedProjectsByTime.value?.filter((project) => project.json.removed))


onMounted( ()=>{
    fetchUserProjects()
})

function removeProjectItem(id:number){
    if (userProjects.data) {
        userProjects.data = userProjects.data.filter(project => project.id != id)
        showNotification(`Проект удалён`, 'warning')
    }
}
function replaceProjectToRemoved(id:number){
    if (userProjects.data) {
        const project = userProjects.data.find((project) => project.id == id)
        if (project) {
            project.json.favourite = false
            project.json.removed = true
            usePresentationStore().saveProject(project)
            showNotification(`Проект '${project.json.title}' перемещён в удалённое`, 'warning')
        }
    }
}
function toggleProjectFavourite(projectId : number) {
    if (userProjects.data) {
        const project = userProjects.data.find((project) => project.id == projectId)
        if (project) {
            project.json.favourite = !project.json.favourite
            usePresentationStore().saveProject(project)
        }
    }
}

function backFromRemoved(id:number) {
    if (confirm('Хотите вернуть из удалённого этот проект?') ) {
        if (userProjects.data) {
        const project = userProjects.data.find((project) => project.id == id)
        if (project) {
            project.json.removed = false
            usePresentationStore().saveProject(project)
            showNotification(`Проект '${project.json.title}' восстановлен из удалённого`, 'information')
        }
    }
    }
}
</script>

<template>
    <div class="projects-view">

        <div class="view-panel">
            <div class="tabs">
                <RouterLink 
                    :to="'/workspace/projects'" 
                    :class="{ active : !$route.query.tab }"
                >Все
                </RouterLink>
                <RouterLink 
                    :to="'/workspace/projects?tab=fav'"
                    :class="{ active : $route.query.tab == 'fav' }"
                >Избранное
                </RouterLink>
                <RouterLink 
                    :to="'/workspace/projects?tab=removed'"
                    :class="{ active : $route.query.tab == 'removed' }"
                >Удалённые
                </RouterLink>
            </div>

            <div class="sorts">
                {{ $route.query.tab ? $route.query.tab : 'Все' }}
            </div>
        </div>

        <section class="tab-content">


            <div class="projects-loop">
            <!-- <transition-group name="list" 
                tag="div" 
                class="projects-loop"
            > -->

                <div v-if="userProjects.loading" >Загрузка...</div>

                <div v-else-if="userProjects.error">Ошибка: {{ userProjects.error }}</div>

                <div class="no-projects" v-else-if="userProjects.data?.length == 0">
                    <icon-no-projects />
                    <span>
                        Пока что здесь пусто :\ 
                    </span>
                </div>
                
                <template v-else>

                    <template v-if="$route.query.tab == 'removed'">
                        <ProjectItem 
                            v-for="project in sortedProjectsRemoved"  
                            :key="project.id" 
                            :user-name="userName"
                            :project-id="project.id"
                            @back-from-removed="id=> backFromRemoved(id)"
                            @remove-project="id=> removeProjectItem(id)"
                        />
                    </template>
                    <template v-else-if="$route.query.tab == 'fav'">
                        <ProjectItem 
                            v-for="project in sortedProjectsFavourite"  
                            :key="project.id"                
                            :user-name="userName"
                            :project-id="project.id"
                            @project-to-removed="id=>replaceProjectToRemoved(id)"
                            @toggle-favourite-status="toggleProjectFavourite(project.id)"
                        />
                    </template>
                    <template v-else>
                        <ProjectItem 
                            v-for="project in sortedProjectsAll" :key="project.id"
                            :user-name="userName"
                            :project-id="project.id"
                            @project-to-removed="id=>replaceProjectToRemoved(id)"
                            @toggle-favourite-status="toggleProjectFavourite(project.id)"
                        />
                    </template>

                </template>


            </div>
            <!-- </transition-group> -->

        </section>
    </div>
</template>

<style scoped>
.view-panel{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}
.tabs{
    display: flex;
    gap: 40px;
}
.tabs a{
    color: var(--color-text);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 3px;
    text-decoration-color: transparent;
}
.tabs a.active{
    text-decoration-color: var(--color-accent-light);
}

.projects-loop {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 46px 20px;
}

.no-projects{
    margin-top: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text-grey);
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>