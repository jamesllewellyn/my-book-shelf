<template>
    <aside class="column sidebar is-2-desktop is-3-tablet is-hidden-mobile full-height is-narrow scrollable">
        <div class="side-bar scrollable">
            <ul class="menu-list">
                <li>
                    <transition name="fade" mode="out-in">
                        <router-link exact class="item" active-class="is-active" tag="a" :to="{ name: 'dashboard'}" v-if="!pageLoading">
                            <span class="icon">
                                <i class="fa fa-home"></i>
                            </span>
                            <span class="name">Home</span>
                        </router-link>
                    </transition>
                    <a href="" class="item" v-if="pageLoading">
                        <progress class="progress is-width-90" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <transition name="fade" mode="out-in">
                        <router-link exact class="item" active-class="is-active" tag="a" :to="`/user/@${user.handle}`"
                                     v-if="!pageLoading && user">
                            <span class="icon">
                                <i class="fa fa-user-circle"></i>
                            </span>
                            <span class="name">Profile</span>
                        </router-link>
                    </transition>
                    <a href="" class="item" v-if="pageLoading && !user">
                        <progress class="progress is-fullwidth" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <transition name="fade" mode="out-in">
                        <router-link class="item" active-class="is-active" tag="a" to="/friends/" v-if="!pageLoading">
                            <span class="icon">
                                <i class="fa fa-users"></i>
                            </span>
                            <span class="name">Friends</span>
                            <span class="tag is-danger is-pulled-right"
                                  v-if="user.pending_friend_requests_count">{{user.pending_friend_requests_count}}</span>
                        </router-link>
                    </transition>
                    <a href="" class="item" v-if="pageLoading">
                        <progress class="progress is-width-70" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <transition name="fade" mode="out-in">
                        <router-link class="item" active-class="is-active" tag="a" to="/reading/" v-if="!pageLoading">
                            <span class="icon">
                                <i class="fas fa-book-reader"></i>
                            </span>
                            <span class="name">Reading</span>
                            <span class="tag is-light is-pulled-right"
                            >{{readingCount}}</span>
                        </router-link>
                    </transition>
                    <a href="" class="item" v-if="pageLoading">
                        <progress class="progress is-width-70" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <transition name="fade" mode="out-in">
                        <router-link class="item" active-class="is-active" tag="a" to="/read/" v-if="!pageLoading">
                            <span class="icon">
                                <i class="fas fa-book"></i>
                            </span>
                            <span class="name">Read</span>
                            <span class="tag is-light is-pulled-right"
                                 >{{readCount}}</span>
                        </router-link>
                    </transition>
                    <a href="" class="item" v-if="pageLoading">
                        <progress class="progress is-width-70" value="0" max="100"></progress>
                    </a>
                </li>
            </ul>
            <p class="menu-label">
                Bookcase
                <shelf-add-button></shelf-add-button>
            </p>
            <transition name="fade" mode="out-in">
                <ul class="menu-list" v-if="!pageLoading">
                    <li v-for="(shelf, index) in bookcase.shelves" :key="index">
                        <router-link exact class="item" active-class="is-active" tag="a" :to="`/shelf/${shelf.id}`">
                            <span v-text="shelf.name"></span> <span class="tag is-light is-pulled-right"
                                                                    v-text="shelf.books_count"></span>
                        </router-link>
                    </li>
                </ul>
            </transition>
            <ul class="menu-list" v-if="pageLoading">
                <li>
                    <a href="" class="item" v-if="pageLoading && !user">
                        <progress class="progress is-width-90" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <a href="" class="item" v-if="pageLoading && !user">
                        <progress class="progress is-fullwidth" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <a href="" class="item" v-if="pageLoading && !user">
                        <progress class="progress is-width-60" value="0" max="100"></progress>
                    </a>
                </li>
                <li>
                    <a href="" class="item" v-if="pageLoading && !user">
                        <progress class="progress is-width-60" value="0" max="100"></progress>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
    import ShelfAddButton from '../components/buttons/ShelfAddButton.vue'
    export default {
        props: {
            user: {
                required: true
            },
            bookcase: {
                required: true
            }
        },
        components:{ShelfAddButton},
        computed: {
            pageLoading() {
                return this.$store.getters.getPageLoading && !this.user
            },
            readCount(){
                return this.$store.getters['bookcase/getReadCount'];
            },
            readingCount(){
                return this.$store.getters['bookcase/getReadingCount'];
            }
        },
        methods:{
            /** trigger event method */
            triggerEvent(eventName, payload){
                Event.$emit(eventName, payload);
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

