<template>
    <modal title="Add Friend" :isVisible="isVisible" @close="hide">
        <template slot="body">
            <section class="modal-card-body">
                <transition name="modal" mode="out-in">
                    <div class="notification is-warning" v-if="error">
                        <p class="help is-small">
                            {{error}}
                        </p>
                    </div>
                </transition>
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img class="avatar" :src="friend.avatar_url" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4" v-text="friend.name">John Smith</p>
                                <p class="subtitle is-6">@{{friend.handle}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <a class="button is-success" :class="{'is-loading': isLoading}" @click="sendFriendRequest()">Send Friend
                    Request</a>
                <a class="button" @click="hide()">Cancel</a>
            </footer>
        </template>
    </modal>
</template>

<script>
    import Modal from '../Modal.vue';
    import store from '../../store';

    export default {
        data() {
            return {
                isLoading: false,
                error: null
            }
        },
        components: {Modal},
        props: ['isVisible', 'friend'],
        methods: {
            sendFriendRequest() {
                let self = this;
                this.isLoading = true;
                this.$store.dispatch('friends/sendRequest', this.friend.id)
                    .then((response) => {
                        console.log(response);
                        self.isLoading = false;
                        return self.hide();
                    }, (error) => {
                        console.log(error);
                        if(error.data.message){
                            self.error = error.data.message;
                        }
                        return self.isLoading = false;
                    });
            },
            hide() {
                this.$emit('close');
            }
        },
    }
</script>
<style lang="scss" scoped>
    .card {
        .card-content {
            min-height: 0 !important;
        }
    }
</style>
